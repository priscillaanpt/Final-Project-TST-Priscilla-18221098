import React, { useState, useEffect } from "react";
import NavbarComponent from "../../components/NavbarComponent";
import ReviewCard from "../../components/ReviewCard";

export interface Review {
  review_id: number;
  user_id: number;
  product_id: number;
  rating: number;
  review_text: string;
}

const Review = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-pink-500 to-purple-700">
      <div className="bg-black text-white py-4 px-8">
        <NavbarComponent />
      </div>
      <div>
        <h2>List of Reviews</h2>
        <ul>
          {reviews.map((review, index) => (
            <ReviewCard />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Review;
