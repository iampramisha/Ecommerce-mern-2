const mongoose = require('mongoose');
const { Cart } = require("../../models/Cart");

const { Product } = require("../../models/Product");

// const addToCart = async (req, res) => {
//     const { userId, productId, quantity } = req.body;
  
//     try {
//       // Find the product
//       const product = await Product.findById(productId);
//       if (!product) {
//         return res.status(404).json({ message: 'Product not found' });
//       }
  
//       // Find or create the cart
//       let cart = await Cart.findOne({ user: userId }).populate('products.product');
  
//       if (!cart) {
//         // Create a new cart if it does not exist
//         cart = new Cart({
//           user: userId,
//           products: [{ product: productId, quantity: quantity || 1 }],
//         });
//       } else {
//         // Check if the product is already in the cart
//         const existingProductIndex = cart.products.findIndex(
//           (p) => p.product.toString() === productId
//         );
  
//         if (existingProductIndex !== -1) {
//           // Update the quantity if the product is already in the cart
//           cart.products[existingProductIndex].quantity += quantity || 1;
//         } else {
//           // Add the new product to the cart
//           cart.products.push({ product: productId, quantity: quantity || 1 });
//         }
//       }
  
//       // Save the cart
//       await cart.save();
  
//       // Populate cart with product details
//       const populatedCart = await Cart.findOne({ user: userId }).populate('products.product');
  
//       // Format the response
//       const populateCartItems = populatedCart.products.map((item) => ({
//         productId: item.product._id.toString(),
//         image: item.product.image,
//         title: item.product.title,
//         price: item.product.price,
//         salePrice: item.product.salePrice,
//         quantity: item.quantity,
//       }));
  
//       res.status(200).json({ message: 'Product added to cart', products: populateCartItems });
//     } catch (error) {
//       console.error('Error adding to cart:', error); // Log the error for debugging
//       res.status(500).json({ message: 'Server error', error: error.message });
//     }
// //   };
//     // In your backend controller (example with MongoDB)
//     const addToCart = async (req, res) => {
//       try {
//           const { userId, productId, quantity, weight } = req.body;
  
//           // Find the user's cart
//           let cart = await Cart.findOne({ user: userId });
  
//           // If no cart exists for the user, create a new one
//           if (!cart) {
//               cart = new Cart({
//                   user: userId,
//                   products: [{ product: productId, quantity: quantity || 1, weight: weight }], // Include weight
//               });
//           } else {
//               // Check if the product already exists in the cart
//               const productIndex = cart.products.findIndex(
//                   (item) => item.product.toString() === productId
//               );
  
//               if (productIndex >= 0) {
//                   // If the product exists, update its quantity
//                   cart.products[productIndex].quantity += quantity || 1;
//                   // If you want to update weight, uncomment the next line
//                   // cart.products[productIndex].weight = weight; // Update weight if needed
//               } else {
//                   // If the product does not exist, add it to the cart
//                   cart.products.push({ product: productId, quantity: quantity || 1, weight: weight }); // Include weight
//               }
//           }
  
//           // Save the cart and return the updated cart
//           await cart.save();
  
//           // Fetch and populate cart items to standardize the response format
//           const populatedCart = await Cart.findOne({ user: userId }).populate({
//               path: 'products.product',
//               select: 'image title price salePrice',
//           });
  
//           const formattedItems = populatedCart.products.map(item => ({
//               productId: item.product._id,
//               salePrice: item.product.salePrice,
//               price: item.product.price,
//               image: item.product.image,
//               title: item.product.title,
//               quantity: item.quantity,
//               weight: weight// Make sure to include weight here
//           }));
  
