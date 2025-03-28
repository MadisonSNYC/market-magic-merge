
import React, { ReactNode } from 'react';
import { Heart } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';

interface LoginLayoutProps {
  children: ReactNode;
  authMode: 'login' | 'register';
}

export const LoginLayout: React.FC<LoginLayoutProps> = ({ 
  children, 
  authMode 
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-purple-100">
      <Card className="w-full max-w-md shadow-lg border-primary/20">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Heart className="h-8 w-8 text-pink-500" />
          </div>
          <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            Madison's Markets
          </CardTitle>
          <CardDescription className="text-center pt-2">
            {authMode === 'login' 
              ? "Sign in to access your AI-powered trading assistant" 
              : "Create an account to start trading with AI assistance"}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {children}
        </CardContent>
        
        <CardFooter className="text-xs text-center text-muted-foreground flex justify-center">
          <p>© 2024 Madison's Markets. All rights reserved.</p>
        </CardFooter>
      </Card>
    </div>
  );
};
