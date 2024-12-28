// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchOrderById } from '@/store/shop/order-slice'; // Import the thunk for fetching order details
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// const UserOrderDetailsDialog = ({ open, onClose, orderId }) => {
//   const dispatch = useDispatch();
//   const { orders } = useSelector((state) => state.order); // Get order details from the state

//   useEffect(() => {
//     if (open && orderId) {
//       dispatch(fetchOrderById(orderId)); // Fetch the order details when dialog opens
//     }
//   }, [open, orderId, dispatch]);

//   // if (orderDetailsStatus === 'loading') return <p>Loading order details...</p>;
//   // if (orderDetailsStatus === 'failed') return <p>Failed to load order details.</p>;

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader className="flex justify-center items-center">
//           <DialogTitle>Order Details</DialogTitle>
//         </DialogHeader>
//        { orders && (
//           <div className="space-y-4">
//             <div className="flex justify-between">
//               <p className="font-semibold">Order ID:</p>
//               <p>{orders._id}</p>
//             </div>
//             <div className="flex justify-between">
//               <p className="font-semibold">Order Date:</p>
//               <p>{new Date(orders.orderDate).toLocaleDateString()}</p>
//             </div>
//             <div className="flex justify-between">
//               <p className="font-semibold">Status:</p>
//               <p>{orders.orderStatus}</p>
//             </div>
//             <div className="flex justify-between">
//               <p className="font-semibold">Payment Method:</p>
//               <p>{orders.paymentMethod}</p>
//             </div>
//             <div className="flex justify-between">
//               <p className="font-semibold">Total Price:</p>
//               {/* <p>${orders.totalPrice.toFixed(2)}</p> */}
//             </div>

//             Render cart items if available
//             {orders.cartItems && (
//               <div className="space-y-2">
//                 <p className="font-semibold">Cart Items:</p>
//                 {selectedOrder.cartItems.map((item, index) => (
//                   <div key={index} className="flex justify-between">
//                     <p>{item.productName}</p>
//                     {/* <p>${item.price.toFixed(2)}</p> */}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Render shipping info */}
//             {orders.addressInfo && (
//               <div className="pb-4">
//                 <p className="font-medium text-md">Shipping Info</p>
               
//                 <p>{orders.addressInfo.address}</p>
//                 <p>{orders.addressInfo.city}</p>
//                 <p>{orders.addressInfo.zipCode}</p>
//                 <p>{orders.addressInfo.phone}</p>
//                 <p>{orders.addressInfo.notes}</p>
//               </div>
//             )}
//           </div>
//         )}
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default UserOrderDetailsDialog;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '@/store/shop/order-slice'; // Import the thunk for fetching order details
import { Dialog,  DialogTitle,DialogContent, DialogHeader } from '@/components/ui/dialog';

const UserOrderDetailsDialog = ({ open, onClose, orderId }) => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order); // Get order details from the state

  useEffect(() => {
    if (open && orderId) {
      dispatch(fetchOrderById(orderId)); // Fetch the order details when dialog opens
    }
  }, [open, orderId, dispatch]);

  // Find the specific order by ID
  const selectedOrder = orders ? orders.find(order => order._id === orderId) : null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex justify-center items-center">
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        {selectedOrder ? (
          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="font-semibold">Order ID:</p>
              <p>{selectedOrder._id}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Order Date:</p>
              <p>{new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Status:</p>
              <p>{selectedOrder.orderStatus}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Payment Method:</p>
              <p>{selectedOrder.paymentMethod}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Total Price:</p>
              <p>${(selectedOrder.cartItems.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0) || 0).toFixed(2)}</p>
            </div>

            {/* Render cart items if available */}
            {selectedOrder.cartItems && (
              <div className="space-y-2">
                <p className="font-semibold">Cart Items:</p>
                {selectedOrder.cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <p>{item.title}</p>
                    <p>${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Render shipping info */}
            {selectedOrder.addressInfo && (
              <div className="pb-4">
                <p className="font-medium text-md">Shipping Info</p>
                <p>{selectedOrder.addressInfo.address}</p>
                <p>{selectedOrder.addressInfo.city}</p>
                <p>{selectedOrder.addressInfo.pinCode}</p>
                <p>{selectedOrder.addressInfo.phone}</p>
                <p>{selectedOrder.addressInfo.notes}</p>
              </div>
            )}
          </div>
        ) : (
          <p>Loading order details...</p> // Show loading or an error message if no order found
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UserOrderDetailsDialog;
