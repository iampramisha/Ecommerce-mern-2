import React, { useEffect, useState } from 'react'
import AuthLayout from './components/auth/layout'
import AuthRegister from './pages/auth/register'
import AuthLogin from './pages/auth/login'
import { Navigate, Route, Routes } from 'react-router-dom'
import AdminDashboard from './pages/admin-view/dashboard'
import AdminFeatures from './pages/admin-view/features'
import AdminOrders from './pages/admin-view/orders'
import AdminProducts from './pages/admin-view/products'
import AdminLayout from './components/admin-view/layout'
import NotFound from './pages/not-found'
import ShoppingLayout from './components/shopping-view/layout'
import ShoppingHome from './pages/shopping-view/home'
import ShoppingAccount from './pages/shopping-view/account'
import ShoppingCheckout from './pages/shopping-view/checkout'
import ShoppingListing from './pages/shopping-view/listing'
import CheckAuth from './components/common/check-auth'
import UnauthPage from './pages/unauth'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/auth-slice'
import { Skeleton } from "@/components/ui/skeleton"
import PaypalReturn from './pages/shopping-view/paypal-return'
import PaymentSuccessPage from './pages/shopping-view/paypal-cancel'
import Sale from './pages/shopping-view/sale.jsx'
import ChatPage from './pages/shopping-view/chat'
export default function App() {

  const {user,isAuthenticated,isLoading}=useSelector(state=> state.auth);

  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(checkAuth());
  },[dispatch])


  if (isLoading) 
    return <div><Skeleton className="w-[800px] bg-black h-[60px]" />

</div>;
  
  console.log({user,isAuthenticated})
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* <h1>header</h1> */}
      <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated ? "/shop/home" : "/auth/login"} />} />

        {/* Authentication routes */}
        <Route path='/auth' element={<AuthLayout />}>
          <Route path='login' element={
      
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >      <AuthLogin /></CheckAuth>
          }
             />
          <Route path='register' element={<AuthRegister />} />
        </Route>
        
        {/* Admin routes */}
        <Route path='/admin' element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user} >      <AdminLayout/></CheckAuth>
    
          
          }>
          <Route path='dashboard' element={<AdminDashboard/>} />
          <Route path='feature' element={<AdminFeatures/>} />
          <Route path='orders' element={<AdminOrders/>} />
          <Route path='products' element={<AdminProducts/>} />
        </Route>
        <Route path='/shop' element={
          <CheckAuth  isAuthenticated={isAuthenticated} user={user}>

            
          <ShoppingLayout/>
          </CheckAuth>
        }>
          
       <Route path='home' element={<ShoppingHome/>}/>
       <Route path='listing' element={<ShoppingListing/>}/>
       <Route path='account' element={<ShoppingAccount/>}/>
       <Route path='checkout' element={<ShoppingCheckout/>}/>
       <Route path='paypal-return' element={<PaypalReturn/>}/>
       <Route path='payment-success' element={<PaymentSuccessPage/>}/>
       <Route path='/shop/sales' element={<Sale/>}/>
       <Route path='chat/:productId/:chatId' element={<ChatPage />} />

       
        </Route>
        <Route path='*' element={<NotFound/>}></Route>
        <Route path='/unauth-page' element={<UnauthPage/>}></Route>
      </Routes>
    </div>
  )
}
