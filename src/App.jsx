import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import BuyPage from "./pages/BuyPage";
import BikeDetailPage from "./pages/BikeDetailPage";

function App() {
  const [location, setLocation] = useState("All Locations");

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar location={location} onLocationChange={setLocation} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/buy" element={<BuyPage location={location} />} />
            <Route path="/buy/:id" element={<BikeDetailPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
