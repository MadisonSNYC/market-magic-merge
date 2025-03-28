
import React, { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

// Import the Supabase anon key from the project configuration
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1eWN6cGlpeW1sbGhxd2tvaHN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3MDkwNzQsImV4cCI6MjA1NzI4NTA3NH0.M8sjU2PXjOvNoYAilX1PWwE3L-SWvNvz99RzHBX4HUM";

export default function CreateAdminUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Get the Supabase URL from the environment
      const supabaseUrl = 'https://tuyczpiiymllhqwkohsy.supabase.co';
      
      // Construct the function URL
      const functionUrl = `${supabaseUrl}/functions/v1/create-admin-user`;
      
      console.log('Calling edge function at:', functionUrl);
      
      // Get the current user's session for the auth token
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData?.session?.access_token;
      
      // Set up headers with the Supabase anon key for authorization
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken || SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY
      };
      
      console.log('Using authorization headers:', { 
        'Authorization': `Bearer ${accessToken ? 'session-token-exists' : 'using-anon-key'}`,
        'apikey': 'exists'
      });
      
      // Make the request to the Supabase edge function
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({ email, password, firstName, lastName }),
      });

      console.log('Response status:', response.status);
      
      // First check if we can get the response text for debugging
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      // If the response isn't successful, throw an error
      if (!response.ok) {
        // Try to parse the response as JSON if possible
        let errorMessage;
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.error || `Server error: ${response.status}`;
        } catch (jsonError) {
          // If JSON parsing fails, use the response text or status
          errorMessage = responseText || `Server error: ${response.status} ${response.statusText}`;
          
          // If the response starts with HTML, it might be a 404 or other HTML error page
          if (responseText.trim().startsWith('<!DOCTYPE')) {
            errorMessage = `Function not found or not accessible. Status: ${response.status}`;
          }
        }
        throw new Error(errorMessage);
      }

      // Now parse the JSON response - we already have the text, so parse it
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        throw new Error(`Invalid JSON response: ${responseText.substring(0, 100)}...`);
      }

      toast({
        title: "Admin user created",
        description: "The admin user has been created successfully",
      });

      // Automatically sign in with the created user
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        throw signInError;
      }

      navigate('/dashboard');
    } catch (err: any) {
      console.error('Error creating admin user:', err);
      setError(err.message);
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout title="Create Admin User">
      <div className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Create Admin User</CardTitle>
            <CardDescription>
              Create an administrator account for the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  placeholder="admin@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  placeholder="••••••••"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    placeholder="Doe"
                  />
                </div>
              </div>
              
              {error && (
                <div className="p-3 rounded-md bg-red-50 text-red-800 text-sm flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
            
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Admin User'
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            You will be automatically signed in after creation
          </CardFooter>
        </Card>
      </div>
    </PageLayout>
  );
}
