import React, { useState, useEffect } from "react";
import NavbarComponent from "../../components/NavbarComponent";
import { fetchAllOrder } from "../../api/order"; // Sesuaikan path file orders.ts sesuai struktur proyek Anda

export interface Order {
  product_id: number;
  quantity: number;
  order_id: number;
  order_date: string;
  order_status: string;
  total_price: number;
}

const Order = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const ordersData = await fetchAllOrder();
        setOrders(ordersData);
      } catch (error) {
        // Handle error
      }
    };

    getOrders();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-pink-500 to-purple-700">
      <div className="bg-black text-white py-4 px-8">
        <NavbarComponent />
      </div>
      <div>
        <h2>List of Orders</h2>
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <p>Order ID: {order.order_id}</p>
              <p>Product ID: {order.product_id}</p>
              <p>Quantity: {order.quantity}</p>
              <p>Order Date: {order.order_date}</p>
              <p>Order Status: {order.order_status}</p>
              <p>Total Price: {order.total_price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Order;
