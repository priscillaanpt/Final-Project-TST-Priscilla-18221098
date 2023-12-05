import axios from 'axios';
import React from 'react'
import { Review } from '../pages/Reviews/Reviews';
import { getCookie } from './cookie';
import UrlConstant from '../constant/url';


const baseURL = UrlConstant.API_URL  + 'reviews/';
const token = localStorage.getItem('token');


export const fetchAllReviews = async () => {
  try {
    const response = await axios.get<Review[]>(baseURL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Reviews:', error);
    throw new Error('Failed to fetch Reviews');
  }
};

export const getReviewById = async (reviewId: number) => {
  try {
    const response = await axios.get<Review>(`${baseURL}${reviewId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching review with id ${reviewId}:`, error);
    throw new Error(`Failed to fetch review with id ${reviewId}`);
  }
};


export const createReview = async (newReview: Review) => {
  debugger;
  try {
    const response = await axios.post<Review>(baseURL, newReview, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating Review:', error);
    throw new Error('Failed to create Review');
  }
};

export const updateReview = async (ReviewId: string, updatedReview: Review) => {
  try {
    const response = await axios.put(`${baseURL}${ReviewId}`, updatedReview, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating Review:', error);
    throw new Error('Failed to update Review');
  }
};

export const deleteReview = async (ReviewId: string) => {
  debugger;
  try {
    const response = await axios.delete(`${baseURL}${ReviewId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }

    });
    return response.data;
  } catch (error) {
    console.error('Error deleting Review:', error);
    throw new Error('Failed to delete Review');
  }
};