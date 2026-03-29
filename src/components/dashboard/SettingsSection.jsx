import { useState } from "react";
import {
  HiOutlineBell,
  HiOutlineLockClosed,
  HiOutlineTrash,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";

export default function SettingsSection() {
  const [notifications, setNotifications] = useState({
    messages: true,
    listings: true,
    marketing: false,
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">Settings</h2>
        <p className="text-sm text-gray-500 mt-0.5">Manage your account preferences</p>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
            <HiOutlineBell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">Notifications</h3>
            <p className="text-xs text-gray-400">Choose what you want to be notified about</p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            {
              key: "messages",
              label: "New messages",
              desc: "Get notified when someone sends you a message",
            },
            {
              key: "listings",
              label: "Listing updates",
              desc: "Price changes and status updates on saved bikes",
            },
            {
              key: "marketing",
              label: "Marketing emails",
              desc: "Tips, offers, and product updates from EasyPump",
            },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between gap-4 py-1">
              <div>
                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
              <button
                onClick={() =>
                  setNotifications({ ...notifications, [item.key]: !notifications[item.key] })
                }
                className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${
                  notifications[item.key] ? "bg-blue-500" : "bg-gray-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                    notifications[item.key] ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Change password */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center">
            <HiOutlineLockClosed className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">Password</h3>
            <p className="text-xs text-gray-400">
              Update your password to keep your account secure
            </p>
          </div>
        </div>

        <form className="space-y-4 max-w-md" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Current password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">New password</label>
            <input
              type="password"
              placeholder="Min. 8 characters"
              className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Confirm new password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all placeholder:text-gray-400"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all cursor-pointer"
          >
            Update password
          </button>
        </form>
      </div>

      {/* Danger zone */}
      <div className="bg-white rounded-2xl border border-red-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
            <HiOutlineTrash className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-gray-900">Delete Account</h3>
            <p className="text-xs text-gray-400">Permanently remove your account and all data</p>
          </div>
        </div>

        {showDeleteConfirm ? (
          <div className="bg-red-50 border border-red-100 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <HiOutlineExclamationTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800 mb-1">
                  Are you sure? This action cannot be undone.
                </p>
                <p className="text-xs text-red-600 mb-3">
                  All your listings, messages, and account data will be permanently deleted.
                </p>
                <div className="flex items-center gap-2">
                  <button className="bg-red-500 hover:bg-red-600 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer">
                    Yes, delete my account
                  </button>
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="text-xs font-medium text-gray-600 hover:text-gray-900 px-4 py-2 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors cursor-pointer"
          >
            Delete my account
          </button>
        )}
      </div>
    </div>
  );
}
