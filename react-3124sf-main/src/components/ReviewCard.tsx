import React from "react";
import { deleteReview } from "../api/review";

const ReviewCard = ({ review }: any) => {

  const onDeleteClick = async () => {
    try {
      await deleteReview(review.id);
      window.location.href = "/reviews";
    } catch (error) {
      window.location.href = "/reviews";
      console.error("Error fetching products:", error);
    }
  }
  const maxChar = 15;
  const onEditClick = async () => {
    try {
      window.location.href = `/reviews/form?id=${review.id}`;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  return (
    <>
      <div className="my-2">
        <div className="w-60 h-52 bg-white rounded-3xl drop-shadow-lg mx-2">
          <div className="flex flex-col items-center justify-center">
            <div className="rounded-3xl w-40 h-2"></div>
          </div>
          <div className="mt-3 px-4">
            <h5 className="mb-2 text-m font-bold tracking-tight text-gray-900">
              Review ID : {review.id}
            </h5>
            <p>
              Product ID: {review.product_id}
            </p>
            <p>
              User ID: {review.user_id}
            </p>
            <p>
              Rating: {review.rating}
            </p>
            <p>
              Review: {review.review_text.substring(0, maxChar) + (review.review_text.length > maxChar ? '...' : '')}
            </p>
            <div className="flex flex-col items-center justify-center">
              <div>
                <button type="button" className="w-20 h-8 mx-2 my-2 hover:text-white bg-mealshub-blue hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-300 font-lato font-bold rounded-full text-xs" onClick={onEditClick}>Edit</button>
                <button type="button" className="w-20 h-8 mx-2 my-2 text-mealshub-red bg-white border-2 border-mealshub-red hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-red-300 font-lato font-bold rounded-full text-xs" onClick={onDeleteClick}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
