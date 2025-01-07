const { Product } = require("../../models/Product")

const getFilteredProducts=async(req,res)=>{
    try{
        const {category = [] , brand = [], sortBy= "price-lowtohigh"} =req.query;
let filters={};

// filters.category = { $in: ["electronics", "clothing"] };
// This tells MongoDB:

// "Find me all products where the category field is either "electronics" or "clothing"."
if(category.length){
    filters.category={$in:category.split(',')}
}
if(brand.length){
    filters.brand={$in:brand.split(',')}
}
let sort={};
switch (sortBy) {
    case "price-lowtohigh":
      sort.price = 1;

      break;
    case "price-hightolow":
      sort.price = -1;

      break;
    case "title-atoz":
      sort.title = 1;

      break;

    case "title-ztoa":
      sort.title = -1;

      break;

    default:
      sort.price = 1;
      break;
  }
        const products=await Product.find(filters).sort(sort).collation({ locale: 'en', strength: 2 });
res.status(200).json({
    success: true,
    data:products
})
    }catch(error){
console.log(error);
res.status(500).json({
    success:false,
    message:"some error occured"
})
    }
}
const getProductDetails = async (req, res) => {
  try {
    const productId = req.params.id;

    // Fetch product details along with the associated reviews
    const product = await Product.findById(productId).populate({
      path: 'reviews', // Assuming 'reviews' is a field that stores references to Review documents
      populate: { path: 'user', select: 'name' } // Assuming each review references a user and we need their name
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      data: product // This will include the product and its reviews
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred"
    });
  }
};


// Fetch all products (no filtering)
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from the database
        res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occurred"
            
        });
    }
};
const getProductsSalePriceLessThanPrice = async (req, res) => {
  try {
    // Fetch products where salePrice is less than price
    const products = await Product.find({
      salePrice: { $lt: '$price' }, // Compare salePrice with price field
    });

    if (!products.length) {
      return res.status(404).json({
        success: false,
        message: "No products found where salePrice is less than price",
      });
    }

    res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred"
    });
  }
};

module.exports={getFilteredProducts, getProductDetails, getAllProducts,getProductsSalePriceLessThanPrice}