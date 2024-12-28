// import React, { useState } from 'react';

// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';


// import { Card , CardContent, CardHeader, CardTitle} from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import OrdersDialogAdmin from '@/components/admin-view/OrdersDialogAdmin';

// function AdminOrders() {
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);

//   // Sample order data
//   const orders = [
//     { id: 'INV001', date: '2023-09-21', status: 'Paid', paymentMethod: 'Credit Card', price: '$250.00' },
//     { id: 'INV002', date: '2023-09-22', status: 'Pending', paymentMethod: 'PayPal', price: '$180.00' },
//     // Add more orders as needed...
//   ];

//   // Function to handle row click and open dialog with selected order
//   const handleRowClick = (order) => {
//     setSelectedOrder(order);
//     setOpenDialog(true);
//   };

//   // Function to close the dialog
//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedOrder(null);  // Clear selected order when dialog is closed
//   };

//   return (
//     <div>
//       <Card>
//         <CardHeader>
//           <CardTitle>All Orders</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableCaption>A list of your recent orders.</TableCaption>
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
//                     <Button onClick={(e) => { e.stopPropagation(); handleRowClick(order); }}>
//                       View Details
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>

//       {/* Pass selectedOrder and state control to the dialog component */}
//       <OrdersDialogAdmin
//         open={openDialog}
//         onClose={handleCloseDialog}
//         order={selectedOrder}
//       />
//     </div>
//   );
// }

// export default AdminOrders;import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import OrdersDialogAdmin from '@/components/admin-view/ordersDialogAdmin';
import { fetchOrders, fetchOrderDetailsById } from '@/store/admin/order-slice';

// Import MoveRightIcon and MoveLeftIcon from Lucide
import { MoveRightIcon, MoveLeftIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

function AdminOrders() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.allOrder);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5; // Adjust the number of orders per page

  // Fetch orders when component mounts
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Function to handle row click and open dialog with selected order
  const handleRowClick = (order) => {
    dispatch(fetchOrderDetailsById(order._id)); // Fetch order details by ID
    setSelectedOrder(order); // Optionally keep the selected order
    setOpenDialog(true);
  };

  const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.salePrice) || 0;
      const quantity = item.quantity || 1;
      return total + price * quantity;
    }, 0).toFixed(2);
  };

  // Function to close the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null); // Clear selected order when dialog is closed
  };

  // Pagination logic
  const totalPages = Math.ceil((orders.length || 0) / ordersPerPage);
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
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full">
            <TableCaption>A list of all recent orders.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead >Order Id</TableHead>
                <TableHead  className="text-center">Order Date</TableHead>
                <TableHead >Order Status</TableHead>
                <TableHead  className="text-center">Order Price</TableHead>
                <TableHead  className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell className="font-medium ">{order._id}</TableCell>
                    <TableCell className="text-center">{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                    <TableCell

>
  <div    style={{
      backgroundColor: order.orderStatus === 'confirmed' 
        ? '#08A045' // Green for confirmed
        : order.orderStatus === 'rejected' 
        ? '#FF4C4C' // Red for rejected
        : order.orderStatus === 'delivered'? '#007B33': '#ffcba4', // Default color for other statuses
      color: 'white', // Text color
    }} className='w-20 h-8 flex items-center justify-center rounded-3xl '
  >
  {order.orderStatus}
  </div>

</TableCell>

                    <TableCell className="text-center">{calculateTotalPrice(order.cartItems)}</TableCell>
                    <TableCell className="text-center">
                      <Button onClick={(e) => { e.stopPropagation(); handleRowClick(order); }}>
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
        </CardContent>
      </Card>

      {/* Pass selectedOrder and state control to the dialog component */}
      <OrdersDialogAdmin
        open={openDialog}
        onClose={handleCloseDialog}
        order={selectedOrder}
      />
    </div>
  );
}

export default AdminOrders;
