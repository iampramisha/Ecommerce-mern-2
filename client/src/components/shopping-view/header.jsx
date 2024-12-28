// import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from 'lucide-react';
// import React, { useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
// import { Button } from '../ui/button';
// import { useDispatch, useSelector } from 'react-redux';
// import { shoppingViewHeaderMenuItems } from '@/config';
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
// import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
// import { logoutUser } from '@/store/auth-slice';
// import CartWrapper from './cart-wrapper';
// import { fetchCartItems } from '@/store/shop/cart-slice';

// function ShoppingViewHeader() {
//   const { isAuthenticated, user } = useSelector((state) => state.auth);
//   console.log("user",user);
//   // const { items = [] } = useSelector((state) => state.cart || {});
//   // const { items, status, error } = useSelector((state) => state.cart);
//   const { items = [] } = useSelector((state) => state.cart); // Access cart items

//   console.log("items",items)
//   console.log("User",user);
// const navigate=useNavigate();
// const dispatch=useDispatch();
// useEffect(() => {
//   if (user?.id) {
//     dispatch(fetchCartItems(user.id));
//   }
// }, [dispatch,user?.id]);
//   function MenuItems() {
//     return (
//       <nav className='flex sm:flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex lg:flex-row'>
//         {shoppingViewHeaderMenuItems.map((menuItem) => (
//           <Link className="text-sm font-medium" key={menuItem.id} to={menuItem.path}>
//             {menuItem.label}
//           </Link>
//         ))}
//       </nav>
//     );
//   }
//   function handleLogout() {
//     dispatch(logoutUser());
//     sessionStorage.removeItem("filters");

//     // Correctly dispatch the logout action
//     navigate('/auth/login');  // Redirect to login or wherever you'd like
//   }

//   function HeaderRightContent() {
//     return (
//       <div className='flex flex-row lg:items-center lg:flex-row  gap-4'>
//          <Sheet>
//           <SheetTrigger asChild>
//             <Button variant="outline" size="icon">
//               <ShoppingCart className="w-6 h-6" />
//               <span className="sr-only">User Cart</span>
//             </Button>
//           </SheetTrigger>

//           <SheetContent>
//             {/* Pass the cart items to CartWrapper */}
//             <CartWrapper cartItems={items} />
//           </SheetContent>
//         </Sheet>
//         {/* Correct structure of DropdownMenu */}
//         <DropdownMenu>
//   <DropdownMenuTrigger asChild>
//     <Avatar className="bg-black w-10 h-10 rounded-full flex items-center justify-center">
//       <AvatarFallback className="bg-black text-white text-lg font-extrabold">
//         {user?.userName[0].toUpperCase()}
//       </AvatarFallback>
//     </Avatar>
//   </DropdownMenuTrigger>

//   {/* Ensure DropdownMenuContent is inside DropdownMenu */}
//   <DropdownMenuContent
//     side="right"
//     className="w-56 z-50 flex flex-col bg-white border border-gray-200 shadow-lg rounded-md mr-2"
//   >   <DropdownMenuLabel className="py-2 px-4 rounded-md text-center font-semibold hover:bg-gray-100">
//       Logged In as {user?.userName || 'User'}
//     </DropdownMenuLabel>
//     <DropdownMenuSeparator />
//     <DropdownMenuItem className="flex items-center px-4 py-2 hover:bg-gray-100" onClick={()=>navigate('/shop/account')}>
//       <UserCog className='mr-2 h-4 w-4' />
//       Account
//     </DropdownMenuItem>
//     <DropdownMenuSeparator />
//     <DropdownMenuItem className="flex items-center px-4 py-2 hover:bg-gray-100"  onClick={handleLogout}>
//       <LogOut className='mr-2 h-4 w-4' />
//       Logout
//     </DropdownMenuItem>
//     {/* Add additional menu items here if needed */}
//   </DropdownMenuContent>
// </DropdownMenu>

//       </div>
//     );
//   }

//   return (
//     <header className='sticky top-0 z-40 w-full border-b bg-background'>
//       <div className='flex h-16 items-center justify-between px-4 md:px-6'>
//         <Link to='/shop/home' className='flex items-center gap-2'>
//           <HousePlug className='h-6 w-6' />
//           <span className='font-bold'>Ecommerce</span>
//         </Link>

//         {/* Properly wrapping SheetTrigger inside a Sheet */}
//         <Sheet>
//           <SheetTrigger asChild>
//             <Button variant="outline" size="icon" className="lg:hidden">
//               <Menu className="h-6 w-6" />
//               <span className='sr-only'>Toggle header menu</span>
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="left" className="w-full max-w-sm">
//             <MenuItems />
//             <HeaderRightContent /> 
//           </SheetContent>
//         </Sheet>

//         <div className='hidden lg:block'>
//           < />
//         </div>
        
      
//          <div className='hidden lg:block'>
//          <HeaderRightContent /> 
//          </div>
//       </div>
//     </header>
//   );
// }

// export default ShoppingViewHeader;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { shoppingViewHeaderMenuItems } from '@/config';
import CartWrapper from './cart-wrapper';
import { fetchCartItems } from '@/store/shop/cart-slice';
import { checkAuth, logoutUser } from '@/store/auth-slice';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from 'lucide-react';
import { Label } from '../ui/label';

