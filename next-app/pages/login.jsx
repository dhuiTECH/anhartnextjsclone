import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password,
      options: {
        emailRedirectTo: undefined
      }
    });
    
    if (error) {
      setLoading(false);
      alert('Login failed: ' + error.message);
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    if (profile?.role === 'admin') {
      await router.replace('/admin/dashboard');
    } else {
      await router.replace('/member/dashboard');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-cyan-100">
      <form onSubmit={handleLogin} className="p-10 bg-white rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-teal-700">Member Login</h1>
        <p className="text-center text-gray-600 mb-8">Access your member portal</p>
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-teal-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:ring-2 focus:ring-teal-500"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal-600 text-white p-3 rounded-lg font-semibold hover:bg-teal-700 transition"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <div className="mt-4 text-center text-sm text-gray-600">
          <Link href="/admin-login" className="text-teal-600 hover:underline">
            Admin Login
          </Link>
        </div>
      </form>
    </div>
  );
}
