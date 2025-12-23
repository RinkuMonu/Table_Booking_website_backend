const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. Full Plate, 60ml, Bottle
  price: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
});

const complimentarySchema = new mongoose.Schema({
  name: { type: String }, // e.g. Water, Ice
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
    // ✅ Veg/Non-Veg/Egg पहचान के लिए
    dietaryType: { 
        type: String, 
        enum: ["Veg", "Non-Veg", "Egg", "N/A"], 
        default: "Veg" 
    },

    image: String,
    images: [String],
    
    variants: [variantSchema],
    complimentary: [complimentarySchema], 
    
    order: { type: Number, default: 0 }, // ✅ मेनू में ऊपर-नीचे करने के लिए
    isAvailable: { type: Boolean, default: true },
    isRecommended: { type: Boolean, default: false } // ✅ 'Today's Special' के लिए
}, { timestamps: true });
itemSchema.virtual("fullImageUrl").get(function () {
  if (!this.image) {
    return null;
  }

  const BASE_URL = process.env.APP_URL || "http://localhost:3000";
  const cleanedPath = this.image.replace(/\\/g, "/");
  
  return `${BASE_URL}/${cleanedPath}`;
});

// --- 🖼️ Virtual Property for Multiple Image URLs ---
itemSchema.virtual("fullImageUrls").get(function () {
  if (!this.images || this.images.length === 0) {
    return [];
  }

  const BASE_URL = process.env.APP_URL || "http://localhost:3000";

  // Array के हर path को full URL में बदलना
  return this.images.map((imagePath) => {
    const cleanedPath = imagePath.replace(/\\/g, "/");
    return `${BASE_URL}/${cleanedPath}`;
  });
});


// --- Schema Options ---
// सुनिश्चित करें कि virtuals JSON और Object output में शामिल हों
itemSchema.set("toObject", { virtuals: true });
itemSchema.set("toJSON", { virtuals: true });
module.exports = {
    Item: mongoose.model("Item", itemSchema), // Mongoose Model को 'Item' नाम से
    itemSchema: itemSchema // ✅ Raw Schema को भी एक्सपोर्ट करें
};