const Checkout = require('../models/checkoutAdmin')
const Cart = require('../models/Cart')

exports.getAccepted = async (req, res) => {
    try {
      const checkout = await Checkout.find({status: "accepted"})
  
      res.status(200).json({
        checkout,
      });
    } catch (error) {
      console.log("Error when fetching checkout data ", error);
      res.status(500).json({
        errorMessage: "Please try later",
      });
    }
  };
  
  exports.getDeclined = async (req, res) => {
    try {
      const checkout = await Checkout.find({status: "declined"})
  
      res.status(200).json({
        checkout,
      });
    } catch (error) {
      console.log("Error when fetching checkout data ", error);
      res.status(500).json({
        errorMessage: "Please try later",
      });
    }
  };