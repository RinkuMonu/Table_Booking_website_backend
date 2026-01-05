const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
});

const complimentarySchema = new mongoose.Schema({
  name: { type: String },
  isMandatory: { type: Boolean, default: false },
});

const itemSchema = new mongoose.Schema({
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
    categoryId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Category", 
        required: true 
    },    
    name: { type: String, required: true, trim: true },
    description: String,    
    dietaryType: { 
        type: String, 
        enum: ["Veg", "Non-Veg", "Egg", "N/A"], 
        default: "Veg" 
    },
    image: String,
    images: [String],
    variants: [variantSchema],
    complimentary: [complimentarySchema], 
    order: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true },
    isRecommended: { type: Boolean, default: false }
}, { timestamps: true });

// --- 🛠️ FIX: Auto-Parse Strings from Form-Data ---
// Validation se pehle check karega ki agar variants string hai toh use parse kar de
itemSchema.pre("validate", function (next) {
  if (this.variants && typeof this.variants === "string") {
    try {
      this.variants = JSON.parse(this.variants);
    } catch (error) {
      return next(new Error("Variants must be a valid JSON array string"));
    }
  }
  
  if (this.complimentary && typeof this.complimentary === "string") {
    try {
      this.complimentary = JSON.parse(this.complimentary);
    } catch (error) {
      return next(new Error("Complimentary must be a valid JSON array string"));
    }
  }
  next();
});

// --- 🖼️ Virtual Property for Single Image ---
itemSchema.virtual("fullImageUrl").get(function () {
  if (!this.image) return null;
  const BASE_URL = process.env.APP_URL || "https://deenitaindia.in";
  const cleanedPath = this.image.replace(/\\/g, "/");
  return `${BASE_URL}/${cleanedPath}`;
});

// --- 🖼️ Virtual Property for Multiple Images ---
itemSchema.virtual("fullImageUrls").get(function () {
  if (!this.images || this.images.length === 0) return [];
  const BASE_URL = process.env.APP_URL || "https://deenitaindia.in";
  return this.images.map((imagePath) => {
    const cleanedPath = imagePath.replace(/\\/g, "/");
    return `${BASE_URL}/${cleanedPath}`;
  });
});

itemSchema.set("toObject", { virtuals: true });
itemSchema.set("toJSON", { virtuals: true });

module.exports = {
    Item: mongoose.model("Item", itemSchema),
    itemSchema: itemSchema
};