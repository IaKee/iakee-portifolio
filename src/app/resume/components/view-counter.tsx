'use client';

import useSWR from 'swr';
import { Eye } from 'lucide-react';

// Função fetcher para o SWR usar
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function ViewCounter() {
  const { data, error } = useSWR<{ views: number }>(
    '/api/views',
    fetcher,
    {
      refreshInterval: 10000,
    }
  );

  const views = data?.views;

  if (error) {
    console.error('Failed to fetch view count', error);
    return <span>---</span>;
  }

  return (
    <div className="flex items-center gap-2 text-gray-500">
      <Eye size={18} />
      <span>
        {views !== undefined ? `${views.toLocaleString()} acessos` : 'Carregando...'}
      </span>
    </div>
  );
}