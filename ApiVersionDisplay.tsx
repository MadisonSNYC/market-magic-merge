
import React, { useState, useEffect } from 'react';
import { kalshiApi } from '@/utils/kalshi';
import { Badge } from '@/components/ui/badge';
import { Info } from 'lucide-react';

export const ApiVersionDisplay: React.FC = () => {
  const [version, setVersion] = useState<string>('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchApiVersion = async () => {
      try {
        const apiVersion = await kalshiApi.getApiVersion();
        setVersion(apiVersion);
      } catch (error) {
        console.error("Error fetching API version:", error);
        setVersion('Error');
      } finally {
        setLoading(false);
      }
    };
    
    fetchApiVersion();
  }, []);
  
  if (loading) {
    return (
      <Badge variant="outline" className="bg-muted/50 animate-pulse">
        <Info className="h-3 w-3 mr-1" />
        API v...
      </Badge>
    );
  }
  
  return (
    <Badge variant="outline" className="bg-primary/10 text-primary">
      <Info className="h-3 w-3 mr-1" />
      API v{version}
    </Badge>
  );
}
