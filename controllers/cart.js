const Cart = require('../models/Cart')

exports.create = async(req, res) => {
    console.log("req.body cart", req.body)
    const { productName, productPrice, image } = req.body;
    try{
        let newCart = new Cart();
        newCart.fileName = image
        newCart.productName = productName
        newCart.price = productPrice
        newCart.quantity = 1
        await newCart.save();
        res.status(200).json({
            successMessage : "added to cart",
            newCart
        })
    }catch(error) {
        console.log("Error when creating product", error);
        res.status(500).json({
          errorMessage: "Please try later",
        });
      }
};