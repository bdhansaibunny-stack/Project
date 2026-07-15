'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import LoadingSpinner from '@/components/LoadingSpinner';
import { User } from '@/types';

export default function UsersPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if ((session?.user as any)?.role !== 'admin') {
      router.push('/login');
    }
  }, [session, router]);

  // Note: Add user fetching logic when API endpoint is ready
  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if ((session?.user as any)?.role !== 'admin') return null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Users Management</h1>

        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 text-lg">User management dashboard coming soon...</p>
        </div>
      </main>
    </div>
  );
}
