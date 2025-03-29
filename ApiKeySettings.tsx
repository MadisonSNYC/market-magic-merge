
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { kalshiApi } from '@/utils/kalshi';
import { useToast } from '@/hooks/use-toast';
import { AUTH_METHOD, AUTH_METHODS, API_KEY, RSA_KEY_ID, RSA_PRIVATE_KEY, DEMO_MODE } from '@/utils/kalshi/config';

export function ApiKeySettings() {
  const { toast } = useToast();
  const [authMethod, setAuthMethod] = useState<'bearer' | 'rsa'>(
    AUTH_METHOD === AUTH_METHODS.RSA ? 'rsa' : 'bearer'
  );
  const [apiKey, setApiKey] = useState(API_KEY || '');
  const [keyId, setKeyId] = useState(RSA_KEY_ID || '');
  const [privateKey, setPrivateKey] = useState(RSA_PRIVATE_KEY || '');
  const [demoMode, setDemoMode] = useState(DEMO_MODE);
  
  const handleSaveConfig = () => {
    try {
      // In a real app, we'd store these securely in environment variables
      // For this demo, we'll show a toast with instructions
      
      toast({
        title: "API Configuration Settings",
        description: "To apply these settings, add them to your .env.local file",
        variant: "default"
      });
      
      // Generate .env.local content
      const envContent = `
# Kalshi API Configuration
VITE_KALSHI_AUTH_METHOD=${authMethod}
${authMethod === 'bearer' 
  ? `VITE_KALSHI_API_KEY=${apiKey}`
  : `VITE_KALSHI_KEY_ID=${keyId}
VITE_KALSHI_PRIVATE_KEY=${btoa(privateKey)}`
}
VITE_KALSHI_DEMO_MODE=${demoMode ? 'true' : 'false'}
`;
      
      // Create a blob and download link
      const blob = new Blob([envContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = '.env.local';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Configuration File Downloaded",
        description: "Place this .env.local file in your project root directory and restart the application.",
      });
    } catch (error) {
      toast({
        title: "Error Saving Configuration",
        description: "Failed to save API configuration.",
        variant: "destructive"
      });
    }
  };
  
  const handlePrivateKeyFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setPrivateKey(event.target.result.toString());
      }
    };
    reader.readAsText(file);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Kalshi API Configuration</CardTitle>
        <CardDescription>
          Configure your API access to connect with Kalshi trading API
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="demo-mode">Environment</Label>
            <div className="flex items-center space-x-2">
              <Button 
                variant={demoMode ? "default" : "outline"} 
                onClick={() => setDemoMode(true)}
                className="flex-1"
              >
                Demo
              </Button>
              <Button 
                variant={!demoMode ? "default" : "outline"} 
                onClick={() => setDemoMode(false)}
                className="flex-1"
              >
                Production
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {demoMode 
                ? "Using demo environment for testing" 
                : "Using production environment for real trading"}
            </p>
          </div>
          
          <Tabs defaultValue={authMethod} onValueChange={(v) => setAuthMethod(v as 'bearer' | 'rsa')}>
            <TabsList className="w-full">
              <TabsTrigger value="bearer" className="flex-1">Bearer Token</TabsTrigger>
              <TabsTrigger value="rsa" className="flex-1">RSA Private Key</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bearer" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  placeholder="Your Kalshi API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  This is being replaced by RSA authentication. Consider using RSA instead.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="rsa" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="key-id">Key ID</Label>
                <Input
                  id="key-id"
                  placeholder="Your Kalshi Key ID"
                  value={keyId}
                  onChange={(e) => setKeyId(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="private-key">Private Key</Label>
                <Textarea
                  id="private-key"
                  placeholder="Your RSA Private Key (PEM format)"
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  className="font-mono text-xs h-40"
                />
                
                <div className="mt-2">
                  <Label htmlFor="key-file" className="block mb-2">Or upload a private key file</Label>
                  <Input 
                    id="key-file" 
                    type="file" 
                    accept=".pem,.key,.txt" 
                    onChange={handlePrivateKeyFileUpload}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveConfig} className="w-full">
          Save Configuration
        </Button>
      </CardFooter>
    </Card>
  );
}
