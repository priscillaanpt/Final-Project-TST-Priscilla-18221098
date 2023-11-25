import React, { useState, useEffect } from "react";
import NavbarComponent from "../../components/NavbarComponent";
import { fetchAllProducts } from "../../api/product";
import ProductCard from "../../components/ProductCard";

export interface Product {
  product_id: string;
  product_name: string;
  product_description: string;
  product_price: number;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchAllProducts(); // Fetch products from your API
        setProducts(productsData);
      } catch (error) {
        // Handle error
      }
    };

    getProducts();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-pink-500 to-purple-700">
      <div className="bg-black text-white py-4 px-8">
        <NavbarComponent />
      </div>
      <div>
        <h2>List of Products</h2>
      </div>
      <div className="flex justify-center items-center min-h-full">
        {products.slice(0, 6).map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
