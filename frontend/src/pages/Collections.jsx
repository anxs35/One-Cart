import React, { useContext, useEffect, useState } from 'react';
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../component/Card';
import { FaFilter, FaTimes, FaChevronDown } from "react-icons/fa";

function Collections() {
    let [showFilter, setShowFilter] = useState(false);
    let { products, search, showSearch } = useContext(shopDataContext);
    let [filterProduct, setFilterProduct] = useState([]);
    let [category, setCategory] = useState([]);
    let [subCategory, setSubCategory] = useState([]);
    let [sortType, setSortType] = useState("relevant");

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value));
        } else {
            setCategory(prev => [...prev, e.target.value]);
        }
    };

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value));
        } else {
            setSubCategory(prev => [...prev, e.target.value]);
        }
    };

    const applyFilter = () => {
        let productCopy = products.slice();

        if (showSearch && search) {
            productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        }
        if (category.length > 0) {
            productCopy = productCopy.filter(item => category.includes(item.category));
        }
        if (subCategory.length > 0) {
            productCopy = productCopy.filter(item => subCategory.includes(item.subCategory));
        }
        setFilterProduct(productCopy);
    };

    const sortProducts = () => {
        let fbCopy = filterProduct.slice();

        switch (sortType) {
            case 'low-high':
                setFilterProduct(fbCopy.sort((a, b) => (a.price - b.price)));
                break;
            case 'high-low':
                setFilterProduct(fbCopy.sort((a, b) => (b.price - a.price)));
                break;
            default:
                applyFilter();
                break;
        }
    };

    useEffect(() => {
        sortProducts();
    }, [sortType]);

    useEffect(() => {
        setFilterProduct(products);
    }, [products]);

    useEffect(() => {
        applyFilter();
    }, [category, subCategory, search, showSearch]);

    // Shared Filter Content Component
    const FilterContent = () => (
        <div className="space-y-6">
            {/* Categories Filter */}
            <div className='border border-slate-200 p-4 rounded-lg bg-white shadow-sm'>
                <p className='text-lg font-semibold text-slate-700 mb-3'>CATEGORIES</p>
                <div className='space-y-2'>
                    {['Men', 'Women', 'Kids'].map((cat) => (
                        <label key={cat} className='flex items-center gap-3 text-base text-slate-600 hover:text-blue-600 cursor-pointer'>
                            <input type="checkbox" value={cat} checked={category.includes(cat)} className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500' onChange={toggleCategory} /> {cat}
                        </label>
                    ))}
                </div>
            </div>

            {/* Sub-Categories Filter */}
            <div className='border border-slate-200 p-4 rounded-lg bg-white shadow-sm'>
                <p className='text-lg font-semibold text-slate-700 mb-3'>SUB-CATEGORIES</p>
                <div className='space-y-2'>
                    {['TopWear', 'BottomWear', 'WinterWear'].map((sub) => (
                        <label key={sub} className='flex items-center gap-3 text-base text-slate-600 hover:text-blue-600 cursor-pointer'>
                            <input type="checkbox" value={sub} checked={subCategory.includes(sub)} className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500' onChange={toggleSubCategory} /> {sub}
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className='w-full min-h-screen bg-slate-50 flex flex-col lg:flex-row pt-24 lg:pt-20'>

            {/* Mobile Filter Drawer (Overlay) */}
            <div className={`fixed inset-0 z-50 lg:hidden ${showFilter ? 'visible' : 'invisible'}`}>
                {/* Backdrop */}
                <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${showFilter ? 'opacity-100' : 'opacity-0'}`} onClick={() => setShowFilter(false)}></div>

                {/* Drawer Content */}
                <div className={`absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-white p-6 shadow-xl transform transition-transform duration-300 ${showFilter ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto`}>
                    <div className='flex justify-between items-center mb-8'>
                        <h2 className='text-2xl font-bold text-slate-800'>Filters</h2>
                        <button onClick={() => setShowFilter(false)} className='p-2 hover:bg-slate-100 rounded-full transition-colors'>
                            <FaTimes className='text-xl text-slate-600' />
                        </button>
                    </div>
                    <FilterContent />
                </div>
            </div>

            {/* Desktop Sidebar */}
            <aside className='hidden lg:block w-[20vw] bg-white p-6 border-r border-slate-200 fixed h-full top-20 left-0 overflow-y-auto z-10'>
                <div className='flex items-center gap-2 mb-6'>
                    <FaFilter className='text-slate-400' />
                    <h2 className='text-xl font-bold text-slate-800 tracking-wide'>FILTERS</h2>
                </div>
                <FilterContent />
            </aside>

            {/* Main Content */}
            <main className='w-full lg:w-[80vw] lg:ml-[20vw] px-4 sm:px-6 lg:px-8 pb-10'>
                <div className='flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 sticky top-20 lg:static z-40 bg-slate-50 py-4'>
                    <Title text1={"ALL"} text2={"COLLECTIONS"} />

                    <div className='flex items-center gap-4 w-full sm:w-auto'>
                        {/* Mobile Filter Trigger */}
                        <button
                            className='lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium hover:border-blue-500 hover:text-blue-600 transition-all flex-1 sm:flex-none justify-center'
                            onClick={() => setShowFilter(true)}
                        >
                            <FaFilter className='text-sm' /> Filters
                        </button>

                        {/* Sort Select */}
                        <select
                            name="sort"
                            id="sort"
                            className='flex-1 sm:flex-none w-full sm:w-52 h-11 px-4 bg-white border border-slate-300 rounded-lg text-slate-700 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none cursor-pointer hover:border-slate-400 transition-all'
                            onChange={(e) => setSortType(e.target.value)}
                        >
                            <option value="relevant">Sort By: Relevant</option>
                            <option value="low-high">Sort By: Price Low to High</option>
                            <option value="high-low">Sort By: Price High to Low</option>
                        </select>
                    </div>
                </div>

                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-8'>
                    {filterProduct.map((item, index) => (
                        <Card key={index} id={item._id} name={item.name} price={item.price} image={item.image1} stock={item.stock} />
                    ))}
                </div>
            </main>
        </div>
    );
}

export default Collections;