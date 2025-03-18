import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import Address from '@/components/shopping-view/address';
import CartWrapper from '@/components/shopping-view/cart-wrapper';
import { createOrder } from '@/store/shop/order-slice';
import AddressTile from '@/components/shopping-view/address-tile';
import { fetchNearestBranch } from '@/store/shop/distance-slice';
import { fetchCartItems } from '@/store/shop/cart-slice';

export default function ShoppingCheckout() {
  const dispatch = useDispatch();

  const [showAddressTile, setShowAddressTile] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);

  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      dispatch(fetchCartItems(userId)); // Fetch cart items
    }
  }, [userId, dispatch]);

  const handleAddAddress = () => {
    setShowAddressTile(!showAddressTile);
  };

  const handleCloseAddress = () => {
    setShowAddressTile(false);
  };

  const handleSelectAddress = async (addressId, addressObject) => {
    setSelectedAddressId(addressId);
    setSelectedAddress(addressObject);
  
    // Calculate total weight of items in the cart
    const totalWeight = items.reduce((total, item) => {
      const itemWeight = Number(item.weight) || 0;
      const itemQuantity = Number(item.quantity) || 0;
      return total + itemWeight * itemQuantity;
    }, 0);
  
    console.log("Total weight of items:", totalWeight);
  
    // Fetch seller branches from the first item in the cart
    const sellerBranches = items[0]?.branches || []; // Use branches from the cart item
  
    // Log the seller branches for debugging
    console.log("Seller Branches:", sellerBranches);
  
    try {
      const response = await dispatch(
        fetchNearestBranch({
          address: addressObject.address,
          city: addressObject.city,
          productWeight: totalWeight,
          sellerBranches, // Pass seller branches here
        })
      ).unwrap();
  
      if (response && response.shippingCost) {
        setShippingCost(response.shippingCost); // Set the shipping cost
        console.log("Shipping cost updated:", response.shippingCost);
      } else {
        console.error("Failed to get a valid shipping cost from response");
      }
    } catch (error) {
      console.error("Error fetching nearest branch:", error);
    }
  };
  const calculateTotalPrice = () => {
    const cartTotal = items.reduce((total, item) => {
      const priceToUse = item.salePrice > 0 ? item.salePrice : item.price;
      return total + priceToUse * item.quantity;
    }, 0);

    const finalCartTotal = Number(cartTotal) || 0;
    const finalShippingCost = Number(shippingCost) || 0;

    const finalTotal = finalCartTotal + finalShippingCost;

    return finalTotal.toFixed(2).toString();
  };

  const handleCheckout = async () => {
    if (!selectedAddressId || !items.length) {
      console.log("No address or items selected for checkout.");
      return;
    }

    const total = calculateTotalPrice();
    console.log("Total price including shipping:", total);

    const addressInfo = {
      addressId: selectedAddressId,
      address: selectedAddress.address,
      city: selectedAddress.city,
      pinCode: selectedAddress.pinCode,
      notes: selectedAddress.notes,
    };

    try {
      const response = await dispatch(
        createOrder({
          items: items.map((item) => ({
            productId: item.productId,
            title: item.title,
            image: item.image,
            price: item.price,
            salePrice: item.salePrice,
            quantity: item.quantity,
          })),
          userId,
          addressInfo,
          total,
        })
      ).unwrap();

      console.log('Order created successfully:', response);
    } catch (error) {
      console.error('Failed to create order:', error);
    }
  };

  return (
    <div className='w-full min-h-screen'>
      <div className='h-[360px] w-full'>
        <img
          className='w-full h-full object-cover'
          src='https://americantwoshot.com/wp-content/uploads/2021/12/starting-a-clothing-line.jpg'
          alt='wardrobe'
        />
      </div>
      <div className='flex p-1 md:p-20 flex-col md:flex-row '>
        <div className='w-full md:w-1/2 pr-4'>
          <div className='flex justify-center'>
            {!showAddressTile && (
              <Button className="mt-3 mb-3" onClick={handleAddAddress}>
                Add Address
              </Button>
            )}
          </div>

          {showAddressTile && (
            <div className="relative border border-gray rounded-lg p-8">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-black"
                onClick={handleCloseAddress}
              >
                &times;
              </button>
              <AddressTile col={true} />
            </div>
          )}

          <div className='w-full border border-gray rounded-lg p-8 mt-4'>
            <Address col={true} onSelect={handleSelectAddress} />
          </div>
        </div>

        <div className='w-full md:w-1/2'>
          <CartWrapper cartItems={items} showCheckOutButton={false} />
          <Button className="mt-3 w-full" onClick={handleCheckout}>
            CheckOut with Paypal
          </Button>
        </div>
      </div>
    </div>
  );
}