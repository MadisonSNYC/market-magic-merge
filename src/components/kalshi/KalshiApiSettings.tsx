
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useKalshi } from '@/utils/kalshi/KalshiProvider';
import { toast } from '@/components/ui/use-toast';

export function KalshiApiSettings() {
  const { isConnected, isDemo, connect, disconnect } = useKalshi();
  
  const [authMethod, setAuthMethod] = useState<'bearer' | 'rsa'>('bearer');
  const [apiKey, setApiKey] = useState('');
  const [keyId, setKeyId] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [demoMode, setDemoMode] = useState(true);
  
  const handleConnect = () => {
    if (authMethod === 'bearer' && !apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Kalshi API key",
        variant: "destructive"
      });
      return;
    }
    
    if (authMethod === 'rsa' && (!keyId || !privateKey)) {
      toast({
        title: "RSA Credentials Required",
        description: "Please enter both Key ID and Private Key",
        variant: "destructive"
      });
      return;
    }
    
    try {
      connect({
        apiKey: authMethod === 'bearer' ? apiKey : undefined,
        keyId: authMethod === 'rsa' ? keyId : undefined,
        privateKey: authMethod === 'rsa' ? privateKey : undefined,
        demoMode
      });
    } catch (error) {
      console.error("Failed to connect to Kalshi API:", error);
      toast({
        title: "Connection Failed",
        description: "Could not connect to Kalshi API. Check your credentials.",
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
            <div className="flex items-center justify-between">
              <Label htmlFor="demo-mode">Demo Mode</Label>
              <Switch 
                id="demo-mode"
                checked={demoMode} 
                onCheckedChange={setDemoMode}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {demoMode 
                ? "Using demo environment for testing with virtual funds" 
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
        {isConnected ? (
          <Button onClick={disconnect} variant="destructive" className="w-full">
            Disconnect
          </Button>
        ) : (
          <Button onClick={handleConnect} className="w-full">
            Connect to {demoMode ? 'Demo' : 'Production'} API
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
