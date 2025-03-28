
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import Markets from "./pages/Markets";
import Stocks from "./pages/Stocks";
import Analysis from "./pages/Analysis";
import Strategies from "./pages/Strategies";
import Performance from "./pages/Performance";
import NotFound from "./pages/NotFound";
import { KalshiProvider } from "./utils/kalshi/KalshiProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <KalshiProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/markets" element={<Markets />} />
            <Route path="/stocks" element={<Stocks />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/strategies" element={<Strategies />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </KalshiProvider>
  </QueryClientProvider>
);

export default App;
