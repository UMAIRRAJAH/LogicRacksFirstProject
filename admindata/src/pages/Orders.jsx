import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import assets from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {}, // empty body
        { headers: { token } }
      );

      console.log("Orders response:", response.data);

      if (response.data?.orders) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message || "No orders found");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error(error.response?.data?.message || "Failed to fetch orders");
    }
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/status`,
        {
          orderId,
          status: newStatus
        },
        {
          headers: {
      Authorization: `Bearer ${token}`
    }
        }
      );

      if (response.data.success) {
        toast.success("Status updated!");
        await fetchAllOrders();
      } else {
        toast.error(response.data.message || "Update failed");
      }
    } catch (error) {
      console.error("Status update error:", error);
      toast.error("Server error while updating status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-2xl sm:text-5xl font-extrabold text-gray-600 tracking-tight text-center mb-6">
        Order Page
      </h2>

      <div className="flex flex-col gap-6  ">
        {orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between items-start md:items-center border p-4 rounded-lg shadow-sm gap-4 bg-lime-200"
          >
            {/* Image */}
            <img className="w-24 h-24 object-cover rounded-lg" src={assets.box} alt="Box" />

            {/* Order Details */}
            <div className="flex-1 
">
              <div className="mb-2 font-medium  text-lime-900 ">
                {order.items.map((item, idx) => (
                  <p className='font bold' key={idx}>
                    {item.name} - {item.quantity} <span>{item.size}</span>
                  </p>
                ))}
              </div>

              <p className="font-medium  text-lime-900">{order.address.firstName} {order.address.lastName}</p>
              <p className="font-medium text-lime-900">{order.address.street},</p>
              <p className="font-medium  text-lime-900">{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
              <p className="font-medium  text-lime-900">{order.address.phone}</p>
            </div>

            {/* Meta Info */}
            <div className="flex flex-col items-start md:items-end gap-2 min-w-[150px]">
              <p className="font-medium  text-lime-900">Items: {order.items.length}</p>
              <p className="font-medium  text-lime-900">
  paymentMethod:
  <span className='text-blue-800'>
    {(() => {
      const method = order.paymentMethod?.toLowerCase();
      if (["cod", "cash"].includes(method)) return "Cash on Delivery";
      if (["stripe", "card"].includes(method)) return "Stripe";
      return "N/A";
    })()}
  </span>
</p>


              <p className="font-medium  text-lime-900">Payment: {order.payment ? "Done" : "Pending"}</p>
          <p>Date: {order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB') : 'N/A'}</p>

              <p className="font-medium  text-lime-900">{currency}{order.amount}</p>

              <select
                className="border border-gray-400 rounded px-2 py-1 mt-1"
                value={order.status}
                onChange={(event) => statusHandler(event, order._id)}
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
