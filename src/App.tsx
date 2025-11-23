import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import Home from "./pages/Home";
import About from "./pages/About";
import Expertise from "./pages/Expertise";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import ArticlesManagement from "./pages/admin/ArticlesManagement";
import PortfolioManagement from "./pages/admin/PortfolioManagement";
import TestimonialsManagement from "./pages/admin/TestimonialsManagement";
import ContactsManagement from "./pages/admin/ContactsManagement";
import UsersManagement from "./pages/admin/UsersManagement";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, isLoading } = useAuth();
  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  return isAdmin ? <>{children}</> : <Navigate to="/admin/login" />;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<><Navigation /><Home /><Footer /></>} />
            <Route path="/about" element={<><Navigation /><About /><Footer /></>} />
            <Route path="/expertise" element={<><Navigation /><Expertise /><Footer /></>} />
            <Route path="/portfolio" element={<><Navigation /><Portfolio /><Footer /></>} />
            <Route path="/blog" element={<><Navigation /><Blog /><Footer /></>} />
            <Route path="/blog/:slug" element={<><Navigation /><BlogDetail /><Footer /></>} />
            <Route path="/contact" element={<><Navigation /><Contact /><Footer /></>} />
            
            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/articles" element={<ProtectedRoute><ArticlesManagement /></ProtectedRoute>} />
            <Route path="/admin/portfolio" element={<ProtectedRoute><PortfolioManagement /></ProtectedRoute>} />
            <Route path="/admin/testimonials" element={<ProtectedRoute><TestimonialsManagement /></ProtectedRoute>} />
            <Route path="/admin/contacts" element={<ProtectedRoute><ContactsManagement /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute><UsersManagement /></ProtectedRoute>} />
            
            <Route path="*" element={<><Navigation /><NotFound /><Footer /></>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
