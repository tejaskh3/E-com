const Products = require('../models/productModel');
const ErrorHandeler = require('../utils/errorHandeler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

//admin route
// const createProduct = async (req, res) => {
//   try {
//     const product = await Products.create(req.body);
//     res.json({
//       success: true,
//       product
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(400).json({
//       success: false,
//       message: err.message
//     });
//   }
// };
//  this will be shorten using catchasynerror
const createProduct =catchAsyncErrors( async (req, res) => {

    const product = await Products.create(req.body);
    res.json({
      success: true,
      product
    })
});
const getAllProducts = catchAsyncErrors( async (req,res)=>{
  const products = await Products.find();
  res.status(200).json({
    success:true,
    products
  })
})
 //admin route
const updateProduct = async (req,res)=>{
  try{
  let product = Products.findById(req.params.id);
  if(!product){
    return next(new ErrorHandeler("product not found", 404))
  }
  product = await Products.findByIdAndUpdate(req.params.id, req.body,{
  new:true,
  runValidators:true,
  useFindAndModify:false,
  })
  // console.log(product);
  res.status(200).json({
    success:true,
    product
  })}
  catch(error){
    console.log(error);
    res.status(404).send({
      success:false,
      message:error.message
    })
  }
}

//delete product
const deleteProduct = catchAsyncErrors( async (req,res)=>{
    const product = await Products.findById(req.params.id);
    if(!product){
      // return res.status(400).json({
      //   success:false,
      //   message:"product not found"
      // })
      //replacing this lines using errorhandeler middelware
      return next(new ErrorHandeler("product not found", 404))
    }

    await product.deleteOne({id:req.body._id}) ;
    // console.log(product);

    res.status(200).json({ 
      success:true,
      message:`${req.params.id} is deleted`,
    })
    console.log(`${error}`);
    res.status(500).json({
      success:false,
      message:'Product not deleted'
    })
})

//get Prodcuts Details(single product)
const getProductDetails =  catchAsyncErrors( async (req,res,next) =>{
    const product = await Products.findById(req.params.id);
    if(!product){
      return next(new ErrorHandeler("product not found", 404));
    }
    res.status(200).json({
      success:true,
      product,
    })
})
module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails
}

