import { fetchAllProducts } from '@/store/shop/products-slice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import salebannnnerr from '@/assets/salebannnnerr.png'; // Adjust the path based on where you store your assets
import ProductDetailDialog from '@/components/shopping-view/productDetailsmodel';

const Sale = () => {
  const dispatch = useDispatch();
  const [saleProducts, setSaleProducts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const handleGetProductDetails = (productId) => {
        setSelectedProductId(productId);
        setIsDialogOpen(true);  // Open the dialog when a product is clicked
    };
    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedProductId(null);  // Reset the product ID when closing the dialog
    };

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await dispatch(fetchAllProducts()).unwrap();
      if (result && result.success) {
        const filteredProducts = result.data.filter(
          (product) => product.salePrice < product.price
        );
        setSaleProducts(filteredProducts);
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div className="w-full min-h-screen bg-gray-200">
      {/* Sale Banner */}
      <div className="relative">
        <img
          src={salebannnnerr}
          alt="Sale Banner"
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-white text-5xl font-bold">Shop the Best Deals!</h1>
        </div>
      </div>

      {/* Sale Products Section */}
      <div className="container mx-auto p-6">
        <h2 className="text-center text-4xl font-bold text-red-800 mb-6">
          Sale Products
        </h2>
        {saleProducts.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {saleProducts.map((product) => {
              const discountPercentage = (
                ((product.price - product.salePrice) / product.price) *
                100
              ).toFixed(2);

              return (
                <li
                  key={product._id}
                  className="w-full max-w-xs mx-auto border rounded-lg shadow-lg bg-white hover:shadow-2xl transition-shadow"
                  onClick={() => handleGetProductDetails(product._id)} // Pass product._id here to trigger the dialog
                >
                  {/* Image Section */}
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-[300px] object-cover rounded-t-lg"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="p-4 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
                    <div className="flex gap-2 justify-between mb-2">
                      <span
                        className={`${
                          product.salePrice ? 'line-through' : ''
                        } text-lg font-semibold text-primary`}
                      >
                        ${product.price}
                      </span>
                      {product.salePrice ? (
                        <span className="text-lg font-bold text-green-600">
                          ${product.salePrice}
                        </span>
                      ) : null}
                    </div>
                    <div className="flex flex-col gap-1 text-sm justify-center items-center pb-4">
                      <p className="text-red-500 font-extrabold text-2xl">
                        {discountPercentage}% OFF
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No sale products available.</p>
        )}
      </div>
      <ProductDetailDialog
                isOpen={isDialogOpen}
                onClose={closeDialog}
                productId={selectedProductId}
            />
    </div>
  );
};

export default Sale;
