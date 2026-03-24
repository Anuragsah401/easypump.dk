import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden bg-gray-50/60">
      {/* Main hero content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-gray-900 leading-[1.08]">
          We help you sell or buy safely and securely
          <br />
          <span className="text-gray-400">all in one place</span>
        </h1>

        <p className="mt-6 text-lg text-gray-500 max-w-xl mx-auto"></p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/buy"
            className="inline-flex items-center justify-center rounded-xl bg-blue-500 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-600 transition-all hover:shadow-blue-500/40"
          >
            I want to Buy a bike
          </Link>
          <a
            href="#sell"
            className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
          >
            I want to Sell my bike
          </a>
        </div>
      </div>
    </section>
  );
}
