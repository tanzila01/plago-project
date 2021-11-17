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

exports.getall = async (req, res) => {
  try {
    const cart = await Cart.find({});

    res.status(200).json({
      cart,
    });
  } catch (error) {
    console.log("Error when fetching category data ", error);
    res.status(500).json({
      errorMessage: "Please try later",
    });
  }
};

exports.update = async (req, res) => {
  console.log("req.body", req.body)
  const {_id, price} = req.body
  console.log("req.id", _id)
  try {
      const cartId = await Cart.findByIdAndUpdate(_id,
      { $inc: { quantity: 1, price: price }}
  );    
   res.status(200).json({
    cartId,
  });
	} catch (err) {
		console.log(err, 'cartController.upadte error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};


// exports.updateDec = async (req, res) => {
//   // console.log("req only", req)
//   console.log("req.body", req.params)
//   const {id} = req.params
//   console.log("req.id", id)
//   try {
//       const cartId = await Cart.findByIdAndUpdate(id,
//       { $inc: { quantity: -1}
//      }
//   );    
//    res.status(200).json({
//     cartId,
//   });
// 	} catch (err) {
// 		console.log(err, 'cartController.upadte error');
// 		res.status(500).json({
// 			errorMessage: 'Please try again later',
// 		});
// 	}
// };


exports.updateDec = async (req, res) => {
  // console.log("req only", req)
  console.log("req.params", req.params)
  console.log("req.body", req.body)
  const {_id, price} = req.body
  console.log("req.id", _id)
  try {
      const cartId = await Cart.findByIdAndUpdate(_id,
      { $inc: { quantity: -1, price: -price}
     }
  );    
   res.status(200).json({
    cartId,
  });
	} catch (err) {
		console.log(err, 'cartController.upadte error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};


exports.delete = async(req, res) => {
  console.log("req.body", req.params)
  const {id} = req.params
  console.log("req.id", id)
  try{
    await Cart.findByIdAndDelete(id)
  }catch(err) {
		console.log(err, 'cartController.upadte error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
}