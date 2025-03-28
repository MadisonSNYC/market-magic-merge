
import React, { createContext, useContext, useState } from 'react';
import { KalshiApiClient, KalshiApiConfig } from './KalshiApiClient';
import { toast } from '@/components/ui/use-toast';

export interface KalshiContextType {
  client: KalshiApiClient;
  isConnected: boolean;
  isDemo: boolean;
  connect: (config: KalshiApiConfig) => void;
  disconnect: () => void;
}

const KalshiContext = createContext<KalshiContextType>({
  client: new KalshiApiClient({ demoMode: true }),
  isConnected: false,
  isDemo: true,
  connect: () => {},
  disconnect: () => {}
});

export const useKalshi = () => useContext(KalshiContext);

export const KalshiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [client, setClient] = useState<KalshiApiClient>(() => new KalshiApiClient({ demoMode: true }));
  const [isConnected, setIsConnected] = useState(false);
  const [isDemo, setIsDemo] = useState(true);

  const connect = (config: KalshiApiConfig) => {
    try {
      const newClient = new KalshiApiClient(config);
      setClient(newClient);
      setIsConnected(Boolean(config.apiKey || (config.keyId && config.privateKey)));
      setIsDemo(config.demoMode || false);
      
      toast({
        title: "Connected to Kalshi API",
        description: `Using ${config.demoMode ? 'demo' : 'production'} environment`,
      });
      
      // Test the connection by fetching exchange status
      newClient.getExchangeStatus()
        .then(() => {
          toast({
            title: "API Connection Verified",
            description: "Successfully connected to Kalshi API",
          });
        })
        .catch(error => {
          console.error("API connection test failed:", error);
          toast({
            title: "API Connection Warning",
            description: "Connected, but status check failed. Authentication may be invalid.",
            variant: "destructive"
          });
        });
    } catch (error) {
      console.error("Failed to initialize Kalshi client:", error);
      toast({
        title: "Connection Failed",
        description: "Could not connect to Kalshi API. Check your credentials.",
        variant: "destructive"
      });
    }
  };

  const disconnect = () => {
    setClient(new KalshiApiClient({ demoMode: true }));
    setIsConnected(false);
    setIsDemo(true);
    
    toast({
      title: "Disconnected from Kalshi API",
      description: "Switched to demo mode",
    });
  };

  return (
    <KalshiContext.Provider value={{ client, isConnected, isDemo, connect, disconnect }}>
      {children}
    </KalshiContext.Provider>
  );
};
