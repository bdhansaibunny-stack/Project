'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Resource } from '@/types';
import { Trash2, Edit, Plus } from 'lucide-react';
import Link from 'next/link';

export default function ResourcesPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    if ((session?.user as any)?.role !== 'admin') {
      router.push('/login');
    }
  }, [session, router]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch('/api/resources');
        if (res.ok) {
          const data = await res.json();
          setResources(data.resources);
        }
      } catch (error) {
        console.error('Failed to fetch resources:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if ((session?.user as any)?.role === 'admin') {
      fetchResources();
    }
  }, [session]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this resource?')) return;

    setIsDeleting(id);
    try {
      const res = await fetch(`/api/resources/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setResources(resources.filter((r) => r._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete resource:', error);
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
          <h1 className="text-4xl font-bold text-gray-900">Resources Management</h1>
          <Link
            href="#"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Plus size={20} />
            New Resource
          </Link>
        </div>

        {resources.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600 text-lg">No resources found. Create one to get started!</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Title</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Created</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {resources.map((resource) => (
                  <tr key={resource._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{resource.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">{resource.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{resource.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(resource.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right text-sm space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1">
                        <Edit size={16} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(resource._id)}
                        disabled={isDeleting === resource._id}
                        className="text-red-600 hover:text-red-800 inline-flex items-center gap-1 disabled:opacity-50"
                      >
                        <Trash2 size={16} /> {isDeleting === resource._id ? 'Deleting...' : 'Delete'}
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
