
import React from 'react';
import { Treemap, ResponsiveContainer } from 'recharts';
import { mockStocks } from '@/utils/stocksApi';

// Custom content for the treemap
const CustomizedContent = (props: any) => {
  const { root, depth, x, y, width, height, index, name, changePercent, value } = props;
  
  // Check if changePercent is defined before calling toFixed()
  const safeChangePercent = typeof changePercent !== 'undefined' ? changePercent : 0;
  
  // Color based on change percent (green for positive, red for negative)
  const color = safeChangePercent >= 0 ? "#4ade80" : "#f87171";
  const cellValue = safeChangePercent >= 0 ? 
    `+${safeChangePercent.toFixed(2)}%` : 
    `${safeChangePercent.toFixed(2)}%`;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: color,
          stroke: '#fff',
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {width > 50 && height > 30 ? (
        <>
          <text
            x={x + width / 2}
            y={y + height / 2 - 6}
            textAnchor="middle"
            fill="#fff"
            fontSize={14}
            fontWeight="bold"
          >
            {name}
          </text>
          <text
            x={x + width / 2}
            y={y + height / 2 + 12}
            textAnchor="middle"
            fill="#fff"
            fontSize={12}
          >
            {cellValue}
          </text>
        </>
      ) : null}
    </g>
  );
};

export const StockPerformanceHeatmap = () => {
  // Format stock data for the heatmap (treemap)
  const stockGrowthData = mockStocks
    .map(stock => ({
      name: stock.symbol,
      value: Math.abs(stock.changePercent),
      changePercent: stock.changePercent
    }))
    .sort((a, b) => b.changePercent - a.changePercent);

  return (
    <div className="bg-card rounded-lg p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">Stock Performance Heatmap</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={stockGrowthData}
            dataKey="value"
            aspectRatio={4/3}
            stroke="#fff"
            fill="#8884d8"
            content={<CustomizedContent />}
          />
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        <p>Showing performance by percentage change. Green indicates positive growth, red indicates decline.</p>
      </div>
    </div>
  );
};
