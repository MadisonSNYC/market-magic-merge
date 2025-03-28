
import React from 'react';
import { Search, Bell, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  return (
    <header className={cn("bg-background/95 backdrop-blur-sm sticky top-0 z-30 border-b border-purple-100", className)}>
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2 lg:gap-4">
          <h1 className="text-lg font-semibold tracking-tight lg:text-xl text-gradient-title flex items-center gap-1">
            Madison's Markets
            <Heart className="h-4 w-4 text-pink-500" />
          </h1>
        </div>
        
        <div className="relative flex items-center h-9 rounded-md px-3 text-foreground bg-muted/80 border border-purple-100/40 shadow-sm max-w-md w-full mx-auto">
          <Search className="h-4 w-4 mr-2 text-primary" />
          <Input 
            type="search" 
            placeholder="Search events..." 
            className="h-9 w-full bg-transparent border-none px-0 py-0 shadow-none focus-visible:ring-0 placeholder:text-muted-foreground"
          />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="ml-2 h-7 px-2 text-xs bg-primary/10 hover:bg-primary/20 text-primary">
                Categories
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuLabel>Event Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Politics</DropdownMenuItem>
              <DropdownMenuItem>Finance</DropdownMenuItem>
              <DropdownMenuItem>Sports</DropdownMenuItem>
              <DropdownMenuItem>Entertainment</DropdownMenuItem>
              <DropdownMenuItem>Weather</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative h-9 w-9"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary animate-pulse" />
          </Button>
          
          <Avatar className="h-9 w-9 transition-transform duration-200 hover:scale-105 bg-gradient-to-r from-purple-400 to-pink-400">
            <AvatarFallback className="text-white">
              <Heart className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          
          <Button variant="ghost" size="sm">
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}
