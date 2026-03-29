import { Link } from "react-router-dom";
import {
  HiOutlineEye,
  HiOutlineChatBubbleLeft,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlinePlus,
} from "react-icons/hi2";
import currentUser from "../../data/user";

const statusStyles = {
  active: "bg-green-50 text-green-600",
  sold: "bg-gray-100 text-gray-500",
  draft: "bg-amber-50 text-amber-600",
};

export default function MyListingsSection() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">My Listings</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {currentUser.listings.length} bike{currentUser.listings.length !== 1 && "s"}
          </p>
        </div>
        <button className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all cursor-pointer">
          <HiOutlinePlus className="w-4 h-4" />
          New listing
        </button>
      </div>

      {/* Listings */}
      <div className="space-y-3">
        {currentUser.listings.map((listing) => (
          <div
            key={listing.id}
            className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-4 hover:border-gray-200 hover:shadow-sm transition-all"
          >
            {/* Image */}
            <div className="w-full sm:w-32 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">
              <img src={listing.image} alt={listing.name} className="w-full h-full object-cover" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Link
                      to={`/buy/${listing.id}`}
                      className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      {listing.name}
                    </Link>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${statusStyles[listing.status]}`}
                    >
                      {listing.status}
                    </span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    {listing.price.toLocaleString("da-DK")} kr
                  </p>
                </div>
              </div>

              {/* Stats + actions */}
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <HiOutlineEye className="w-3.5 h-3.5" />
                    {listing.views} views
                  </span>
                  <span className="flex items-center gap-1">
                    <HiOutlineChatBubbleLeft className="w-3.5 h-3.5" />
                    {listing.inquiries} inquiries
                  </span>
                  <span>{listing.postedAt}</span>
                </div>

                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors cursor-pointer">
                    <HiOutlinePencilSquare className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer">
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
