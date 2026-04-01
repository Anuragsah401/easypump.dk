import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineBell,
  HiOutlineMagnifyingGlass,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import currentUser from "../../data/user";

const unreadCount = currentUser.messages.filter((m) => m.unread).length;

export default function DashboardNavbar() {
  const { pathname } = useLocation();
  const { userId } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);

  const basePath = `/user/${userId}/dashboard`;

  // Derive the current section name for the mobile header
  const sectionMap = {
    [basePath]: "Profile",
    [`${basePath}/listings`]: "My Listings",
    [`${basePath}/favorites`]: "Favorites",
    [`${basePath}/messages`]: "Messages",
    [`${basePath}/settings`]: "Settings",
  };
  const currentSection =
    sectionMap[pathname] || (pathname === `/user/${userId}` ? "Home" : "Dashboard");

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 group">
                <span className="text-xl font-bold text-gray-900 tracking-tight">EasyPump</span>
              </Link>
              <span className="hidden sm:inline-block w-px h-5 bg-gray-200" />
              <span className="hidden sm:inline-block text-sm text-gray-400 font-medium">
                {currentSection}
              </span>
            </div>

            {/* Right side — desktop */}
            <div className="hidden md:flex items-center gap-3">
              {/* Search */}
              <button className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
                <HiOutlineMagnifyingGlass className="w-[18px] h-[18px]" />
              </button>

              {/* Notifications */}
              <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
                <HiOutlineBell className="w-[18px] h-[18px]" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
                )}
              </button>

              {/* Divider */}
              <span className="w-px h-5 bg-gray-200 mx-1" />

              {/* User avatar + name */}
              <Link
                to={basePath}
                className="flex items-center gap-2.5 pl-1 pr-3 py-1.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-xs">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {currentUser.name.split(" ")[0]}
                </span>
              </Link>

              {/* Logout */}
              <Link
                to="/"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Sign out"
              >
                <HiOutlineArrowRightOnRectangle className="w-[18px] h-[18px]" />
              </Link>
            </div>

            {/* Hamburger button — mobile only */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Notifications */}
              <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
                <HiOutlineBell className="w-[18px] h-[18px]" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
                )}
              </button>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Menu"
              >
                {menuOpen ? (
                  <HiOutlineXMark className="w-5 h-5 text-gray-700" />
                ) : (
                  <HiOutlineBars3 className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed top-16 left-0 right-0 z-50 md:hidden border-t border-gray-100 bg-white shadow-xl">
            <div className="px-6 py-4 space-y-1">
              {/* User info */}
              <div className="flex items-center gap-3 pb-3 mb-3 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{currentUser.name}</p>
                  <p className="text-xs text-gray-400">{currentUser.email}</p>
                </div>
              </div>

              {/* Nav items */}
              {Object.entries(sectionMap).map(([path, label]) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={`block text-sm font-medium px-3 py-2.5 rounded-lg transition-colors ${
                    pathname === path
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {label}
                </Link>
              ))}

              {/* Divider + sign out */}
              <div className="pt-3 mt-3 border-t border-gray-100">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 px-3 py-2.5 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <HiOutlineArrowRightOnRectangle className="w-4 h-4" />
                  Sign out
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
