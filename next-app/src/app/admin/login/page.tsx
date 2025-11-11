'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('damon.hui@anhart.ca');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (!error) router.push('/admin/dashboard');
    else alert('Login failed: ' + error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <form onSubmit={login} className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">Admin Login</h1>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-3 border rounded mb-4" required />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-3 border rounded mb-6" required />
        <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white p-3 rounded font-semibold">
          {loading ? 'Logging in...' : 'Enter Admin Panel'}
        </button>
      </form>
    </div>
  );
}
