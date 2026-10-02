import React, { useContext, useState } from 'react';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const StockMigration = () => {
  const [loading, setLoading] = useState(false);
  const { serverUrl } = useContext(authDataContext);

  const updateStock = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${serverUrl}/api/migration/update-stock`, {}, {
        withCredentials: true
      });
      
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Migration failed');
    }
    setLoading(false);
  };

  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h3 className="text-lg font-semibold text-yellow-800 mb-2">Stock Migration</h3>
      <p className="text-sm text-yellow-700 mb-3">
        Update existing products with default stock quantity (50 items)
      </p>
      <button
        onClick={updateStock}
        disabled={loading}
        className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 disabled:opacity-50"
      >
        {loading ? 'Updating...' : 'Update Stock for Existing Products'}
      </button>
    </div>
  );
};

export default StockMigration;