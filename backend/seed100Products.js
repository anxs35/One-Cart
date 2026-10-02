import mongoose from 'mongoose';
import Product from './model/productModel.js';
import dotenv from 'dotenv';

dotenv.config();

const categories = ['Men', 'Women', 'Kids'];
const subCategories = ['Topwear', 'Bottomwear', 'Winterwear', 'Footwear'];
const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

const adjectives = ['Stylish', 'Comfortable', 'Premium', 'Classic', 'Modern', 'Casual', 'Elegant', 'Sporty', 'Trendy', 'Vintage'];
const items = ['T-Shirt', 'Jeans', 'Jacket', 'Sneakers', 'Sweater', 'Dress', 'Shorts', 'Hoodie', 'Trousers', 'Shirt'];

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomSizes() {
    const numSizes = Math.floor(Math.random() * 4) + 1; // 1 to 4 sizes
    const shuffled = [...sizes].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numSizes);
}

const generateProducts = () => {
    const products = [];
    const now = Date.now();
    for (let i = 1; i <= 100; i++) {
        const category = getRandomItem(categories);
        const subCategory = getRandomItem(subCategories);
        const name = `${getRandomItem(adjectives)} ${getRandomItem(items)} ${i}`;
        
        products.push({
            name,
            image1: `https://picsum.photos/seed/${now + i}1/800/800`,
            image2: `https://picsum.photos/seed/${now + i}2/800/800`,
            image3: `https://picsum.photos/seed/${now + i}3/800/800`,
            image4: `https://picsum.photos/seed/${now + i}4/800/800`,
            description: `This is a high-quality, ${name.toLowerCase()} perfect for any occasion. Made with premium materials for maximum comfort and durability. Grab yours today!`,
            price: Math.floor(Math.random() * 5000) + 500, // Price between 500 and 5500
            category,
            subCategory,
            sizes: getRandomSizes(),
            date: now + i,
            bestseller: Math.random() > 0.8, // 20% chance of being a bestseller
            stock: Math.floor(Math.random() * 100) + 10, // Stock between 10 and 110
        });
    }
    return products;
};

const seedDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/OneCart');
        console.log('Connected to MongoDB');
        
        const products = generateProducts();
        
        await Product.insertMany(products);
        console.log('100 products successfully inserted!');
        
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedDB();
