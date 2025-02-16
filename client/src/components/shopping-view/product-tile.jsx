


import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { categoryOptionsMap } from '@/config';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/shop/cart-slice';
import { useToast } from '@/hooks/use-toast';
import ProductDetailDialog from './productDetailsmodel';
import { Heart } from 'lucide-react';
import { addToFavorites, removeFromFavorites, fetchFavorites } from '@/store/auth-slice';

function ShoppingproductTile({ product }) {
  
    const dispatch = useDispatch();
    const { toast } = useToast();
    const { user } = useSelector((state) => state.auth);
    const { items } = useSelector((state) => state.cart);
    const { favorites } = useSelector((state) => state.auth);

    const userId = user?.id;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const isFavorite = favorites?.includes(product._id)
    ;


    useEffect(() => {
        if (userId) {
            dispatch(fetchFavorites(userId));
        }
    }, [dispatch]);

    const handleGetProductDetails = (productId) => {
        setSelectedProductId(productId);
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedProductId(null);
    };

    const handleAddToCart = (e) => {
        e.stopPropagation();
        const currentItem = items.find((item) => item.productId === product._id);
        const currentQuantity = currentItem ? currentItem.quantity : 0;

        if (currentQuantity + 1 > product.totalStock) {
            toast({
                variant: 'destructive',
                title: 'Stock Limit Reached',
                description: `Cannot add more than ${product.totalStock} items to the cart.`,
                status: 'error',
            });
        } else {
            dispatch(
                addToCart({
                    userId,
                    productId: product._id,
                    quantity: 1,
                    weight: product.weight,
                    totalStock: product.totalStock,
                })
            );
            toast({
                title: 'Success',
                description: 'Item added to cart',
                status: 'success',
            });
        }
    };

    const handleToggleFavorite = (e) => {
        e.stopPropagation();
        if (isFavorite) {
            dispatch(removeFromFavorites({ userId, productId: product._id }));
            toast({
                title: 'Removed from Favorites',
                description: `${product?.title} has been removed from your favorites.`,
                status: 'success',
            });
        } else {
            dispatch(addToFavorites({ userId, productId: product._id }));
            toast({
                title: 'Added to Favorites',
                description: `${product?.title} has been added to your favorites.`,
                status: 'success',
            });
        }
    };
    
    return (
        <div>
            <Card
                className="w-full max-w-sm mx-auto shadow-sm mt-6"
                onClick={() => handleGetProductDetails(product._id)}
            >
                <div>
                    <div className="relative">
                        {/* Image Container with Aspect Ratio */}
                        <div className="w-full h-[300px] bg-gray-200 relative">
                            <img
                                src={product?.image}
                                alt={product?.title}
                                className="object-cover w-full h-full rounded-t-lg"
                                width={300}
                                height={300}
                                // loading="lazy"
                            />
                        </div>

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

                        {/* Favorite Icon */}
                        <button
                            className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md"
                            onClick={handleToggleFavorite}
                        >
                            <Heart
                                className={`w-6 h-6 ${isFavorite ? 'text-red-500' : 'text-gray-500'}`}
                            />
                        </button>
                    </div>

                    <CardContent className="p-4">
                        <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[16px] text-muted-foreground">
                                {categoryOptionsMap[product?.category]}
                            </span>
                            <span className="text-[16px] text-muted-foreground">{product?.brand}</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span
                                className={`${
                                    product?.salePrice > 0 ? 'line-through' : ''
                                } text-sm font-semibold text-primary text-muted-foreground`}
                            >
                                {product?.price}
                            </span>

                            {product?.salePrice > 0 ? (
                                <span className="text-sm font-semibold text-primary text-muted-foreground">
                                    {product?.salePrice}
                                </span>
                            ) : null}
                        </div>
                    </CardContent>
                    <CardFooter>
                        {product?.totalStock > 0 ? (
                            <Button className="w-full" onClick={handleAddToCart}>
                                Add to cart
                            </Button>
                        ) : (
                            <Button className="w-full bg-gray-500 color-black disabled" disabled>
                                Out of stock
                            </Button>
                        )}
                    </CardFooter>
                </div>
            </Card>

            {/* Product Detail Dialog */}
            <ProductDetailDialog
                isOpen={isDialogOpen}
                onClose={closeDialog}
                productId={selectedProductId}
            />
        </div>
    );
}

export default ShoppingproductTile;

// import React, { useEffect, useState } from 'react';
// import { Card, CardContent, CardFooter } from '../ui/card';
// import { Badge } from '../ui/badge';
// import { Button } from '../ui/button';
// import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../ui/tooltip'; // Assuming you have a tooltip component

// import { categoryOptionsMap } from '@/config';
// import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '@/store/shop/cart-slice';
// import { useToast } from '@/hooks/use-toast';
// import ProductDetailDialog from './productDetailsmodel';
// import { Heart, MessageCircle } from 'lucide-react'; // Import chat icon
// import { addToFavorites, removeFromFavorites, fetchFavorites } from '@/store/auth-slice';
// import ChatBox from './chatBox';

// function ShoppingproductTile({ product }) {
//     const dispatch = useDispatch();
//     const { toast } = useToast();
//     const { user } = useSelector((state) => state.auth);
//     const { items } = useSelector((state) => state.cart);
//     const { favorites } = useSelector((state) => state.auth);

//     const userId = user?.id;
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const [selectedProductId, setSelectedProductId] = useState(null);
//     const [isChatOpen, setIsChatOpen] = useState(false); // State for chatbox visibility

//     const isFavorite = favorites?.includes(product._id);

