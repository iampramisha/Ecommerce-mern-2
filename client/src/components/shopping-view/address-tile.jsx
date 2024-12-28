// import React, { useState } from 'react';
// import CommonForm from '../common/form';
// import { addAddress } from '@/store/shop/address-slice';
// import { useDispatch, useSelector } from 'react-redux';

// export default function AddressTile() {
//   // Initial state for form data
//   const [formData, setFormData] = useState({
//     address: '',
//     city: '',
//     pinCode: '',
// phone:'',
//     notes: '',
//   });
//   const dispatch = useDispatch(); 
// const {user}=useSelector((state)=>state.auth);
// const userId=user.id;
//   // Form control structure
//   const formControls = [
//     {
//       name: 'address',
//       label: 'Address',
//       placeholder: 'Enter your address',
//       componentType: 'input',
//       type: 'text',
//     },
//     {
//       name: 'city',
//       label: 'City',
//       placeholder: 'Enter your city',
//       componentType: 'input',
//       type: 'text',
//     },
//     {
//       name: 'pinCode',
//       label: 'PinCode',
//       placeholder: 'Enter your pincode',
//       componentType: 'input',
//       type: 'text',
//     },
//     {
//       name: 'notes',
//       label: 'Notes',
//       placeholder: 'Additional notes (optional)',
//       componentType: 'textarea',
//     },
//     {
//       name: 'phone',
//       label: 'Phone',
//       placeholder: 'Enter your phone number',
//       componentType: 'input',
//       type: 'tel',
//     },
//   ];
//   const handleSubmit = (event) => {
//     event.preventDefault();
    
//     // Dispatch the addAddress thunk with formData
//     dispatch(addAddress({ userId, addressData: formData })) // Adjusted here
//       .unwrap()
//       .then(() => {
      
//         // Reset form data after successful submission
//         setFormData({
//           address: '',
//           city: '',
//           pinCode: '',
//           phone: '',
//           notes: '',
//         });
//         console.log('Address added successfully');
//       })
//       .catch((error) => {
//         console.error('Failed to add address:', error);
//       });
//   };



//   return (
//     <div>
//       <CommonForm
//         formControls={formControls}
//         formData={formData}
//         setFormData={setFormData}
//         onSubmit={handleSubmit}
//         buttonText="Submit Address"
//       />
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import CommonForm from '../common/form';
import { addAddress, fetchAddresses, updateAddress } from '@/store/shop/address-slice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../ui/button';
import Address from './address';

export default function AddressTile({ selectedAddress, onCancel ,col}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userId = user.id;
console.log("colll,",col)
  // Set initial state for form data based on the selected address
  const [formData, setFormData] = useState({
    address: selectedAddress ? selectedAddress.address : '',
    city: selectedAddress ? selectedAddress.city : '',
    pinCode: selectedAddress ? selectedAddress.pinCode : '',
    phone: selectedAddress ? selectedAddress.phone : '',
    notes: selectedAddress ? selectedAddress.notes : '',
  });

  // Form control structure
  const formControls = [
    {
      name: 'address',
      label: 'Address',
      placeholder: 'Enter your address',
      componentType: 'input',
      type: 'text',
    },
    {
      name: 'city',
      label: 'City',
      placeholder: 'Enter your city',
      componentType: 'input',
      type: 'text',
    },
    {
      name: 'pinCode',
      label: 'PinCode',
      placeholder: 'Enter your pincode',
      componentType: 'input',
      type: 'text',
    },
    {
      name: 'notes',
      label: 'Notes',
      placeholder: 'Additional notes (optional)',
      componentType: 'textarea',
    },
    {
      name: 'phone',
      label: 'Phone',
      placeholder: 'Enter your phone number',
      componentType: 'input',
      type: 'tel',
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedAddress) {
      // Update the address
      dispatch(updateAddress({ userId, addressId: selectedAddress._id, updateData: formData }))
        .unwrap()
        .then(() => {
          console.log('Address updated successfully');
          onCancel(); // Clear the selected address after successful update
        })
        .catch((error) => {
          console.error('Failed to update address:', error);
        });
    } else {
      // Add a new address
      dispatch(addAddress({ userId, addressData: formData }))
        .unwrap()
        .then(() => {
          console.log('Address added successfully');
          dispatch(fetchAddresses(userId));
        })
        .catch((error) => {
          console.error('Failed to add address:', error);
        });
    }
  };

  // Update formData when selectedAddress changes
  useEffect(() => {
    if (selectedAddress) {
      setFormData({
        address: selectedAddress.address,
        city: selectedAddress.city,
        pinCode: selectedAddress.pinCode,
        phone: selectedAddress.phone,
        notes: selectedAddress.notes,
      });
    } else {
      // Reset form data when no address is selected
      setFormData({
        address: '',
        city: '',
        pinCode: '',
        phone: '',
        notes: '',
      });
    }
  }, [selectedAddress]);

  return (
    <div>
       {selectedAddress ? <div className="mt-3 flex justify-end">
        <Button className="bg-gray-500"  onClick={onCancel} >X</Button> {/* Add cancel button */}
        </div>: " "}


        
       
      <CommonForm
        formControls={formControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        buttonText={selectedAddress ? "Update Address" : "Submit Address"}
      />

    </div>
  );
}
