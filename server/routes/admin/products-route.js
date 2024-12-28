const express = require('express');
const { handleImageUpload, createProduct, getProducts,getProductById ,updateProductById,deleteProduct} = require('../../controllers/admin/products-controller');
const { upload } = require('../../helpers/cloudinary');
const router = express.Router();

// Route for uploading an image
router.post("/upload-image", upload.single("my_file"), handleImageUpload);

// Route for creating a product (with image URL and product data)
router.post("/create", createProduct);

// Route for getting all products
router.get("/list", getProducts);
router.get('/:id', getProductById);
router.put('/update/:id', updateProductById);
router.delete('/delete/:id', deleteProduct);

module.exports = router;
