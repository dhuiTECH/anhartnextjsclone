#!/usr/bin/env node

/**
 * Admin Setup Script
 * This script helps you create the first admin user for the member dashboard
 * 
 * Prerequisites:
 * - Supabase project set up
 * - Environment variables configured
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  console.error('   VITE_SUPABASE_URL');
  console.error('   SUPABASE_SERVICE_ROLE_KEY');
  console.error('');
  console.error('Please check your .env file and ensure these variables are set.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createAdminUser() {
  console.log('🚀 Setting up admin user...');
  
  try {
    // Check if any admin users already exist
    const { data: existingAdmins, error: checkError } = await supabase
      .from('profiles')
      .select('id, email, role')
      .eq('role', 'admin');
    
    if (checkError) {
      throw checkError;
    }
    
    if (existingAdmins && existingAdmins.length > 0) {
      console.log('✅ Admin users already exist:');
      existingAdmins.forEach(admin => {
        console.log(`   - ${admin.email} (${admin.role})`);
      });
      console.log('');
      console.log('If you need to create another admin, use the Supabase dashboard or create a new user through the signup flow.');
      return;
    }
    
    // Get user input
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const question = (prompt) => new Promise(resolve => rl.question(prompt, resolve));
    
    console.log('');
    console.log('No admin users found. Let\'s create the first admin user:');
    console.log('');
    
    const email = await question('Admin email: ');
    const password = await question('Admin password (min 6 characters): ');
    const name = await question('Admin name: ');
    
    rl.close();
    
    if (!email || !password || !name) {
      console.error('❌ All fields are required.');
      process.exit(1);
    }
    
    if (password.length < 6) {
      console.error('❌ Password must be at least 6 characters long.');
      process.exit(1);
    }
    
    // Create user in Supabase Auth
    console.log('');
    console.log('Creating user in Supabase Auth...');
    
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        name: name,
        role: 'admin'
      }
    });
    
    if (authError) {
      throw authError;
    }
    
    console.log('✅ User created in Supabase Auth');
    
    // Create profile record
    console.log('Creating profile record...');
    
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert([{
        id: authData.user.id,
        email: email,
        name: name,
        role: 'admin'
      }])
      .select()
      .single();
    
    if (profileError) {
      throw profileError;
    }
    
    console.log('✅ Profile created');
    console.log('');
    console.log('🎉 Admin user created successfully!');
    console.log('');
    console.log('Login details:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log(`   Role: admin`);
    console.log('');
    console.log('You can now:');
    console.log('1. Visit /member-login to sign in');
    console.log('2. Access the member dashboard at /member-dashboard');
    console.log('3. View and export form submissions');
    console.log('');
    console.log('⚠️  IMPORTANT: This is the ONLY way to create new users.');
    console.log('   - No public sign-up is available');
    console.log('   - No password reset functionality');
    console.log('   - All users must be created by administrators');
    console.log('   - Use this script or Supabase dashboard to add more users');
    console.log('');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  }
}

// Run the script
createAdminUser();
