
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const ShopContext= createContext();
const ShopContextProvider =(props) =>{

    const currency ='AED  ';
    const delivery_fees=10;
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [search,setSearch]=useState('');
    const [showSearch,setShowSearch]=useState(true)
    const [cartItems,setCartItems] =useState([]);
    const[ products,setProducts]=useState([])
    const [token,setToken]=useState('')
    const navigate = useNavigate(); 
    const [userId, setUserId] = useState(localStorage.getItem('userId') || '');


   const addToCart =async (itemId,size)=>{
    if(!size){
        toast.error('Select Products')
        return;
    }
    let cartData= structuredClone(cartItems); 
    if(cartData[itemId]){
        if(cartData[itemId][size]){
            cartData[itemId][size]+=1;

        }else{
            cartData[itemId][size]=1;
        }
    
    }else{
        cartData[itemId]={};
        cartData[itemId][size]=1;
    }
    setCartItems(cartData)
    // console.log(cartData)

if(token){

    try {
         await axios.post(backendUrl + '/api/cart/add', { itemId, size}, {
  headers: {Authorization: `Bearer ${token}`}

});

    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
}
}
const getCartCount=()=>{
    let totalCount =0;
    for(const items in cartItems){
        for(const item in cartItems[items]){
           
                if(cartItems[items][item]>0){
                    totalCount+=cartItems[items][item];
                }
            }
        } return totalCount;
    } 
   

const getCartAmount = () => {
  let total = 0;
  for (const itemId in cartItems) {
    for (const size in cartItems[itemId]) {
      const product = products.find(p => p._id === itemId);
      if (product) {
        total += product.price * cartItems[itemId][size];
      }
    }
  }
  return total;
};


 

const updateCartQuantity= async(itemId,size,quantity)=>{
    let cartData=structuredClone(cartItems);
    cartData[itemId][size]=quantity;
    setCartItems(cartData)
    if(token){
        try {
           await axios.post(
  backendUrl + '/api/cart/update',
  { itemId, size,quantity},
  {
    headers: {Authorization: `Bearer ${token}`}
  }
);

        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }
    }
}
const getUserCart = async (token) => {
  const userId = JSON.parse(atob(token.split('.')[1])).id;

  try {
    const response = await axios.post(
      backendUrl + '/api/cart/get',
      { userId }, // <-- send userId here
      {
        headers: {
       Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.success) {
      setCartItems(response.data.cartData);
    }
  } catch (error) {
    console.error("Cart fetch error:", error);
    toast.error(error.response?.data?.message || error.message);
  }
};

useEffect(()=>
{
console.log(cartItems)
},[cartItems])



useEffect(() => {
  const savedToken = localStorage.getItem('token');
  if (!token && savedToken) {
    setToken(savedToken);
    getUserCart(savedToken); 
  }
}, [token]);

const getProductData = async () => {
  try {
    const token = localStorage.getItem('token'); // optional

    const response = await axios.get(backendUrl + '/api/product/list', {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    if (response.data.products) {
      setProducts(response.data.products);
    } else {
      toast.error(response.data.message || 'No products found');
    }
  } catch (error) {
    console.error("Product fetch error:", error);
    toast.error(error.response?.data?.message || 'Error fetching products');
  }
};



useEffect(() => {
  getProductData();
}, []);


    const value ={

        products,currency,delivery_fees,
       search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,addToCart,
    getCartAmount,
    updateCartQuantity,
    getCartCount,
    navigate,
    setCartItems,
    backendUrl,
    token,
      userId,          
  setUserId     ,
    setToken
    }
    return(
        <ShopContext.Provider value={value} >
        {props.children}
        </ShopContext.Provider>
    )
}

    
export default ShopContextProvider;
