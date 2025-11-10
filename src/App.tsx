import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { GoogleAnalytics, initGA } from "@/components/GoogleAnalytics";
import { ResourceHints } from "@/components/ResourceHints";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Media from "./pages/Media";
import Partner from "./pages/Partner";
import ContactPage from "./pages/ContactPage";
import LimitedPartnershipPage from "./pages/LimitedPartnershipPage";
import MemberLogin from "./pages/MemberLogin";
import MemberDashboard from "./pages/MemberDashboard";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BlogAdmin from "./pages/BlogAdmin";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

// Initialize Google Analytics
initGA();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ResourceHints />
          <GoogleAnalytics />
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/media" element={<Media />} />
              <Route path="/partner" element={<Partner />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/limited-partnership" element={<LimitedPartnershipPage />} />
              <Route path="/member-login" element={<MemberLogin />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route 
                path="/admin/blog" 
                element={
                  <ProtectedRoute>
                    <BlogAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/member-dashboard" 
                element={
                  <ProtectedRoute>
                    <MemberDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Redirects for old/broken URLs */}
              <Route path="/what-is-anhart" element={<Navigate to="/about" replace />} />
              <Route path="/about-us" element={<Navigate to="/about" replace />} />
              <Route path="/this-is-us" element={<Navigate to="/about" replace />} />
              <Route path="/stories" element={<Navigate to="/media" replace />} />
              <Route path="/sample-page" element={<Navigate to="/" replace />} />
              <Route path="/wp-admin" element={<Navigate to="/" replace />} />
              <Route path="/wp-content/*" element={<Navigate to="/" replace />} />
              <Route path="/partners" element={<Navigate to="/partner" replace />} />
              <Route path="/contact-us" element={<Navigate to="/contact" replace />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
