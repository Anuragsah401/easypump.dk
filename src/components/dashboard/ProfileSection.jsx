import { useState } from "react";
import {
  HiOutlineCamera,
  HiOutlineMapPin,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import currentUser from "../../data/user";

export default function ProfileSection() {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone,
    location: currentUser.location,
    bio: currentUser.bio,
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: persist changes
    setEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile header card */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600 relative">
          <div className="absolute -bottom-10 left-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-lg">
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                  {currentUser.name.charAt(0)}
                </div>
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-lg shadow-md flex items-center justify-center text-gray-500 hover:text-blue-500 transition-colors cursor-pointer border border-gray-100">
                <HiOutlineCamera className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-14 pb-6 px-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{currentUser.name}</h2>
              <div className="flex items-center gap-4 mt-1.5 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <HiOutlineMapPin className="w-3.5 h-3.5" />
                  {currentUser.location}
                </span>
                <span className="flex items-center gap-1">
                  <HiOutlineCalendarDays className="w-3.5 h-3.5" />
                  Joined {currentUser.joinedAt}
                </span>
              </div>
            </div>
            <button
              onClick={() => setEditing(!editing)}
              className="text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors cursor-pointer"
            >
              {editing ? "Cancel" : "Edit profile"}
            </button>
          </div>

          {!editing && (
            <p className="mt-4 text-sm text-gray-500 leading-relaxed max-w-2xl">
              {currentUser.bio}
            </p>
          )}
        </div>
      </div>

      {/* Edit form or info cards */}
      {editing ? (
        <form
          onSubmit={handleSave}
          className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5"
        >
          <h3 className="text-base font-semibold text-gray-900 mb-1">Edit Profile</h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
            <textarea
              name="bio"
              rows={3}
              value={form.bio}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm px-6 py-2.5 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all cursor-pointer"
            >
              Save changes
            </button>
          </div>
        </form>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { icon: HiOutlineEnvelope, label: "Email", value: currentUser.email },
            { icon: HiOutlinePhone, label: "Phone", value: currentUser.phone },
            { icon: HiOutlineMapPin, label: "Location", value: currentUser.location },
            { icon: HiOutlineCalendarDays, label: "Member since", value: currentUser.joinedAt },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                <item.icon className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-xs text-gray-400">{item.label}</p>
                <p className="text-sm font-medium text-gray-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
