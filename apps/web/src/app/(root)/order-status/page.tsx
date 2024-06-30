'use client';
import { BASE_API_URL } from '@/utils/config';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';

const API_URL = BASE_API_URL + '/trx';

const OrderStatus = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [transaction, setTransaction] = useState(null);
  const [emptyMessage, setEmptyMessage] = useState('');

  const getTransactionDetail = useCallback(async (transactionId: any) => {
    if (!transactionId) return alert('Transaction ID harus diisi');
    const response = await fetch(`${API_URL}/${transactionId}`);
    const res = await response.json();
    if (res.data) {
      setTransaction(res.data);
      setEmptyMessage('');
    } else {
      setEmptyMessage('Transaksi tidak ditemukan');
      setTransaction(null);
    }
  }, []);

  useEffect(() => {
    const transactionId = searchParams.get('transaction_id');
    if (transactionId) {
      getTransactionDetail(transactionId);
    } else {
      setEmptyMessage(
        'Belum ada transaksi yang dicari, silahkan masukkan ID Transaksi',
      );
    }
  }, [getTransactionDetail, searchParams]);

  return (
    <div>
      {emptyMessage && <p>{emptyMessage}</p>}
      {transaction && (
        <div className="text-red-600">
          {/* <p>Transaction ID: {transaction.id}</p>
          <p>Status: {transaction.status}</p>
          <p>Total: {transaction.total}</p>
          <p>Customer: {transaction.customer_name}</p>
          <p>Email: {transaction.customer_email}</p> */}
        </div>
      )}
    </div>
  );
};

export default OrderStatus;
