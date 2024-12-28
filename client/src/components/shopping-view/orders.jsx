// // ShoppingOrders.jsx
// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { Button } from '../ui/button';
// import UserOrderDetailsDialog from './userOrderDetails';

// export default function ShoppingOrders() {
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   const orders = [
//     { id: 'INV001', date: '2023-09-21', status: 'Paid', paymentMethod: 'Credit Card', price: '$250.00' },
//     { id: 'INV002', date: '2023-09-22', status: 'Pending', paymentMethod: 'PayPal', price: '$180.00' },
//     // More orders here...
//   ];

//   const handleViewDetails = (order) => {
//     setSelectedOrder(order);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedOrder(null);
//   };

//   return (
//     <div>
//       <Card>
//         <CardHeader>
//           <CardTitle>Order history</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableCaption>A list of your recent invoices.</TableCaption>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Order Id</TableHead>
//                 <TableHead>Order Date</TableHead>
//                 <TableHead>Order Status</TableHead>
//                 <TableHead>Order Price</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {orders.map((order) => (
//                 <TableRow key={order.id}>
//                   <TableCell className="font-medium">{order.id}</TableCell>
//                   <TableCell>{order.date}</TableCell>
//                   <TableCell>{order.status}</TableCell>
//                   <TableCell>{order.price}</TableCell>
//                   <TableCell>
//                     <Button onClick={() => handleViewDetails(order)}>
//                       View Details
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* Order details dialog */}
//       <UserOrderDetailsDialog
//         open={openDialog}
//         onClose={handleCloseDialog}
//         order={selectedOrder}
//       />
//     </div>
//   );import React, { useEffect, useState } from 'react';

// import { useDispatch, useSelector } from 'react-redux';
// import { fetchOrders } from '@/store/shop/order-slice'; // Import fetchOrders
// import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { Button } from '../ui/button';
// import UserOrderDetailsDialog from './userOrderDetails';
// import { useEffect, useState } from 'react';
// export default function ShoppingOrders() {
//   const dispatch = useDispatch();
//   const { orders, status, error } = useSelector((state) => state.order); // Access orders state from Redux
//   console.log("orderss", orders)
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedOrderId, setSelectedOrderId] = useState(null); // Store only order ID
// const {user}=useSelector((state)=>state.auth);
// const userId=user?.id;
// console.log("userIddd",userId)
//   useEffect(() => {
//     // Fetch orders when component mounts
//     dispatch(fetchOrders(userId));
//   }, [dispatch]);

//   const handleViewDetails = (orderId) => {
//     setSelectedOrderId(orderId); // Set the selected order ID
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedOrderId(null);
//   };

//   return (
//     <div>
//       <Card>
//         <CardHeader>
//           <CardTitle>Order History</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {status === 'loading' && <p>Loading orders...</p>}
//           {status === 'failed' && <p>Error loading orders: {error}</p>}
//           {status === 'succeeded' && (
//             <Table>
//               <TableCaption>A list of your recent invoices.</TableCaption>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Order Id</TableHead>
//                   <TableHead>Order Date</TableHead>
//                   <TableHead>Order Status</TableHead>
//                   <TableHead>Order Price</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {orders.length > 0 ? (
//                   orders.map((order) => (
//                     <TableRow key={order._id}>
//                       <TableCell className="font-medium">{order._id}</TableCell>
//                       <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
//                       <TableCell>{order.orderStatus}</TableCell>
//                       <TableCell>
//     {order && order.totalPrice !== undefined ? `$${order.totalPrice.toFixed(2)}` : 'N/A'}
// </TableCell>
//                       <TableCell>
//                         <Button onClick={() => handleViewDetails(order._id)}>
//                           View Details
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan="5">No orders found.</TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           )}
//         </CardContent>
//       </Card>

//       {/* Pass the selected order ID to the dialog */}
//       {selectedOrderId && (
//         <UserOrderDetailsDialog
//           open={openDialog}
//           onClose={handleCloseDialog}
//           orderId={selectedOrderId} // Pass the order ID to the dialog
//         />
//       )}
//     </div>
//   );
// }

// import { useDispatch, useSelector } from 'react-redux';
// import { fetchOrders } from '@/store/shop/order-slice'; // Import fetchOrders
// import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import { Button } from '../ui/button';
// import UserOrderDetailsDialog from './userOrderDetails';
// import { useEffect, useState } from 'react';

// export default function ShoppingOrders() {
//   const dispatch = useDispatch();
//   const { orders, status, error } = useSelector((state) => state.order); // Access orders state from Redux
//   const { user } = useSelector((state) => state.auth);
//   const userId = user?.id;
//   const ordersPerPage = 5; // Number of orders to show per page
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedOrderId, setSelectedOrderId] = useState(null); // Store only order ID
//   const [currentPage, setCurrentPage] = useState(1); // Current page number

//   useEffect(() => {
//     // Fetch orders when component mounts
//     dispatch(fetchOrders(userId));
//   }, [dispatch, userId]);

//   const handleViewDetails = (orderId) => {
//     setSelectedOrderId(orderId); // Set the selected order ID
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedOrderId(null);
//   };

//   // Calculate the total number of pages
//   const totalPages = Math.ceil((orders.length || 0) / ordersPerPage);

//   // Calculate the current orders to display
//   const indexOfLastOrder = currentPage * ordersPerPage;
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
//   const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

