
import React from 'react';

export const TechnicalIndicators = () => {
  return (
    <div className="bg-card rounded-lg p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">Technical Indicators</h2>
      <div className="space-y-4">
        <div className="flex justify-between p-3 border rounded-md">
          <div>
            <h3 className="font-medium">S&P 500</h3>
            <p className="text-sm text-muted-foreground">Moving Averages</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-green-500">BUY</p>
            <p className="text-sm">12 of 15 indicators</p>
          </div>
        </div>
        <div className="flex justify-between p-3 border rounded-md">
          <div>
            <h3 className="font-medium">Nasdaq</h3>
            <p className="text-sm text-muted-foreground">Moving Averages</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-green-500">BUY</p>
            <p className="text-sm">10 of 15 indicators</p>
          </div>
        </div>
        <div className="flex justify-between p-3 border rounded-md">
          <div>
            <h3 className="font-medium">Dow Jones</h3>
            <p className="text-sm text-muted-foreground">Moving Averages</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-yellow-500">NEUTRAL</p>
            <p className="text-sm">8 of 15 indicators</p>
          </div>
        </div>
        <div className="flex justify-between p-3 border rounded-md">
          <div>
            <h3 className="font-medium">Russell 2000</h3>
            <p className="text-sm text-muted-foreground">Moving Averages</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-red-500">SELL</p>
            <p className="text-sm">4 of 15 indicators</p>
          </div>
        </div>
      </div>
    </div>
  );
};
