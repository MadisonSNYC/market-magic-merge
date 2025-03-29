
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { KalshiApiClient, KalshiApiClientOptions } from './KalshiApiClient';

interface KalshiContextValue {
  client: KalshiApiClient | null;
  isConnected: boolean;
  isMockMode: boolean;
  updateApiKey: (newApiKey: string) => void;
}

const KalshiContext = createContext<KalshiContextValue>({
  client: null,
  isConnected: false,
  isMockMode: true,
  updateApiKey: () => {}
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

  // Initialize the client when apiKey or mockMode changes
  useEffect(() => {
    const options: KalshiApiClientOptions = {
      apiKey,
      mockMode
    };
    setClient(new KalshiApiClient(options));
  }, [apiKey, mockMode]);

  // Function to update the API key
  const updateApiKey = (newApiKey: string) => {
    const options: KalshiApiClientOptions = {
      apiKey: newApiKey,
      mockMode: !newApiKey
    };
    setClient(new KalshiApiClient(options));
  };

  // Compute context values
  const isConnected = client ? client.isConnected() : false;
  const isMockMode = client ? client.isMockMode() : true;

  return (
    <KalshiContext.Provider
      value={{
        client,
        isConnected,
        isMockMode,
        updateApiKey
      }}
    >
      {children}
    </KalshiContext.Provider>
  );
};
