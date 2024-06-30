'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const TransactionsPage = ({ param }: { param: string }) => {
  const query = useSearchParams();

  return <div>{query}</div>;
};

export default TransactionsPage;
