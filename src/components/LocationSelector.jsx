import { useState, useRef, useEffect } from "react";
import { HiOutlineMapPin, HiOutlineChevronDown } from "react-icons/hi2";
import { locations } from "../data/bikes";

export default function LocationSelector({ selected, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
      >
        {/* Map pin icon */}
        <HiOutlineMapPin className="w-4 h-4 text-blue-500 shrink-0" />
        <span className="max-w-[100px] truncate">{selected}</span>
        {/* Chevron */}
        <HiOutlineChevronDown
          className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl border border-gray-200 shadow-xl shadow-gray-200/50 py-1.5 z-50">
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => {
                onChange(loc);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer ${
                selected === loc
                  ? "text-blue-600 bg-blue-50 font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {loc}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
