import React, { useEffect } from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { categoryOptionsMap } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '@/store/shop/cart-slice'
import { useToast } from '@/hooks/use-toast'

 function ShoppingproductTile({product,handleGetProductDetails})
  {
    const dispatch = useDispatch();
    const {toast}=useToast();

    const { user } = useSelector((state) => state.auth);
    console.log("userrr",user);
    
    const { items } = useSelector((state) => state.cart);
    const userId=user.id;
    const handleAddToCart = (e) => {
        e.stopPropagation(); // Prevent triggering `handleGetProductDetails` when clicking "Add to Cart"
        console.log("itemsxxzz", items);
    
        // Find the current quantity of this product in the cart
        const currentItem = items.find(item => item.productId === product._id);
        const currentQuantity = currentItem ? currentItem.quantity : 0;
    
        // Check if adding more than available stock
        if (currentQuantity + 1 > product.totalStock) {
            toast({
                variant: "destructive",
                title: `Stock Limit Reached`,
                description: `Cannot add more than ${product.totalStock} items to the cart.`,
                status: 'error',
            });
        } else {
            // Dispatch addToCart action with totalStock passed as part of the payload
            dispatch(addToCart({ 
                userId, 
                productId: product._id, 
                quantity: 1, 
                weight: product.weight,
                totalStock: product.totalStock  // Pass totalStock here
            }));
            
            toast({
                title: 'Success',
                description: 'Item added to cart',
                status: 'success',
            });
        }
    };
    
    
    return (
  
    <Card className="w-full max-w-sm mx-auto shadow-sm mt-6 "  onClick={handleGetProductDetails}>
        <div className=''>
        <div className="relative">
    <img src={product?.image} alt={product?.title} className="w-full h-[300px] object-cover rounded-t-lg" />

    {product?.salePrice > 0 && (
        <div className="absolute top-2 left-2">
            {product?.totalStock === 0 ? (
                <Badge className="bg-gray-500">Out of Stock</Badge>
            ) : product?.totalStock < 10 ? (
                <Badge className="bg-red-500">Only {product?.totalStock} items left</Badge>
            ) : (
                <Badge className="bg-red-500">Sale</Badge>
            )}
        </div>
    )}
</div>

<CardContent className="p-4">
<h2 className='text-xl font-bold mb-2'>{product?.title}</h2>
<div className='flex justify-between items-center mb-2'>
<span className='text-[16px] text-muted-foreground'>
{categoryOptionsMap[product?.category]}
</span>
<span className='text-[16px] text-muted-foreground'>
{product?.brand}
</span>
</div>
<div className='flex justify-between items-center mb-2'>

<span className={`${product?.salePrice > 0 ? 'line-through': ''} text-sm font-semibold text-primary text-muted-foreground`}>
{product?.price}
</span>

{product?.salePrice > 0 ? 
<span className=' text-sm font-semibold text-primary text-muted-foreground'>
{product?.salePrice}
</span>
:null}


</div>
</CardContent>
<CardFooter>
    {product?.totalStock > 0 ? (
        <Button className="w-full" onClick={handleAddToCart}>
            Add to cart
        </Button>
    ) : (
        <Button className="w-full bg bg-gray-500 color-black disabled" onClick={handleAddToCart} disabled>
   Out of stock
    </Button>
    )}
</CardFooter>

        </div>
    </Card>
    )
}
export default ShoppingproductTile;