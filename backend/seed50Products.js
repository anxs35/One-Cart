import mongoose from 'mongoose';
import Product from './model/productModel.js';
import dotenv from 'dotenv';

dotenv.config();

const productsData = [
  // ==========================================
  // MEN - TOPWEAR (8 Products)
  // ==========================================
  {
    name: "Men Classic Oxford Slim Fit Shirt",
    category: "Men",
    subCategory: "TopWear",
    price: 1499,
    sizes: ["S", "M", "L", "XL"],
    bestseller: true,
    stock: 45,
    description: "Crafted from 100% premium breathable cotton, this classic button-down Oxford shirt features a tailored slim fit, button-down collar, and durable stitching. Perfect for formal workdays and smart casual evenings.",
    image1: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Urban Minimalist Crewneck T-Shirt",
    category: "Men",
    subCategory: "TopWear",
    price: 799,
    sizes: ["S", "M", "L", "XL", "XXL"],
    bestseller: true,
    stock: 70,
    description: "An everyday wardrobe essential made with combed organic cotton. Features a tagless crew neckline, ribbed collar, and soft-washed finish for unmatched all-day comfort.",
    image1: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Vintage Plaid Flannel Casual Shirt",
    category: "Men",
    subCategory: "TopWear",
    price: 1699,
    sizes: ["M", "L", "XL", "XXL"],
    bestseller: false,
    stock: 35,
    description: "Soft brushed cotton flannel offering cozy warmth and effortless style. Designed with twin chest flap pockets, adjustable cuffs, and a timeless heritage plaid pattern.",
    image1: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Men Premium Pima Cotton Polo Shirt",
    category: "Men",
    subCategory: "TopWear",
    price: 1299,
    sizes: ["S", "M", "L", "XL"],
    bestseller: true,
    stock: 55,
    description: "Elevate your casual wear with this refined polo shirt knitted from extra-long staple Pima cotton. Tailored collar that won't curl, mother-of-pearl buttons, and split side hems.",
    image1: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Rugged Denim Casual Button-Down Shirt",
    category: "Men",
    subCategory: "TopWear",
    price: 1899,
    sizes: ["M", "L", "XL"],
    bestseller: false,
    stock: 28,
    description: "Sturdy mid-weight indigo washed denim shirt with western yoke detailing and snap buttons. A versatile layering piece that develops unique character over time.",
    image1: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Graphic Streetwear Oversized Tee",
    category: "Men",
    subCategory: "TopWear",
    price: 999,
    sizes: ["S", "M", "L", "XL", "XXL"],
    bestseller: false,
    stock: 60,
    description: "Trend-forward drop-shoulder oversized t-shirt featuring contemporary back typography print. Made from heavyweight 240 GSM organic cotton knit.",
    image1: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Pure Linen Breathable Resort Shirt",
    category: "Men",
    subCategory: "TopWear",
    price: 2199,
    sizes: ["M", "L", "XL"],
    bestseller: true,
    stock: 30,
    description: "Stay cool and sharp under the sun with 100% natural European flax linen. Features a relaxed camp collar and lightweight airy feel suitable for holidays and sunny weekends.",
    image1: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Classic Charcoal Heather Crewneck Tee",
    category: "Men",
    subCategory: "TopWear",
    price: 849,
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    stock: 50,
    description: "Versatile charcoal tee crafted from ultra-soft tri-blend fabric. Retains shape after repeated washes and offers moisture-wicking comfort for daily active lifestyles.",
    image1: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80"
  },

  // ==========================================
  // MEN - BOTTOMWEAR (6 Products)
  // ==========================================
  {
    name: "Men Slim-Fit Stretch Chino Trousers",
    category: "Men",
    subCategory: "BottomWear",
    price: 1799,
    sizes: ["30", "32", "34", "36"],
    bestseller: true,
    stock: 40,
    description: "Sleek flat-front chinos crafted from twill cotton infused with 2% elastane for seamless mobility. Features slant side pockets, rear buttoned welt pockets, and a modern tapered hem.",
    image1: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Vintage Washed Straight Leg Denim",
    category: "Men",
    subCategory: "BottomWear",
    price: 2499,
    sizes: ["30", "32", "34", "36"],
    bestseller: true,
    stock: 50,
    description: "Authentic 5-pocket denim jeans in a timeless straight cut. Built with heavy 13oz cotton denim with light whiskering and contrast copper rivets.",
    image1: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Multi-Pocket Tactical Cargo Pants",
    category: "Men",
    subCategory: "BottomWear",
    price: 1999,
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    stock: 35,
    description: "Functional utility cargo pants equipped with reinforced knee panels, deep bellows pockets, and an elasticized drawstring hem for customizable styling.",
    image1: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Everyday Comfort Terry Joggers",
    category: "Men",
    subCategory: "BottomWear",
    price: 1299,
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    stock: 65,
    description: "Ultra-comfy lounge and workout joggers crafted from French terry cotton. Features an elastic waistband with flat cords, cuffed ankles, and secure zipped pocket.",
    image1: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Tailored Pleated Formal Trousers",
    category: "Men",
    subCategory: "BottomWear",
    price: 2199,
    sizes: ["30", "32", "34", "36"],
    bestseller: false,
    stock: 25,
    description: "Impeccably tailored trousers made with wrinkle-resistant wool-poly blend fabric. Front double pleats and tapered silhouette create an elegant profile for business attire.",
    image1: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Men Dark Indigo Slim Fit Jeans",
    category: "Men",
    subCategory: "BottomWear",
    price: 2399,
    sizes: ["30", "32", "34", "36"],
    bestseller: false,
    stock: 40,
    description: "Deep indigo jeans made with stretch cotton denim. Retains its deep saturated color wash after wash and molds comfortably to your body contours.",
    image1: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80"
  },

  // ==========================================
  // MEN - WINTERWEAR (6 Products)
  // ==========================================
  {
    name: "Men Classic Leather Biker Jacket",
    category: "Men",
    subCategory: "WinterWear",
    price: 4499,
    sizes: ["M", "L", "XL"],
    bestseller: true,
    stock: 20,
    description: "Premium handcrafted faux leather jacket featuring asymmetric zip closure, metal hardware, zippered cuffs, and quilted shoulder padding. An iconic outerwear statement.",
    image1: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Textured Cable Knit Wool Sweater",
    category: "Men",
    subCategory: "WinterWear",
    price: 2299,
    sizes: ["S", "M", "L", "XL"],
    bestseller: true,
    stock: 35,
    description: "Thick and insulating fisherman's cable knit sweater woven from soft merino wool blend. Features a ribbed mock neck and cuffs to seal out chilly winds.",
    image1: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Ultra-Warm Quilted Puffer Jacket",
    category: "Men",
    subCategory: "WinterWear",
    price: 3499,
    sizes: ["M", "L", "XL", "XXL"],
    bestseller: false,
    stock: 30,
    description: "Engineered with water-repellent shell fabric and thermal microfiber insulation. Features a stand collar, fleece-lined hand pockets, and inner security pocket.",
    image1: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Heavyweight Fleece Pullover Hoodie",
    category: "Men",
    subCategory: "WinterWear",
    price: 1899,
    sizes: ["S", "M", "L", "XL", "XXL"],
    bestseller: false,
    stock: 45,
    description: "Plush 360 GSM brushed fleece hoodie with double-layer hood, kangaroo front pocket, and reinforced seam tape. Built for supreme warmth during cold evenings.",
    image1: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Tailored Wool Blend Overcoat",
    category: "Men",
    subCategory: "WinterWear",
    price: 4999,
    sizes: ["M", "L", "XL"],
    bestseller: false,
    stock: 18,
    description: "Sophisticated single-breasted overcoat tailored from an Italian wool blend. Features notch lapels, back walking vent, and satin interior lining.",
    image1: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Urban Flight Bomber Jacket",
    category: "Men",
    subCategory: "WinterWear",
    price: 2999,
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    stock: 25,
    description: "Classic military-inspired flight bomber jacket with weather-resistant nylon outer, safety orange inner lining, ribbed collar, and sleeve utility pocket.",
    image1: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80"
  },

  // ==========================================
  // WOMEN - TOPWEAR (8 Products)
  // ==========================================
  {
    name: "Women Elegant Silk Satin Blouse",
    category: "Women",
    subCategory: "TopWear",
    price: 1799,
    sizes: ["XS", "S", "M", "L"],
    bestseller: true,
    stock: 45,
    description: "Sumptuous silk satin blouse boasting a lustrous sheen, elegant draped neckline, and bishop sleeves. Seamlessly transitions from corporate meetings to candlelit dinners.",
    image1: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Bohemian Floral Print Peplum Top",
    category: "Women",
    subCategory: "TopWear",
    price: 1299,
    sizes: ["S", "M", "L", "XL"],
    bestseller: true,
    stock: 50,
    description: "Charming wildflower motif printed on airy georgette fabric. Designed with a smocked bodice, sweetheart neckline, and flattering flared peplum waist.",
    image1: "https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "High Fashion Designer Canary Top",
    category: "Women",
    subCategory: "TopWear",
    price: 1999,
    sizes: ["S", "M", "L"],
    bestseller: true,
    stock: 25,
    description: "Bold and vibrant contemporary top tailored with sculptural silhouettes and eye-catching chromatic tones. A standout centerpiece for high-fashion enthusiasts.",
    image1: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Classic Crisp Cotton Poplin Shirt",
    category: "Women",
    subCategory: "TopWear",
    price: 1499,
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    stock: 40,
    description: "A sharp, pristine white poplin shirt crafted from combed long-fiber cotton. Features a structured point collar, curved hemline, and relaxed contemporary fit.",
    image1: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Casual Chic Crewneck Fitted Tee",
    category: "Women",
    subCategory: "TopWear",
    price: 749,
    sizes: ["XS", "S", "M", "L", "XL"],
    bestseller: false,
    stock: 75,
    description: "Buttery soft modal-cotton blend jersey tee with a flattering snug silhouette. Pairs effortlessly with high-waisted denim and tailored blazers.",
    image1: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Ruffled Sleeve Bohemian Linen Tunic",
    category: "Women",
    subCategory: "TopWear",
    price: 1599,
    sizes: ["S", "M", "L"],
    bestseller: false,
    stock: 35,
    description: "Romantic breezy linen tunic accentuated with delicately ruffled sleeves, Mandarin split neck, and artisanal mother-of-pearl buttons.",
    image1: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Modern Chic Runway Editorial Top",
    category: "Women",
    subCategory: "TopWear",
    price: 2299,
    sizes: ["S", "M", "L"],
    bestseller: false,
    stock: 20,
    description: "Curated modern top inspired by Paris Fashion Week runways. Clean architectural lines, asymmetrical hem, and premium double-knit jacquard finish.",
    image1: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Minimalist Soft Ribbed Lounge Tank",
    category: "Women",
    subCategory: "TopWear",
    price: 699,
    sizes: ["XS", "S", "M", "L"],
    bestseller: false,
    stock: 55,
    description: "Ultra-breathable micro-ribbed sleeveless tank top. Stretches comfortably across the silhouette and serves as the ultimate base layer.",
    image1: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&w=800&q=80"
  },

  // ==========================================
  // WOMEN - BOTTOMWEAR (6 Products)
  // ==========================================
  {
    name: "High-Rise Wide Leg Linen Trousers",
    category: "Women",
    subCategory: "BottomWear",
    price: 1899,
    sizes: ["26", "28", "30", "32"],
    bestseller: true,
    stock: 35,
    description: "Flowy, dramatic wide-leg palazzo trousers constructed from pure flax linen blend. Features a high waistline with double front darts and deep side slip pockets.",
    image1: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Vintage High Waist Mom Fit Jeans",
    category: "Women",
    subCategory: "BottomWear",
    price: 2299,
    sizes: ["26", "28", "30", "32"],
    bestseller: true,
    stock: 45,
    description: "Retro 90s inspired high-rise jeans with a relaxed hip and tapered ankle. Heavyweight comfort-stretch denim in authentic stone-washed light blue.",
    image1: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "A-Line Pleated Flowy Midi Skirt",
    category: "Women",
    subCategory: "BottomWear",
    price: 1599,
    sizes: ["S", "M", "L"],
    bestseller: false,
    stock: 30,
    description: "Graceful accordion pleated midi skirt in a soft shimmering satin weave. Elastic waistband ensures custom comfortable fit while twirling or walking.",
    image1: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Tailored Slim Fit Ankle Pants",
    category: "Women",
    subCategory: "BottomWear",
    price: 1799,
    sizes: ["26", "28", "30", "32"],
    bestseller: false,
    stock: 38,
    description: "Crisp cigarette trousers that hit right at the ankle. Features clean pressed front creases, hidden side zip closure, and comfortable four-way stretch.",
    image1: "https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Distressed Boyfriend Denim Jeans",
    category: "Women",
    subCategory: "BottomWear",
    price: 2399,
    sizes: ["26", "28", "30", "32"],
    bestseller: false,
    stock: 28,
    description: "Effortlessly relaxed slouchy boyfriend jeans with tasteful knee abrasions and raw cut hems. 100% rigid premium cotton denim that softens over time.",
    image1: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Sculpting High-Waisted Seamless Leggings",
    category: "Women",
    subCategory: "BottomWear",
    price: 1199,
    sizes: ["XS", "S", "M", "L"],
    bestseller: false,
    stock: 60,
    description: "Non-sheer compressive workout and lifestyle leggings. High waistband provides firm core support without rolling down during intense movement.",
    image1: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80"
  },

  // ==========================================
  // WOMEN - WINTERWEAR (6 Products)
  // ==========================================
  {
    name: "Classic Belted Wool Trench Coat",
    category: "Women",
    subCategory: "WinterWear",
    price: 4599,
    sizes: ["S", "M", "L"],
    bestseller: true,
    stock: 22,
    description: "Timeless double-breasted long trench coat rendered in rich camel wool-blend. Complete with tortoiseshell buttons, storm flaps, and a matching fabric tie belt.",
    image1: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Cozy Chunky Knit Open Cardigan",
    category: "Women",
    subCategory: "WinterWear",
    price: 2199,
    sizes: ["S", "M", "L", "XL"],
    bestseller: true,
    stock: 40,
    description: "An oversized drop-shoulder cardigan knitted with plush, ultra-soft yarns. Large tortoise buttons and deep patch pockets make it the ultimate cozy fall layer.",
    image1: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Fleece Lined Sherpa Warm Hoodie",
    category: "Women",
    subCategory: "WinterWear",
    price: 1799,
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    stock: 45,
    description: "Ultra-snuggly sherpa fleece hoodie engineered for brisk weather. Featuring a soft satin-lined hood, ribbed cuffs, and an oversized relaxed cut.",
    image1: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Glossy Quilted Short Puffer Jacket",
    category: "Women",
    subCategory: "WinterWear",
    price: 3299,
    sizes: ["S", "M", "L"],
    bestseller: false,
    stock: 25,
    description: "Trendy cropped puffer jacket with high-shine lacquer finish. Insulated with lightweight vegan down filling and fitted with storm cuffs to lock in body warmth.",
    image1: "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Cashmere Blend Ribbed Turtleneck Sweater",
    category: "Women",
    subCategory: "WinterWear",
    price: 2799,
    sizes: ["S", "M", "L"],
    bestseller: false,
    stock: 30,
    description: "Decadently soft cashmere and superfine merino wool turtleneck. Lightweight yet exceptionally warm, perfect for layering beneath tailored blazers and long coats.",
    image1: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Relaxed V-Neck Wool Knit Pullover",
    category: "Women",
    subCategory: "WinterWear",
    price: 2099,
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    stock: 35,
    description: "Versatile V-neck pullover crafted from boiled wool and alpaca blend. Dropped shoulders and ribbed trims deliver relaxed elegance for everyday chill.",
    image1: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=800&q=80"
  },

  // ==========================================
  // KIDS - TOPWEAR (4 Products)
  // ==========================================
  {
    name: "Kids Vibrant Graphic Cotton T-Shirt",
    category: "Kids",
    subCategory: "TopWear",
    price: 599,
    sizes: ["S", "M", "L", "XL"],
    bestseller: true,
    stock: 60,
    description: "100% hypoallergenic soft cotton tee featuring fun, fade-resistant water-based graphic art. Durable double-stitched hems ready for active playground adventures.",
    image1: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Kids Striped Cotton Pique Polo",
    category: "Kids",
    subCategory: "TopWear",
    price: 699,
    sizes: ["S", "M", "L"],
    bestseller: false,
    stock: 45,
    description: "Classic sporty polo shirt with bold horizontal nautical stripes. Breathable pique knit keeps kids comfortable and looking sharp for birthday parties and school events.",
    image1: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Kids Cheerful Cartoon Crewneck Tee",
    category: "Kids",
    subCategory: "TopWear",
    price: 499,
    sizes: ["S", "M", "L"],
    bestseller: true,
    stock: 70,
    description: "Delightful cheerful everyday tee made from pre-shrunk organic cotton. Soft ribbed collar stretches gently over little heads for hassle-free dressing.",
    image1: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Kids Checked Casual Button Shirt",
    category: "Kids",
    subCategory: "TopWear",
    price: 849,
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    stock: 40,
    description: "Charming mini-gingham checked shirt crafted from lightweight breathable poplin cotton. Features roll-up button tabs on sleeves for adaptable outdoor play.",
    image1: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80"
  },

  // ==========================================
  // KIDS - BOTTOMWEAR (3 Products)
  // ==========================================
  {
    name: "Kids Durable Stretch Denim Jeans",
    category: "Kids",
    subCategory: "BottomWear",
    price: 1199,
    sizes: ["S", "M", "L", "XL"],
    bestseller: true,
    stock: 50,
    description: "Rugged yet ultra-flexible stretch denim with reinforced bar-tacked pockets and an internal adjustable buttonhole waistband to grow with your child.",
    image1: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Kids Active Cotton Fleece Joggers",
    category: "Kids",
    subCategory: "BottomWear",
    price: 899,
    sizes: ["S", "M", "L"],
    bestseller: false,
    stock: 55,
    description: "Super soft brushed fleece joggers with ribbed ankle cuffs and an elastic drawstring waist. Made to withstand running, jumping, and everyday playtime.",
    image1: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Kids Lightweight Cotton Cargo Shorts",
    category: "Kids",
    subCategory: "BottomWear",
    price: 799,
    sizes: ["S", "M", "L"],
    bestseller: false,
    stock: 45,
    description: "Breathable ripstop cotton shorts featuring side velcro cargo pockets for storing little treasures. Elastic waistband for effortless pulling on and off.",
    image1: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80"
  },

  // ==========================================
  // KIDS - WINTERWEAR (3 Products)
  // ==========================================
  {
    name: "Kids Cozy Hooded Winter Parka",
    category: "Kids",
    subCategory: "WinterWear",
    price: 1899,
    sizes: ["S", "M", "L"],
    bestseller: true,
    stock: 35,
    description: "Water-resistant padded winter jacket equipped with a cozy fleece lining and faux-fur trimmed hood. High-visibility reflective safety tabs on rear.",
    image1: "https://images.unsplash.com/photo-1514315384763-ba401779410f?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Kids Colorblocked Warm Fleece Hoodie",
    category: "Kids",
    subCategory: "WinterWear",
    price: 1299,
    sizes: ["S", "M", "L", "XL"],
    bestseller: false,
    stock: 50,
    description: "Vibrant multi-color blocked pullover hoodie made from thick anti-pill polar fleece. Cozy front pouch pocket keeps little hands warm on crisp mornings.",
    image1: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1514315384763-ba401779410f?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Kids Cute Knitted Animal Ears Sweater",
    category: "Kids",
    subCategory: "WinterWear",
    price: 1099,
    sizes: ["S", "M", "L"],
    bestseller: false,
    stock: 40,
    description: "Adorable crewneck sweater crafted from non-itchy cotton wool yarn. Adorned with playful knit 3D animal ear accents and ribbed cuffs.",
    image1: "https://images.unsplash.com/photo-1514315384763-ba401779410f?auto=format&fit=crop&w=800&q=80",
    image2: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
    image3: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=80",
    image4: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80"
  }
];

const seed50Products = async () => {
  try {
    const mongoUri = process.env.MONGODB_URL || 'mongodb://localhost:27017/OneCart';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB at:', mongoUri);

    // Clear previous products to have exactly 50 curated items
    await Product.deleteMany({});
    console.log('Cleared existing products.');

    const now = Date.now();
    const formattedProducts = productsData.map((item, index) => ({
      ...item,
      date: now - (index * 1000 * 60 * 30), // Staggered by 30 mins each
    }));

    console.log(`Preparing to insert exactly ${formattedProducts.length} curated products...`);

    const result = await Product.insertMany(formattedProducts);
    console.log(`Successfully added ${result.length} products to OneCart!`);

    const categorySummary = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);
    console.log('Category distribution:');
    categorySummary.forEach(c => console.log(`  - ${c._id}: ${c.count} items`));

    const subCategorySummary = await Product.aggregate([
      { $group: { _id: "$subCategory", count: { $sum: 1 } } }
    ]);
    console.log('Sub-Category distribution:');
    subCategorySummary.forEach(s => console.log(`  - ${s._id}: ${s.count} items`));

    const totalCount = await Product.countDocuments();
    console.log('Total products in database:', totalCount);

    process.exit(0);
  } catch (error) {
    console.error('Error inserting products:', error);
    process.exit(1);
  }
};

seed50Products();
