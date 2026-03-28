import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden bg-gray-50/60">
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-12">
        
        {/* Buttons / boxes grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Link
            to="/buy"
            className="inline-flex items-center justify-center rounded-xl bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-600 hover:shadow-xl hover:-translate-y-1 transform transition-all"
          >
            I want to Buy a bike
          </Link>
          <a
            href="#sell"
            className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-lg hover:-translate-y-1 transform transition-all"
          >
            I want to Sell my bike
          </a>
          <Link
            to="/air"
            className="inline-flex items-center justify-center rounded-xl bg-green-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-green-500/25 hover:bg-green-600 hover:shadow-xl hover:-translate-y-1 transform transition-all"
          >
            Where can I get air for my bike
          </Link>
          <Link
            to="/repair"
            className="inline-flex items-center justify-center rounded-xl bg-yellow-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-yellow-500/25 hover:bg-yellow-600 hover:shadow-xl hover:-translate-y-1 transform transition-all"
          >
            I only want to repair my bike
          </Link>
        </div>

        {/* Main hero text */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-gray-900 leading-[1.08] mt-10">
          We help you sell or buy safely and securely
          <br />
          <span className="text-gray-400">all in one place</span>
        </h1>

      </div>
    </section>
  );
}
