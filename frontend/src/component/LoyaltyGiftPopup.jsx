import React, { useState, useEffect } from 'react';
import { FiGift, FiStar, FiX } from 'react-icons/fi';

const LoyaltyGiftPopup = ({ isVisible, points, onClose }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setAnimate(true);
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`bg-white rounded-2xl p-8 max-w-sm mx-4 text-center transform transition-all duration-500 ${
        animate ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
      }`}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <FiX size={20} />
        </button>
        
        <div className="relative mb-6">
          <div className={`text-6xl transform transition-all duration-1000 ${
            animate ? 'rotate-12 scale-110' : 'rotate-0 scale-100'
          }`}>
            🎁
          </div>
          <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2 animate-bounce">
            <FiStar className="text-white" size={16} />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Congratulations! 🎉
        </h2>
        
        <p className="text-gray-600 mb-4">
          You've earned
        </p>
        
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-4 mb-4">
          <div className="text-3xl font-bold">{points}</div>
          <div className="text-sm opacity-90">Loyalty Points</div>
        </div>
        
        <p className="text-sm text-gray-500">
          Keep shopping to earn more rewards!
        </p>
        
        <div className="mt-6">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Awesome!
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoyaltyGiftPopup;