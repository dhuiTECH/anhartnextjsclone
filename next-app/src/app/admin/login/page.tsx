'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    setLoading(true);
    
    try {
      // Proceed with login
      const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
      
      if (loginError) {
        setError('Login failed: ' + loginError.message);
      } else {
        router.refresh();
        router.push('/admin/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <form onSubmit={login} className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">Admin Login</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
            {error}
          </div>
        )}
        
        <input 
          type="email" 
          value={email} 
          onChange={e=>setEmail(e.target.value)} 
          className="w-full p-3 border rounded mb-4" 
          placeholder="Email"
          required 
          autoComplete="email"
        />
        <input 
          type="password" 
          value={password} 
          onChange={e=>setPassword(e.target.value)} 
          className="w-full p-3 border rounded mb-4" 
          placeholder="Password"
          required 
          autoComplete="current-password"
        />
        
        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-indigo-600 text-white p-3 rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
        >
          {loading ? 'Logging in...' : 'Enter Admin Panel'}
        </button>
      </form>
    </div>
  );
}
