// import React, { useState } from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

// const OrdersDialogAdmin = ({ open, onClose, order, onUpdateOrder }) => {
//   const [status, setStatus] = useState(order?.status || ''); // State to track the status

//   const handleStatusChange = (value) => {
//     setStatus(value); // Update local state with the selected status
//   };

//   const handleSubmit = () => {
//     onUpdateOrder({ ...order, status }); // Call the update function with the new status
//     onClose(); // Close the dialog
//   };

//   // Calculate total price from cartItems
//   const calculateTotalPrice = (cartItems) => {
//     return cartItems.reduce((total, item) => {
//       return total + (parseFloat(item.salePrice) || 0) * (item.quantity || 1);
//     }, 0).toFixed(2); // Format to 2 decimal places
//   };

//   if (!order) return null;

//   const totalPrice = calculateTotalPrice(order.cartItems || []); // Calculate total price

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader className="flex justify-center items-center">
//           <DialogTitle>Order Details</DialogTitle>
//         </DialogHeader>
//         <div className="space-y-4">
//           {/* Displaying order details */}
//           <div className="flex justify-between">
//             <p className="font-semibold">Order ID:</p>
//             <p>{order._id}</p>
//           </div>
//           <div className="flex justify-between">
//             <p className="font-semibold">Order Date:</p>
//             <p>{new Date(order.orderDate).toLocaleDateString()}</p> {/* Format date */}
//           </div>
//           <div className="flex justify-between">
//             <p className="font-semibold">Payment Method:</p>
//             <p>{order.paymentMethod}</p>
//           </div>
//           <div className="flex justify-between">
//             <p className="font-semibold">Total Price:</p>
//             <p>${totalPrice}</p> {/* Display calculated total price */}
//           </div>
//         </div>

//         <div className="flex flex-col gap-2">
//           {/* Display cart items dynamically */}
//           <p className="font-semibold">Products:</p>
//           {order.cartItems.map((item) => (
//             <div key={item._id} className="flex justify-between">
//               <p>{item.title} (x{item.quantity})</p>
//               <p>${(item.salePrice * item.quantity).toFixed(2)}</p>
//             </div>
//           ))}
//           <div className="pb-4">
//             <p className="font-medium text-md">Shipping Info</p>
//             <p>{order.shippingInfo?.name || 'John Doe'}</p> {/* Display dynamic name */}
//             <p>{order.shippingInfo?.address || 'Address'}</p> {/* Display dynamic address */}
//             <p>{order.shippingInfo?.city || 'City'}</p> {/* Display dynamic city */}
//             <p>{order.shippingInfo?.pinCode || 'PinCode'}</p> {/* Display dynamic pin code */}
//             <p>{order.shippingInfo?.phone || 'Phone'}</p> {/* Display dynamic phone */}
//             <p>{order.notes || 'Notes'}</p> {/* Display dynamic notes */}
//           </div>
//           <div className="flex flex-col mt-2">
//             <p className="font-semibold">Status:</p>
//             {/* Admin can change order status here */}
//             <Select onValueChange={handleStatusChange} value={status}>
//               <SelectTrigger className="w-full max-w-xs mt-3">
//                 <SelectValue placeholder="Order Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="pending">Pending</SelectItem>
//                 <SelectItem value="inProcess">In Process</SelectItem>
//                 <SelectItem value="inShipping">In Shipping</SelectItem>
//                 <SelectItem value="delivered">Delivered</SelectItem>
//                 <SelectItem value="rejected">Rejected</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         <div className="mt-4 flex">
//           <Button className="w-full" onClick={handleSubmit}>
//             Update Status
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default OrdersDialogAdmin;

// import React, { useState } from 'react';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateOrderStatus } from '@/store/admin/order-slice'; // Import the action

// const OrdersDialogAdmin = ({ open, onClose, order }) => {
//   const dispatch = useDispatch();
//   const [status, setStatus] = useState(order?.status || ''); // State to track the status
//   const {user}=useSelector((state)=>state.auth);
//   const userName=user?.userName;
//   const handleStatusChange = (value) => {
//     setStatus(value); // Update local state with the selected status
//   };

