'use client';
import { supabase } from '@/lib/supabase';

interface FileObject {
  name: string;
  id?: string;
  updated_at?: string;
  created_at?: string;
  last_accessed_at?: string;
  metadata?: Record<string, any>;
}

export default function MemberClient({ user, files }: { user: any; files: FileObject[] }) {
  const download = (name: string) => {
    const { data } = supabase.storage.from('member-files').getPublicUrl(name);
    window.open(data.publicUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-xl shadow mb-6">
          <h1 className="text-3xl font-bold text-teal-700 mb-2">Member Portal</h1>
          <p className="text-gray-600">Welcome, {user.email}</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Your Private Files</h2>
          {files.length === 0 ? (
            <p className="text-gray-500 italic">No files available.</p>
          ) : (
            <div className="space-y-3">
              {files.map(f => (
                <div key={f.name} onClick={() => download(f.name)} className="p-3 border rounded cursor-pointer hover:bg-teal-50 flex justify-between items-center">
                  <span className="font-medium">{f.name}</span>
                  <span className="text-sm text-gray-500">Click to download</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
