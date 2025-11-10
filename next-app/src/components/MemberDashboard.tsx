'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Download, Search, Filter, Calendar, Mail, Phone, Building, FileText } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Submission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  subject?: string;
  message: string;
  form_type: string;
  created_at: string;
}

const MemberDashboard = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formTypeFilter, setFormTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  useEffect(() => {
    filterSubmissions();
  }, [submissions, searchTerm, formTypeFilter, dateFilter]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      
      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('No active session');
      }

      // Fetch submissions - RLS should now allow authenticated users to read
      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      console.log('Fetched submissions:', data?.length || 0);
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast({
        title: "Error",
        description: `Failed to fetch submissions: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterSubmissions = () => {
    let filtered = [...submissions];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(submission =>
        submission.name.toLowerCase().includes(term) ||
        submission.email.toLowerCase().includes(term) ||
        submission.organization?.toLowerCase().includes(term) ||
        submission.subject?.toLowerCase().includes(term) ||
        submission.message.toLowerCase().includes(term)
      );
    }

    // Form type filter
    if (formTypeFilter !== 'all') {
      filtered = filtered.filter(submission => submission.form_type === formTypeFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(submission => new Date(submission.created_at) >= filterDate);
          break;
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          filtered = filtered.filter(submission => new Date(submission.created_at) >= filterDate);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          filtered = filtered.filter(submission => new Date(submission.created_at) >= filterDate);
          break;
        case 'year':
          filterDate.setFullYear(now.getFullYear() - 1);
          filtered = filtered.filter(submission => new Date(submission.created_at) >= filterDate);
          break;
      }
    }

    setFilteredSubmissions(filtered);
  };

  const exportToCSV = async () => {
    try {
      setExporting(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('No active session');
      }

      // Prepare export data
      const exportData = {
        startDate: dateFilter !== 'all' ? getDateFilterValue(dateFilter) : undefined,
        formType: formTypeFilter !== 'all' ? formTypeFilter : undefined,
        format: 'csv'
      };

      // Call export function
      const response = await fetch(`https://hxqbbyglhubcgfkbqltu.supabase.co/functions/v1/export-csv`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4cWJieWdsaHViY2dma2JxbHR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcyNzYzMDMsImV4cCI6MjA3Mjg1MjMwM30.xP7GYGbjKOUI5OcvUWwOwX0EYlVeqP44rnpbssvbty4'
        },
        body: JSON.stringify(exportData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Export failed');
      }

      // Get the CSV content as text
      const csvContent = await response.text();
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `submissions_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Export Successful",
        description: "Submissions exported to CSV file.",
      });
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export Failed",
        description: "Failed to export submissions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setExporting(false);
    }
  };

  const getDateFilterValue = (filter: string): string => {
    const now = new Date();
    switch (filter) {
      case 'today':
        return now.toISOString().split('T')[0];
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return weekAgo.toISOString().split('T')[0];
      case 'month':
        const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        return monthAgo.toISOString().split('T')[0];
      case 'year':
        const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        return yearAgo.toISOString().split('T')[0];
      default:
        return '';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFormTypeColor = (formType: string) => {
    switch (formType) {
      case 'home': return 'bg-blue-100 text-blue-800';
      case 'contact': return 'bg-green-100 text-green-800';
      case 'partner': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Member Dashboard</h1>
            <p className="text-muted-foreground">Manage and export form submissions</p>
          </div>
          <Button onClick={signOut} variant="outline">
            Sign Out
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Submissions</p>
                  <p className="text-2xl font-bold">{submissions.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">
                    {submissions.filter(s => {
                      const submissionDate = new Date(s.created_at);
                      const now = new Date();
                      return submissionDate.getMonth() === now.getMonth() && 
                             submissionDate.getFullYear() === now.getFullYear();
                    }).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Mail className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Contact Forms</p>
                  <p className="text-2xl font-bold">
                    {submissions.filter(s => s.form_type === 'contact').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Building className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Home Forms</p>
                  <p className="text-2xl font-bold">
                    {submissions.filter(s => s.form_type === 'home').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Export */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filters & Export</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search submissions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="form-type">Form Type</Label>
                <Select value={formTypeFilter} onValueChange={setFormTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="contact">Contact</SelectItem>
                    <SelectItem value="partner">Partner</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="date-filter">Date Range</Label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">Last 7 Days</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  onClick={exportToCSV} 
                  disabled={exporting || filteredSubmissions.length === 0}
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {exporting ? 'Exporting...' : `Export CSV (${filteredSubmissions.length})`}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submissions List */}
        <Card>
          <CardHeader>
            <CardTitle>
              Submissions ({filteredSubmissions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredSubmissions.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No submissions found matching your criteria.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredSubmissions.map((submission) => (
                  <Card key={submission.id} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{submission.name}</h3>
                        <Badge className={getFormTypeColor(submission.form_type)}>
                          {submission.form_type}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(submission.created_at)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{submission.email}</span>
                      </div>
                      {submission.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{submission.phone}</span>
                        </div>
                      )}
                      {submission.organization && (
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{submission.organization}</span>
                        </div>
                      )}
                    </div>

                    {submission.subject && (
                      <div className="mb-2">
                        <span className="font-medium text-sm">Subject: </span>
                        <span className="text-sm">{submission.subject}</span>
                      </div>
                    )}

                    <div>
                      <span className="font-medium text-sm">Message: </span>
                      <p className="text-sm text-muted-foreground mt-1">
                        {submission.message.length > 200 
                          ? `${submission.message.substring(0, 200)}...` 
                          : submission.message
                        }
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MemberDashboard;
