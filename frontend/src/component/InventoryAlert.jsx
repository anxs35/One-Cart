import React, { useState, useContext } from 'react';
import { FiBell } from 'react-icons/fi';
import { authDataContext } from '../context/authContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const InventoryAlert = ({ productId, isOutOfStock }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { serverUrl } = useContext(authDataContext);

  const handleSubscribe = async () => {
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    try {
      const response = await axios.post(
        `${serverUrl}/api/alert/create`,
        { productId, email },
        { withCredentials: true }
      );
      if (response.data.success) {
        setIsSubscribed(true);
        toast.success('Alert created! We\'ll notify you when back in stock.');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to create alert');
    }
  };

  if (!isOutOfStock) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
      <div className="flex items-center gap-2 text-red-600 mb-3">
        <FiBell />
        <span className="font-medium">Out of Stock</span>
      </div>
      {!isSubscribed ? (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Get notified when this item is back in stock
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
            <button
              onClick={handleSubscribe}
              className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700"
            >
              Notify Me
            </button>
          </div>
        </div>
      ) : (
        <p className="text-green-600 text-sm">✓ You'll be notified when back in stock</p>
      )}
    </div>
  );
};

export default InventoryAlert;