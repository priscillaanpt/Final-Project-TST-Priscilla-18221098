import axios from 'axios';
import { getCookie } from './cookie';
import UrlConstant from '../constant/url';

interface Product {
  id: number | null;
  name: string;
  description: string;
  price: number;
}

const baseURL = UrlConstant.API_URL  + 'products/';
const token = localStorage.getItem('token');

export const fetchAllProducts = async () => {
  try {
    const response = await axios.get<Product[]>(baseURL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

export const getProductById = async (productId: string) => {
  try {
    const response = await axios.get<Product>(`${baseURL}${productId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${productId}:`, error);
    throw new Error(`Failed to fetch product with id ${productId}`);
  }
};


export const createProduct = async (newProduct: Product) => {
  try {
    console.log("KEPANGGIL")
    const response = await axios.post<Product>(baseURL, newProduct, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product');
  }
};

export const updateProduct = async (productId: string, updatedProduct: Product) => {
  try {
    const response = await axios.put<Product>(`${baseURL}${productId}`, updatedProduct, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Failed to update product');
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const response = await axios.delete(`${baseURL}${productId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw new Error('Failed to delete product');
  }
};
