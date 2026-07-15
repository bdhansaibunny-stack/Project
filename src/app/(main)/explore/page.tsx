'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ArticleCard from '@/components/ArticleCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { Article } from '@/types';
import { categories } from '@/lib/utils';
import Link from 'next/link';

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const url = category
          ? `/api/articles?category=${category}`
          : '/api/articles';
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch articles');
        const data = await res.json();
        setArticles(data.articles);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [category]);

  const currentCategory = categories.find((c) => c.id === category);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        {currentCategory ? currentCategory.label : 'Explore All Topics'}
      </h1>
      <p className="text-gray-600 text-lg mb-12">
        {currentCategory
          ? `Learn everything about ${currentCategory.label.toLowerCase()}`
          : 'Discover comprehensive guides on all startup topics'}
      </p>

      {/* Category Filter */}
      <div className="mb-12">
        <h3 className="font-semibold text-gray-900 mb-4">Filter by Category:</h3>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/explore"
            className={`px-4 py-2 rounded-full transition ${
              !category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/explore?category=${cat.id}`}
              className={`px-4 py-2 rounded-full transition ${
                category === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : articles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No articles found. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
