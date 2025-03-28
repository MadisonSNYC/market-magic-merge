
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  LineChart,
  Wallet,
  Settings,
  ChevronLeft,
  ChevronRight,
  Heart,
  LightbulbIcon,
  Bell,
  AlertTriangle
} from 'lucide-react';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean;
  onToggle: () => void;
}

interface PositionAlert {
  id: string;
  title: string;
  description: string;
  color: string;
  marketId: string;
}

export function Sidebar({ className, isCollapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const routes = [
    {
      title: 'Dashboard',
      href: '/',
      icon: LayoutDashboard,
      color: 'text-primary',
    },
    {
      title: 'Portfolio',
      href: '/portfolio',
      icon: Wallet,
      color: 'text-amber-500',
    },
    {
      title: 'Strategies',
      href: '/strategies',
      icon: LightbulbIcon,
      color: 'text-green-500',
    },
    {
      title: 'Performance',
      href: '/performance',
      icon: LineChart,
      color: 'text-blue-500',
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: Settings,
      color: 'text-slate-500',
    },
  ];

  const positionAlerts: PositionAlert[] = [
    {
      id: 'alert-1',
      title: 'BTC Position Alert',
      description: 'Up 33.17% ($5.49)',
      color: 'text-amber-500',
      marketId: 'BTC-PRICE-RANGE'
    },
    {
      id: 'alert-2',
      title: 'ETH Stop Loss',
      description: 'Triggered at $1,950',
      color: 'text-red-500',
      marketId: 'ETH-PRICE-5PM'
    },
    {
      id: 'alert-3',
      title: 'DOGE Position',
      description: 'Nearing target (+18%)',
      color: 'text-green-500',
      marketId: 'DOGE-PRICE-2PM'
    }
  ];

  const handleAlertClick = (marketId: string) => {
    navigate(`/market/${marketId}`);
  };

  return (
    <div
      className={cn(
        "relative flex flex-col h-screen border-r border-border bg-card duration-300",
        isCollapsed ? "w-[70px]" : "w-[200px] lg:w-[260px]",
        className
      )}
    >
      <div className="flex items-center justify-center h-16 px-4 border-b border-border">
        <Link to="/" className={`flex items-center ${isCollapsed ? "justify-center" : "justify-start space-x-2"}`}>
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-xl">
            M
          </span>
          {!isCollapsed && (
            <div className="flex items-center">
              <span className="text-lg font-semibold">Madison's</span>
              <Heart className="h-4 w-4 mx-1 text-pink-500" />
            </div>
          )}
        </Link>
      </div>

      <ScrollArea className="flex-1 py-4">
        <nav className="flex flex-col gap-1 px-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              to={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-foreground/70 transition-all hover:text-foreground",
                pathname === route.href ? "bg-muted text-foreground" : "",
                isCollapsed ? "justify-center" : ""
              )}
            >
              <route.icon className={cn("h-5 w-5", route.color)} />
              {!isCollapsed && <span className="text-sm font-medium">{route.title}</span>}
            </Link>
          ))}
        </nav>

        {!isCollapsed && (
          <>
            <Separator className="my-4" />
            <div className="px-3">
              <h4 className="mb-2 text-xs font-semibold text-muted-foreground flex items-center">
                <Bell className="h-3.5 w-3.5 mr-1.5 text-yellow-500" />
                Position Alerts
              </h4>
              <div className="space-y-2">
                {positionAlerts.map((alert) => (
                  <div 
                    key={alert.id}
                    className="text-xs p-2 rounded-md border border-border bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                    onClick={() => handleAlertClick(alert.marketId)}
                  >
                    <div className={`font-medium ${alert.color}`}>{alert.title}</div>
                    <div className="text-muted-foreground">{alert.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </ScrollArea>

      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-20 h-8 w-8 rounded-full border bg-background shadow-sm"
        onClick={onToggle}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
        <span className="sr-only">Toggle Sidebar</span>
      </Button>
    </div>
  );
}
