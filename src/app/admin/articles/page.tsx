'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Article } from '@/types';
import { Trash2, Edit, Plus } from 'lucide-react';
import Link from 'next/link';

export default function ArticlesPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    if ((session?.user as any)?.role !== 'admin') {
      router.push('/login');
    }
  }, [session, router]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch('/api/articles');
        if (res.ok) {
          const data = await res.json();
          setArticles(data.articles);
        }
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if ((session?.user as any)?.role === 'admin') {
      fetchArticles();
    }
  }, [session]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;

    setIsDeleting(id);
    try {
      const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setArticles(articles.filter((a) => a._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete article:', error);
    } finally {
      setIsDeleting(null);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if ((session?.user as any)?.role !== 'admin') return null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Articles Management</h1>
          <Link
            href="#"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Plus size={20} />
            New Article
          </Link>
        </div>

        {articles.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 text-lg">No articles found. Create one to get started!</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Views</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Created</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {articles.map((article) => (
                  <tr key={article._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{article.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{article.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{article.views}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right text-sm space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1">
                        <Edit size={16} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(article._id)}
                        disabled={isDeleting === article._id}
                        className="text-red-600 hover:text-red-800 inline-flex items-center gap-1 disabled:opacity-50"
                      >
                        <Trash2 size={16} /> {isDeleting === article._id ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
