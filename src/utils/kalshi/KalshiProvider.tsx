
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { KalshiApiClient } from './KalshiApiClient';

interface KalshiContextType {
  client: KalshiApiClient;
  apiKey: string;
  setApiKey: (key: string) => void;
  isConnected: boolean;
  isDemo: boolean;
  clearApiKey: () => void;
}

const KalshiContext = createContext<KalshiContextType | undefined>(undefined);

// Local storage key for persisting the API key
const KALSHI_API_KEY_STORAGE_KEY = 'kalshi_api_key';

export const KalshiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state with saved API key if available
  const [apiKey, setApiKey] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(KALSHI_API_KEY_STORAGE_KEY) || '';
    }
    return '';
  });

  // Create client instance whenever apiKey changes
  const [client, setClient] = useState<KalshiApiClient>(() => new KalshiApiClient({
    apiKey: apiKey || undefined,
    mockMode: !apiKey
  }));

  // Update client when API key changes
  useEffect(() => {
    const newClient = new KalshiApiClient({
      apiKey: apiKey || undefined,
      mockMode: !apiKey
    });
    setClient(newClient);

    // Persist API key to localStorage
    if (typeof window !== 'undefined') {
      if (apiKey) {
        localStorage.setItem(KALSHI_API_KEY_STORAGE_KEY, apiKey);
      } else {
        localStorage.removeItem(KALSHI_API_KEY_STORAGE_KEY);
      }
    }
  }, [apiKey]);

  // Function to clear API key
  const clearApiKey = () => setApiKey('');

  // Context value
  const value = {
    client,
    apiKey,
    setApiKey,
    isConnected: client.isConnected(),
    isDemo: client.isDemoMode(),
    clearApiKey
  };

  return (
    <KalshiContext.Provider value={value}>
      {children}
    </KalshiContext.Provider>
  );
};

// Custom hook for using the Kalshi context
export const useKalshi = (): KalshiContextType => {
  const context = useContext(KalshiContext);
  if (context === undefined) {
    throw new Error('useKalshi must be used within a KalshiProvider');
  }
  return context;
};
