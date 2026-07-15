'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { Resource } from '@/types';
import { categories } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

type ResourceType = 'tool' | 'article' | 'course' | 'community';

const resourceTypeColors: Record<ResourceType, string> = {
  tool: 'bg-blue-100 text-blue-800',
  article: 'bg-green-100 text-green-800',
  course: 'bg-purple-100 text-purple-800',
  community: 'bg-orange-100 text-orange-800',
};

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<ResourceType | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const params = new URLSearchParams();
        if (selectedCategory) params.append('category', selectedCategory);
        if (selectedType) params.append('type', selectedType);

        const res = await fetch(`/api/resources?${params.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch resources');
        const data = await res.json();
        setResources(data.resources);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, [selectedCategory, selectedType]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Resources Library</h1>
      <p className="text-gray-600 text-lg mb-12">
        Discover curated tools, articles, courses, and communities to accelerate your startup journey
      </p>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Category Filter */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Filter by Category:</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full transition ${
                !selectedCategory
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full transition text-sm ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Type Filter */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Filter by Type:</h3>
          <div className="flex flex-wrap gap-2">
            {(['tool', 'article', 'course', 'community'] as ResourceType[]).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(selectedType === type ? null : type)}
                className={`px-4 py-2 rounded-full transition capitalize ${
                  selectedType === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {type}s
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : resources.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No resources found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <a
              key={resource._id}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden group"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs px-3 py-1 rounded-full capitalize ${resourceTypeColors[resource.type]}`}>
                    {resource.type}
                  </span>
                  <ExternalLink size={18} className="text-gray-400 group-hover:text-blue-600 transition" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600">
                  {resource.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{resource.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                    {categories.find((c) => c.id === resource.category)?.label}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
