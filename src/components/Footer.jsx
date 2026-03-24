export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="grid grid-cols-2 gap-0.5">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="w-2 h-2 rounded-full bg-gray-800" />
              <span className="w-2 h-2 rounded-full bg-gray-800" />
              <span className="w-2 h-2 rounded-full bg-blue-500" />
            </div>
            <span className="text-base font-bold text-gray-900 tracking-tight">EasyPump</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#buy" className="hover:text-gray-900 transition-colors">
              Buy
            </a>
            <a href="#sell" className="hover:text-gray-900 transition-colors">
              Sell
            </a>
            <a href="#features" className="hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#pricing" className="hover:text-gray-900 transition-colors">
              Pricing
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} EasyPump. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
