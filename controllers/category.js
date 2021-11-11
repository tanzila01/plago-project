const Category = require("../models/Category");

exports.create = async (req, res) => {
  const { category } = req.body;

  try {
    const categoryExist = await Category.findOne({ category });
    if (categoryExist) {
      return res.status(400).json({
        errorMessage: `${category} already exists`,
      });
    }else{

    let newCategory = new Category();
    newCategory.category = category;

    newCategory = await newCategory.save();

    res.status(200).json({
      category: newCategory,
      successMessage: `${newCategory.category} was created!`,
    });

  }
  } catch (error) {
    console.log("Error when creating category", error);
    res.status(500).json({
      errorMessage: "Please try later",
    });
  }
};

exports.readAll = async (req, res) => {
  try {
    const categories = await Category.find({});

    res.status(200).json({
      categories,
    });
  } catch (error) {
    console.log("Error when fetching category data ", error);
    res.status(500).json({
      errorMessage: "Please try later",
    });
  }
};


exports.read = async (req, res) => {
	try {
		const categoryId = req.params.categoryId;
		const category = await Category.findById(categoryId);

		res.json(category);
	} catch (err) {
		console.log(err, 'categoryController.read error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};

exports.update = async (req, res) => {
  const {categoryName, dataId} = req.body
  try {
    const categoryId = await Category.findById(dataId)    
    if(categoryId){
      categoryId.category = categoryName
        await categoryId.save()
        return  res.status(200).json({
          categoryId
          })
    }
	} catch (err) {
		console.log(err, 'categoryController.upadte error');
		res.status(500).json({
			errorMessage: 'Please try again later',
		});
	}
};


exports.delete = async (req, res) => {

  try {
    const categoryId = req.params.categoryId
    const response = await Category.findByIdAndDelete(categoryId)
    res.json(response)
  } catch (error) {
  console.log("Error when delete category", error);
  res.status(500).json({
   errorMessage: "Please try later",
  });
  }
  };