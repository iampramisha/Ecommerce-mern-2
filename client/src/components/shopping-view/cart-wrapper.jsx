// CartWrapper.jsx
import React from 'react';
import CartItemsContent from './cart-items-content';

function CartWrapper({ cartItems,showCheckOutButton  }) {
  
  return (
    <div>
       <div className="cart-wrapper">
      <h2>Your Cart</h2>
      <CartItemsContent items={cartItems} showCheckOutButton={showCheckOutButton}/>
    </div>
    </div>
  );
}

export default CartWrapper;
