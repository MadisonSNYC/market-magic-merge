
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface PortfolioDepositHandlerProps {
  onDepositSuccess?: (amount: number) => void;
}

export function usePortfolioDepositHandler({ onDepositSuccess }: PortfolioDepositHandlerProps = {}) {
  const { toast } = useToast();
  
  const handleDeposit = async () => {
    try {
      const isDevBypass = localStorage.getItem('dev_bypass_auth') === 'true';
      let userId;
      
      if (isDevBypass) {
        userId = 'dev-bypass-user-id';
        console.log('Using dev bypass user ID for deposit');
      } else {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          toast({
            title: "Authentication required",
            description: "Please sign in to deposit funds.",
            variant: "default"
          });
          return;
        }
        
        userId = user.id;
      }
      
      const amount = 100;
      
      if (isDevBypass) {
        if (onDepositSuccess) {
          onDepositSuccess(amount);
        }
        
        toast({
          title: "Deposit successful (Dev Mode)",
          description: `$${amount.toFixed(2)} has been added to your account.`,
          variant: "default"
        });
        
        return;
      }
      
      const { data: portfolioData, error } = await supabase
        .from('portfolio')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        throw error;
      }
      
      if (portfolioData) {
        const { error: updateError } = await supabase
          .from('portfolio')
          .update({
            available_balance: portfolioData.available_balance + amount,
            total_portfolio_value: portfolioData.total_portfolio_value + amount,
            last_updated: new Date().toISOString()
          })
          .eq('id', portfolioData.id);
          
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('portfolio')
          .insert({
            user_id: userId,
            available_balance: amount,
            total_portfolio_value: amount,
            last_updated: new Date().toISOString()
          });
          
        if (insertError) throw insertError;
      }
      
      toast({
        title: "Deposit successful",
        description: `$${amount.toFixed(2)} has been added to your account.`,
        variant: "default"
      });
      
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      console.error("Error processing deposit:", error);
      toast({
        title: "Deposit failed",
        description: "There was an error processing your deposit. Please try again.",
        variant: "default"
      });
    }
  };
  
  return { handleDeposit };
}