//   const handleSubmit = () => {
//     if (order) {
//       dispatch(updateOrderStatus({ orderId: order._id, status })); // Dispatch updateOrderStatus with order ID and new status
//     }

//   };

//   // Calculate total price from cartItems
//   const calculateTotalPrice = (cartItems) => {
//     return cartItems.reduce((total, item) => {
//       return total + (parseFloat(item.salePrice) || 0) * (item.quantity || 1);
//     }, 0).toFixed(2); // Format to 2 decimal places
//   };

//   if (!order) return null;

//   const totalPrice = calculateTotalPrice(order.cartItems || []); // Calculate total price

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader className="flex justify-center items-center">
//           <DialogTitle>Order Details</DialogTitle>
//         </DialogHeader>
//         <div className="space-y-4">
//           {/* Displaying order details */}
//           <div className="flex justify-between">
//             <p className="font-semibold">Order ID:</p>
//             <p>{order._id}</p>
//           </div>
//           <div className="flex justify-between">
//             <p className="font-semibold">Order Date:</p>
//             <p>{new Date(order.orderDate).toLocaleDateString()}</p> {/* Format date */}
//           </div>
//           <div className="flex justify-between">
//             <p className="font-semibold">Payment Method:</p>
//             <p>{order.paymentMethod}</p>
//           </div>
//           <div className="flex justify-between">
//             <p className="font-semibold">Payment Status:</p>
//             < p   style={{
//     backgroundColor: order.paymentStatus === 'paid' ? '#08A045' : '#ffcba4', // Adjust the color as per your preference
//     color: 'white', // Optional: Set text color to contrast the background
//   }} className='w-24 h-8 flex items-center justify-center rounded-3xl '>{order.paymentStatus}</p>
//           </div>
//           <div className="flex justify-between">
//             <p className="font-semibold">orderStatus</p>
//             <p   style={{
//     backgroundColor: order.orderStatus === 'confirmed' ? '#08A045' : '#ffcba4', // Adjust the color as per your preference
//     color: 'white', // Optional: Set text color to contrast the background
//   }} className='w-24 h-8 flex items-center justify-center rounded-3xl '
//  >{order.orderStatus}</p>
//           </div>
//           <div className="flex justify-between">
//             <p className="font-semibold">Total Price:</p>
//             <p>${totalPrice}</p> {/* Display calculated total price */}
//           </div>
//         </div>

//         <div className="flex flex-col gap-2">
//           {/* Display cart items dynamically */}
//           <p className="font-semibold">Products:</p>
//           {order.cartItems.map((item) => (
//             <div key={item._id} className="flex justify-between">
//               <p>{item.title} (x{item.quantity})</p>
//               <p>${(item.salePrice * item.quantity).toFixed(2)}</p>
//             </div>
//           ))}
//           <div className="pb-4">
//             <p className="font-medium text-md">Shipping Info</p>
//             <p>Username: {userName}</p> {/* Display dynamic name */}
//             <p>Address: {order.addressInfo?.address || 'Address'},{order.addressInfo?.city}</p> {/* Display dynamic address */}
//             <p>{order.addressInfo?.pinCode || 'PinCode'}</p> {/* Display dynamic pin code */}
         
//             <p>{order.notes || 'Notes'}</p> {/* Display dynamic notes */}
//           </div>
//           <div className="flex flex-col mt-2">
//             <p className="font-semibold">Status:</p>
//             {/* Admin can change order status here */}
//             <Select onValueChange={handleStatusChange} value={status}>
//               <SelectTrigger className="w-full max-w-xs mt-3">
//                 <SelectValue placeholder="Order Status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="pending">Pending</SelectItem>
//                 <SelectItem value="inProcess">In Process</SelectItem>
//                 <SelectItem value="inShipping">In Shipping</SelectItem>
//                 <SelectItem value="delivered">Delivered</SelectItem>
//                 <SelectItem value="rejected">Rejected</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </div>

