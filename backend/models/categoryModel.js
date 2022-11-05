import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: false
    },
    favourite: {
      type: Boolean,
      required: true,
      default: false
    },
    color: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    cards: {
      type: Array,
      required: true,
      default: []
    }
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
