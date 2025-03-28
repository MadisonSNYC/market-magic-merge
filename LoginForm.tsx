
"use client";

import React from 'react';
import { Mail, Key, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Define the form validation schema
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  authMode: 'login' | 'register';
  onSubmit: (data: LoginFormValues) => Promise<void>;
  isSubmitting: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ 
  authMode, 
  onSubmit, 
  isSubmitting 
}) => {
  // Create form with validation
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="email@example.com" 
                    className="pl-10" 
                    {...field}
                    disabled={isSubmitting}
                    autoComplete={authMode === 'register' ? 'email' : 'username'}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10" 
                    {...field}
                    disabled={isSubmitting}
                    autoComplete={authMode === 'register' ? 'new-password' : 'current-password'}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {authMode === 'login' ? 'Signing in...' : 'Creating account...'}
            </>
          ) : (
            authMode === 'login' ? 'Sign In' : 'Create Account'
          )}
        </Button>
      </form>
    </Form>
  );
};