//           res.status(200).json({
//               success: true,
//               data: {
//                   ...populatedCart._doc,
//                   items: formattedItems,
//               },
//           });
//       } catch (error) {
//           console.error(error);
//           res.status(500).json({ message: 'Server Error' });
//       }
//   };
const addToCart = async (req, res) => {
  try {
      const { userId, productId, quantity, weight } = req.body;

      // Find the product to get its total stock
      const product = await Product.findById(productId);

      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      // Ensure the quantity doesn't exceed available stock
      if (quantity > product.totalStock) {
          return res.status(400).json({
              message: `Cannot add more than ${product.totalStock} items to the cart.`,
          });
      }

      // Find the user's cart
      let cart = await Cart.findOne({ user: userId });

      // If no cart exists for the user, create a new one
      if (!cart) {
          cart = new Cart({
              user: userId,
              products: [{ product: productId, quantity: quantity || 1, weight: weight }],
          });
      } else {
          // Check if the product already exists in the cart
          const productIndex = cart.products.findIndex(
              (item) => item.product.toString() === productId
          );

          if (productIndex >= 0) {
              // If the product exists, check if adding the quantity exceeds stock
              const currentQuantity = cart.products[productIndex].quantity;
              if (currentQuantity + quantity > product.totalStock) {
                  return res.status(400).json({
                      message: `Cannot add more than ${product.totalStock} items of this product to the cart.`,
                  });
              }

              // If the product exists and there's no stock violation, update the quantity
              cart.products[productIndex].quantity += quantity || 1;
          } else {
              // If the product does not exist, add it to the cart
              cart.products.push({ product: productId, quantity: quantity || 1, weight: weight });
          }
      }

      // Save the cart and return the updated cart
      await cart.save();

      // Fetch and populate cart items to standardize the response format
      const populatedCart = await Cart.findOne({ user: userId }).populate({
          path: 'products.product',
          select: 'image title price salePrice',
      });

      const formattedItems = populatedCart.products.map(item => ({
          productId: item.product._id,
          salePrice: item.product.salePrice,
          price: item.product.price,
          image: item.product.image,
          title: item.product.title,
          quantity: item.quantity,
          weight: weight, // Make sure to include weight here
      }));

      res.status(200).json({
          success: true,
          data: {
              ...populatedCart._doc,
              items: formattedItems,
          },
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
};

  
      const fetchCartItems = async (req, res) => {
        try {
          const { userId } = req.params;
          console.log("Fetching cart for userId:", userId); // Log the userId
      
          if (!userId) {
            return res.status(400).json({
              success: false,
              message: "User id is mandatory!",
            });
          }
      
          const cart = await Cart.findOne({ user: userId }).populate({
            path: 'products.product',
            select: 'image title price salePrice',
          });
      
          if (!cart) {
            return res.status(404).json({
              success: false,
              message: "Cart not found!",
            });
          }
      
          // Filter out invalid product items
          const validItems = cart.products.filter(
            (productItem) => productItem.product
          );
      
          if (validItems.length < cart.products.length) {
            cart.products = validItems;
            await cart.save();
          }
      
          const formattedItems = validItems.map((item) => ({
            productId: item.product._id,
            salePrice: item.product.salePrice,
            price: item.product.price,
            image: item.product.image,
            title: item.product.title,
            quantity: item.quantity,
            weight: item.weight
        
          }));
      
          res.status(200).json({
            success: true,
            data: {
              ...cart._doc,
              items: formattedItems,
            },
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({
            success: false,
            message: "Error fetching cart items.",
            error: error.message,
          });
        }
      };
      
      const updateCartItemQty = async (req, res) => {
        try {
          console.log("Request body:", req.body);
      
          const { userId, productId, quantity } = req.body;
      
          if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
              success: false,
              message: "Invalid data provided!",
            });
          }
      
          // Find the cart for the user
          const cart = await Cart.findOne({ user: userId });
          if (!cart) {
            return res.status(404).json({
              success: false,
              message: "Cart not found!",
            });
          }
      
          console.log("Cart found:", cart);
      
          // Find the index of the product in the cart
          const productIndex = cart.products.findIndex(
            (item) => item.product.toString() === productId
          );
      
          if (productIndex === -1) {
            return res.status(404).json({
              success: false,
              message: "Cart item not found!",
            });
          }
      
          // Fetch the product's total stock
          const product = await Product.findById(productId);
          if (!product) {
            return res.status(404).json({
              success: false,
              message: "Product not found!",
            });
          }
      
          // Check if the quantity exceeds the total stock
          if (quantity > product.totalStock) {
            return res.status(400).json({
              success: false,
              message: `Cannot add more than ${product.totalStock} items to the cart. Only ${product.totalStock} items are in stock.`,
            });
          }
      
          // Update the quantity in the cart
          cart.products[productIndex].quantity = quantity;
          await cart.save();
      
          console.log("Cart saved:", cart);
      
          // Populate the cart with product details
          await cart.populate({
            path: 'products.product',
            select: 'image title price salePrice',
          }).then(() => cart.save()); // Ensure populate is awaited
      
          console.log("Populated cart:", cart);
      
          // Map the populated items
          const populatedCartItems = cart.products.map((item) => ({
            productId: item.product ? item.product._id : null,
            image: item.product ? item.product.image : null,
            title: item.product ? item.product.title : "Product not found",
            price: item.product ? item.product.price : null,
            salePrice: item.product ? item.product.salePrice : null,
            quantity: item.quantity,
          }));
      
          // Send the response
          res.status(200).json({
            success: true,
            data: {
              ...cart._doc,
              products: populatedCartItems,
            },
          });
        } catch (error) {
          console.error("Error details:", error); // Log the full error object for more details
          res.status(500).json({
            success: false,
            message: error.message || "Server error", // Return the specific error message
          });
        }
      };
      

const removeFromCart = async (req, res) => {
    const { userId, productId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid userId or productId' });
    }
  
    try {
      // Find the cart for the specified user
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        console.log('Cart not found for user:', userId); // Debugging line
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      // Find the index of the product in the cart
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );
  
      if (productIndex === -1) {
        console.log('Product not found in cart:', productId); // Debugging line
        return res.status(404).json({ message: 'Product not found in cart' });
      }
  
      // Remove the product from the cart
      cart.products.splice(productIndex, 1);
  
      // Save the updated cart
      await cart.save();
      res.status(200).json({ message: 'Product removed from cart', cart });
    } catch (error) {
      console.error('Error removing from cart:', error); // Debugging line
      res.status(500).json({ message: 'Server error' });
    }
  };
  const deleteAllCartItems = async (req, res) => {
    const { userId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }
  
    try {
      // Find the cart for the specified user
      const cart = await Cart.findOne({ user: userId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found for this user' });
      }
  
      // Clear all products from the cart
      cart.products = [];
  
      // Save the updated cart
      await cart.save();
  
      res.status(200).json({
        success: true,
        message: 'All items removed from the cart successfully',
        cart,
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  module.exports = {
    addToCart,
    fetchCartItems,
    updateCartItemQty,
    removeFromCart,
    deleteAllCartItems,
  };
  

  