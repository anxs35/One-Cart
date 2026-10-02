import React, { useState, useEffect, useContext } from 'react';
import { FiTrendingUp } from 'react-icons/fi';
import { shopDataContext } from '../context/ShopContext';
import axios from 'axios';
import { authDataContext } from '../context/authContext';

const SmartRecommendations = ({ currentProductId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const { products, currency } = useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);

  useEffect(() => {
    if (products.length > 0) {
      generateRecommendations();
    }
  }, [currentProductId, products]);

  const generateRecommendations = async () => {
    try {
      // If we have a product ID, ask for specific related items. 
      // If not (e.g. Home page), we could ask for "general" or "trending" 
      // For now, let's keep the API call consistent, backend can handle missing ID
      const response = await axios.post(`${serverUrl}/api/ai/recommend`, { productId: currentProductId });
      if (response.data.success) {
        setRecommendations(response.data.recommendations);
      } else {
        fallbackRecommendations();
      }
    } catch (error) {
      console.error("Create Recommendation Error", error);
      fallbackRecommendations();
    }
  };

  const fallbackRecommendations = () => {
    const filtered = products
      .filter(product => !currentProductId || product._id !== currentProductId)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    setRecommendations(filtered);
  }

  if (recommendations.length === 0) return null;

  return (
    <div className="mt-8 my-10">
      <h3 className="text-3xl font-medium text-center mb-10 flex items-center justify-center gap-2">
        <FiTrendingUp className="text-gray-700" />
        <span className="text-gray-700">RECOMMENDED FOR YOU</span>
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-6">
        {recommendations.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer group">
            <div className="overflow-hidden">
              <img
                src={product.image1 || product.image?.[0]}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <h4 className="font-medium text-sm truncate text-gray-800">{product.name}</h4>
              <p className="text-gray-600 font-medium text-sm mt-1">
                {currency} {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartRecommendations;