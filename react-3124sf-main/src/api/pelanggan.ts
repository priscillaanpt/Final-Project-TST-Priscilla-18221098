import axios from 'axios';
import { getCookie } from './cookie';
import UrlConstant from '../constant/url';

export interface Pelanggan {
    id : number | null;
    nama: string;
    alamat: string;
    telepon: string;
  }

const baseURL = UrlConstant.API_URL_TEMAN  + 'pelanggan/';
const token = localStorage.getItem('token');

export const fetchAllPelanggan = async () => {
  try {
    const response = await axios.get<Pelanggan[]>(baseURL, {
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

export const getPelangganById = async (orderId: string) => {
  try {
    const response = await axios.get<Pelanggan>(`${baseURL}${orderId}`, {
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


export const createPelanggan = async (newOrder: Pelanggan) => {
  try {
    const response = await axios.post<Pelanggan>(baseURL, newOrder, {
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

export const updatePelanggan = async (orderId: string, updatedOrder: Pelanggan) => {
  try {
    const response = await axios.put<Pelanggan>(`${baseURL}${orderId}`, updatedOrder, {
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

export const deletePelanggan = async (orderId: string) => {
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

