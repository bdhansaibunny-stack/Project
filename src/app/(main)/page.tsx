'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Search, BookOpen, Users, Zap } from 'lucide-react';
import { categories } from '@/lib/utils';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Your Startup Journey Starts Here
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Navigate startup challenges with AI-powered guidance, expert resources, and comprehensive documentation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/search"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2"
            >
              <Sparkles size={20} />
              AI Search Now
            </Link>
            <Link
              href="/explore"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition flex items-center justify-center gap-2"
            >
              Explore Topics
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
          Why Choose Startup Navigator?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
            <Search className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Search</h3>
            <p className="text-gray-600">
              Get instant, intelligent answers to your startup questions powered by advanced AI
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
            <BookOpen className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Curated Resources</h3>
            <p className="text-gray-600">
              Access thousands of tools, articles, courses, and communities in one place
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
            <Users className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Community Driven</h3>
            <p className="text-gray-600">
              Learn from thousands of entrepreneurs and share your startup experience
            </p>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Topics We Cover
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/explore?category=${category.id}`}
                className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition hover:scale-105"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-gray-900 text-sm">{category.label}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Zap className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">Ready to Launch Your Startup?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Start exploring topics, ask our AI assistant, and access resources that will accelerate your startup journey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/explore"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Get Started
            </Link>
            <Link
              href="/contact"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
