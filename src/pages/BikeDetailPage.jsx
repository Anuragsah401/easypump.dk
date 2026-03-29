import { useParams, Link } from "react-router-dom";
import { HiOutlineChevronLeft, HiOutlineMapPin, HiOutlineCheck } from "react-icons/hi2";
import bikes from "../data/bikes";

export default function BikeDetailPage() {
  const { id } = useParams();
  const bike = bikes.find((b) => b.id === Number(id));

  if (!bike) {
    return (
      <div className="pt-28 pb-16 text-center min-h-screen">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Bike not found</h1>
        <p className="text-gray-500 mb-6">The listing you're looking for doesn't exist.</p>
        <Link to="/buy" className="text-sm font-medium text-blue-500 hover:text-blue-600">
          ← Back to listings
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50/40">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Back link */}
        <Link
          to="/buy"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-6 mt-4"
        >
          <HiOutlineChevronLeft className="w-4 h-4" />
          Back to listings
        </Link>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Images — left 3 cols */}
          <div className="lg:col-span-3 space-y-4">
            <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3]">
              <img src={bike.images[0]} alt={bike.name} className="w-full h-full object-cover" />
            </div>
            {bike.images.length > 1 && (
              <div className="grid grid-cols-2 gap-4">
                {bike.images.slice(1).map((img, i) => (
                  <div key={i} className="rounded-xl overflow-hidden bg-gray-100 aspect-[4/3]">
                    <img
                      src={img}
                      alt={`${bike.name} ${i + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details — right 2 cols */}
          <div className="lg:col-span-2 space-y-6">
            {/* Price & title */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                  {bike.type}
                </span>
                <span className="px-2.5 py-0.5 bg-green-50 text-green-600 text-xs font-medium rounded-full">
                  {bike.condition}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{bike.name}</h1>
              <p className="text-3xl font-bold text-gray-900">
                {bike.price.toLocaleString("da-DK")} kr
              </p>
            </div>

            {/* Quick info */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Year", value: bike.year },
                { label: "Size", value: bike.size },
                { label: "Brand", value: bike.brand },
                { label: "Color", value: bike.color },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-xl border border-gray-100 p-3">
                  <p className="text-xs text-gray-400 mb-0.5">{item.label}</p>
                  <p className="text-sm font-medium text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-white rounded-xl border border-gray-100 p-4">
              <HiOutlineMapPin className="w-5 h-5 text-blue-500 shrink-0" />
              <span>{bike.location}</span>
              <span className="ml-auto text-xs text-gray-400">Posted {bike.postedAt}</span>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{bike.description}</p>
            </div>

            {/* Specs */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Specifications</h3>
              <ul className="space-y-1.5">
                {bike.specs.map((spec) => (
                  <li key={spec} className="flex items-center gap-2 text-sm text-gray-500">
                    <HiOutlineCheck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            {/* Seller */}
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                  {bike.seller.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{bike.seller.name}</p>
                  <p className="text-xs text-gray-400">
                    ⭐ {bike.seller.rating} · {bike.seller.listings} listings
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all cursor-pointer">
              Contact Seller
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
