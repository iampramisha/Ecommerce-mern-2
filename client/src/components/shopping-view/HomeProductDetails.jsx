// ProductDetailDialog.js
import React from 'react';
import {
    Dialog,
    DialogPortal,
    DialogOverlay,

    DialogContent,

  } from '@/components/ui/dialog'; 
  import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { Button } from '@/components/ui/button'; // Adjust import path if necessary

import { Star } from 'lucide-react';
import { Input } from '../ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/shop/cart-slice';

const HomeProductDetails = ({ isOpen, onClose, product }) => {
  if (!product) return null;
  const dispatch=useDispatch();
  const {user}=useSelector((state)=>state.auth);
  const userId=user?.id;
  const handleAddToCartt = () => {

    dispatch(addToCart({ userId, productId: product._id, quantity: 1 })); // Assuming quantity is 1
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="max-w-screen-md p-6 shadow-xl">
          <div className="flex gap-6 mt-7 mb-7">
            {/* Image Column */}
            <div className="flex-shrink-0 w-2/5">
              <img
                className="w-full max-h-[400px] object-cover shadow-lg rounded-lg"
                src={product.image}
                alt={product.title}
              />
            </div>

            {/* Details Column */}
            
            <div className="flex-grow w-3/5">
              <div className="mb-4">
                <div className='text-3xl font-bold mb-2'>
                  {product.title}
                </div>
                <p className="text-xl font-semibold text-muted-foreground">
                  {product.title}
                </p>
                <div className='flex flex-row justify-between mb-4'>
                  <p className="text-xl font-semibold line-through">
                    ${product.salePrice}
                  </p>
                  <p className="text-xl font-semibold text-black">
                    ${product.price}
                  </p>
                </div>
                <div className='flex items-center mb-4'>
                  <p className='flex flex-row items-center'>
                    <Star className='fill-primary' /> <Star className='fill-primary' />
                    <Star className='fill-primary' />
                    <Star className='fill-primary' />
                    <p style={{ color: '#6b7280', marginLeft: '0.5rem' }}>(4.5)</p>
                  </p>
                </div>
              </div>
              <div>
              <Button className="w-full mb-4" onClick={() => handleAddToCartt()}>Add to Cart</Button>

                <p className='font-bold mb-2'>Reviews</p>
               <div className='h-[130px] overflow-y-auto'>
                <div className='flex flex-row items-center '>
                  <Avatar className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center">
                    <AvatarFallback className="bg-gray-200 text-black text-lg">
                      SM
                    </AvatarFallback>
                  </Avatar>
                  <div className='ml-3'>
                    <h1 className='text-lg font-semibold'>Sangam Mukherjee</h1>
                    <div className='flex flex-row items-center'>
                      <Star className='fill-primary' /> <Star className='fill-primary' />
                      <Star className='fill-primary' />
                      <Star className='fill-primary' />
                    </div>
                    <p className='mt-1 text-gray-700'>This is an awesome product</p>
                  </div>
                </div>
          
                
                <div className='flex flex-row items-center '>
                  <Avatar className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center">
                    <AvatarFallback className="bg-gray-200 text-black text-lg">
                      SM
                    </AvatarFallback>
                  </Avatar>
                  <div className='ml-3'>
                    <h1 className='text-lg font-semibold'>Sangam Mukherjee</h1>
                    <div className='flex flex-row items-center'>
                      <Star className='fill-primary' /> <Star className='fill-primary' />
                      <Star className='fill-primary' />
                      <Star className='fill-primary' />
                    </div>
                    <p className='mt-1 text-gray-700'>This is an awesome product</p>
                  </div>
                </div>
                <div className='flex flex-row items-center '>
                  <Avatar className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center">
                    <AvatarFallback className="bg-gray-200 text-black text-lg">
                      SM
                    </AvatarFallback>
                  </Avatar>
                  <div className='ml-3'>
                    <h1 className='text-lg font-semibold'>Sangam Mukherjee</h1>
                    <div className='flex flex-row items-center'>
                      <Star className='fill-primary' /> <Star className='fill-primary' />
                      <Star className='fill-primary' />
                      <Star className='fill-primary' />
                    </div>
                    <p className='mt-1 text-gray-700'>This is an awesome product</p>
                  </div>
                </div>
                <div className='flex flex-row items-center '>
                  <Avatar className="bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center">
                    <AvatarFallback className="bg-gray-200 text-black text-lg">
                      SM
                    </AvatarFallback>
                  </Avatar>
                  <div className='ml-3'>
                    <h1 className='text-lg font-semibold'>Sangam Mukherjee</h1>
                    <div className='flex flex-row items-center'>
                      <Star className='fill-primary' /> <Star className='fill-primary' />
                      <Star className='fill-primary' />
                      <Star className='fill-primary' />
                    </div>
                    <p className='mt-1 text-gray-700'>This is an awesome product</p>
                  </div>
                </div>
                
              </div>
              </div> 
              <div className='flex flex-row gap-3 mt-3 justify-between'>
              <Input placeholder="give your review"></Input>
              <Button>Submit</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default HomeProductDetails;
