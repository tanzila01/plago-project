const Product = require("../models/Product");
const fs = require('fs');
// var ObjectId = require('mongodb').ObjectId; 

exports.create = async (req, res, next) => {
       console.log("req.file", req.files)
      //  console.log("req.file.filename", req.files.filename)
      //  const {filename} = req.files
       const {productName, productPrice, productDesc , productCategory} = req.body

  try {
    let filesArray = [];
    req.files.forEach(element => {
        const file = {
            fileName: element.filename,
            filePath: element.path,
            fileType: element.mimetype,
            // fileSize: fileSizeFormatter(element.size, 2)
        }
        filesArray.push(file);
    }); 
      console.log("making product here", req.body
      )
      let product = new Product()
      product.fileName = filesArray
      product.productName = productName
      product.productPrice = productPrice
      product.productDesc = productDesc
      product.productCategory = productCategory
         await product.save()
            res.status(200).json({
                successMessage: `${productName} was created`,
                product
            })
  } catch (error) {
    console.log("Error when creating product", error);
    res.status(500).json({
      errorMessage: "Please try later",
    });
  }
};


exports.readAll = async (req, res) => {

try {
  const products = await Product.find({}).populate('productCategory' , 'category')

  res.json({products})
} catch (error) {
console.log("Error when fetching product", error);
res.status(500).json({
 errorMessage: "Please try later",
});
}
};

exports.read = async (req, res) => {
	try {
		const productId = req.params.productId;
		const product = await Product.findById({ _id: productId });

		res.json(product);
	} catch (err) {
		console.log(err, 'productController.read error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};

exports.readCAt = async (req, res) => {
	try {
    console.log("catid in controller", req.params.catid)
		// const product = await Product.findById({productCategory: ObjectId(catId)});
		const product = await Product.find({productCategory: req.params.catid});

		res.json(product);
	} catch (err) {
		console.log(err, 'productController.read error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
}; 
 
exports.update = async (req, res) => {
	
	const productId = req.params.productId;

 if(req.file.filename){
	req.body.fileName = req.file.filename;
  const oldProduct = await Product.findByIdAndUpdate(productId, req.body);

	fs.unlink(`uploads/${oldProduct.fileName}`, err => {
		if (err) throw err;
		console.log('Image successfully deleted from the filesystem');
	});
    res.json(oldProduct)
} else{
  const response = await Product.findByIdAndUpdate(productId, req.body);
  res.json(response);
}

};


exports.delete = async (req, res) => {

  try {
    const productId = req.params.productId
    const deleteProduct = await Product.findByIdAndDelete(productId)

    fs.unlink(`uploads/${deleteProduct.fileName}` , (err) =>{
      if(err) throw err;
    console.log("When while delete images" , deleteProduct.fileName);
    res.json(deleteProduct)
    })
  } catch (error) {
  console.log("Error when delete product", error);
  res.status(500).json({
   errorMessage: "Please try later",
  });
  }
  };