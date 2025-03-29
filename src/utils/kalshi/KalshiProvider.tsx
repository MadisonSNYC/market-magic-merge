
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { KalshiApiClient } from './KalshiApiClient';

// Define interface for KalshiApiClientOptions
interface KalshiApiClientOptions {
  apiKey?: string;
  mockMode?: boolean;
  baseUrl?: string;
}

interface KalshiContextValue {
  client: KalshiApiClient | null;
  isConnected: boolean;
  isMockMode: boolean;
  isDemo: boolean;
  apiKey?: string;
  updateApiKey: (newApiKey: string) => void;
  setApiKey: (newApiKey: string) => void;
  clearApiKey: () => void;
}

const KalshiContext = createContext<KalshiContextValue>({
  client: null,
  isConnected: false,
  isMockMode: true,
  isDemo: true,
  apiKey: '',
  updateApiKey: () => {},
  setApiKey: () => {},
  clearApiKey: () => {}
});

export const useKalshi = () => useContext(KalshiContext);

interface KalshiProviderProps {
  apiKey?: string;
  children: ReactNode;
  mockMode?: boolean;
}

export const KalshiProvider: React.FC<KalshiProviderProps> = ({
  apiKey = '',
  mockMode = !apiKey,
  children
}) => {
  const [client, setClient] = useState<KalshiApiClient | null>(null);
  const [currentApiKey, setCurrentApiKey] = useState<string>(apiKey);

  // Initialize the client when apiKey or mockMode changes
  useEffect(() => {
    const options: KalshiApiClientOptions = {
      apiKey: currentApiKey,
      mockMode
    };
    const newClient = new KalshiApiClient(options);
    setClient(newClient);
  }, [currentApiKey, mockMode]);

  // Function to update the API key
  const updateApiKey = (newApiKey: string) => {
    setCurrentApiKey(newApiKey);
  };

  // Alias for updateApiKey for backward compatibility
  const setApiKey = (newApiKey: string) => {
    updateApiKey(newApiKey);
  };

  // Function to clear the API key
  const clearApiKey = () => {
    setCurrentApiKey('');
  };

  // Compute context values - add isConnected and isMockMode methods to client
  const isConnected = client ? Boolean(currentApiKey) : false;
  const isMockMode = client ? mockMode : true;
  const isDemo = isMockMode; // For backward compatibility

  return (
    <KalshiContext.Provider
      value={{
        client,
        isConnected,
        isMockMode,
        isDemo,
        apiKey: currentApiKey,
        updateApiKey,
        setApiKey,
        clearApiKey
      }}
    >
      {children}
    </KalshiContext.Provider>
  );
};
