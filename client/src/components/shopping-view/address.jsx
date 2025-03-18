
// import React, { useEffect } from 'react'
// import { Button } from '../ui/button'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchAddresses } from '@/store/shop/address-slice'

// export default function Address(){
//   const dispatch = useDispatch();
// const { user } = useSelector((state) => state.auth);
// const userId = user.id;

// // Selector to get addresses from the state
// // Ensure you are accessing the correct path
// const addresses = useSelector((state) => state.address?.addresses || []); // Defaults to an empty array if addresses is undefined

// console.log("Redux State Addresses:", addresses);
// console.log("Addresses Length:", addresses?.length);

// // Fetch addresses when the component mounts
// useEffect(() => {
//   dispatch(fetchAddresses(userId));
// }, [dispatch, userId]);
// const handleEditClick = (address) => {
//     setSelectedAddress(address);
//   };
// return (
//     <>
//     <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
//       {addresses.length > 0 ? (
//         addresses.map((address) => (
//           <div key={address._id} className='flex flex-col border border-gray-300 rounded-lg p-6 h-full'>
//             <div className='flex-grow'>
//               <p>Address: {address.address}</p>
//               <p>City: {address.city}</p>
//               <p>Pincode: {address.pinCode}</p>
//               <p>Phone: {address.phone}</p>
//               <p>Notes: {address.notes}</p>
//             </div>
//             <div className='flex justify-between pt-4 mt-auto'>
//               <Button onClick={() => handleEditClick(address)}>Edit</Button>
//               <Button>Delete</Button>
//             </div>
//           </div>
          
//         ))
//       ) : (
//         <p>No addresses found.</p>
//       )}
      
//     </div>
//     <div>
       
//     </div>
//     </>
// //   );
// // }  
// import React, { useEffect, useState } from 'react';
// import { Button } from '../ui/button';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteAddress, fetchAddresses } from '@/store/shop/address-slice';
// import AddressTile from './address-tile';

// export default function Address() {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const userId = user.id;

//   // Selector to get addresses from the state
//   const addresses = useSelector((state) => state.address?.addresses || []);

//   // State to manage the selected address for editing
//   const [selectedAddress, setSelectedAddress] = useState(null);

//   // Fetch addresses when the component mounts
//   useEffect(() => {
//     dispatch(fetchAddresses(userId));
//   }, [dispatch, userId]);

//   const handleEditClick = (address) => {
//     setSelectedAddress(address); // Set the selected address when editing
//   };

//   const handleCancelEdit = () => {
//     setSelectedAddress(null); // Reset selected address to cancel editing
//   };

//   const handleDeleteClick = (addressId) => {
//     dispatch(deleteAddress({ userId, addressId }))
//       .unwrap()
//       .then(() => {
      
//         console.log('Address deleted successfully');
//       })
//       .catch((error) => {
//         console.error('Failed to delete address:', error);
//       });
//   };
//   return (
//     <>
//     <div className='flex flex-col'>
//       <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
//         {addresses.length > 0 ? (
//           addresses.map((address) => (
//             <div key={address._id} className='flex flex-col border border-gray-300 rounded-lg p-6 h-full'>
//               <div className='flex-grow'>
//                 <p>Address: {address.address}</p>
//                 <p>City: {address.city}</p>
//                 <p>Pincode: {address.pinCode}</p>
//                 <p>Phone: {address.phone}</p>
//                 <p>Notes: {address.notes}</p>
//               </div>
//               <div className='flex justify-between pt-4 mt-auto'>
//                 <Button onClick={() => handleEditClick(address)}>Edit</Button>
//                 <Button onClick={() => handleDeleteClick(address._id)}>Delete</Button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No addresses found.</p>
//         )}
//       </div>
// <div>
//       {/* Conditionally render the AddressTile for editing */}
//       {selectedAddress && (
//         <div className='mt-8'>
//           <h2>Edit Address</h2>
//           <AddressTile
//             selectedAddress={selectedAddress}
//             onCancel={handleCancelEdit}
//           />
//         </div>
      
//       )}
//         </div>
//         </div>
//     </>
//   );
// }

