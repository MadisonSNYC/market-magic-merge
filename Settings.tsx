import React from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

const Settings = () => {
  return (
    <PageLayout title="Settings">
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value="madison@thenycagentteam.com" readOnly />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input id="name" defaultValue="Madison" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email notifications about your account activity
                </p>
              </div>
              <Switch id="notifications" defaultChecked />
            </div>
            
            <Button className="mt-4">Save Changes</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>API Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="api-key">Kalshi API Key</Label>
              <Input id="api-key" type="password" value="••••••••••••••••" readOnly />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="mock-mode">Mock Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Use mock data instead of real API calls
                </p>
              </div>
              <Switch id="mock-mode" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="rate-limit">Rate Limit Warnings</Label>
                <p className="text-sm text-muted-foreground">
                  Show warnings when approaching API rate limits
                </p>
              </div>
              <Switch id="rate-limit" defaultChecked />
            </div>
            
            <Button variant="outline" className="mt-4">Update API Settings</Button>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Settings;
