import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Home, Login, Signup } from "@/pages";
import { Toaster } from "@/components/ui/toaster";
import ProtectedRoute from "@/components/ProtectedRoute";
import NavBar from "@/components/NavBar";

const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <NavBar />

          <Toaster />

          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<Signup />} />

            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default AppRoutes;
