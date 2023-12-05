import React, { useState, useEffect } from 'react';
import { createProduct, getProductById, updateProduct } from '../../api/product';
import NavbarComponent from '../../components/NavbarComponent';
import { useLocation } from 'react-router-dom';
import { createOrder, getOrderById, updateOrder, Order} from '../../api/order';
import { fetchAllProducts } from "../../api/product"
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
export default function OrderForm() {
  dayjs.locale('id')
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('id');
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData: any = await fetchAllProducts();
        setProducts(productsData.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const [formData, setFormData] = useState({
    id : '',
    quantity: '',
    product_id: '',
    order_date : dayjs(),
    order_status: '',
  })


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formData.order_date.format('YYYY-MM-DDTHH:mm:ssZ[Z]'))
    if (orderId) {
      await updateOrder(orderId, {
        id: parseInt(orderId),
        quantity: parseInt(formData.quantity),
        product_id: parseInt(formData.product_id),
        order_date: formData.order_date.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        order_status: parseInt(formData.order_status),
        total_price: null
      });
    }else{
      await createOrder({
        id : null,
        quantity: parseInt(formData.quantity),
        product_id: parseInt(formData.product_id),
        order_date: formData.order_date.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        order_status: parseInt(formData.order_status),
        total_price: null
      });
    }

    setFormData({
      id : '',
      quantity: '',
      product_id: '',
      order_date : dayjs(),
      order_status: '',
    });

    window.location.href = "/orders";
  };

  useEffect(() => {
    const fetchOrderDetail = async () => {
      if (orderId) {
        try {
          const order = await getOrderById(orderId);
          setFormData({
            id : orderId,
            quantity : order.quantity.toString(),
            product_id: order.product_id ? order.product_id.toString() : '',
            order_date: dayjs(order.order_date, 'YYYY-MM-DDTHH:mm:ssZ[Z]'),
            order_status: order.order_status.toString(),
          });
        } catch (error) {
          console.error('Error fetching order details:', error);
        }
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-pink-500 to-purple-700">
      <div className="bg-black text-white py-4 px-8">
        <NavbarComponent />
      </div>
      <div className="text-white text-2xl font-bold py-4 px-8">
        <h2>Form Order</h2>
      </div>
      <div className="flex justify-center items-center min-h-full">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="product_id" className="block text-sm font-medium text-white">
              Product:
            </label>
            <select
              id="product_id"
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            >
              <option key={151231} value={""} hidden={true}>Pilih</option>
              {products.map((product: any) => (
                <option key={product.id} value={product.id} selected={product.id === formData.product_id}>
                  {product.id} - {product.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="quantity" className="block text-sm font-medium text-white">
              Quantitiy:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4" >
            <LocalizationProvider dateAdapter={AdapterDayjs}>

              <DateTimePicker
                label="Order Date"
                value={formData.order_date}
                onChange={(newValue) => 
                  setFormData((prevData) => ({
                    ...prevData,
                    order_date: dayjs(newValue),
                  }))}
                />
            </LocalizationProvider>
          </div>
          
          <div className="mb-4">
            <label htmlFor="order_status" className="block text-sm font-medium text-white">
              Product:
            </label>
            <select
              id="order_status"
              name="order_status"
              value={formData.order_status}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            >
              <option key={151231} value={""} hidden={true}>Pilih</option>
              <option key={0} value={"0"}>NOT PAID</option>
              <option key={1} value={"1"}>PAID</option>
              <option key={2} value={"2"}>IN COURIER</option>
              <option key={4} value={"3"}>DELIVERED</option>

            </select>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Submit
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
