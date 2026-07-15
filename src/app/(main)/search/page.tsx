'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import SearchBox from '@/components/SearchBox';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { SearchResponse, Article } from '@/types';
import Link from 'next/link';
import { ExternalLink, Clock } from 'lucide-react';

export default function SearchPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [response, setResponse] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      setResponse(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">
        🤖 AI-Powered Search
      </h1>
      <p className="text-gray-600 text-center mb-12">
        Ask our AI assistant anything about startups. It learns from our knowledge base to provide accurate answers.
      </p>

      {/* Search Box */}
      <div className="mb-12">
        <SearchBox onSearch={handleSearch} isLoading={isLoading} />
      </div>

      {/* Error Message */}
      {error && <ErrorMessage message={error} />}

      {/* Results */}
      {isLoading && <LoadingSpinner />}

      {response && (
        <div className="space-y-8">
          {/* AI Response */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">AI Response</h2>
            <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">
              {response.response}
            </p>
            <p className="text-sm text-gray-500">
              Based on {response.sources.length} article{response.sources.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Sources */}
          {response.sources.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Source Materials</h3>
              <div className="space-y-4">
                {response.sources.map((source) => (
                  <div key={source._id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                    <Link href={`/article/${source.slug}`}>
                      <h4 className="text-lg font-semibold text-blue-600 hover:text-blue-800 mb-2">
                        {source.title}
                      </h4>
                    </Link>
                    <p className="text-gray-600 text-sm mb-3">{source.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                        {source.category}
                      </span>
                      <Link
                        href={`/article/${source.slug}`}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                      >
                        Read More <ExternalLink size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Welcome Message */}
      {!response && !isLoading && !error && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-12 text-center">
          <div className="text-6xl mb-4">💡</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ask Your Question</h3>
          <p className="text-gray-600 mb-6">
            Get instant answers about startup topics like funding, legal compliance, hiring, marketing, and more.
          </p>
          <div className="space-y-2 text-left max-w-md mx-auto text-gray-700">
            <p className="font-semibold">Try asking:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>How do I register a company?</li>
              <li>What are the steps to raise seed funding?</li>
              <li>How should I approach hiring my first employees?</li>
              <li>What AI tools can help my startup?</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
