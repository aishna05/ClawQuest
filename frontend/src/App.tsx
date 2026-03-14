import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Crucible from "./pages/Crucible";
import BattleArena from "./pages/BattleArena";
import NeuralLink from "./pages/NeuralLink";
import ContainmentCell from "./pages/ContainmentCell";
import Registry from "./pages/Registry";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/crucible" element={<Crucible />} />
          <Route path="/battle" element={<BattleArena />} />
          <Route path="/neural-link" element={<NeuralLink />} />
          <Route path="/registry" element={<Registry />} />
          <Route path="/containment/:beastId" element={<ContainmentCell />} />
          <Route path="/containment" element={<ContainmentCell />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
