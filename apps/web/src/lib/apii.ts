import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const fetchOrders = async (params: {
  limit?: string;
  page?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  orderId?: string;
}) => {
  try {
    const response = await api.get('/orders/lists', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};
