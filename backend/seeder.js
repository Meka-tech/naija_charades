import mongoose from "mongoose";
import dotenv from "dotenv";
import categories from "./data/categories.js";
import Category from "./models/categoryModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Category.deleteMany();

    await Category.insertMany(categories);

    console.log("Data Imported");
    process.exit();
  } catch (error) {
    console.log(`${error}`);
    process.exit(1);
  }
};

// const destoryData = async () => {
//   try {
//     await Order.deleteMany();
//     await Product.deleteMany();
//     await User.deleteMany();

//     console.log("Data Destroyed");
//     process.exit();
//   } catch (error) {
//     console.log(`${error}`);
//     process.exit(1);
//   }
// };

importData();
