import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from '@/components/ui/button';
import AddressTile from '@/components/shopping-view/address-tile';
import Address from '@/components/shopping-view/address';
import ShoppingOrders from '@/components/shopping-view/orders';

export default function ShoppingAccount() {
  // State to show/hide AddressTile
  const [showAddressTile, setShowAddressTile] = useState(false);

  // Function to toggle the AddressTile visibility
  const handleAddAddress = () => {
    setShowAddressTile(!showAddressTile); // Toggle the state
  };
  const handleCloseAddress = () => {
    setShowAddressTile(false); // Hide the address form when close icon is clicked
  };


  return (
    <div className='min-h-screen w-full'>
      <div className='w-full h-[350px]'>
        <img className='w-full h-full object-cover' src='https://americantwoshot.com/wp-content/uploads/2021/12/starting-a-clothing-line.jpg' alt='wardrobe' />
      </div>
      <div className='w-full  sm:p-3 md:p-20 md:py-20'>
        <div className='shadow-lg p-10 h-full border border-gray'>
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">

<ShoppingOrders/>

            </TabsContent>
            <TabsContent value="address" className="w-full">
              <div className='flex justify-center '>
                {/* <Button className="mt-3 mb-3" onClick={handleAddAddress}> */}
                {!showAddressTile && (
      <Button className="mt-3 mb-3" onClick={handleAddAddress}>
        Add Address
      </Button>
    )}
  </div>

  {/* Render AddressTile only when showAddressTile is true */}
  {showAddressTile && (
    <div className="relative w-full border border-gray rounded-lg p-8">
      {/* Close icon on the right side */}
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-black"
        onClick={handleCloseAddress}
      >
        &times; {/* This represents the close (X) icon */}
      </button>

      <AddressTile col={true}></AddressTile>
    </div>
  )}

              <div className='w-full border border-gray rounded-lg p-8 flex justify-between items-center'>
          <Address/>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
