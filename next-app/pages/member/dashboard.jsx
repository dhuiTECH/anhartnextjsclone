import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/router';

export default function MemberDashboard() {
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => { checkAuth(); }, []);

  async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return router.push('/login');

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profile?.role === 'admin') return router.push('/admin/dashboard');

    setUser(user);
    loadFiles();
    setLoading(false);
  }

  async function loadFiles() {
    const { data, error } = await supabase.storage.from('member-files').list('', { limit: 100 });
    if (!error) setFiles(data?.filter(f => !f.name.startsWith('.')) || []);
  }

  const downloadFile = async (fileName) => {
    const { data, error } = await supabase.storage
      .from('member-files')
      .createSignedUrl(fileName, 60);
    
    if (error) {
      alert('Error downloading file: ' + error.message);
      return;
    }
    
    if (data.signedUrl) window.open(data.signedUrl, '_blank');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-teal-700 mb-2">Member Portal</h1>
          <p className="text-gray-600">Welcome, {user.email}!</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-teal-600 mb-6">Private Files Access</h2>
          {files.length === 0 ? (
            <p className="text-gray-500 italic">No files uploaded yet. Check back soon!</p>
          ) : (
            <div className="grid gap-4">
              {files.map((file) => (
                <div
                  key={file.name}
                  onClick={() => downloadFile(file.name)}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-teal-50 cursor-pointer transition"
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm0 2h5l1.586 1.586a1 1 0 00.707.293H16v6H4V6z" />
                    </svg>
                    <span className="font-medium text-gray-800">{file.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">Click to download</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => supabase.auth.signOut().then(() => router.push('/'))}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
