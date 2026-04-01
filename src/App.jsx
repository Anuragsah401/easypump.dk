import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DashboardNavbar from "./components/dashboard/DashboardNavbar";
import HomePage from "./pages/HomePage";
import BuyPage from "./pages/BuyPage";
import BikeDetailPage from "./pages/BikeDetailPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import SignUpShopPage from "./pages/SignUpShopPage";
import UserHomePage from "./pages/UserHomePage";
import CreateListingPage from "./pages/CreateListingPage";
import AirPumpPage from "./pages/AirPumpPage";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import ProfileSection from "./components/dashboard/ProfileSection";
import MyListingsSection from "./components/dashboard/MyListingsSection";
import FavoritesSection from "./components/dashboard/FavoritesSection";
import MessagesSection from "./components/dashboard/MessagesSection";
import SettingsSection from "./components/dashboard/SettingsSection";

function AppContent() {
  const [location, setLocation] = useState("All Locations");
  const { pathname } = useLocation();
  const isUserRoute = pathname.startsWith("/user/");
  const useAppNavbar = isUserRoute;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {useAppNavbar ? (
        <DashboardNavbar />
      ) : (
        <Navbar location={location} onLocationChange={setLocation} />
      )}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/buy" element={<BuyPage location={location} />} />
          <Route path="/buy/:id" element={<BikeDetailPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signup-shop" element={<SignUpShopPage />} />
          <Route path="/sell" element={<CreateListingPage />} />
          <Route path="/air" element={<AirPumpPage />} />
          <Route path="/user/:userId" element={<UserHomePage />} />
          <Route path="/user/:userId/dashboard" element={<DashboardLayout />}>
            <Route index element={<ProfileSection />} />
            <Route path="listings" element={<MyListingsSection />} />
            <Route path="favorites" element={<FavoritesSection />} />
            <Route path="messages" element={<MessagesSection />} />
            <Route path="settings" element={<SettingsSection />} />
          </Route>
        </Routes>
      </main>
      {!useAppNavbar && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
