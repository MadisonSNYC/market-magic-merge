
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const QuickLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Only show in development environments
  const isDevelopment = import.meta.env.DEV || 
    window.location.hostname.includes('localhost') || 
    window.location.hostname.includes('lovableproject.com');
  
  if (!isDevelopment) {
    return null;
  }
  
  const handleBypass = () => {
    // Set bypass flag in localStorage
    localStorage.setItem('dev_bypass_auth', 'true');
    console.log('Development auth bypass enabled');
    
    // Navigate to dashboard
    navigate('/dashboard', { replace: true });
    
    toast({
      title: "Development Mode",
      description: "Using development authentication bypass",
    });
  };
  
  const handleQuickLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Email and password are required",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Success",
        description: "Logged in successfully",
      });
      
      navigate('/dashboard', { replace: true });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "An error occurred during login",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Quick Development Login</CardTitle>
        <CardDescription>Authenticate quickly for development purposes</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleQuickLogin} className="space-y-4">
          <div>
            <Input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div>
            <Input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <div className="flex flex-col gap-2">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Logging in...' : 'Quick Login'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleBypass} 
              className="w-full bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100"
            >
              No-Auth Bypass
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <p>This is only visible in development environments</p>
      </CardFooter>
    </Card>
  );
};
