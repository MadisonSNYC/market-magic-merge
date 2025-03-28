
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleDollarSign, ArrowDownToLine, ArrowUpFromLine, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/format';
import { Separator } from '@/components/ui/separator';

interface PortfolioBalanceCardProps {
  availableBalance: number;
  portfolioValue: number;
  onDeposit: () => void;
  onWithdraw: () => void;
  onRefresh: () => void;
  lastUpdated: string;
}

export function PortfolioBalanceCard({
  availableBalance,
  portfolioValue,
  onDeposit,
  onWithdraw,
  onRefresh,
  lastUpdated
}: PortfolioBalanceCardProps) {
  // Calculate allocated funds (total - available)
  const allocatedFunds = portfolioValue - availableBalance;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center">
          <CircleDollarSign className="mr-2 h-5 w-5 text-primary" />
          Balance
        </CardTitle>
        <CardDescription>Your current account balance and allocation</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="space-y-4">
          <div>
            <div className="text-sm text-muted-foreground">Available Balance</div>
            <div className="text-3xl font-bold">{formatCurrency(availableBalance / 100)}</div>
          </div>
          
          <Separator />
          
          <div className="flex justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Portfolio Value</div>
              <div className="text-xl font-semibold">{formatCurrency(portfolioValue / 100)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Allocated</div>
              <div className="text-xl font-semibold">{formatCurrency(allocatedFunds / 100)}</div>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground text-right">
            Last updated: {new Date(lastUpdated).toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <div className="flex w-full gap-2">
          <Button onClick={onDeposit} className="flex-1">
            <ArrowDownToLine className="mr-2 h-4 w-4" />
            Deposit
          </Button>
          <Button onClick={onWithdraw} variant="outline" className="flex-1">
            <ArrowUpFromLine className="mr-2 h-4 w-4" />
            Withdraw
          </Button>
          <Button onClick={onRefresh} variant="ghost" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
