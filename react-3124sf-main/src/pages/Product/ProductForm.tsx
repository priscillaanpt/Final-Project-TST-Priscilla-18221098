import React, { useState, useEffect } from 'react';
import { createProduct, getProductById, updateProduct } from '../../api/product';
import NavbarComponent from '../../components/NavbarComponent';
import { useLocation } from 'react-router-dom';

export default function ProductForm() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get('id');

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (productId) {
      await updateProduct(productId, {
        id: parseInt(productId),
        name: formData.name,
        price: parseInt(formData.price),
        description: formData.description,
      });
    }else{
        console.log('CHECK')
      await createProduct({
        id : null,
        name: formData.name,
        price: parseInt(formData.price),
        description: formData.description,
      });
    }

    setFormData({
      name: '',
      price: '',
      description: '',
    });

    window.location.href = "/products";
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (productId) {
        try {
          const product = await getProductById(productId);
          setFormData({
            name: product.name,
            price: String(product.price),
            description: product.description,
          });
        } catch (error) {
          console.error('Error fetching product details:', error);
        }
      }
    };

    fetchProductDetails();
  }, [productId]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-pink-500 to-purple-700">
      <div className="bg-black text-white py-4 px-8">
        <NavbarComponent />
      </div>
      <div className="text-white text-2xl font-bold py-4 px-8">
        <h2>Form Products</h2>
      </div>
      <div className="flex justify-center items-center min-h-full">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-white">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-white">
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-white">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            ></textarea>
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
