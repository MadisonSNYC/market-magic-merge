
import React from 'react';
import { Upload, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PortfolioActionButtonsProps {
  onDeposit: () => void;
  onWithdraw: () => void;
  withdrawDisabled?: boolean;
}

export function PortfolioActionButtons({ 
  onDeposit, 
  onWithdraw, 
  withdrawDisabled = false 
}: PortfolioActionButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button 
        className="w-full flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
        onClick={onDeposit}
        data-action="deposit"
      >
        <Upload className="h-4 w-4 mr-2" />
        Deposit
      </Button>
      <Button 
        variant="outline" 
        className="w-full border-purple-300 flex items-center justify-center text-purple-700 hover:bg-purple-100/50"
        onClick={onWithdraw}
        disabled={withdrawDisabled}
        data-action="withdraw"
      >
        <Download className="h-4 w-4 mr-2" />
        Withdraw
      </Button>
    </div>
  );
}
