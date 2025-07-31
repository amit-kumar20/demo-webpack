import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Pagination from './Pagination';

const fetchItems = async (page: number) => {
  const response = await fetch(`/api/items?page=${page}`);
  if (!response.ok) throw new Error('Error fetching data');
  return response.json();
};

const PaginatedList = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['items', page],
    queryFn: () => fetchItems(page),
    keepPreviousData: true,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data.</p>;

  return (
    <div className="p-4">
      <ul className="space-y-2">
        {data.items.map((item: any) => (
          <li key={item.id} className="p-3 bg-white rounded shadow">{item.name}</li>
        ))}
      </ul>

      <Pagination
        currentPage={page}
        totalPages={data.totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default PaginatedList;
