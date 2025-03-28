
"use client";

import React, { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { GoogleLoginButton } from '@/components/auth/GoogleLoginButton';
import { DevBypassButton } from '@/components/auth/DevBypassButton';
import { TroubleshootingDialog } from '@/components/auth/TroubleshootingDialog';
import { LoginForm } from '@/components/auth/LoginForm';
import { AuthErrorDisplay } from '@/components/auth/AuthErrorDisplay';
import { AuthModeToggle } from '@/components/auth/AuthModeToggle';
import { LoginLayout } from '@/components/auth/LoginLayout';
import { useAuthState } from '@/hooks/useAuthState';
import { QuickLogin } from '@/components/auth/QuickLogin';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Login() {
  const {
    errorMessage,
    showTroubleshootDialog,
    setShowTroubleshootDialog,
    isSubmitting,
    authMode,
    from,
    handleGoogleLoginStart,
    handleGoogleLoginError,
    handleTryAgain,
    onSubmit,
    toggleAuthMode
  } = useAuthState();
  
  // State to track the active tab
  const [activeTab, setActiveTab] = useState<'quick' | 'normal'>('quick');
  
  // Check for development environment
  const isDevelopment = import.meta.env.DEV || 
    window.location.hostname.includes('localhost') || 
    window.location.hostname.includes('lovableproject.com');
  
  return (
    <LoginLayout authMode={authMode}>
      <AuthErrorDisplay 
        errorMessage={errorMessage} 
        onShowTroubleshoot={() => setShowTroubleshootDialog(true)} 
      />
      
      {isDevelopment ? (
        <Tabs 
          defaultValue="quick" 
          value={activeTab} 
          onValueChange={(value) => setActiveTab(value as 'quick' | 'normal')} 
          className="w-full mb-6"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quick">Quick Login</TabsTrigger>
            <TabsTrigger value="normal">Standard Login</TabsTrigger>
          </TabsList>
          
          <TabsContent value="quick">
            <QuickLogin />
          </TabsContent>
          
          <TabsContent value="normal">
            <LoginForm 
              authMode={authMode} 
              onSubmit={onSubmit} 
              isSubmitting={isSubmitting} 
            />
            
            <AuthModeToggle 
              authMode={authMode} 
              onToggle={toggleAuthMode} 
            />
            
            <div className="relative my-4 flex items-center">
              <Separator className="flex-grow" />
              <span className="mx-2 text-xs text-muted-foreground">OR</span>
              <Separator className="flex-grow" />
            </div>
            
            <GoogleLoginButton 
              onLoginStart={handleGoogleLoginStart}
              onLoginError={handleGoogleLoginError}
            />
            
            <DevBypassButton redirectPath={from} />
          </TabsContent>
        </Tabs>
      ) : (
        <>
          <LoginForm 
            authMode={authMode} 
            onSubmit={onSubmit} 
            isSubmitting={isSubmitting} 
          />
          
          <AuthModeToggle 
            authMode={authMode} 
            onToggle={toggleAuthMode} 
          />
          
          <div className="relative my-4 flex items-center">
            <Separator className="flex-grow" />
            <span className="mx-2 text-xs text-muted-foreground">OR</span>
            <Separator className="flex-grow" />
          </div>
          
          <GoogleLoginButton 
            onLoginStart={handleGoogleLoginStart}
            onLoginError={handleGoogleLoginError}
          />
        </>
      )}
      
      <div className="relative my-4">
        <Separator />
      </div>
      
      <div className="text-sm text-center text-muted-foreground">
        <p>By signing in, you agree to our Terms of Service and Privacy Policy</p>
      </div>
      
      <TroubleshootingDialog 
        open={showTroubleshootDialog}
        onOpenChange={setShowTroubleshootDialog}
        onTryAgain={handleTryAgain}
      />
    </LoginLayout>
  );
}
