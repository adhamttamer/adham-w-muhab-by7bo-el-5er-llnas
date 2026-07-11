const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    stock: {
      type: Number,
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Product must belong to a category"],
    },
    images: {
      type: [String],
      default: [],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Keep inStock consistent with stock
productSchema.pre("save", function (next) {
  this.inStock = this.stock > 0;
  next();
});

productSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() || {};
  if (typeof update.stock === "number") {
    update.inStock = update.stock > 0;
    this.setUpdate(update);
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);