// import React, { useEffect, useState, useRef } from 'react';
// import { Button } from '../ui/button';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteAddress, fetchAddresses } from '@/store/shop/address-slice';
// import AddressTile from './address-tile';

// export default function Address({col}) {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const userId = user.id;

//   const addresses = useSelector((state) => state.address?.addresses || []);
//   const [selectedAddress, setSelectedAddress] = useState(null);

//   useEffect(() => {
//     dispatch(fetchAddresses(userId));
//   }, [dispatch, userId]);

//   const handleEditClick = (address) => {
//     setSelectedAddress(address); // Set the selected address when editing
    
// //     // Scroll to the edit form section
// //     if (editFormRef.current) {
// //       editFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
// //       window.scrollBy(0, 400); // Increase this value to scroll further down
// //     }
//    };

//   const handleCancelEdit = () => {
//     setSelectedAddress(null); // Reset selected address to cancel editing
//   };

//   const handleDeleteClick = (addressId) => {
//     dispatch(deleteAddress({ userId, addressId }))
//       .unwrap()
//       .then(() => {
//         console.log('Address deleted successfully');
//       })
//       .catch((error) => {
//         console.error('Failed to delete address:', error);
//       });
//   };

//  console.log("col,,",col)
//     return (
//         <>
//         <div className="flex flex-col w-full">
//       <div
//         className={`w-full grid grid-cols-1 md:grid-cols-1 ${
//           col ? "lg:grid-cols-1" : "lg:grid-cols-3"
//         } gap-6 justify-items-center`}
//       >
//         {addresses.length > 0 ? (
//           addresses.map((address) => (
//             <div
//               key={address._id}
//               className="flex flex-col border border-gray-300 rounded-lg p-2 md:p-6 h-full w-full max-w-xs"
//             >
//               <div className="flex-grow">
//                 <p>Address: {address.address}</p>
//                 <p>City: {address.city}</p>
//                 <p>Pincode: {address.pinCode}</p>
//                 <p>Phone: {address.phone}</p>
//                 <p>Notes: {address.notes}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No addresses found</p>
//         )}
//       </div>
//             <div className='mt-8 w-full flex-col items-center'>
//               {selectedAddress && (
//                 <>
//                 <div className='flex justify-center items-center mt-2 font-bold text-xl'>  <h2>Edit Address</h2></div>
                
//                   <AddressTile
//                     selectedAddress={selectedAddress}
//                     onCancel={handleCancelEdit}
                   
//                   />
//                 </>
//               )}
//             </div>
//           </div>
//         </>
//       );
      
// }

// import React, { useEffect, useState } from 'react';
// import { Button } from '../ui/button';
// import { useDispatch, useSelector } from 'react-redux';
// import { deleteAddress, fetchAddresses } from '@/store/shop/address-slice';
// import AddressTile from './address-tile';

// export default function Address({ col, onSelect }) {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const userId = user.id;

//   const addresses = useSelector((state) => state.address?.addresses || []);
//   const [selectedAddress, setSelectedAddress] = useState(null);

//   useEffect(() => {
//     dispatch(fetchAddresses(userId));
//   }, [dispatch, userId]);

//   const handleEditClick = (address) => {
//     setSelectedAddress(address); // Set the selected address when editing
//   };

//   const handleCancelEdit = () => {
//     setSelectedAddress(null); // Reset selected address to cancel editing
//   };

//   const handleDeleteClick = (addressId) => {
//     dispatch(deleteAddress({ userId, addressId }))
//       .unwrap()
//       .then(() => {
//         console.log('Address deleted successfully');
//       })
//       .catch((error) => {
//         console.error('Failed to delete address:', error);
//       });
//   };

