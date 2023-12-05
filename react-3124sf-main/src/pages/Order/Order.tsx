import React, { useState, useEffect } from "react";
import NavbarComponent from "../../components/NavbarComponent";
import { fetchAllOrders, getOrderById } from "../../api/order"; // Sesuaikan path file orders.ts sesuai struktur proyek Anda
import OrderCard from "../../components/OrderCard";
export interface Order {
  id : number | null;
  quantity: number;
  product_id: number;
  order_date: string | null;
  order_status: number;
  total_price: number | null;
}
const Order = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("")
  const pageSize = 12;
  const maxPage = Math.ceil(orders.length / pageSize)
  const nextPage = () =>{
    if (page < maxPage) setPage(page + 1);
  }
  const prevPage = () =>{
    if (page > 1) setPage(page - 1);
  }
  useEffect(() => {
    const getOrders = async () => {
      try {
        const ordersData : any = await fetchAllOrders();
        setOrders(ordersData.data);
      } catch (error) {
        // Handle error
      }
    };

    getOrders();
  }, []);
  const handleSearch = async (e : any) => {
    e.preventDefault();
    if (searchQuery !== ''){
      try {
        const ordersData : any = await getOrderById(searchQuery)
        if (ordersData) window.location.href = `/orders/form?id=${ordersData.id}`;
        setOrders([])
      } catch (error: any) {
        console.log(error)
      }
    }
  }
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-pink-500 to-purple-700">
      <div className="bg-black text-white py-4 px-8">
        <NavbarComponent />
      </div>
      <div className="flex text-white text-2xl font-bold py-4 px-8 justify-between flex">
        <h2>List of Orders</h2>
        <div className="text-right">
          <a href="/orders/form" color="primary">
            Add Order
          </a>
        </div>
      </div>
      <div className="flex justify-center items-center my-5">
        <form className="w-3/4">   
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required/>
                <button type="submit" onClick={handleSearch} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
        </form>
      </div>
      <div className="flex flex-row flex-wrap justify-center items-center min-h-full">
        {orders.slice((page - 1)*pageSize, (page) * pageSize).map((order: any) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
      <div className="flex flex-col items-center absolute inset-x-0 bottom-10">
        <span className="text-sm text-gray-700 dark:text-gray-400">
            Showing <span className="font-semibold text-gray-900 dark:text-white">{(page - 1)*pageSize + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{  Math.min( orders.length, (page) * pageSize) }</span> of <span className="font-semibold text-gray-900 dark:text-white">{orders.length}</span> Entries
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
            <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={prevPage} >
                Prev
            </button>
            <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={nextPage}>
                Next
            </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
