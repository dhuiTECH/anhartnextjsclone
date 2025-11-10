import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/member-login" replace />;
  }

  // For now, we'll allow all authenticated users
  // You can add role-based access control here later
  if (adminOnly) {
    // Check if user has admin role
    // This would require checking user metadata or a profiles table
    // For now, we'll allow all authenticated users
  }

  return <>{children}</>;
};

export default ProtectedRoute;
