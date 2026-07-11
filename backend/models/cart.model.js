const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product reference is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    key: { type: String, default: "default", unique: true },
    items: { type: [cartItemSchema], default: [] },
    totalPrice: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

cartSchema.methods.recalculateTotal = function () {
  this.totalPrice = this.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return this.totalPrice;
};

module.exports = mongoose.model("Cart", cartSchema);
