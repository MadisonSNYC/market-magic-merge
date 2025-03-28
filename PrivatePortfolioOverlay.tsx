
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { ShieldAlert, Eye, EyeOff, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PrivatePortfolioOverlayProps {
  isPrivate: boolean;
  onTogglePrivacy?: () => void;
}

export function PrivatePortfolioOverlay({ 
  isPrivate, 
  onTogglePrivacy 
}: PrivatePortfolioOverlayProps) {
  if (!isPrivate) return null;
  
  return (
    <div className="absolute inset-0 backdrop-blur-sm bg-pink-500/20 z-5 flex flex-col items-center justify-center rounded-lg">
      {onTogglePrivacy && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onTogglePrivacy}
          className="mt-3 border-pink-300 text-pink-700 bg-white/80 hover:bg-pink-200/80 backdrop-blur-sm"
        >
          <Eye className="h-4 w-4 mr-2" />
          Show Portfolio
        </Button>
      )}
    </div>
  );
}
