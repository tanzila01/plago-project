const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const checkoutAdminSchema = new mongoose.Schema({
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
    },
    status: {
        type: String,
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    // id:{
    //     type: Number,
    //     required: true
    //   }
}, {timestamps: true})

const Checkout = mongoose.model("Checkout" , checkoutAdminSchema)

module.exports = Checkout



// const mongoose = require('mongoose')
// const {ObjectId} = mongoose.Schema

// const checkoutAdminSchema = new mongoose.Schema({
//     address:{
//         type:String,
//         required: true,
//     },
//     phone:{
//         type:Number,
//         required: true,
//     },
//     email:{
//         type:String,
//         required: true,
//     },
//     total:{
//       type: Number,
//       required: true
//     },
//     // status: {
//     //     type: String,
//     //     required: true
//     // },
//     ordered:{
//         type: Array,
//         required: true
//       }
// }, {timestamps: true})

// const Checkout = mongoose.model("Checkout" , checkoutAdminSchema)

// module.exports = Checkout