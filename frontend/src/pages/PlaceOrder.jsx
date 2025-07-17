import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/cartTotal'
import { ShopContext } from '../Context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
    const navigate = useNavigate();
    const { backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products,userId } = useContext(ShopContext)

    const [method, setMethod] = useState('cod');
    const [formData,setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

 const onSubmitHandler = async (event) => {
  event.preventDefault();
  if (!token || !userId) {
  toast.error("Please log in to place an order.");
  sessionStorage.setItem("resumeCheckout", "true");
  navigate('/login'); // or show modal instead
  return;
}

  const cartAmount = Number(getCartAmount()) || 0;
  const deliveryFee = delivery_fee || 0;
  const totalAmount = cartAmount + deliveryFee;
console.log("Cart Amount:", getCartAmount());
console.log("Delivery Fee:", delivery_fee);
  if (totalAmount <= 0) {
    toast.error("Invalid total amount.");
    return;
  }

  try {
    let orderItems = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          const product = products.find(product => product._id === items);
          if (product) {
            orderItems.push({
              _id: product._id,
              name: product.name,
              description: product.description,
              price: product.price,
              image: product.image,
              category: product.category,
              subCategory: product.subCategory,
              sizes: product.sizes,
              bestseller: product.bestseller,
              date: product.date,
              size: item,
            userId: userId,
              quantity: cartItems[items][item],
            });
          }
        }
      }
    }

    const orderData = {
  userId:userId,
   // This must be a string (ObjectId from MongoDB)
  email: formData.email, // Email string (not the entire formData!)
  address: {

    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email, // Include it again inside address if needed by schema
    street: formData.street,
    city: formData.city,
    state: formData.state,
    zipcode: formData.zipcode,
    country: formData.country,
    phone: formData.phone,
  },
  
  items: orderItems, 
  amount: totalAmount,
  paymentMethod: method
};
// eslint-disable-next-line no-undef
console.log("User ID:", userId)

    let response;

    switch (method) {
     
      case 'cod':
        response = await axios.post(
          backendUrl + "/api/order/place",
          orderData,
          { headers: {  Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          setCartItems({});
          navigate('/orders');
          toast.success("Order placed successfully!");
        } else {
          toast.error(response.data.message || "Failed to place order");
        }
        break;

      case 'stripe':
        response = await axios.post(
          backendUrl + "/api/order/stripe",orderData,
         {
  headers: {
    token: localStorage.getItem("token")
  }
}
        );

        if (response.data.success && response.data.checkoutUrl) {
          window.location.href = response.data.checkoutUrl;
        } else {
          toast.error(response.data.message || "Stripe session creation failed");
        }
        break;

      default:
        toast.error("Invalid payment method.");
    }

  } catch (error) {
    console.error("Order placement error:", error);
    if (error.response) {
      toast.error(error.response.data.message || "Failed to place order");
    } else if (error.request) {
      toast.error("No response from server. Please try again.");
    } else {
      toast.error("Error setting up request. Please try again.");
    }
  }
};
const onChangeHandler = (event) => {
  const { name, value } = event.target;
  setFormData(data => ({ ...data, [name]: value }))
}


    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-around gap-1 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* Left side - Delivery Information */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={"DELIVERY"} text2={"INFORMATION"} />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='First Name' />
                   
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Last Name' />
                </div>
                <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='E-mail Address' />
                <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Street' />
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='City' />
                    <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='State' />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='ZipCode' />
                    <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Country' />
                </div>
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Phone Number' />
            </div>

            {/* Right side - Order Summary and Payment */}
            <div className="mt-0">
                <div className="mt-0 min-w-80">
                    <CartTotal />
                </div>

                <div className="mt-12">
                    <Title text1={'PAYMENT'} text2={'METHOD'} />

                    {/* Stripe Option */}
                    <div
                        onClick={() => setMethod('stripe')}
                        className="flex items-center gap-3 border p-2 px-3 cursor-pointer mt-4 rounded-md"
                    >
                        <div
                            className={`w-4 h-4 border rounded-full ${method === 'stripe' ? 'bg-green-600' : ''}`}
                        ></div>
                        <p className="text-purple-600 mx-4 text-2xl font-bold">Stripe</p>
                    </div>

                    {/* Cash on Delivery Option */}
                    <div
                        onClick={() => setMethod('cod')}
                        className="flex items-center gap-3 border p-2 px-3 cursor-pointer mt-4 rounded-md"
                    >
                        <div
                            className={`w-4 h-4 border rounded-full ${method === 'cod' ? 'bg-green-600' : ''}`}
                        ></div>
                        <p className="text-gray-600 mx-4 text-xl font-bold">Cash On Delivery</p>
                    </div>

                    {/* Submit Button */}
                    <div className="w-full text-end mt-8">
                        <button
                            type="submit"
                            className="bg-black text-white px-16 py-3 text-sm hover:bg-gray-800 transition-colors"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder