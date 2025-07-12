import React, { useContext, useEffect  } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';


const Verify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { token, setCartItems,backendUrl } = useContext(ShopContext);

  const success = searchParams.get('success');
const orderId = searchParams.get('orderId')?.replace('}', '');

  const userId = searchParams.get('userId'); // Add this if needed

  const verifyPayment = async () => {
    if (!token || !orderId) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { success, orderId, userId }, // Include userId if your backend expects it
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems({});
        toast.success("Payment Verified!");
        navigate('/orders');
      } else {
        toast.warn("Payment Failed. Redirecting to cart...");
        navigate('/cart');
      }
    } catch (error) {
      console.error("Verification Error:", error);
      toast.error("Payment verification failed.");
      navigate('/cart');
    }
  };

  useEffect(() => {
    verifyPayment(); // ✅ ACTUALLY CALL the function
  }, [token]);

  return <div className="text-center text-xl mt-20">Verifying your payment...</div>;
};

export default Verify;
