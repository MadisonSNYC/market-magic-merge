
import React from 'react';
import { Button } from '@/components/ui/button';

interface AuthModeToggleProps {
  authMode: 'login' | 'register';
  onToggle: () => void;
}

export const AuthModeToggle: React.FC<AuthModeToggleProps> = ({ 
  authMode, 
  onToggle 
}) => {
  return (
    <div className="text-center mt-2">
      <Button 
        variant="link" 
        className="text-sm text-muted-foreground hover:text-primary"
        onClick={onToggle}
      >
        {authMode === 'login' 
          ? "Don't have an account? Sign up" 
          : "Already have an account? Sign in"}
      </Button>
    </div>
  );
};
