
import React from 'react';

export const RiskAssessment = () => {
  // Mock data for risk assessment
  const riskData = [
    { name: 'Volatility', value: 65 },
    { name: 'Correlation', value: 42 },
    { name: 'Downside Risk', value: 38 },
    { name: 'Sharpe Ratio', value: 78 },
    { name: 'Liquidity', value: 85 },
  ];

  return (
    <div className="bg-card rounded-lg p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">Risk Assessment</h2>
      <div className="space-y-4">
        {riskData.map((item) => (
          <div key={item.name}>
            <div className="flex justify-between text-sm mb-1">
              <span>{item.name}</span>
              <span className="font-medium">{item.value}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  item.value >= 70 ? 'bg-green-500' : item.value >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
