const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");
const Transaction = require("../model/Transaction");


const categoryController = {
 
  create: asyncHandler(async (req, res) => {
    const { name, type } = req.body;
    if(!name || !type){
      throw new Error('Name and type are required for creating a category')
    }
    const normalizedName = name.toLowerCase();
    const validTypes = ["income", "expense"];
    if(!validTypes.includes(type.toLowerCase())) {
      throw new Error("Invalid category type"+ type);
    }

  
    const categoryExists = await Category.findOne({
      name: normalizedName,
      user: req.user,
    });
    if(categoryExists) {
      throw new Error(
        `Category ${categoryExists.name} already exists in the database`
      );
    }

    
    const category = await Category.create({
      name: normalizedName,
      user: req.user,
      type,
    });
    res.status(201).json(category);

  }),
 
  lists: asyncHandler(async (req, res) => {
    const categories = await Category.find({user: req.user});
    res.status(200).json(categories);
  }),

 
 
  delete: asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category && category.user.toString() === req.user.toString()) {
      
      const defaultCategory = "Uncategorized";
      await Transaction.updateMany(
        { user: req.user, category: category.name },
        { $set: { category: defaultCategory } }
      );
      
      await Category.findByIdAndDelete(req.params.id);
      res.json({ message: "Category removed and transactions updated" });
    } else {
      res.json({ message: "Category not found or user not authorized" });
    }
  }),
  
};

module.exports = categoryController;