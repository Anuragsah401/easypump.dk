import { Link } from "react-router-dom";
import { HiOutlineHeart, HiOutlineMapPin } from "react-icons/hi2";
import currentUser from "../../data/user";

export default function FavoritesSection() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">Favorites</h2>
        <p className="text-sm text-gray-500 mt-0.5">
          {currentUser.favorites.length} saved bike{currentUser.favorites.length !== 1 && "s"}
        </p>
      </div>

      {/* Grid */}
      {currentUser.favorites.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentUser.favorites.map((bike) => (
            <div
              key={bike.id}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:shadow-gray-200/50 hover:border-gray-200 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={bike.image}
                  alt={bike.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 shadow-sm hover:bg-white transition-colors cursor-pointer">
                  <HiOutlineHeart className="w-4 h-4 fill-current" />
                </button>
              </div>

              {/* Info */}
              <div className="p-4">
                <Link
                  to={`/buy/${bike.id}`}
                  className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                >
                  {bike.name}
                </Link>
                <p className="text-lg font-bold text-gray-900 mt-1">
                  {bike.price.toLocaleString("da-DK")} kr
                </p>
                <span className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                  <HiOutlineMapPin className="w-3.5 h-3.5" />
                  {bike.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <HiOutlineHeart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-base font-medium text-gray-900 mb-1">No favorites yet</h3>
          <p className="text-sm text-gray-500">Browse bikes and tap the heart to save them here</p>
        </div>
      )}
    </div>
  );
}
