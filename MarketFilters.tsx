
import React from 'react';
import { Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MarketFiltersProps {
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
}

export const marketStatuses = [
  { value: 'open', label: 'Open Markets' },
  { value: 'closed', label: 'Closed Markets' },
  { value: 'settled', label: 'Settled Markets' },
  { value: 'all', label: 'All Markets' }
];

export function MarketFilters({ statusFilter, onStatusFilterChange }: MarketFiltersProps) {
  return (
    <div className="mb-6 flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Status:</span>
      </div>
      <Select
        value={statusFilter}
        onValueChange={onStatusFilterChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          {marketStatuses.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
