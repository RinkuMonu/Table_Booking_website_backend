const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
    name: { type: String, required: true, trim: true },
    type: { type: String, enum: ["Food", "Drinks"], required: true },
    image: String,
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    // Optional: Agar aap manual list maintain karna chahte hain
    // items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }] 
}, { 
    timestamps: true,
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true } 
});

// --- Virtual for Items ---
// Ye "Item" model mein check karega ki kis-kis item ki categoryId is Category se milti hai
categorySchema.virtual('categoryItems', {
  ref: 'Item',
  localField: '_id',
  foreignField: 'categoryId'
});

categorySchema.virtual("fullImageUrl").get(function () {
  if (!this.image) return null;
  const BASE_URL = process.env.APP_URL || "https://deenitaindia.in";
  const cleanedPath = this.image.replace(/\\/g, "/");
  return `${BASE_URL}/${cleanedPath}`;
});

module.exports = mongoose.model("Category", categorySchema);