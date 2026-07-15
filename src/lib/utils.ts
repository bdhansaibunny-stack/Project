export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function truncateText(text: string, limit: number): string {
  if (text.length <= limit) return text;
  return text.substring(0, limit) + '...';
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'company-registration': 'bg-blue-100 text-blue-800',
    'funding': 'bg-green-100 text-green-800',
    'legal-compliance': 'bg-purple-100 text-purple-800',
    'hiring': 'bg-yellow-100 text-yellow-800',
    'branding': 'bg-pink-100 text-pink-800',
    'marketing': 'bg-orange-100 text-orange-800',
    'taxation': 'bg-red-100 text-red-800',
    'fundraising': 'bg-indigo-100 text-indigo-800',
    'ai-tools': 'bg-cyan-100 text-cyan-800',
    'business-growth': 'bg-teal-100 text-teal-800',
  };
  return colors[category] || 'bg-gray-100 text-gray-800';
}

export const categories = [
  { id: 'company-registration', label: 'Company Registration', icon: '🏢' },
  { id: 'funding', label: 'Funding', icon: '💰' },
  { id: 'legal-compliance', label: 'Legal Compliance', icon: '⚖️' },
  { id: 'hiring', label: 'Hiring', icon: '👥' },
  { id: 'branding', label: 'Branding', icon: '🎨' },
  { id: 'marketing', label: 'Marketing', icon: '📢' },
  { id: 'taxation', label: 'Taxation', icon: '📊' },
  { id: 'fundraising', label: 'Fundraising', icon: '🚀' },
  { id: 'ai-tools', label: 'AI Tools', icon: '🤖' },
  { id: 'business-growth', label: 'Business Growth', icon: '📈' },
];
