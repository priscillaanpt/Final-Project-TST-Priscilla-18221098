import axios from 'axios';

interface Order {
  product_id: number;
  quantity: number;
  order_id: number;
  order_date: string;
  order_status: string;
  total_price: number;
}

// const fetchOrders = async () => {
//   try {
//     const response = await axios.get<Order[]>('http://20.247.187.45/orders/all');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     throw new Error('Failed to fetch orders');
//   }
// };

// export default fetchOrders;

export const fetchAllOrder = async () => {
    try {
        const response = await axios.get('http://20.247.187.45/orders/all')
        console.log(response)
        return response.data
    }  catch (error) {
        console.error('Error fetching orders:', error);
        throw new Error('Failed to fetch orders');
    }
}
