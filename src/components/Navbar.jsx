import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import LocationSelector from "./LocationSelector";

export default function Navbar({ location, onLocationChange }) {
  const { pathname } = useLocation();
  const showLocation = pathname !== "/";
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
                <a
                  href="#login"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Sign in
                </a>
                <a
                  href="#login"
                  className="text-sm font-semibold text-gray-900 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
                >
                  Login
                </a>
              </div>
            ) : (
              <>
                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-4">
                  <a
                    href="#login"
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Sign in
                  </a>
                  <a
                    href="#login"
                    className="text-sm font-semibold text-gray-900 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    Login
                  </a>
                </div>

                {/* Hamburger button — mobile only */}
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  aria-label="Menu"
                >
                  {menuOpen ? (
                    <svg
                      className="w-5 h-5 text-gray-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-gray-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
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
              <a
                href="#login"
                onClick={() => setMenuOpen(false)}
                className="block text-sm font-semibold text-center text-gray-900 border border-gray-300 rounded-lg px-4 py-2.5 hover:bg-gray-50 transition-colors"
              >
                Sign in
              </a>
              <a
                href="#login"
                onClick={() => setMenuOpen(false)}
                className="block text-sm font-semibold text-center text-gray-900 border border-gray-300 rounded-lg px-4 py-2.5 hover:bg-gray-50 transition-colors"
              >
                Login
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
