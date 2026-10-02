import React, { useState, useContext, useEffect } from 'react';
import { FiHeart, FiShare2 } from 'react-icons/fi';
import { authDataContext } from '../context/authContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Wishlist = ({ productId, isInWishlist, onToggle }) => {
  const { serverUrl } = useContext(authDataContext);
  const [shareUrl, setShareUrl] = useState('');

  const handleWishlistToggle = async () => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/wishlist/add`,
        { productId },
        { withCredentials: true }
      );
      if (response.data.success) {
        onToggle();
        toast.success('Added to wishlist!');
      }
    } catch (error) {
      toast.error('Failed to add to wishlist');
    }
  };

  const handleShare = async () => {
    try {
      const response = await axios.post(
        `${serverUrl}/api/wishlist/share`,
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        const url = `${window.location.origin}/wishlist/${response.data.shareId}`;
        setShareUrl(url);
        navigator.clipboard.writeText(url);
        toast.success('Wishlist link copied!');
      }
    } catch (error) {
      toast.error('Failed to share wishlist');
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleWishlistToggle}
        className={`p-2 rounded-full ${
          isInWishlist ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
        } hover:bg-red-200`}
      >
        <FiHeart className={isInWishlist ? 'fill-current' : ''} />
      </button>
      <button
        onClick={handleShare}
        className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
      >
        <FiShare2 />
      </button>
    </div>
  );
};

export default Wishlist;