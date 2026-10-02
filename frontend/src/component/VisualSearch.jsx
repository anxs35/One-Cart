import React, { useRef, useContext, useState } from 'react';
import { IoCameraOutline } from "react-icons/io5";
import { shopDataContext } from '../context/ShopContext';
import { authDataContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const VisualSearch = () => {
  const fileInputRef = useRef(null);
  const { setSearch, setShowSearch } = useContext(shopDataContext);
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate image
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    setIsAnalyzing(true);
    const toastId = toast.loading("Analyzing image with AI...");

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(`${serverUrl}/api/ai/visual-search`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        const { keywords } = response.data;
        const searchString = keywords.join(' ');

        toast.update(toastId, { render: "Found: " + keywords.slice(0, 2).join(", "), type: "success", isLoading: false, autoClose: 3000 });

        // Set the search context and navigate
        setSearch(keywords[0]); // Use the first/most relevant keyword
        setShowSearch(true);
        navigate('/collection');
      } else {
        toast.update(toastId, { render: "Could not identify products", type: "error", isLoading: false, autoClose: 3000 });
      }
    } catch (error) {
      console.error("Visual Search Error:", error);
      toast.update(toastId, { render: "Visual Analysis Failed", type: "error", isLoading: false, autoClose: 3000 });
    } finally {
      setIsAnalyzing(false);
      // Reset input
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="relative">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <button
        onClick={handleIconClick}
        disabled={isAnalyzing}
        className={`flex items-center justify-center p-2 text-gray-600 hover:text-accent transition-colors hover:scale-110 ${isAnalyzing ? 'animate-pulse' : ''}`}
        title="Search with Image (AI)"
      >
        <IoCameraOutline className="w-7 h-7" />
      </button>
    </div>
  );
};

export default VisualSearch;