//         <div className="mt-4 flex">
//           <Button className="w-full" onClick={handleSubmit}>
//             Update Status
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default OrdersDialogAdmin;

import React, { useState, useEffect } from 'react';
import { Dialog,  DialogTitle,DialogContent, DialogHeader, } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderStatus } from '@/store/admin/order-slice'; // Import the action

const OrdersDialogAdmin = ({ open, onClose, order }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userName = user?.userName;

  // Local state for order status and updating the order
  const [status, setStatus] = useState(order?.status || ''); 
  const [localOrder, setLocalOrder] = useState(order); // Store order in local state

  // Update local order state when `order` prop changes
  useEffect(() => {
    setLocalOrder(order); 
    setStatus(order?.status || ''); // Reset status when order prop changes
  }, [order]);

  const handleStatusChange = (value) => {
    setStatus(value); 
  };

  const handleSubmit = () => {
    if (localOrder) {
      // Dispatch updateOrderStatus with order ID and new status
      dispatch(updateOrderStatus({ orderId: localOrder._id, status })).then(() => {
        // Optimistically update the local order object after status change
        setLocalOrder((prevOrder) => ({
          ...prevOrder,
          orderStatus: status,
        }));
      });
    }
  };

  // Calculate total price from cartItems
  const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => {
      return total + (parseFloat(item.salePrice) || 0) * (item.quantity || 1);
    }, 0).toFixed(2); // Format to 2 decimal places
  };

  if (!localOrder) return null;

  const totalPrice = calculateTotalPrice(localOrder.cartItems || []); 

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex justify-center items-center">
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="font-semibold">Order ID:</p>
            <p>{localOrder._id}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Order Date:</p>
            <p>{new Date(localOrder.orderDate).toLocaleDateString()}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Payment Method:</p>
            <p>{localOrder.paymentMethod}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Payment Status:</p>
            <p style={{
                backgroundColor: localOrder.paymentStatus === 'paid' ? '#08A045' : '#ffcba4', 
                color: 'white',
              }} className='w-24 h-8 flex items-center justify-center rounded-3xl '>
              {localOrder.paymentStatus}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Order Status:</p>
            <p  style={{
      backgroundColor: localOrder.orderStatus === 'confirmed' 
        ? '#08A045' // Green for confirmed
        : localOrder.orderStatus === 'rejected' 
        ? '#FF4C4C' // Red for rejected
        :localOrder.orderStatus === 'delivered' ? '#007B33'
        : '#ffcba4', // Default color for other statuses
      color: 'white', // Text color
    }} className='w-24 h-8 flex items-center justify-center rounded-3xl '>
              {localOrder.orderStatus}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Total Price:</p>
            <p>${totalPrice}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-semibold">Products:</p>
          {localOrder.cartItems.map((item) => (
            <div key={item._id} className="flex justify-between">
              <p>{item.title} (x{item.quantity})</p>
              <p>${(item.salePrice * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="pb-4">
            <p className="font-medium text-md">Shipping Info</p>
            <p>Username: {userName}</p> 
            <p>Address: {localOrder.addressInfo?.address || 'Address'},{localOrder.addressInfo?.city}</p>
            <p>{localOrder.addressInfo?.pinCode || 'PinCode'}</p>
            <p>{localOrder.notes || 'Notes'}</p>
          </div>
          <div className="flex flex-col mt-2">
            <p className="font-semibold">Status:</p>
            <Select onValueChange={handleStatusChange} value={status}>
              <SelectTrigger className="w-full max-w-xs mt-3">
                <SelectValue placeholder="Order Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inProcess">In Process</SelectItem>
                <SelectItem value="inShipping">In Shipping</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 flex">
          <Button className="w-full" onClick={handleSubmit}>
            Update Status
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrdersDialogAdmin;
