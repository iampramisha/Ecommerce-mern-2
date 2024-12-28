// import React from 'react';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardFooter } from '@/components/ui/card';
// import { deleteProduct } from '@/store/admin/product-slice';
// import { useDispatch } from 'react-redux';

// export default function AdminproductTile({ product }) {
//     const dispatch = useDispatch();

//     const handleDelete = async () => {
//         try {
//           await dispatch(deleteProduct(product._id)).unwrap(); // Ensure action is fulfilled
//           alert('Product deleted successfully');
//           // Optionally, you could handle additional logic like updating UI or state
//         } catch (error) {
//           console.error('Error deleting product:', error);
//           alert('Failed to delete product');
//         }
//       };
//   return (
//     <Card className="w-full max-w-xs mx-auto">
//       <div className='relative'>
//         <img src={product?.image} alt={product?.title} className='w-full h-[300px] object-cover rounded-t-lg' />
//       </div>
//       <CardContent className="flex flex-col justify-center items-center">
//         <h2 className='text-xl font-bold mb-2'>{product?.title}</h2>
//         <div className='flex gap-2 justify-between items-center mb-2'>
//           <span className={`${product?.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>
//             ${product?.price}
//           </span>
//           <span className='text-lg font-bold'>${product?.salePrice}</span>
//         </div>
//       </CardContent>
//       <CardFooter className="flex justify-between items-center p-4 bg-gray-100">
//         <Button className="flex flex-1 w-full mx-1">Edit</Button>
//         <Button className="flex flex-1 w-full mx-1" onClick={handleDelete}>Delete</Button>
//       </CardFooter>
//     </Card>
//   );
// }
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '@/store/admin/product-slice';

export default function AdminproductTile({ product, onEdit }) {
    const dispatch = useDispatch();

        const handleDelete = async () => {
            try {
              await dispatch(deleteProduct(product._id)).unwrap(); // Ensure action is fulfilled
              alert('Product deleted successfully');
              // Optionally, you could handle additional logic like updating UI or state
            } catch (error) {
              console.error('Error deleting product:', error);
              alert('Failed to delete product');
            }
          };
    return (
    <Card className="w-full max-w-xs mx-auto">
      <div className='relative'>
        <img src={product?.image} alt={product?.title} className='w-full h-[300px] object-cover rounded-t-lg' />
      </div>
      <CardContent className="flex flex-col justify-center">
        <h2 className='text-2xl font-bold mb-2 '>{product?.title}</h2>
        <div className='flex gap-2 justify-between  mb-2'>
          <span className={`${product?.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>
            ${product?.price}
          </span>
          {product?.salePrice ? (
  <span className='text-lg font-bold'>${product.salePrice}</span>
) : null}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 bg-gray-100">
        <Button className="flex flex-1 w-full mx-1" onClick={onEdit}>Edit</Button>
        <Button className="flex flex-1 w-full mx-1" onClick={handleDelete}>Delete</Button>
      </CardFooter>
    </Card>
  );
}
