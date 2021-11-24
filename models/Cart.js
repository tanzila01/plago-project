const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    fileName:{
        type: String,
        required: true,
    },
    productName:{
        type:String,
        required: true,
        trim: true,
        maxLength: 60
    },
    price:{
        type: Number,
        required : true,
    },
    quantity:{
        type: Number,
        required : true,
    },
    status:{
        type: String,
        required: true
    }
})
const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart