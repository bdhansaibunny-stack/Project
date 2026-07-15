'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SN</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:inline">
              Startup Navigator
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/explore" className="text-gray-700 hover:text-blue-600 transition">
              Explore
            </Link>
            <Link href="/search" className="text-gray-700 hover:text-blue-600 transition">
              AI Search
            </Link>
            <Link href="/resources" className="text-gray-700 hover:text-blue-600 transition">
              Resources
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
              About
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <>
                {(session.user as any)?.role === 'admin' && (
                  <Link
                    href="/admin/dashboard"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    Admin
                  </Link>
                )}
                <span className="text-sm text-gray-600">Welcome, {session.user?.name}</span>
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-600 transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4">
            <Link href="/explore" className="block text-gray-700 hover:text-blue-600">
              Explore
            </Link>
            <Link href="/search" className="block text-gray-700 hover:text-blue-600">
              AI Search
            </Link>
            <Link href="/resources" className="block text-gray-700 hover:text-blue-600">
              Resources
            </Link>
            <Link href="/about" className="block text-gray-700 hover:text-blue-600">
              About
            </Link>
            {session ? (
              <>
                {(session.user as any)?.role === 'admin' && (
                  <Link href="/admin/dashboard" className="block text-gray-700 hover:text-blue-600">
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="w-full text-left text-red-500 hover:text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block text-gray-700 hover:text-blue-600">
                  Login
                </Link>
                <Link href="/register" className="block text-gray-700 hover:text-blue-600">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
