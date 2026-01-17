import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center h-16">
          {/* Logo - matches home page gradient */}
          <Link to="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-90 transition">
            WHY-SAFE
          </Link>

          {/* User Profile - simple and clean */}
          <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center hover:ring-2 hover:ring-blue-300 transition">

              <span className="text-sm font-semibold text-blue-600">U</span>
            </div>
            <span className="hidden sm:inline text-sm text-gray-600 font-medium">
              Guest
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
}