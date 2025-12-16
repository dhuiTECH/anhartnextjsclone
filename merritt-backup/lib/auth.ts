/**
 * Authentication Utilities
 * 
 * Helper functions for managing user authentication state
 * and protecting admin routes.
 */

import { supabase } from './supabase';
import { redirect } from 'next/navigation';

/**
 * Get current authenticated user
 * @returns User object or null if not authenticated
 */
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/**
 * Get current session
 * @returns Session object or null if no active session
 */
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

/**
 * Check if user is authenticated
 * @returns boolean indicating authentication status
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session;
}

/**
 * Sign out current user
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

