const Checkout = require('../models/checkoutAdmin')

exports.create = async(req, res) => {
    console.log("req.body checkout", req.body)
    const { address, phone, emails, total, ids } = req.body;
    try{
      let array = [];
     ids.forEach(id => {
        array.push(id);
    }); 
       console.log("array", array)
        let newCheckout = new Checkout();
        newCheckout.address = address
        newCheckout.phone = phone
        newCheckout.email = emails
        newCheckout.total = total
        newCheckout.ordered = array
        await newCheckout.save();
        res.status(200).json({
            successMessage : "added to orders",
            newCheckout
        })
    }catch(error) {
        console.log("Error when creating order", error);
        res.status(500).json({
          errorMessage: "Please try later",
        });
      }
};

exports.getall = async (req, res) => {
  try {
    const checkout = await Checkout.find({})

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

exports.getId = async (req, res) => {
	try {
		const id = req.params.id;
		const checkout = await Category.findById(id);

		res.json(checkout);
	} catch (err) {
		console.log(err, 'categoryController.read error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};
// 
// exports.update = async (req, res) => {
//   console.log("req.body", req.body)
//   const {_id, price, quantity} = req.body
//   console.log("req.id", _id)
//   try {
//       const cartId = await Cart.findByIdAndUpdate(_id,
//       { $inc: { quantity: 1, price: price/quantity }}
//       );    
//       await cartId.save();
//     res.status(200).json({
//     cartId,
//   });
//   console.log("catID in backend", cartId)
// 	} catch (err) {
// 		console.log(err, 'cartController.upadte error');
// 		res.status(500).json({
// 			errorMessage: 'Please try again later',
// 		});
// 	}
// };


// // exports.updateDec = async (req, res) => {
// //   // console.log("req only", req)
// //   console.log("req.body", req.params)
// //   const {id} = req.params
// //   console.log("req.id", id)
// //   try {
// //       const cartId = await Cart.findByIdAndUpdate(id,
// //       { $inc: { quantity: -1}
// //      }
// //   );    
// //    res.status(200).json({
// //     cartId,
// //   });
// // 	} catch (err) {
// // 		console.log(err, 'cartController.upadte error');
// // 		res.status(500).json({
// // 			errorMessage: 'Please try again later',
// // 		});
// // 	}
// // };


// exports.updateDec = async (req, res) => {
//   // console.log("req only", req)
//   console.log("req.params", req.params)
//   console.log("req.body", req.body)
//   const {_id, price, quantity} = req.body
//   console.log("req.id", _id)
//   try {
//       if(quantity > 1){
//         const cartId = await Cart.findByIdAndUpdate(_id,
//           { $inc: { quantity: -1, price: -price/quantity}
//          }
//       );    
//       // await CartId.save();
//        res.status(200).json({
//         cartId,
//       });
//       }
// 	} catch (err) {
// 		console.log(err, 'cartController.upadte error');
// 		res.status(500).json({
// 			errorMessage: 'Please try again later',
// 		});
// 	}
// };


// exports.delete = async(req, res) => {
//   console.log("req.body", req.params)
//   const {id} = req.params
//   console.log("req.id", id)
//   try{
//     await Cart.findByIdAndDelete(id)
//   }catch(err) {
// 		console.log(err, 'cartController.upadte error');
// 		res.status(500).json({
// 			errorMessage: 'Please try again later',
// 		});
// 	}
// }

// exports.deleteAll = async(req, res) => {
//   try{
//     await Cart.deleteMany({})
//   }catch(err) {
// 		console.log(err, 'cartController.upadte error');
// 		res.status(500).json({
// 			errorMessage: 'Please try again later',
// 		});
// 	}
// }