import React, { useState } from 'react';
import assets from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
const Add = ({token}) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  
  const [category, setCategory] = useState("man");
  const [subCategory, setSubCategory] = useState("shalwar");
  const [bestseller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
     
    }
  }
const onSubmitHandler = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("bestseller", bestseller);
    formData.append("sizes", JSON.stringify(sizes)); // stringified array
    if (image) formData.append("image", image);


    const response = await axios.post(
      backendUrl + "/api/product/add",
      formData,
      {
        headers: {
          token: token 
        }
        
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      setName('');
      setDescription('');
      setImage(null);
      setPrice('');
      
      setCategory('man');
      setSubCategory('shalwar');
      setBestSeller(false);
      setSizes([]);
    } else {
      toast.error(response.data.message);
    }

  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || error.message);
  }
};

    
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>

      {/* Image Upload */}
      <div className='mb-2'>
        <p>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor='image'>
            <img
              className='w-30 h-30 bg-gray-300 rounded-2xl object-cover cursor-pointer'
              src={image ? URL.createObjectURL(image) : assets.upload}
              alt='Upload preview'
            />
          </label>
          <input
            id='image'
            type='file'
            accept='image/*'
            hidden
            onChange={handleImageChange}
          />
        </div>
      </div>

      {/* Name */}
      <div className='w-full'>
        <p className='mb-2'>Product Name</p>
        <input
          className='w-full max-w-[600px] px-3 py-2 border-2 border-b-gray-950'
          type='text'
          placeholder='Type Here'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Description */}
      <div className='w-full'>
        <p className='mb-2'>Product Description</p>
        <textarea
          className='w-full max-w-[600px] px-3 py-2 border-2 border-b-gray-950'
          placeholder='Write Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      {/* Category & Subcategory & Price */}
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product Category</p>
          <select 
            className='w-full px-3 py-2'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="man">Men</option>
            <option value="woman">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Product SubCategory</p>
          <select
            className='w-full px-3 py-2'
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="shalwar">Shalwar Qameez</option>
            <option value="kurti">Kurti</option>
            <option value="sweater">Sweater</option>
            <option value='shoes'>Shoes</option>
            <option value='perfume'>Perfume</option>
          </select>
        </div>

        <div className='mb-3'>
          <p className='mb-2'>Product Price</p>
          <input
            className='w-full px-2 py-2 sm:w-[120px]'
            type='number'
            placeholder='300'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
        <div onClick={()=> setSizes(prev => prev.includes('S')? prev.filter(item=>item !== "S"):[...prev,"S"])}>
 <p className={`${sizes.includes("S") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
         </div>
           <div onClick={()=> setSizes(prev => prev.includes('M')? prev.filter(item=>item !== "M"):[...prev,"M"])}>
 <p className={`${sizes.includes("M") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
         </div>
           <div onClick={()=> setSizes(prev => prev.includes('L')? prev.filter(item=>item !== "L"):[...prev,"L"])}>
 <p className={`${sizes.includes("L") ? "bg-pink-300" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
         </div>
          </div>
      </div>

      {/* Bestseller */}
      <div className='flex items-center gap-2 mt-2'>
        <input
          type='checkbox'
          id='bestseller'
          checked={bestseller}
          onChange={() => setBestSeller(prev=> !prev) }
        />
        <label className='cursor-pointer' htmlFor='bestseller'>
          Add to BestSeller
        </label>
      </div>

      {/* Submit */}
      <button
        type='submit'
        className='w-28 py-3 mt-4 bg-black text-white'
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
