import { Link } from "react-router-dom";
import { useState } from "react";
import AuthProvider from "../context/AuthContext";
import { logout } from "../FireBase";
import LoginButton from "./LoginButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = AuthProvider.useAuth();

  return (
    <header className="sticky top-0 z-50 bg-brand-bg/80 backdrop-blur-md border-b border-brand-border shadow-sm shadow-brand-primary/5">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center text-white shadow-lg shadow-brand-primary/20 group-hover:shadow-brand-primary/40 transition">
            🛡️
          </div>
          <span className="bg-gradient-to-r from-white to-brand-text-secondary bg-clip-text text-transparent">
            SecureScan
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
            <Link to="/url" className="text-brand-text-secondary hover:text-brand-primary font-medium transition hover:scale-105">URL Analyzer</Link>
            <Link to="/message" className="text-brand-text-secondary hover:text-brand-primary font-medium transition hover:scale-105">Message Analyzer</Link>
            <Link to="/identity" className="text-brand-text-secondary hover:text-brand-primary font-medium transition hover:scale-105">Identity Checker</Link>
            <Link to="/qr" className="text-brand-text-secondary hover:text-brand-primary font-medium transition hover:scale-105">QR Scanner</Link>
            
            <div className="w-px h-6 bg-brand-border mx-2"></div>
            
            {user ? (
                <div className="flex items-center gap-3">
                    {user.photoURL && (
                        <img 
                            src={user.photoURL} 
                            alt={user.displayName || "User"} 
                            className="w-8 h-8 rounded-full border border-brand-border ring-2 ring-brand-bg" 
                        />
                    )}
                    <button 
                        onClick={logout} 
                        className="text-sm font-medium text-brand-text-secondary hover:text-brand-danger transition"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <LoginButton />
            )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-brand-text-secondary hover:text-brand-primary focus:outline-none"
            >
                {isOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                )}
            </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-brand-border bg-brand-card/95 backdrop-blur-xl absolute w-full left-0 shadow-xl">
            <div className="flex flex-col space-y-4 px-4 py-6">
                <Link 
                    to="/url" 
                    onClick={() => setIsOpen(false)}
                    className="text-brand-text-secondary hover:text-brand-primary font-medium transition"
                >
                    URL Analyzer
                </Link>
                <Link 
                    to="/message" 
                    onClick={() => setIsOpen(false)}
                    className="text-brand-text-secondary hover:text-brand-primary font-medium transition"
                >
                    Message Analyzer
                </Link>
                <Link 
                    to="/identity" 
                    onClick={() => setIsOpen(false)}
                    className="text-brand-text-secondary hover:text-brand-primary font-medium transition"
                >
                    Identity Checker
                </Link>
                <Link 
                    to="/qr" 
                    onClick={() => setIsOpen(false)}
                    className="text-brand-text-secondary hover:text-brand-primary font-medium transition"
                >
                    QR Scanner
                </Link>

                <div className="h-px bg-gray-100 my-2"></div>

                {user ? (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {user.photoURL && (
                                <img 
                                    src={user.photoURL} 
                                    alt={user.displayName} 
                                    className="w-8 h-8 rounded-full border border-gray-200" 
                                />
                            )}
                            <span className="text-sm font-medium text-gray-700">
                                {user.displayName}
                            </span>
                        </div>
                        <button 
                            onClick={() => {
                                logout();
                                setIsOpen(false);
                            }}
                            className="text-sm font-medium text-red-600"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div onClick={() => setIsOpen(false)}>
                        <LoginButton />
                    </div>
                )}
            </div>
        </div>
      )}
    </header>
  );
}
