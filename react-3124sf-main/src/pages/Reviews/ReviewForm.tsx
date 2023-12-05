import React, { useState, useEffect } from 'react';
import { createReview, getReviewById, updateReview } from '../../api/review';
import NavbarComponent from '../../components/NavbarComponent';
import { useLocation } from 'react-router-dom';
import { fetchAllProducts } from '../../api/product';

export default function ReviewForm() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const reviewId = searchParams.get('id');

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
    review_id: '',
    user_id: '',
    product_id: '',
    rating: '',
    review_text: '',
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

    if (reviewId) {
      await updateReview(reviewId, {
        id: parseInt(reviewId),
        user_id: 1,
        product_id: parseInt(formData.product_id),
        rating: parseInt(formData.rating),
        review_text: formData.review_text
      });
    } else {
      await createReview({
        id: null,
        user_id: 1,
        product_id: parseInt(formData.product_id),
        rating: parseInt(formData.rating),
        review_text: formData.review_text
      });
    }

    setFormData({
      review_id: '',
      user_id: '',
      product_id: '',
      rating: '',
      review_text: '',
    });

    window.location.href = "/Reviews";
  };

  useEffect(() => {
    const fetchReviewDetails = async () => {
      if (reviewId) {
        try {
          const review: any = await getReviewById(parseInt(reviewId));
          console.log(review.data);
          setFormData({
            review_id: reviewId,
            user_id: review.user_id.toString(),
            product_id: review.product_id ? review.product_id.toString() : '',
            rating: review.rating.toString(),
            review_text: review.review_text,
          });
        } catch (error) {
          console.error('Error fetching Review details:', error);
        }
      }
    };

    fetchReviewDetails();
  }, [reviewId]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-pink-500 to-purple-700">
      <div className="bg-black text-white py-4 px-8">
        <NavbarComponent />
      </div>
      <div className="text-white text-2xl font-bold py-4 px-8">
        <h2>Form Reviews</h2>
      </div>
      <div className="flex justify-center items-center min-h-full">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <input
              type="hidden"
              id="review_id"
              name="review_id"
              value={formData.review_id}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-4">
            <input
              type="hidden"
              id="user_id"
              name="user_id"
              value={formData.user_id}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

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
            <label htmlFor="rating" className="block text-sm font-medium text-white">
              Rating:
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              min={1}
              max={10}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="review_text" className="block text-sm font-medium text-white">
              Review Text:
            </label>
            <textarea
              id="review_text"
              name="review_text"
              value={formData.review_text}
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