//   // Handle page change
//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   return (
//     <div>
//       <Card>
//         <CardHeader>
//           <CardTitle>Order History</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {status === 'loading' && <p>Loading orders...</p>}
//           {status === 'failed' && <p>Error loading orders: {error}</p>}
//           {status === 'succeeded' && (
//             <>
//               <Table>
//                 <TableCaption>A list of your recent invoices.</TableCaption>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Order Id</TableHead>
//                     <TableHead>Order Date</TableHead>
//                     <TableHead>Order Status</TableHead>
//                     <TableHead>Order Price</TableHead>
//                     <TableHead>Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {currentOrders.length > 0 ? (
//                     currentOrders.map((order) => (
//                       <TableRow key={order._id}>
//                         <TableCell className="font-medium">{order._id}</TableCell>
//                         <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
//                         <TableCell>{order.orderStatus}</TableCell>
//                         <TableCell>
//                           {order.totalPrice !== undefined ? `$${order.totalPrice.toFixed(2)}` : 'N/A'}
//                         </TableCell>
//                         <TableCell>
//                           <Button onClick={() => handleViewDetails(order._id)}>
//                             View Details
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan="5">No orders found.</TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>

//               {/* Pagination Controls */}
//               <div className="flex justify-center mt-4 space-x-2">
//                 <Button
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className={`px-4 py-2 ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded`}
//                 >
//                   Previous
//                 </Button>
//                 <span className="flex items-center">
//                   Page {currentPage} of {totalPages}
//                 </span>
//                 <Button
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   className={`px-4 py-2 ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded`}
//                 >
//                   Next
//                 </Button>
//               </div>
//             </>
//           )}
//         </CardContent>
//       </Card>

//       {/* Pass the selected order ID to the dialog */}
//       {selectedOrderId && (
//         <UserOrderDetailsDialog
//           open={openDialog}
//           onClose={handleCloseDialog}
//           orderId={selectedOrderId} // Pass the order ID to the dialog
//         />
//       )}
//     </div>
//   );
// }

import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, resetOrders } from '@/store/shop/order-slice'; // Import fetchOrders
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import UserOrderDetailsDialog from './userOrderDetails';
import { useEffect, useState } from 'react';
// Import MoveRightIcon and MoveLeftIcon from Luise
import { MoveRightIcon, MoveLeftIcon } from 'lucide-react';

export default function ShoppingOrders() {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.order); // Access orders state from Redux
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;
  
  const ordersPerPage = 5; // Number of orders to show per page
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null); // Store only order ID
  const [currentPage, setCurrentPage] = useState(1); // Current page number
console.log("orderss,",orders)
useEffect(() => {
  if (userId) {
    dispatch(fetchOrders(userId)); // Fetch orders for the logged-in user
  } else {
    dispatch(resetOrders()); // Reset orders when user is logged out
  }
}, [dispatch, userId]);
  const handleViewDetails = (orderId) => {
    setSelectedOrderId(orderId); // Set the selected order ID
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrderId(null);
  };
  // Function to calculate total price of cart items
// Function to calculate total price of cart items, including shipping cost
// const calculateTotalPrice = (cartItems, shippingCost = 0) => {
//   const cartTotal = cartItems.reduce((total, item) => {
//     const price = parseFloat(item.salePrice) || 0; // Ensure price is a number
//     const quantity = item.quantity || 1; // Default to 1 if quantity is not provided
//     return total + price * quantity;
//   }, 0);
  
//   return (cartTotal + parseFloat(shippingCost)).toFixed(2); // Add shipping cost and format to 2 decimal places
// };


  // Calculate the total number of pages
  const totalPages = Math.ceil((orders.length || 0) / ordersPerPage);

  // Calculate the current orders to display
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          {status === 'loading' && <p>Loading orders...</p>}
          {status === 'failed' && <p>Error loading orders: {error}</p>}
          {status === 'succeeded' && (
            <>
              <Table>
              
                <TableHeader>
                  <TableRow>
                    <TableHead>Order Id</TableHead>
                    <TableHead className="text-center">Order Date</TableHead>
                    <TableHead className="text-center">Order Status</TableHead>
                    <TableHead className="text-center">Order Price</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentOrders.length > 0 ? (
                    currentOrders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell className="font-medium ">{order._id}</TableCell>
                        <TableCell className="text-center">{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-center">{order.orderStatus}</TableCell>
                        <TableCell className="text-center">
${order.totalPrice}
 {/* Calculate total price including shipping cost */}
</TableCell>

                        <TableCell className="text-center">
                          <Button onClick={() => handleViewDetails(order._id)}>
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan="5">No orders found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              {/* Pagination Controls */}
              <div className="flex justify-center mt-4 items-center space-x-2">
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-2 py-1 ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded`}
                >
                  <MoveLeftIcon />
                </Button>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <Button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-3 py-1 rounded-3xl ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                    >
                      {pageNumber}
                    </Button>
                  );
                })}

                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-2 py-1 ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'} text-white rounded`}
                >
                  <MoveRightIcon />
                </Button>
              </div>

              {/* Display total pages */}
              <div className="mt-2 text-center">
                <p>Total Pages: {totalPages}</p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Pass the selected order ID to the dialog */}
      {selectedOrderId && (
        <UserOrderDetailsDialog
          open={openDialog}
          onClose={handleCloseDialog}
          orderId={selectedOrderId} // Pass the order ID to the dialog
        />
      )}
    </div>
  );
}
