import axios from 'axios';
import { getCookie } from './cookie';
import UrlConstant from '../constant/url';

export interface Order {
    id : number | null;
    quantity: number;
    product_id: number;
    order_date: string | null;
    order_status: number;
    total_price: number | null;
  }

const baseURL = UrlConstant.API_URL  + 'orders/';
const token = localStorage.getItem('token');

export const fetchAllOrders = async () => {
  try {
    const response = await axios.get<Order[]>(baseURL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Failed to fetch orders');
  }
};

export const getOrderById = async (orderId: string) => {
  try {
    const response = await axios.get<Order>(`${baseURL}${orderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching order with id ${orderId}:`, error);
    throw new Error(`Failed to fetch order with id ${orderId}`);
  }
};


export const createOrder = async (newOrder: Order) => {
  try {
    const response = await axios.post<Order>(baseURL, newOrder, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
};

export const updateOrder = async (orderId: string, updatedOrder: Order) => {
  try {
    const response = await axios.put<Order>(`${baseURL}${orderId}`, updatedOrder, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating order:', error);
    throw new Error('Failed to update order');
  }
};

export const deleteOrder = async (orderId: string) => {
  try {
    const response = await axios.delete(`${baseURL}${orderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw new Error('Failed to delete order');
  }
};

