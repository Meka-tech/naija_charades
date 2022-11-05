import express from "express";
const router = express.Router();
import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";

// @desc  Fetch all products

// @route  GET /api/categories

// @access  Public
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.json(categories);
  })
);
// @desc  Fetch a product

// @route  GET /api/categories/:id

// @access  Public
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  })
);

export default router;
