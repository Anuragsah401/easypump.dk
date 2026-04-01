import { NavLink, Outlet, useParams } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineRectangleStack,
  HiOutlineHeart,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCog6Tooth,
} from "react-icons/hi2";
import currentUser from "../../data/user";

export default function DashboardLayout() {
  const { userId } = useParams();
  const basePath = `/user/${userId}/dashboard`;

  const navItems = [
    { to: basePath, icon: HiOutlineUser, label: "Profile", end: true },
    { to: `${basePath}/listings`, icon: HiOutlineRectangleStack, label: "My Listings" },
    { to: `${basePath}/favorites`, icon: HiOutlineHeart, label: "Favorites" },
    { to: `${basePath}/messages`, icon: HiOutlineChatBubbleLeftRight, label: "Messages" },
    { to: `${basePath}/settings`, icon: HiOutlineCog6Tooth, label: "Settings" },
  ];

  const unreadCount = currentUser.messages.filter((m) => m.unread).length;

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Dashboard</h1>
          <p className="mt-1 text-gray-500">Manage your account, listings, and messages</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            {/* User card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{currentUser.name}</p>
                  <p className="text-xs text-gray-400 truncate">{currentUser.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{currentUser.stats.listings}</p>
                  <p className="text-[11px] text-gray-400">Active</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{currentUser.stats.sold}</p>
                  <p className="text-[11px] text-gray-400">Sold</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{currentUser.stats.rating}</p>
                  <p className="text-[11px] text-gray-400">Rating</p>
                </div>
              </div>
            </div>

            {/* Nav links */}
            <nav className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-blue-600 bg-blue-50/60"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  <span>{item.label}</span>
                  {item.label === "Messages" && unreadCount > 0 && (
                    <span className="ml-auto bg-blue-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
