'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useTurnstile } from '@/hooks/useTurnstile';
import { Turnstile } from '@/components/Turnstile';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  const router = useRouter();

  const { 
    token: turnstileToken, 
    key: turnstileKey, 
    reset: resetTurnstile, 
    handlers: turnstileHandlers 
  } = useTurnstile();

  useEffect(() => {
    if (!lockoutTime) return;
    const interval = setInterval(() => {
      const remaining = Math.max(0, lockoutTime - Date.now());
      if (remaining <= 0) {
        setIsLocked(false);
        setLockoutTime(null);
        setError(null);
        resetTurnstile();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutTime, resetTurnstile]);

  const formatLockoutTime = () => {
    if (!lockoutTime) return '';
    const remaining = Math.max(0, lockoutTime - Date.now());
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isLocked) return;
    if (!turnstileToken) {
      setError('Please complete the security check.');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, turnstileToken }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.locked || response.status === 423) {
          setIsLocked(true);
          if (data.retryAfter) {
            setLockoutTime(Date.now() + (data.retryAfter * 1000));
          }
        }
        setError(data.error || 'Login failed.');
        resetTurnstile();
        return;
      }

      if (data.session) {
        await supabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        });
      }

      router.refresh();
      router.push('/admin/dashboard');
      
    } catch {
      setError('An error occurred. Please try again.');
      resetTurnstile();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50 p-4">
      <form onSubmit={login} className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-semibold italic text-center mb-8 text-indigo-600">
          Admin Login
        </h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
            {isLocked && lockoutTime && (
              <span className="block mt-1 font-mono">{formatLockoutTime()}</span>
            )}
          </div>
        )}
        
        <div className="space-y-4 mb-6">
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors"
            placeholder="Email"
            required 
            autoComplete="email"
            disabled={isLocked || loading}
          />
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-indigo-400 transition-colors"
            placeholder="Password"
            required 
            autoComplete="current-password"
            disabled={isLocked || loading}
          />
        </div>
        
        <div className="flex justify-center mb-6" key={turnstileKey}>
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
            onSuccess={turnstileHandlers.onSuccess}
            onError={turnstileHandlers.onError}
            onExpire={turnstileHandlers.onExpire}
            theme="light"
            size="compact"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading || isLocked || !turnstileToken} 
          className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
        >
          {loading ? 'Signing in...' : isLocked ? 'Account Locked' : !turnstileToken ? 'Verifying user...' : 'Enter Admin Panel'}
        </button>
      </form>
    </div>
  );
}
