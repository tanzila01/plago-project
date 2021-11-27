const Checkout = require('../models/checkoutAdmin')
const Cart = require('../models/Cart')


exports.create = async(req, res) => {
  console.log("req.body checkout", req.body)
  const { address, phone, emails, total, ids } = req.body;
  try{
    console.log("id here",ids.map((id) => id.price))
    ids.map(async(id) => {
      let newCheckout = new Checkout();
      newCheckout.address = address
      newCheckout.phone = phone
      newCheckout.email = emails
      newCheckout.total = total
      // newCheckout.id = id._id
      newCheckout.price = id.price
      newCheckout.fileName= id.fileName
      newCheckout.productName= id.productName
      newCheckout.quantity = id.quantity
      newCheckout.status="pending"
      await newCheckout.save();
      res.status(200).json({
          successMessage : "added to orders",
          newCheckout
      })
    })
  }catch(error) {
      console.log("Error when creating order", error);
      res.status(500).json({
        errorMessage: "Please try later",
      });
    }
};


// exports.create = async(req, res) => {
//     console.log("req.body checkout", req.body)
//     const { address, phone, emails, total, ids } = req.body;
//     try{
//       let array = [];
//      ids.forEach(id => {
//         array.push(id);
//     }); 
//        console.log("array", array)
//         let newCheckout = new Checkout();
//         newCheckout.address = address
//         newCheckout.phone = phone
//         newCheckout.email = emails
//         newCheckout.total = total
//         newCheckout.ordered = array
//         // newCheckout.status = "pending"
//         await newCheckout.save();
//         res.status(200).json({
//             successMessage : "added to orders",
//             newCheckout
//         })
//     }catch(error) {
//         console.log("Error when creating order", error);
//         res.status(500).json({
//           errorMessage: "Please try later",
//         });
//       }
// };

exports.getall = async (req, res) => {
  try {
    const checkout = await Checkout.find({status: "pending"})

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
exports.update = async (req, res) => {
  console.log("req.body", req.body)
  const {_id, status} = req.body
  try {
      const cartId = await Checkout.findByIdAndUpdate(_id,
      { $set: {status: "accepted"}}
      );    
      await cartId.save();
    res.status(200).json({
    cartId,
  });
  console.log("catID in backend", cartId)
	} catch (err) {
		console.log(err, 'cartController.upadte error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};

exports.update = async (req, res) => {
  console.log("req.body", req.body)
  const {_id, status} = req.body
  try {
      const cartId = await Checkout.findByIdAndUpdate(_id,
      { $set: {status: "accepted"}}
      );    
      await cartId.save();
    res.status(200).json({
    cartId,
  });
  console.log("catID in backend", cartId)
	} catch (err) {
		console.log(err, 'cartController.upadte error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};

exports.updateDecline = async (req, res) => {
  console.log("req.body", req.body)
  const {_id, status} = req.body
  try {
      const cartId = await Checkout.findByIdAndUpdate(_id,
      { $set: {status: "declined"}}
      );    
      await cartId.save();
    res.status(200).json({
    cartId,
  });
  console.log("catID in backend", cartId)
	} catch (err) {
		console.log(err, 'cartController.upadte error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};

