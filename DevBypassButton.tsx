
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface DevBypassButtonProps {
  redirectPath: string;
}

export const DevBypassButton: React.FC<DevBypassButtonProps> = ({ redirectPath }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Only show in development environments
  const isDevelopment = import.meta.env.DEV || 
    window.location.hostname.includes('localhost') || 
    window.location.hostname.includes('lovableproject.com');
  
  if (!isDevelopment) {
    return null;
  }
  
  const handleDevBypass = () => {
    // Set bypass flag in localStorage
    localStorage.setItem('dev_bypass_auth', 'true');
    console.log('Development auth bypass enabled');
    
    // Show confirmation toast
    toast({
      title: "Development Mode",
      description: "Using development authentication bypass",
    });
    
    // Navigate to the requested path or dashboard
    navigate(redirectPath || '/dashboard', { replace: true });
  };
  
  return (
    <Button
      variant="outline"
      className="w-full mt-2 text-sm bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100"
      onClick={handleDevBypass}
    >
      Development Bypass
    </Button>
  );
};
