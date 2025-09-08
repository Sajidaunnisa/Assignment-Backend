// seed.js
require("dotenv").config();
const mongoose = require("mongoose");
const Item = require("./models/Item");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB...");

    await Item.deleteMany();
    const items = [
      {
        name: "T-Shirt",
        description: "Cotton t-shirt",
        price: 299,
        category: "Clothing",
        image:
          "https://thvnext.bing.com/th/id/OPAC.kJGZwywZZcvmIQ474C474?w=160&h=220&c=17&dpr=1.2&pid=21.1&ucfimg=1",
      },
      {
        name: "Jeans",
        description: "Blue denim jeans",
        price: 999,
        category: "Clothing",
        image:
          "https://thvnext.bing.com/th/id/OPAC.QLNmTdMQDT0Bkg474C474?w=220&h=210&c=17&o=5&dpr=1.2&pid=21.1&ucfimg=1",
      },
      {
        name: "Watch",
        description: "Stylish wrist watch",
        price: 1499,
        category: "Accessories",
        image:
          "https://thvnext.bing.com/th?id=OPAC.yAxf%2fvBS9EmE5A474C474&w=220&h=210&c=17&o=5&dpr=1.2&pid=21.1&ucfimg=1",
      },

      {
        name: "Nike Air Zoom Pegasus",
        description: "Comfortable running shoes",
        price: 120,
        category: "Shoes",
        image:
          "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/aaed9f13-2469-416e-8f4c-4ca6c6ae07f6/air-zoom-pegasus-38-shield-weatherised-road-running-shoes-TkvxzN.png",
      },
      {
        name: "Adidas Ultraboost",
        description: "High performance running shoes",
        price: 150,
        category: "Shoes",
        image:
          "https://thvnext.bing.com/th/id/OPAC.V0Eaohk78gPygw474C474?w=200&h=150&c=17&dpr=1.2&pid=21.1&ucfimg=1",
      },
      {
        name: "Levi’s Denim Jacket",
        description: "Classic blue denim jacket",
        price: 80,
        category: "Clothing",
        image:
          "https://thvnext.bing.com/th/id/OPAC.zTlLm44PyvauNQ474C474?w=160&h=220&c=17&dpr=1.2&pid=21.1&ucfimg=1",
      },
      {
        name: "Apple iPhone 15",
        description: "Latest Apple smartphone",
        price: 1200,
        category: "Electronics",
        image:
          "https://thvnext.bing.com/th?id=OPAC.gSatKbzl%2b5ADfA474C474&w=220&h=210&c=17&o=5&dpr=1.2&pid=21.1&ucfimg=1",
      },
      {
        name: "Samsung Galaxy S24",
        description: "Flagship Android phone",
        price: 1000,
        category: "Electronics",
        image:
          "https://thvnext.bing.com/th?id=OPAC.T%2fnxtgkZ8DdwhQ474C474&w=220&h=220&c=17&o=5&dpr=1.2&pid=21.1&ucfimg=1",
      },
      {
        name: "Sony WH-1000XM5",
        description: "Noise cancelling headphones",
        price: 400,
        category: "Electronics",
        image:
          "https://thvnext.bing.com/th?id=OPAC.L%2fDPTSpMBS63eg474C474&w=220&h=210&c=17&o=5&dpr=1.2&pid=21.1&ucfimg=1",
      },
      {
        name: "Puma Hoodie",
        description: "Warm and stylish hoodie",
        price: 60,
        category: "Clothing",
        image:
          "https://thvnext.bing.com/th/id/OPAC.EtPwUpK1peesPA474C474?w=200&h=220&c=17&dpr=1.2&pid=21.1&ucfimg=1",
      },
      {
        name: "Dining Table Set",
        description: "Wooden dining table with 6 chairs",
        price: 7000,
        category: "Furniture",
        image:
          "https://thvnext.bing.com/th/id/OPAC.CWdxcPyOWHyl3w474C474?w=163&h=163&c=17&dpr=1.2&pid=21.1&ucfimg=1",
      },
    ];

    await Item.insertMany(items);
    console.log("Dummy items inserted successfully!");
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });
