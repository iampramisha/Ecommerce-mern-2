import { capturePayment } from '@/store/shop/order-slice';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const PaypalReturn = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth); // Assuming user details are in the auth state
  const userId = user?.id;

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get('paymentId');
    const payerId = queryParams.get('PayerID');
    const orderId = queryParams.get('orderId');

    if (paymentId && payerId && userId) {
      // Dispatch the capturePayment action with the userId, paymentId, payerId, and orderId
      dispatch(capturePayment({ paymentId, payerId, orderId, userId })).then((data) => {
        if (data?.payload?.success) {
          window.location.href = "/shop/payment-success";
        }
      });
    }
  }, [location, dispatch, userId]); // Ensure userId is part of the dependency array

  return (
    <div>
      <h2>Processing Payment...</h2>
      <p>Please wait while we finalize your payment.</p>
    </div>
  );
};

export default PaypalReturn;
