
const { imageUploadutil } = require("../../helpers/cloudinary");
const { Product } = require("../../models/Product");
const { User } = require("../../models/User");



const  handleImageUpload=async(req,res)=>{
    try{
const b64=Buffer.from(req.file.buffer).toString('base64');
const url="data:"+ req.file.mimetype + ";base64," +b64;
const result=await imageUploadutil(url);
res.json({
    success:true,
    result
})
}catch(error){
        console.log(error);
        res.json({
            success: false,
            message:"error occured"
        })
    }
}
// @desc    Create a new product
// @route   POST /api/products
 const createProduct = async (req, res) => {
  try {
    const { image, title, description, category, brand, price, salePrice, totalStock,weight,adminName } = req.body;
    const { adminId } = req.params;
  
    const product = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
      weight,
      adminId,
      adminName
    });

    // Save the product
    await product.save();

    res.status(201).json({success:true, message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// @desc    Get all products
// @route   GET /api/products
 const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};
const getProductById = async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId); // Use your method to find the product
      if (product) {
        res.json({ success: true, product });
      } else {
        res.status(404).json({ success: false, message: 'Product not found' });
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  const updateProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        image,
        title,
        description,
        category,
        brand,
        price,
        salePrice,
        totalStock,
        averageReview,
        weight
      } = req.body;
  
      let findProduct = await Product.findById(id);
      if (!findProduct) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }
  
      // Update fields only if they are provided
      findProduct.title = title || findProduct.title;
      findProduct.description = description || findProduct.description;
      findProduct.category = category || findProduct.category;
      findProduct.brand = brand || findProduct.brand;
      findProduct.price = price !== undefined ? price : findProduct.price;
      findProduct.salePrice = salePrice !== undefined ? salePrice : findProduct.salePrice;
      findProduct.totalStock = totalStock !== undefined ? totalStock : findProduct.totalStock;
      findProduct.image = image || findProduct.image;
      findProduct.averageReview = averageReview !== undefined ? averageReview : findProduct.averageReview;
      findProduct.weight = weight !== undefined ? weight : findProduct.weight;
      // Save updated product
      await findProduct.save();
  
      // Re-fetch the product to ensure the latest data is returned
      findProduct = await Product.findById(id);
  
      res.status(200).json({
        success: true,
        data: findProduct,
      });
    } catch (e) {
      console.log('Error:', e);
      res.status(500).json({
        success: false,
        message: "Error occurred",
      });
    }
  };
  
  
  const deleteProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      
      const deletedProduct = await Product.findByIdAndDelete(productId);
      if (deletedProduct) {
        res.json({ success: true, message: 'Product deleted successfully' });
      } else {
        res.status(404).json({ success: false, message: 'Product not found' });
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  

module.exports={handleImageUpload,createProduct,getProducts,getProductById,updateProductById,deleteProduct}