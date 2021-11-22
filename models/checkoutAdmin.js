const mongoose = require('mongoose')
const checkoutAdminSchema = new mongoose.Schema({
    // fileName:{
    //     type: Array,
    //     required: true,
    // },
    address:{
        type:String,
        required: true,
    },
    phone:{
        type:Number,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    total:{
      type: Number,
      required: true
    }
}, {timestamps: true})

const Checkout = mongoose.model("Checkout" , checkoutAdminSchema)

module.exports = Checkout