import React, { useState, useContext, useEffect } from 'react';
import { FiStar, FiGift, FiRefreshCw } from 'react-icons/fi';
import { authDataContext } from '../context/authContext';
import axios from 'axios';

const LoyaltyPoints = ({ refreshTrigger }) => {
  const [loyalty, setLoyalty] = useState({ points: 0, level: 'Bronze', totalEarned: 0 });
  const [loading, setLoading] = useState(false);
  const { serverUrl } = useContext(authDataContext);

  useEffect(() => {
    fetchLoyaltyPoints();
  }, [refreshTrigger]);

  const fetchLoyaltyPoints = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${serverUrl}/api/loyalty/get`,
        {},
        { withCredentials: true }
      );
      console.log('Loyalty response:', response.data);
      if (response.data.success) {
        setLoyalty(response.data.loyalty);
      }
    } catch (error) {
      console.log('Loyalty fetch error:', error);
    }
    setLoading(false);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Gold': return 'text-yellow-600 bg-yellow-100';
      case 'Silver': return 'text-gray-600 bg-gray-100';
      default: return 'text-orange-600 bg-orange-100';
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <FiGift /> Loyalty Points
            <button 
              onClick={fetchLoyaltyPoints}
              className="text-white/80 hover:text-white"
              disabled={loading}
            >
              <FiRefreshCw className={loading ? 'animate-spin' : ''} size={16} />
            </button>
          </h3>
          <p className="text-2xl font-bold">{loyalty.points || 0}</p>
          <p className="text-xs opacity-75">Total Earned: {loyalty.totalEarned || 0}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(loyalty.level)}`}>
          <FiStar className="inline mr-1" />
          {loyalty.level || 'Bronze'}
        </div>
      </div>
      <div className="mt-2 text-sm opacity-90">
        Earn points with every purchase!
      </div>
    </div>
  );
};

export default LoyaltyPoints;