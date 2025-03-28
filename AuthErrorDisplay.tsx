
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AuthErrorDisplayProps {
  errorMessage: string | null;
  onShowTroubleshoot: () => void;
}

export const AuthErrorDisplay: React.FC<AuthErrorDisplayProps> = ({ 
  errorMessage, 
  onShowTroubleshoot 
}) => {
  if (!errorMessage) return null;
  
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        {errorMessage}
        <Button 
          variant="link" 
          className="p-0 h-auto ml-2 text-sm underline"
          onClick={onShowTroubleshoot}
        >
          Need help?
        </Button>
      </AlertDescription>
    </Alert>
  );
};
