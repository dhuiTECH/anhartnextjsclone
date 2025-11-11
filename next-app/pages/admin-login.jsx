import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const [email, setEmail] = useState('damon.hui@anhart.ca');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ 
      email, 
      password,
      options: {
        emailRedirectTo: undefined
      }
    });
    
    if (!error) {
      await router.replace('/admin/dashboard');
    } else {
      alert('Login failed: ' + error.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <form onSubmit={handleLogin} className="p-10 bg-white rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-700">Admin Login</h1>
        <input
          type="email"
          placeholder="Email (e.g., damon.hui@anhart.ca)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-indigo-500"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          {loading ? 'Signing in...' : 'Enter Admin Panel'}
        </button>
      </form>
    </div>
  );
}
