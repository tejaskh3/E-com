const Products = require('../models/productModel');


//admin route
const createProduct = async (req, res) => {
  try {
    const product = await Products.create(req.body);
    res.json({
      success: true,
      product
    });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};

const getAllProducts = async (req,res)=>{
  const products = await Products.find();
  res.status(200).json({
    success:true,
    products
  })


}
const updateProduct = async (req,res)=>{
let product = Products.findById(req.prams.id);

//admin route
if(!product){
  return res.status(500).json({
    success:false,
    message:"product not found"
  })
}
product = await Products.findByIdAndUpdate(req.prams.id, req)
}
module.exports = {
  getAllProducts,
  createProduct,
  updateProduct
}
