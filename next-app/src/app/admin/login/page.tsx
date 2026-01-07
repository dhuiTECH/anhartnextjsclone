'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Turnstile } from '@/components/Turnstile';
import { useTurnstile } from '@/hooks/useTurnstile';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { token: turnstileToken, key: turnstileKey, reset: resetTurnstile, handlers: turnstileHandlers } = useTurnstile();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Verify Turnstile token before login
    if (!turnstileToken) {
      setError('Please complete the security verification');
      return;
    }

    setLoading(true);
    
    try {
      // Verify Turnstile token on server
      const verifyResponse = await fetch('/api/verify-turnstile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: turnstileToken }),
      });

      if (!verifyResponse.ok) {
        const verifyData = await verifyResponse.json();
        const errorCode = verifyData.code || 'UNKNOWN';
        
        // Provide user-friendly error messages based on error code
        let userMessage = verifyData.error || 'Security verification failed';
        
        if (errorCode === 'CONFIG_INVALID' || errorCode === 'CONFIG_MISSING') {
          userMessage = 'Server configuration error. Please contact support.';
        } else if (errorCode === 'TOKEN_EXPIRED' || errorCode === 'INVALID_TOKEN') {
          userMessage = 'Security verification expired. Please refresh the page and try again.';
          // Auto-reset Turnstile on token errors
          resetTurnstile();
        } else if (errorCode === 'SERVICE_UNAVAILABLE') {
          userMessage = 'Security service temporarily unavailable. Please try again in a moment.';
        }
        
        throw new Error(userMessage);
      }

      // Proceed with login
      const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
      
      if (loginError) {
        setError('Login failed: ' + loginError.message);
        resetTurnstile();
      } else {
        router.refresh();
        router.push('/admin/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
      resetTurnstile();
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
        
        {/* Cloudflare Turnstile */}
        <div className="flex justify-center mb-4" key={turnstileKey}>
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "0x4AAAAAACHSP48uvsbyUZG1"}
            onSuccess={turnstileHandlers.onSuccess}
            onError={turnstileHandlers.onError}
            onExpire={turnstileHandlers.onExpire}
            theme="auto"
            size="normal"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading || !turnstileToken} 
          className="w-full bg-indigo-600 text-white p-3 rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
        >
          {loading ? 'Logging in...' : !turnstileToken ? 'Verifying...' : 'Enter Admin Panel'}
        </button>
        
        <p className="mt-4 text-xs text-gray-500 text-center">
          Protected by Cloudflare security
        </p>
      </form>
    </div>
  );
}
