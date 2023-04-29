const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter Product Name']
  },
  description: {
    type: String,
    required: [true, 'Please Enter Product Description']
  },
  price: {
    type: Number,
    required: [true, 'Please Enter Product price'],
    maxLength: [8, "price can't exceed 8 figures"]
  },
  rating: {
    type: Number,
    default: 0
  },
  images: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ],
  category:{
    type:String,
    required:[true, "Please Enter product Category"],
  },
  Stock:{
    type:Number,
    required:[true,"please enter product stock"],
    maxLength:[4,"Stock cann't exceed 4 characters."],
    default:1,
  },
  noOfReviews:{
    type:Number,
    default:0,
  },
  reviews:[
    {
      name:{
        type:String,
        required:true,
      },
      rating:{
        type:String,
        required:true,
      },
      comment:{
        type:String,
        required:true,
      },
    }
  ],
  createdAt:{
    type:Date,
    default:Date.now,
  }
});

module.exports = mongoose.model("Products", ProductSchema);
