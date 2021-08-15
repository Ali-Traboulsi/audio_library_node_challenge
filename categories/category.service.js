const mongoose = require("mongoose");

const Category = require("./category.model");
const Error = require("../utils/error");
const resObject = require("../utils/response");
const io = require("../socket");

exports.addCategory = async (body) => {

  const category = new Category({
    name: body.name,
    description: body.description,
  });

  const result = await category.save();
  io.getIo().emit("post", category);
  if (!result) {
    throw Error(500, "Server Error occured");
  }
  return resObject(undefined, "Successfully created category");
};

exports.getCategories = async () => {
  const categories = await Category.find().sort("-created_at");
  if (categories.length === 0) {
    throw Error(404, "No Categories Found!");
  }
  return resObject(categories, "Success fetching all categories");
};

exports.getCategory = async (categoryId) => {
  const category = await Category.find({
    _id: new mongoose.Types.ObjectId(categoryId),
  });
  if (category.length === 0) {
    throw Error(404, "Category Not Found");
  }
  return resObject(category, "Successfully fetched category");
};

exports.updateCategory = async (categoryId, body) => {
  const category = await Category.findById(categoryId);

  if (category.length === 0) {
    throw Error(404, "Category Not Found");
  }

  await Category.updateOne(
    { _id: categoryId },
    {
      $set: {
        name: body.name,
        description: body.description,
      },
    },
    { omitUndefined: true }
  );

  return resObject(undefined, "Successfully Updated Category!")
};

exports.deleteCategory = async (categoryId) => {
  const result = await Category.deleteOne({_id: categoryId});
  if (!result) {
    throw Error(404, "Category Not Found");
  }
  return resObject(undefined, "Successfully Deleted Category!")
};
