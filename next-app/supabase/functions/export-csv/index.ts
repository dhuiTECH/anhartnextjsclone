import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CSVExportRequest {
  startDate?: string;
  endDate?: string;
  formType?: string;
  searchTerm?: string; // Added to match your React component
  format?: 'csv' | 'excel';
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization header required' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Initialize Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });

    // Verify the JWT token
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid or expired token' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Optional: Check if user has admin role
    // Comment out if you don't have a profiles table with roles
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile && profile.role && profile.role !== 'admin') {
        return new Response(
          JSON.stringify({ error: 'Insufficient permissions' }),
          { 
            status: 403, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
    } catch (profileError) {
      // If profiles table doesn't exist or error occurs, continue
      // This allows the function to work without role-based access control
      console.log('Profile check skipped:', profileError);
    }

    // Parse request body
    const { 
      startDate, 
      endDate, 
      formType, 
      searchTerm,
      format = 'csv' 
    }: CSVExportRequest = await req.json();

    // Build query
    let query = supabase
      .from('submissions')
      .select('*')
      .order('created_at', { ascending: false });

    // Apply filters
    if (startDate) {
      query = query.gte('created_at', startDate);
    }
    if (endDate) {
      query = query.lte('created_at', endDate);
    }
    if (formType && formType !== 'all') {
      query = query.eq('form_type', formType);
    }

    const { data: submissions, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch submissions' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    let filteredSubmissions = submissions || [];

    // Apply search filter if provided
    if (searchTerm && searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filteredSubmissions = filteredSubmissions.filter(submission =>
        (submission.name || '').toLowerCase().includes(term) ||
        (submission.email || '').toLowerCase().includes(term) ||
        (submission.organization || '').toLowerCase().includes(term) ||
        (submission.subject || '').toLowerCase().includes(term) ||
        (submission.message || '').toLowerCase().includes(term)
      );
    }

    if (filteredSubmissions.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No submissions found for the specified criteria' }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Generate CSV content
    const csvContent = generateCSV(filteredSubmissions);
    
    // Generate filename with timestamp and filters
    const timestamp = new Date().toISOString().split('T')[0];
    const filterStr = formType && formType !== 'all' ? `_${formType}` : '';
    const filename = `submissions${filterStr}_${timestamp}.csv`;

    // Return CSV file
    return new Response(csvContent, {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache'
      }
    });

  } catch (error) {
    console.error('Export error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
}

function generateCSV(submissions: any[]): string {
  // Define CSV headers
  const headers = [
    'ID',
    'Name',
    'Email',
    'Phone',
    'Organization',
    'Subject',
    'Message',
    'Form Type',
    'Submitted At'
  ];

  // Convert submissions to CSV rows
  const rows = submissions.map(submission => [
    escapeCSVField(submission.id || ''),
    escapeCSVField(submission.name || ''),
    escapeCSVField(submission.email || ''),
    escapeCSVField(submission.phone || ''),
    escapeCSVField(submission.organization || ''),
    escapeCSVField(submission.subject || ''),
    escapeCSVField(submission.message || ''),
    escapeCSVField(submission.form_type || ''),
    escapeCSVField(new Date(submission.created_at).toLocaleString() || '')
  ]);

  // Combine headers and rows
  const csvRows = [headers, ...rows];
  
  // Join rows with newlines and add BOM for proper UTF-8 encoding
  const csvContent = csvRows.map(row => row.join(',')).join('\n');
  return '\ufeff' + csvContent; // Add BOM for Excel compatibility
}

function escapeCSVField(field: string | null | undefined): string {
  if (field === null || field === undefined) {
    return '';
  }
  
  const stringField = String(field);
  
  // If field contains comma, newline, or quote, wrap in quotes and escape quotes
  if (stringField.includes(',') || stringField.includes('\n') || stringField.includes('"') || stringField.includes('\r')) {
    return `"${stringField.replace(/"/g, '""')}"`;
  }
  
  return stringField;
}

serve(handler)