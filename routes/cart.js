const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const Item = require("../models/Item");
const mongoose = require("mongoose");

// Get current user's cart
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user)
      .populate("cart.item")
      .select("cart");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json({ cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/add", auth, async (req, res) => {
  try {
    const { itemId, qty = 1 } = req.body;
    if (!itemId) return res.status(400).json({ msg: "itemId is required" });
    if (!mongoose.Types.ObjectId.isValid(itemId))
      return res.status(400).json({ msg: "Invalid itemId" });

    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ msg: "Item not found" });

    const user = await User.findById(req.user);
    const existing = user.cart.find((ci) => ci.item.toString() === itemId);
    if (existing) {
      existing.qty = existing.qty + Number(qty);
    } else {
      user.cart.push({ item: itemId, qty: Number(qty) });
    }
    await user.save();
    await user.populate("cart.item");
    res.json({ cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/remove", auth, async (req, res) => {
  try {
    const { itemId, qty } = req.body;
    if (!itemId) return res.status(400).json({ msg: "itemId is required" });
    const user = await User.findById(req.user);
    const idx = user.cart.findIndex((ci) => ci.item.toString() === itemId);
    if (idx === -1) return res.status(404).json({ msg: "Item not in cart" });

    if (qty == null) {
      user.cart.splice(idx, 1);
    } else {
      user.cart[idx].qty = user.cart[idx].qty - Number(qty);
      if (user.cart[idx].qty <= 0) user.cart.splice(idx, 1);
    }
    await user.save();
    await user.populate("cart.item");
    res.json({ cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.post("/sync", auth, async (req, res) => {
  try {
    const { cart } = req.body;
    const user = await User.findById(req.user);
    user.cart = [];
    if (Array.isArray(cart)) {
      for (const ci of cart) {
        if (!ci.itemId) continue;
        if (!mongoose.Types.ObjectId.isValid(ci.itemId)) continue;
        const item = await Item.findById(ci.itemId);
        if (!item) continue;
        user.cart.push({ item: ci.itemId, qty: Number(ci.qty) || 1 });
      }
    }
    await user.save();
    await user.populate("cart.item");
    res.json({ cart: user.cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