//   return (
//     <>
//       <div className="flex flex-col w-full">
//         <div
//           className={`w-full grid grid-cols-1 md:grid-cols-1 ${
//             col ? "lg:grid-cols-1" : "lg:grid-cols-3"
//           } gap-6 justify-items-center`}
//         >
//           {addresses.length > 0 ? (
//             addresses.map((address) => (
//               <div
//                 key={address._id}
//                 className="flex flex-col border border-gray-300 rounded-lg p-2 md:p-6 h-full w-full max-w-xs"
//                 onClick={() => onSelect(address._id, address)} // Pass address._id when clicked
//               >
//                 <div className="flex-grow">
//                   <p>Address: {address.address}</p>
//                   <p>City: {address.city}</p>
//                   <p>Pincode: {address.pinCode}</p>
//                   <p>Phone: {address.phone}</p>
//                   <p>Notes: {address.notes}</p>
//                 </div>
//                 <div className="flex justify-between mt-4">
//                   <Button onClick={() => handleEditClick(address)}>Edit</Button>
//                   <Button onClick={() => handleDeleteClick(address._id)} className="text-red-500">Delete</Button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No addresses found</p>
//           )}
//         </div>
//         <div className='mt-8 w-full flex-col items-center'>
//           {selectedAddress && (
//             <>
//               <div className='flex justify-center items-center mt-2 font-bold text-xl'>
//                 <h2>Edit Address</h2>
//               </div>
//               <AddressTile
//                 selectedAddress={selectedAddress}
//                 onCancel={handleCancelEdit}
//               />
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAddress, fetchAddresses } from '@/store/shop/address-slice';
import { fetchNearestBranch } from '@/store/shop/distance-slice';
import AddressTile from './address-tile';

export default function Address({ col, onSelect }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userId = user.id;

  const addresses = useSelector((state) => state.address?.addresses || []);
  const [selectedAddress, setSelectedAddress] = useState(null);
  
  const shippingCost = useSelector((state) => state.distance.shippingCost);
  const loading = useSelector((state) => state.distance.loading);
  const error = useSelector((state) => state.distance.error);

  useEffect(() => {
    dispatch(fetchAddresses(userId));
  }, [dispatch, userId]);

  const handleEditClick = (address) => {
    setSelectedAddress(address);
  };

  const handleCancelEdit = () => {
    setSelectedAddress(null);
  };

  const handleDeleteClick = (addressId) => {
    dispatch(deleteAddress({ userId, addressId }))
      .unwrap()
      .then(() => {
        console.log('Address deleted successfully');
      })
      .catch((error) => {
        console.error('Failed to delete address:', error);
      });
  };

  const handleSelect = (addressId, address) => {
    onSelect(addressId, address);
    
    // // Dispatching with address and city directly
    // dispatch(fetchNearestBranch({ address: address.address, city: address.city }));
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <div
          className={`w-full grid grid-cols-1 md:grid-cols-1 ${
            col ? "lg:grid-cols-1" : "lg:grid-cols-3"
          } gap-6 justify-items-center`}
        >
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <div
                key={address._id}
                className="flex flex-col border border-gray-300 rounded-lg p-2 md:p-6 h-full w-full max-w-xs"
                onClick={() => handleSelect(address._id, address)} // Pass address._id when clicked
              >
                <div className="flex-grow">
                  <p>Address: {address.address}</p>
                  <p>City: {address.city}</p>
                  <p>Pincode: {address.pinCode}</p>
                  <p>Phone: {address.phone}</p>
                  <p>Notes: {address.notes}</p>
                </div>
                <div className="flex justify-between mt-4">
                  <Button onClick={() => handleEditClick(address)}>Edit</Button>
                  <Button onClick={() => handleDeleteClick(address._id)} className="text-red-500">Delete</Button>
                </div>
              </div>
            ))
          ) : (
            <p>No addresses found</p>
          )}
        </div>
        <div className='mt-8 w-full flex-col items-center'>
          {selectedAddress && (
            <>
              <div className='flex justify-center items-center mt-2 font-bold text-xl'>
                <h2>Edit Address</h2>
              </div>
              <AddressTile
                selectedAddress={selectedAddress}
                onCancel={handleCancelEdit}
              />
            </>
          )}
        </div>
        <div className='mt-4'>
          {loading && <p>Loading shipping cost...</p>}
          {error && <p>Error fetching shipping cost: {error}</p>}
          {shippingCost > 0 && <p>Shipping Cost: Rs {shippingCost}</p>}
        </div>
      </div>
    </>
  );
}
