import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tags: [{ type: String }],
  images: [{ type: String, required: true }],
  slug: { type: String, },
  description: { type: String },
  price: { type: Number, required: true },
  discountPrice: { type: Number,  },
  category: { type: String, required: true },
  subcategory: { type: String}, 
  productosRelacionados: [{ type: String }],
  tracking: { type: String },
  sku: { type: String },
  stock: { type: Number  }
});

const ProductDublin =
  mongoose.models.ProductDublin || mongoose.model("ProductDublin", ProductSchema);

export default ProductDublin;