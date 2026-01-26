import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Buses from "./pages/Buses";
import Drivers from "./pages/Drivers";
import RoutesPage from "./pages/Routes";
import LiveMonitoring from "./pages/LiveMonitoring";
import ChangeRequests from "./pages/ChangeRequests";
import NotFound from "./pages/NotFound";
import { seedFirestore } from "./lib/seedFirestore";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Seed Firestore with mock data on app initialization
    const initializeData = async () => {
      try {
        console.log("Seeding Firestore with mock data...");
        await seedFirestore();
      } catch (error) {
        console.error("Failed to seed Firestore:", error);
      }
    };
    
    initializeData();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/buses" element={<Buses />} />
              <Route path="/drivers" element={<Drivers />} />
              <Route path="/routes" element={<RoutesPage />} />
              <Route path="/live" element={<LiveMonitoring />} />
              <Route path="/requests" element={<ChangeRequests />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;

