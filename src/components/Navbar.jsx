import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineBars3, HiOutlineXMark, HiOutlineUserCircle } from "react-icons/hi2";
import LocationSelector from "./LocationSelector";

export default function Navbar({ location, onLocationChange }) {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith("/dashboard");
  const showLocation =
    pathname !== "/" && pathname !== "/signin" && pathname !== "/signup" && !isDashboard;
  const isLanding = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Location */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 group">
                <span className="text-xl font-bold text-gray-900 tracking-tight">EasyPump</span>
              </Link>
              {showLocation && (
                <>
                  <span className="w-px h-5 bg-gray-200" />
                  <LocationSelector selected={location} onChange={onLocationChange} />
                </>
              )}
            </div>

            {/* Right side — desktop */}
            {isLanding ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/signup"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Sign up
                </Link>
                <Link
                  to="/signin"
                  className="text-sm font-semibold text-gray-900 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  Login
                </Link>
              </div>
            ) : (
              <>
                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-4">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <HiOutlineUserCircle className="w-5 h-5" />
                    Dashboard
                  </Link>
                  <Link
                    to="/signup"
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Sign up
                  </Link>
                  <Link
                    to="/signin"
                    className="text-sm font-semibold text-gray-900 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    Login
                  </Link>
                </div>

                {/* Hamburger button — mobile only */}
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  aria-label="Menu"
                >
                  {menuOpen ? (
                    <HiOutlineXMark className="w-5 h-5 text-gray-700" />
                  ) : (
                    <HiOutlineBars3 className="w-5 h-5 text-gray-700" />
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Backdrop + Mobile dropdown menu — non-landing pages only */}
      </nav>

      {!isLanding && menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed top-16 left-0 right-0 z-50 md:hidden border-t border-gray-100 bg-white shadow-xl">
            <div className="px-6 py-4 space-y-3">
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="block text-sm font-semibold text-center text-blue-600 bg-blue-50 border border-blue-100 rounded-lg px-4 py-2.5 hover:bg-blue-100 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="block text-sm font-semibold text-center text-gray-900 border border-gray-300 rounded-lg px-4 py-2.5 hover:bg-gray-50 transition-colors"
              >
                Sign up
              </Link>
              <Link
                to="/signin"
                onClick={() => setMenuOpen(false)}
                className="block text-sm font-semibold text-center text-gray-900 border border-gray-300 rounded-lg px-4 py-2.5 hover:bg-gray-50 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