//     useEffect(() => {
//         if (userId) {
//             dispatch(fetchFavorites(userId));
//         }
//     }, [dispatch, userId]);

//     const handleGetProductDetails = (productId) => {
//         setSelectedProductId(productId);
//         setIsDialogOpen(true);
//     };

//     const closeDialog = () => {
//         setIsDialogOpen(false);
//         setSelectedProductId(null);
//     };

//     const handleAddToCart = (e) => {
//         e.stopPropagation();
//         const currentItem = items.find((item) => item.productId === product._id);
//         const currentQuantity = currentItem ? currentItem.quantity : 0;

//         if (currentQuantity + 1 > product.totalStock) {
//             toast({
//                 variant: 'destructive',
//                 title: 'Stock Limit Reached',
//                 description: `Cannot add more than ${product.totalStock} items to the cart.`,
//                 status: 'error',
//             });
//         } else {
//             dispatch(
//                 addToCart({
//                     userId,
//                     productId: product._id,
//                     quantity: 1,
//                     weight: product.weight,
//                     totalStock: product.totalStock,
//                 })
//             );
//             toast({
//                 title: 'Success',
//                 description: 'Item added to cart',
//                 status: 'success',
//             });
//         }
//     };

//     const handleToggleFavorite = (e) => {
//         e.stopPropagation();
//         if (isFavorite) {
//             dispatch(removeFromFavorites({ userId, productId: product._id }));
//             toast({
//                 title: 'Removed from Favorites',
//                 description: `${product?.title} has been removed from your favorites.`,
//                 status: 'success',
//             });
//         } else {
//             dispatch(addToFavorites({ userId, productId: product._id }));
//             toast({
//                 title: 'Added to Favorites',
//                 description: `${product?.title} has been added to your favorites.`,
//                 status: 'success',
//             });
//         }
//     };

//     const openChatbox = (e) => {
//         // e.stopPropagation();
//         setIsChatOpen(true);
//     };

//     const closeChatbox = () => {
//         setIsChatOpen(false);
//     };

//     return (
//         <div>
//             <Card
//                 className="w-full max-w-sm mx-auto shadow-sm mt-6"
//                 onClick={() => handleGetProductDetails(product._id)}
//             >
//                 <div>
//                     <div className="relative">
//                         <div className="w-full h-[300px] bg-gray-200 relative">
//                             <img
//                                 src={product?.image}
//                                 alt={product?.title}
//                                 className="object-cover w-full h-full rounded-t-lg"
//                                 width={300}
//                                 height={300}
//                             />
//                         </div>

//                         {product?.salePrice > 0 && (
//                             <div className="absolute top-2 left-2">
//                                 {product?.totalStock === 0 ? (
//                                     <Badge className="bg-gray-500">Out of Stock</Badge>
//                                 ) : product?.totalStock < 10 ? (
//                                     <Badge className="bg-red-500">Only {product?.totalStock} items left</Badge>
//                                 ) : (
//                                     <Badge className="bg-red-500">Sale</Badge>
//                                 )}
//                             </div>
//                         )}

//                         {/* Favorite Icon */}
//                         <button
//                             className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md"
//                             onClick={handleToggleFavorite}
//                         >
//                             <Heart
//                                 className={`w-6 h-6 ${isFavorite ? 'text-red-500' : 'text-gray-500'}`}
//                             />
//                         </button>

//                         {/* Chat Icon with Tooltip */}
//                         <TooltipProvider>
//                         <Tooltip>
//                             <TooltipTrigger asChild>
//                                 <button
//                                     className="absolute bottom-2 right-2 p-2 rounded-full bg-white shadow-md"
//                                     onClick={openChatbox}
//                                 >
//                                     <MessageCircle className="w-6 h-6 text-gray-500" />
//                                 </button>
//                             </TooltipTrigger>
//                             <TooltipContent>Text the seller</TooltipContent>
//                         </Tooltip>
//                         </TooltipProvider>
//                     </div>

//                     <CardContent className="p-4">
//                         <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
//                         <div className="flex justify-between items-center mb-2">
//                             <span className="text-[16px] text-muted-foreground">
//                                 {categoryOptionsMap[product?.category]}
//                             </span>
//                             <span className="text-[16px] text-muted-foreground">{product?.brand}</span>
//                         </div>
//                         <div className="flex justify-between items-center mb-2">
//                             <span
//                                 className={`${
//                                     product?.salePrice > 0 ? 'line-through' : ''
//                                 } text-sm font-semibold text-primary text-muted-foreground`}
//                             >
//                                 {product?.price}
//                             </span>

//                             {product?.salePrice > 0 ? (
//                                 <span className="text-sm font-semibold text-primary text-muted-foreground">
//                                     {product?.salePrice}
//                                 </span>
//                             ) : null}
//                         </div>
//                     </CardContent>
//                     <CardFooter>
//                         {product?.totalStock > 0 ? (
//                             <Button className="w-full" onClick={handleAddToCart}>
//                                 Add to cart
//                             </Button>
//                         ) : (
//                             <Button className="w-full bg-gray-500 color-black disabled" disabled>
//                                 Out of stock
//                             </Button>
//                         )}
//                     </CardFooter>
//                 </div>
//             </Card>

//             {/* Product Detail Dialog */}
//             <ProductDetailDialog
//                 isOpen={isDialogOpen}
//                 onClose={closeDialog}
//                 productId={selectedProductId}
//             />

//             {/* Chatbox Component */}
//             {isChatOpen && (
//                 <ChatBox productId={product._id} onClose={closeChatbox} />
//             )}
//         </div>
//     );
// }

// export default ShoppingproductTile;
