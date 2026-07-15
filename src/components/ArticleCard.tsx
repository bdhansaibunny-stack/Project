'use client';

import { Article } from '@/types';
import Link from 'next/link';
import { Clock, Tag } from 'lucide-react';
import { getCategoryColor, categories } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const category = categories.find((c) => c.id === article.category);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs px-3 py-1 rounded-full ${getCategoryColor(article.category)}`}>
            {category?.label}
          </span>
          <span className="text-xs text-gray-500">{article.views} views</span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {article.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{article.readTime} min read</span>
          </div>
          <span>{article.author}</span>
        </div>

        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <Link
          href={`/article/${article.slug}`}
          className="inline-block text-blue-600 hover:text-blue-800 font-semibold text-sm mt-2"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
}
