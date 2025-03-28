
import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export function usePortfolioWithdrawHandler() {
  const { toast } = useToast();
  
  const handleWithdraw = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication required",
          description: "Please sign in to withdraw funds.",
          variant: "default"
        });
        return;
      }
      
      const { data: portfolioData, error } = await supabase
        .from('portfolio')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) {
        throw error;
      }
      
      const amount = 50;
      
      if (!portfolioData || portfolioData.available_balance < amount) {
        toast({
          title: "Insufficient funds",
          description: "You don't have enough funds to withdraw this amount.",
          variant: "default"
        });
        return;
      }
      
      const { error: updateError } = await supabase
        .from('portfolio')
        .update({
          available_balance: portfolioData.available_balance - amount,
          total_portfolio_value: portfolioData.total_portfolio_value - amount,
          last_updated: new Date().toISOString()
        })
        .eq('id', portfolioData.id);
        
      if (updateError) throw updateError;
      
      toast({
        title: "Withdrawal successful",
        description: `$${amount.toFixed(2)} has been withdrawn from your account.`,
        variant: "default"
      });
      
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      console.error("Error processing withdrawal:", error);
      toast({
        title: "Withdrawal failed",
        description: "There was an error processing your withdrawal. Please try again.",
        variant: "default"
      });
    }
  };
  
  return { handleWithdraw };
}
