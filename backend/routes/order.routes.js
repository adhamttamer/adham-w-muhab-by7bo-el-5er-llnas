const express = require("express");
const ctrl = require("../controllers/order.controller");

const router = express.Router();

router.get("/", ctrl.getAllOrders);
router.get("/:id", ctrl.getOrderById);
router.post("/", ctrl.createOrder);
router.patch("/:id/status", ctrl.updateOrderStatus);

module.exports = router;
