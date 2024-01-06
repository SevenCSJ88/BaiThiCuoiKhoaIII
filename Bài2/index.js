const express = require("express");
const { connectToDb, db } = require("./db");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

const data = {
  orders: [
    { "_id": 1, "item": "almonds", "price": 12, "quantity": 2 },
    { "_id": 2, "item": "pecans", "price": 20, "quantity": 1 },
    { "_id": 3, "item": "pecans", "price": 20, "quantity": 3 },
  ],
  inventory: [
    { "_id": 1, "sku": "almonds", "description": "product 1", "instock": 120 },
    { "_id": 2, "sku": "bread", "description": "product 2", "instock": 80 },
    { "_id": 3, "sku": "cashews", "description": "product 3", "instock": 60 },
    { "_id": 4, "sku": "pecans", "description": "product 4", "instock": 70 },
  ],
  users: [
    { "username": "admin", "password": "MindX@2022" },
    { "username": "alice", "password": "MindX@2022" }
  ]
};

const connectToDbAndStartApp = async () => {
  await connectToDb();
  startApp();
};

const startApp = () => {
  app.listen(3000, () => {
    console.log("App is running at 3000");
  });
};

const loginHandler = (req, res) => {
  const { username, password } = req.body;

  if (isValidLogin(username, password)) {
    const token = jwt.sign({ username }, "your-secret-key", { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
};

const isValidLogin = (username, password) => {
  const user = data.users.find(u => u.username === username && u.password === password);
  return !!user;
};

const authenticationMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Missing token" });
  }

  try {
    jwt.verify(token, "your-secret-key");
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};

const inventoryHandler = async (req, res) => {
  const { lowQuantity } = req.query;

  let query = {};
  if (lowQuantity === "true") {
    query = { instock: { $lt: 100 } };
  }

  const inventory = await db.inventories.find(query).toArray();
  res.json(inventory);
};

const ordersHandler = async (req, res) => {
  const orders = await db.orders.find({}).toArray();
  const ordersWithDescriptions = await Promise.all(
    orders.map(async order => {
      const product = await db.inventories.findOne({ sku: order.item });
      return { ...order, productDescription: product.description };
    })
  );
  res.json(ordersWithDescriptions);
};

app.post("/api/login", loginHandler);
app.use("/api", authenticationMiddleware);
app.get("/api/inventory", inventoryHandler);
app.get("/api/orders", ordersHandler);

connectToDbAndStartApp();
