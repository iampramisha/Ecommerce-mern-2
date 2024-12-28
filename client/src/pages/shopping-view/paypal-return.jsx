import { capturePayment } from '@/store/shop/order-slice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Import the capturePayment action
import { useLocation } from 'react-router-dom';

const PaypalReturn = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get('paymentId');
    const payerId = queryParams.get('PayerID');
    const orderId = queryParams.get('orderId'); // Optional if you have the order ID

    if (paymentId && payerId) {
      // Dispatch the capturePayment action
      dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
        if (data?.payload?.success) {
        
          window.location.href = "/shop/payment-success";
        }
      });
    }
  }, [location, dispatch]);

  return (
    <div>
      <h2>Processing Payment...</h2>
      <p>Please wait while we finalize your payment.</p>
    </div>
  );
};

export default PaypalReturn;
