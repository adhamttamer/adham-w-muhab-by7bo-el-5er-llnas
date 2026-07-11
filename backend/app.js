require("dotenv").config();

const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");

const connectDB = require("./db/connect");
const { port } = require("./config/config");

const categoryRoutes = require("./routes/category.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");

const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());
app.use(mongoSanitize());

app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "E-Commerce API is running",
    endpoints: {
      categories: "/api/categories",
      products: "/api/products",
      cart: "/api/cart",
      orders: "/api/orders",
    },
  });
});

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

start();

module.exports = app;
