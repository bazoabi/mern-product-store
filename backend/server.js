import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json()); // Middleware to parse JSON request bodies

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api/products", async (req, res) => {
  // Handle fetching all products
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch products" });
  }
});

app.post("/api/products", async (req, res) => {
  // Handle product creation

  // Extract product data from the request body
  const productData = req.body;

  // Perform validation and processing of the product data
  // For example, you might want to check if the required fields are present
  if (
    !productData ||
    !productData.name ||
    !productData.price ||
    !productData.image
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  const newProduct = new Product(productData);

  // Save the new product to the database
  try {
    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error("Error saving product:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to create product" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  // Handle product deletion
  const productId = req.params.id;

  // Validate the product ID
  if (!productId) {
    return res
      .status(400)
      .json({ success: false, message: "Product ID is required" });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete product" });
  }
});

app.put("/api/products/:id", async (req, res) => {
  // Handle product update
  const productId = req.params.id;
  const updatedData = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid product ID" });
  }

  // Validate the product ID and updated data
  if (!productId || !updatedData) {
    return res
      .status(400)
      .json({ success: false, message: "Product ID and data are required" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true }
    );
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update product" });
  }
});

// console.log("Environment Variables:", process.env.MONGO_URI);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
