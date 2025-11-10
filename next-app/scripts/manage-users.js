#!/usr/bin/env node

/**
 * User Management Script
 * This script helps you manage users in your exclusive authentication system
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

async function listUsers() {
  console.log('👥 Current Users:');
  console.log('');
  
  try {
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('id, email, name, role, created_at')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    if (!profiles || profiles.length === 0) {
      console.log('   No users found.');
      return;
    }
    
    profiles.forEach((profile, index) => {
      console.log(`${index + 1}. ${profile.name || 'No name'} (${profile.email})`);
      console.log(`   Role: ${profile.role}`);
      console.log(`   Created: ${new Date(profile.created_at).toLocaleDateString()}`);
      console.log(`   ID: ${profile.id}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ Error listing users:', error.message);
  }
}

async function createUser() {
  try {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const question = (prompt) => new Promise(resolve => rl.question(prompt, resolve));
    
    console.log('');
    console.log('Create New User:');
    console.log('');
    
    const email = await question('Email: ');
    const password = await question('Password (min 6 characters): ');
    const name = await question('Name: ');
    const role = await question('Role (member/admin): ');
    
    rl.close();
    
    if (!email || !password || !name || !role) {
      console.error('❌ All fields are required.');
      return;
    }
    
    if (password.length < 6) {
      console.error('❌ Password must be at least 6 characters long.');
      return;
    }
    
    if (!['member', 'admin'].includes(role)) {
      console.error('❌ Role must be either "member" or "admin".');
      return;
    }
    
    // Create user in Supabase Auth
    console.log('');
    console.log('Creating user...');
    
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        name: name,
        role: role
      }
    });
    
    if (authError) {
      throw authError;
    }
    
    console.log('✅ User created successfully!');
    console.log(`   Email: ${email}`);
    console.log(`   Name: ${name}`);
    console.log(`   Role: ${role}`);
    console.log(`   ID: ${authData.user.id}`);
    
  } catch (error) {
    console.error('❌ Error creating user:', error.message);
  }
}

async function changeUserRole() {
  try {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const question = (prompt) => new Promise(resolve => rl.question(prompt, resolve));
    
    console.log('');
    console.log('Change User Role:');
    console.log('');
    
    const email = await question('User email: ');
    const newRole = await question('New role (member/admin): ');
    
    rl.close();
    
    if (!email || !newRole) {
      console.error('❌ Email and role are required.');
      return;
    }
    
    if (!['member', 'admin'].includes(newRole)) {
      console.error('❌ Role must be either "member" or "admin".');
      return;
    }
    
    // Update user role
    const { data, error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('email', email)
      .select();
    
    if (error) {
      throw error;
    }
    
    if (!data || data.length === 0) {
      console.error('❌ User not found.');
      return;
    }
    
    console.log('✅ User role updated successfully!');
    console.log(`   Email: ${email}`);
    console.log(`   New Role: ${newRole}`);
    
  } catch (error) {
    console.error('❌ Error updating user role:', error.message);
  }
}

async function deleteUser() {
  try {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const question = (prompt) => new Promise(resolve => rl.question(prompt, resolve));
    
    console.log('');
    console.log('Delete User:');
    console.log('');
    
    const email = await question('User email to delete: ');
    const confirm = await question('Are you sure? Type "DELETE" to confirm: ');
    
    rl.close();
    
    if (!email) {
      console.error('❌ Email is required.');
      return;
    }
    
    if (confirm !== 'DELETE') {
      console.log('❌ Deletion cancelled.');
      return;
    }
    
    // Get user ID first
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();
    
    if (profileError || !profile) {
      console.error('❌ User not found.');
      return;
    }
    
    // Delete user from auth
    const { error: authError } = await supabase.auth.admin.deleteUser(profile.id);
    
    if (authError) {
      throw authError;
    }
    
    console.log('✅ User deleted successfully!');
    console.log(`   Email: ${email}`);
    
  } catch (error) {
    console.error('❌ Error deleting user:', error.message);
  }
}

async function main() {
  const command = process.argv[2];
  
  console.log('🔐 User Management System');
  console.log('========================');
  console.log('');
  
  switch (command) {
    case 'list':
      await listUsers();
      break;
    case 'create':
      await createUser();
      break;
    case 'role':
      await changeUserRole();
      break;
    case 'delete':
      await deleteUser();
      break;
    default:
      console.log('Usage: node scripts/manage-users.js <command>');
      console.log('');
      console.log('Commands:');
      console.log('  list    - List all users');
      console.log('  create  - Create a new user');
      console.log('  role    - Change user role');
      console.log('  delete  - Delete a user');
      console.log('');
      console.log('Examples:');
      console.log('  node scripts/manage-users.js list');
      console.log('  node scripts/manage-users.js create');
      console.log('  node scripts/manage-users.js role');
      console.log('  node scripts/manage-users.js delete');
      break;
  }
}

main();
