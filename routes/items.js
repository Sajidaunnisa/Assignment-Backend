const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { name, description, price, category, image, stock } = req.body;
    if (!name || price == null)
      return res.status(400).json({ msg: "Name and price are required" });
    const item = new Item({ name, description, price, category, image, stock });
    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const { category, minPrice, maxPrice, q, limit = 50, page = 1 } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (minPrice != null || maxPrice != null) filter.price = {};
    if (minPrice != null) filter.price.$gte = Number(minPrice);
    if (maxPrice != null) filter.price.$lte = Number(maxPrice);
    if (q) filter.name = { $regex: q, $options: "i" };

    const items = await Item.find(filter)
      .skip((page - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const count = await Item.countDocuments(filter);
    res.json({ items, total: count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: "Item not found" });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!item) return res.status(404).json({ msg: "Item not found" });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ msg: "Item not found" });
    res.json({ msg: "Item deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