function ShoppingViewHeader() {
  const navigate=useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { items, status } = useSelector((state) => state.cart); // Access cart status as well
  const [loading, setLoading] = useState(true); // New loading state


  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (user?.id) {
  //     dispatch(fetchCartItems(user.id));
  //   }
  // }, [dispatch, user?.id]);

  // Monitor the status of the cart fetching
  // useEffect(() => {
  //   if (status === 'succeeded' || status === 'failed') {
  //     setLoading(false); // Stop loading when cart fetching completes
  //   }
  // }, [status]);

  // function handleLogout() {
  //   dispatch(logoutUser());
  //   sessionStorage.removeItem("filters");
  //   navigate('/auth/login');
  // }
  // function handleNavigate(getCurrentMenuItem, section) {
  //   sessionStorage.removeItem("filters"); // Clear previous filters first
    
  //   let currentFilter = null;
  
  //   // If the menu item is not 'home', set the category filter
  //   if (getCurrentMenuItem.id !== 'home'  && getCurrentMenuItem.id !== 'products') {
  //     currentFilter = {
  //       category: [getCurrentMenuItem.id]
  //     };
  //     sessionStorage.setItem('filters', JSON.stringify(currentFilter)); // Store the filter
  //   }
  
  //   // Navigate to the desired path
  //   navigate(getCurrentMenuItem.path);
  // }
  const handleLogout = async () => {
    await dispatch(logoutUser()); // Ensure logout completes

    sessionStorage.removeItem("filters"); // Clear filters
    localStorage.removeItem("token");
    navigate('/auth/login'); // Redirect to login page
  };
  function handleNavigate(getCurrentMenuItem, section) {
    sessionStorage.removeItem("filters"); // Clear previous filters first
// window.reload();
    let currentFilter = null;

    // If the menu item is not 'home', set the category filter
   
      if (getCurrentMenuItem.id !== 'home'  && getCurrentMenuItem.id !== 'products') {
      currentFilter = {
        category: [getCurrentMenuItem.id]
      };
      sessionStorage.setItem('filters', JSON.stringify(currentFilter)); // Store the filter
    }
        navigate(getCurrentMenuItem.path);
        window.location.reload();
}
  // function handleLogout() {
  //   dispatch(logoutUser());
  //   sessionStorage.removeItem("filters");
  //   navigate('/auth/login');
  // }
  // function handleNavigate(getCurrentMenuItem, section) {
  //   sessionStorage.removeItem("filters"); // Clear previous filters first

  //   let currentFilter = null;

  //   // If the menu item is not 'home', set the category filter
  //   if (getCurrentMenuItem.id !== 'home'  && getCurrentMenuItem.id !== 'products') {
  //     currentFilter = {
  //       category: [getCurrentMenuItem.id]
  //     };
  //     sessionStorage.setItem('filters', JSON.stringify(currentFilter)); // Store the filter
  //   }

  //   // Navigate to the desired path
  //   navigate(getCurrentMenuItem.path);
  // }

  function HeaderRightContent() {
    return (
      <div className='flex flex-row lg:items-center lg:flex-row  gap-4'>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <ShoppingCart className="w-6 h-6" />
              <span className="sr-only">User Cart</span>
            </Button>
          </SheetTrigger>

          <SheetContent>
            {/* Show loading spinner or message while cart is being fetched */}
      
              <CartWrapper cartItems={items} showCheckOutButton={true} />
       
          </SheetContent>
        </Sheet>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-black w-10 h-10 rounded-full flex items-center justify-center">
              <AvatarFallback className="bg-black text-white text-lg font-extrabold">
                {user?.userName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="right"
            className="w-56 z-50 flex flex-col bg-white border border-gray-200 shadow-lg rounded-md mr-2"
          >
            <DropdownMenuLabel className="py-2 px-4 rounded-md text-center font-semibold hover:bg-gray-100">
              Logged In as {user?.userName || 'User'}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center px-4 py-2 hover:bg-gray-100" onClick={() => navigate('/shop/account')}>
              <UserCog className='mr-2 h-4 w-4' />
              Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center px-4 py-2 hover:bg-gray-100" onClick={handleLogout}>
              <LogOut className='mr-2 h-4 w-4' />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='flex h-16 items-center justify-between px-4 md:px-6'>
        <Link to='/shop/home' className='flex items-center gap-2'>
          <HousePlug className='h-6 w-6' />
          <span className='font-bold'>Ecommerce</span>
        </Link>

        <div className='hidden lg:block'>
          <nav className='flex sm:flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex lg:flex-row'>
            {shoppingViewHeaderMenuItems.map((menuItem) => (
              <Label className="text-sm font-medium cursor-pointer" key={menuItem.id} 
              onClick={() => handleNavigate(menuItem)}
     >
                {menuItem.label}
              </Label>
            ))}
          </nav>
        </div>

        <div className='hidden lg:block'>
          <HeaderRightContent />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className='sr-only'>Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-sm">
            <nav className='flex sm:flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex lg:flex-row'>
              {shoppingViewHeaderMenuItems.map((menuItem) => (
                <Link className="text-sm font-medium" key={menuItem.id} to={menuItem.path}>
                  {menuItem.label}
                </Link>
              ))}
            </nav>
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default ShoppingViewHeader;
