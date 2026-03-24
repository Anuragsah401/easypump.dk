import { Link } from "react-router-dom";

export default function BikeCard({ bike }) {
  return (
    <Link
      to={`/buy/${bike.id}`}
      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:shadow-gray-200/50 hover:border-gray-200 transition-all duration-300"
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={bike.image}
          alt={bike.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {bike.name}
          </h3>
          <span className="text-xs font-medium text-gray-400 shrink-0">{bike.postedAt}</span>
        </div>

        <p className="text-lg font-bold text-gray-900 mb-3">
          {bike.price.toLocaleString("da-DK")} kr
        </p>

        <div className="flex items-center gap-3 text-xs text-gray-500">
          {/* Location */}
          <span className="flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            {bike.location}
          </span>

          {/* Condition */}
          <span className="flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {bike.condition}
          </span>

          {/* Type */}
          <span className="px-2 py-0.5 bg-gray-100 rounded-full text-gray-600 font-medium">
            {bike.type}
          </span>
        </div>
      </div>
    </Link>
  );
}
