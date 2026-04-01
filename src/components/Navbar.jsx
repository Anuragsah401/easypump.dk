import { Link, useLocation } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi2";
import LocationSelector from "./LocationSelector";

// Nav link configurations
const navLinks = [
  {
    to: "/user/1/dashboard",
    label: "Dashboard",
    variant: "icon",
    icon: HiOutlineUserCircle,
    showOnSimpleNav: false,
  },

  {
    to: "/signup",
    label: "Sign up",
    variant: "text",
    showOnSimpleNav: true,
  },
  {
    to: "/signin",
    label: "Login",
    variant: "outlined",
    showOnSimpleNav: true,
  },
  {
    to: "/signup-shop",
    label: "Sign up as Bike Shop",
    variant: "green",
    showOnSimpleNav: true,
  },
];

// Desktop link styles - all with box/border styling
const desktopStyles = {
  icon: "flex items-center gap-1.5 text-sm font-semibold text-blue-600 border border-blue-200 rounded-lg px-4 py-2 hover:bg-blue-50 transition-colors",
  green:
    "text-sm font-semibold text-green-600 border border-green-200 rounded-lg px-4 py-2 hover:bg-green-50 transition-colors",
  text: "text-sm font-semibold text-gray-900 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors",
  outlined:
    "text-sm font-semibold text-gray-900 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors",
};

// Mobile link styles - inline horizontal
const mobileStyles = {
  icon: "text-xs font-semibold text-blue-600 border border-blue-100 rounded-lg px-3 py-2 hover:bg-blue-50 transition-colors whitespace-nowrap",
  green:
    "text-xs font-semibold text-green-600 border border-green-100 rounded-lg px-3 py-2 hover:bg-green-50 transition-colors whitespace-nowrap",
  text: "text-xs font-semibold text-gray-900 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors whitespace-nowrap",
  outlined:
    "text-xs font-semibold text-gray-900 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors whitespace-nowrap",
};

export default function Navbar({ location, onLocationChange }) {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith("/dashboard");
  const isAuthPage =
    pathname === "/signin" || pathname === "/signup" || pathname === "/signup-shop";
  const showLocation = pathname !== "/" && !isAuthPage && !isDashboard;
  const isLanding = pathname === "/";

  // Show simple nav (just logo + auth links) on landing and auth pages
  const showSimpleNav = isLanding || isAuthPage;

  // Filter links based on nav type
  const visibleLinks = navLinks.filter((link) => (showSimpleNav ? link.showOnSimpleNav : true));

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
                  <span className="w-px h-5 bg-gray-200 hidden md:block" />
                  <div className="hidden md:block">
                    <LocationSelector selected={location} onChange={onLocationChange} />
                  </div>
                </>
              )}
            </div>

            {/* Right side — desktop only */}
            <div className="hidden md:flex items-center gap-4">
              {visibleLinks.map(({ to, label, variant, icon: Icon }) => (
                <Link key={to} to={to} className={desktopStyles[variant]}>
                  {Icon && <Icon className="w-5 h-5" />}
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile nav links — always visible below navbar on mobile */}
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {visibleLinks.map(({ to, label, variant }) => (
              <Link key={to} to={to} className={mobileStyles[variant]}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
