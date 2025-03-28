
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { useEffect, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [bypassAuth, setBypassAuth] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [showBypassOption, setShowBypassOption] = useState(false);
  
  // Check for development environments
  const isDevelopment = import.meta.env.DEV || 
    window.location.hostname.includes('localhost') || 
    window.location.hostname.includes('lovableproject.com');
  
  useEffect(() => {
    // Check if we're in development bypass mode
    const devBypass = localStorage.getItem('dev_bypass_auth') === 'true';
    setBypassAuth(devBypass);
    
    if (devBypass) {
      console.log('Development auth bypass active - skipping authentication checks');
    }
    
    setCheckingAuth(false);
    
    // If in development and not authenticated, show bypass option after a delay
    if (isDevelopment && !user && !devBypass) {
      const timer = setTimeout(() => {
        setShowBypassOption(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [user, isDevelopment]);

  const enableBypass = () => {
    localStorage.setItem('dev_bypass_auth', 'true');
    setBypassAuth(true);
    console.log('Development auth bypass enabled from protected route');
    window.location.reload(); // Force reload to apply the bypass
  };

  // While checking authentication status, show a loading indicator
  if ((loading || checkingAuth) && !bypassAuth) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
        {showBypassOption && isDevelopment && (
          <Alert className="max-w-md">
            <AlertTitle>Authentication taking too long?</AlertTitle>
            <AlertDescription className="flex flex-col gap-2">
              <p>You can enable development bypass mode to skip authentication.</p>
              <Button 
                size="sm" 
                variant="outline" 
                className="bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100"
                onClick={enableBypass}
              >
                Enable Development Bypass
              </Button>
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  }

  // Allow access if we have a user OR if we're in bypass mode
  if (user || bypassAuth) {
    return <Outlet />;
  }

  // If not authenticated and not in bypass mode, redirect to login
  console.log('No user found and not in bypass mode, redirecting to login');
  return <Navigate to="/login" state={{ from: location }} replace />;
};
