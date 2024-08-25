//initialise all dependencies and module
const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(cors());

// Database Connection with mongoDB
mongoose.connect(
  "mongodb+srv://manasa8910:MLUkNAxAX97eZtNc@cluster0.lxo3wrd.mongodb.net/e-commerce"
);
//now, the mongodb connected with express server

//Api creation
app.get("/", (req, res) => {
  res.send("Express App is Running");
});

app.use("/images", express.static("upload/images"));

//creating api for fetching all products
app.get("/allproducts", async (req, res) => {
  let products = await mongoose.connection.db
    .collection("product")
    .find({})
    .toArray();
  console.log("all products fetched");
  res.json(products);
});

//schema for users
const Users = mongoose.model("User", {
  name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String },
  cartData: {
    type: Object,
  },
  orderData: {
    type: Array,
  },
});

//creating endpoint for registering user
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });

  if (check) {
    return res.status(400).json({
      success: false,
      errors: "existing user found with the same email address",
    });
  }

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  let cart = {};
  for (let i = 0; i <= 60; i++) {
    cart[i.toString()] = 0;
  }
  let orders = [];

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: hashedPassword, // Store the hashed password
    cartData: cart,
    orderData: orders,
  });

  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

//creating endpoint for user login
app.post("/login", async (req, res, next) => {
  let user = await Users.findOne({ email: req.body.email });

  if (user) {
    // Compare hashed password using bcrypt
    const passCompare = await bcrypt.compare(req.body.password, user.password);

    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "wrong password" });
    }
  } else {
    res.json({ success: false, errors: "wrong email address" });
  }
});

//creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ errors: "Please authenticate using valid token" });
    }
  }
};

app.get("/user", fetchUser, async (req, res) => {
  try {
    const userData = await Users.findOne({ _id: req.user.id });
    res.json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//creating endpoint for adding in cartdata
app.post("/cart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  if (req.body.operation === "inc") {
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );
  } else if (req.body.operation === "dec") {
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );
  } else if (req.body.operation === "clear") {
    userData.cartData[req.body.itemId] = 0;
    await Users.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );
  }

  console.log(userData.cartData);
  res.send({ success: true });
});

// Add this endpoint to your server
app.get("/cart/:productId", fetchUser, async (req, res) => {
  try {
    const userData = await Users.findOne({ _id: req.user.id });
    const quantity = userData.cartData[req.params.productId] || 0;
    res.json({ quantity });
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add this endpoint to your server
app.post("/order", fetchUser, async (req, res) => {
  try {
    const userData = await Users.findOne({ _id: req.user.id });

    // Extract order data from the request body
    const { orderId, date, cartValues, full_address, pincode, total } =
      req.body.order;

    // Create a new order object
    const order = {
      orderId,
      date,
      cartValues,
      full_address,
      pincode,
      total,
    };

    // Add the order to the user's orderData array
    userData.orderData.push(order);

    // Save the updated user data
    await Users.findOneAndUpdate(
      { _id: req.user.id },
      { orderData: userData.orderData }
    );

    res.send({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// clear cart
app.post("/clear-cart", fetchUser, async (req, res) => {
  try {
    // Find the user by ID
    const user = await Users.findOne({ _id: req.user.id });

    // Update the cartData to set all values to 0
    const updatedCartData = {};
    for (let key in user.cartData) {
      updatedCartData[key] = 0;
    }

    // Update the user's cartData in the database
    await Users.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: updatedCartData }
    );

    res.json({ success: true, message: "Cart data cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart data:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

//port
app.listen(port, (error) => {
  if (!error) {
    console.log("server running on port " + port);
  } else {
    console.log("Error : " + error);
  }
});
