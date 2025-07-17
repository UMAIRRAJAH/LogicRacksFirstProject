import React, { useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import assets from '../assets/products';
import RelatedProduct from '../components/RelatedProduct';


const Product = () => {
  
  const { productId } = useParams();
  
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    if (!productId || !products || products.length === 0) return;

    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  }, [productId, products]);

  if (!productId) {
    return <div>Product ID not found in URL.</div>;
  }

  if (!productData) {
    return <div>Loading product...</div>;
  }

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Rest of your JSX */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Image Section */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                onClick={() => setImage(item)}
                className={`cursor-pointer w-[26%] sm:w-full sm:mb-3 flex-shrink-0`}
                alt={`Thumbnail ${index}`}
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="Selected" />
          </div>
        </div>
        {/* Product Info Section */}
        <div className='flex-1'>
          <h1 className='font-medium 2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            {/* Star Ratings */}
            <img src={assets.starIcons} alt='' className='w-3 6'/>
            <img src={assets.starIcons} alt='' className='w-3 6'/>
            <img src={assets.starIcons} alt='' className='w-3 6'/>
            <img src={assets.starIcons} alt='' className='w-3 6'/>
            <img src={assets.starIconsWhite} alt='' className='w-3 6'/>
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-6 text-xl font-medium'>
            {currency}{productData.price}
          </p>
          <p className='mt-6 text-gray-500 md:w-4/5'>
            {productData.description}
          </p>
          <div className='flex flex-col gap-4 my-auto'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-600' : 'border-transparent'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className='bg-black text-white px-8 py-3 mt-3 text-sm active:bg-gray-700 top-2'
          >
            ADD To Cart
          </button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product</p>
            <p>Cash on Delivery is available</p>
            <p>Easy return and Exchange Policy within 7 Days</p>
          </div>
        </div>
      </div>
      {/* Description Section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border-gray-900 px-5 py-3 text-sm'>Description</b>
          <p className='border-gray-900 px-5 py-3 text-sm'>Reviews(122)</p>
        </div>
        <div className='flex flex-col gap-4 border-gray-900 px-6 py-6 text-sm text-gray-600'>
          <p>Discover a vibrant online marketplace where buyers and sellers connect to trade top-quality products from all categories—fashion, electronics, home décor, beauty, and more. Whether you're looking for the latest trends, daily essentials, or exclusive offers, Rajah's Apparel brings you a seamless, secure, and personalized shopping experience.</p>
          <p>🔥 Popular Products & Bestsellers</p>
          <p>🚚 Fast & Reliable Delivery Nationwide</p>
          <p>💳 Secure Payments & Easy Returns</p>
          <p>🎁 Exciting Deals, Flash Sales & Seasonal Discounts</p>
        </div>
      </div>
      {/* Related Products */}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory}/>
    </div>
  );
};

export default Product;