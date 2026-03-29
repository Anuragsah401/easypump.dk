import { useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { HiOutlineMagnifyingGlass, HiOutlineMapPin, HiOutlineChevronDown } from "react-icons/hi2";
import bikes, { brands, types, locations } from "../data/bikes";
import BikeCard from "../components/BikeCard";

export default function UserHomePage() {
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const [location, setLocation] = useState("All Locations");
  const [brand, setBrand] = useState("All Brands");
  const [type, setType] = useState("All Types");
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState(searchParams.get("q") || "");

  const filtered = useMemo(() => {
    let list = [...bikes];

    if (location && location !== "All Locations") {
      list = list.filter((b) => b.location === location);
    }
    if (brand !== "All Brands") {
      list = list.filter((b) => b.brand === brand);
    }
    if (type !== "All Types") {
      list = list.filter((b) => b.type === type);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.brand.toLowerCase().includes(q) ||
          b.type.toLowerCase().includes(q),
      );
    }
    if (sort === "price-low") list.sort((a, b) => a.price - b.price);
    if (sort === "price-high") list.sort((a, b) => b.price - a.price);

    return list;
  }, [location, brand, type, sort, search]);

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
            Browse the nearest bikes
          </h1>
          <p className="mt-1 text-gray-500">
            {filtered.length} bike{filtered.length !== 1 && "s"} available
            {location && location !== "All Locations" && ` in ${location}`}
          </p>
        </div>

        {/* Filters bar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {/* Search */}
          <div className="relative flex-1 min-w-50 max-w-md">
            <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search bikes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all"
            />
          </div>

          {/* Location */}
          <div className="relative">
            <HiOutlineMapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-500" />
            <HiOutlineChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="appearance-none text-sm bg-white border border-gray-200 rounded-xl pl-9 pr-9 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-gray-600 cursor-pointer"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Brand filter */}
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="text-sm bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-gray-600 cursor-pointer"
          >
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          {/* Type filter */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="text-sm bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-gray-600 cursor-pointer"
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-sm bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 text-gray-600 cursor-pointer"
          >
            <option value="newest">Newest first</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
          </select>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((bike) => (
              <BikeCard key={bike.id} bike={bike} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <HiOutlineMagnifyingGlass className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No bikes found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}
