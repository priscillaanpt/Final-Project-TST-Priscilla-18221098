import axios from 'axios';

interface Product {
  product_id: string;
  product_name: string;
  product_description: string;
  product_price: number;
}

export const fetchAllProducts = async () => {
  try {
    const response = await axios.get<Product[]>('http://20.247.187.45/products/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};
