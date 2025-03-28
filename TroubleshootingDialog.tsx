
import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';

type TroubleshootingDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTryAgain: () => void;
};

export const TroubleshootingDialog: React.FC<TroubleshootingDialogProps> = ({
  open,
  onOpenChange,
  onTryAgain
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Troubleshooting Login Issues</DialogTitle>
          <DialogDescription>
            If you're having trouble signing in with Google, try these steps:
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          <div className="space-y-2">
            <h3 className="font-medium">Common Issues:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Make sure you're using a valid Google account</li>
              <li>Try clearing your browser cookies and cache</li>
              <li>Check if third-party cookies are enabled in your browser</li>
              <li>Try using a different browser</li>
              <li>Check your internet connection</li>
            </ul>
          </div>
          
          <p className="text-sm text-muted-foreground">
            If you continue to experience issues, please contact support.
          </p>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={onTryAgain}
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
