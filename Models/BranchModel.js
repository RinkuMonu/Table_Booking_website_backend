// models/Branch.js
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  plotNo: String,
  street: String,
  nearbyPlaces: String,
  area: String,
  city: String,
  state: String,
  pincode: String,
});

const branchSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    name: { type: String, required: false }, // branch name (could be same as business)
    description: String,
    images: [String],
    address: addressSchema,
    menuItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    tables: [{ type: mongoose.Schema.Types.ObjectId, ref: "Table" }],
    schedules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Schedule" }],
    commissionId: { type: mongoose.Schema.Types.ObjectId, ref: "Commission" },
    wallets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Wallet" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    defaultCommissionPercentage: { type: Number, default: 50 },
    // ⭐ New Additions for Filter API
    averageRating: { type: Number, default: 0 },
    totalRatings: { type: Number, default: 0 },
    categoryType: {
      type: String,
      enum: ["Pub", "Cafe", "Club","Restro","Bar"],
      default: "Restro",
    },
    foodType: {
      type: String,
      enum: ["Veg", "Nonveg", "Both"],
      default: "Veg",
    },
    isActive: { type: Boolean, default: true }, // open to take bookings
    isPopular: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // vendor who created
    meta: {
      sameMenuAsOtherBranch: { type: Boolean, default: false },
      copiedFromBranchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", default: null },
    },
    walletId: { type: mongoose.Schema.Types.ObjectId, ref: "Wallet", default: null },
  },
  { timestamps: true }
);
branchSchema.virtual("fullImageUrls").get(function () {
  if (!this.images || this.images.length === 0) {
    return [];
  }
  const BASE_URL = process.env.APP_URL || "https://deenitaindia.in";

  // Backslashes को forward slashes में बदलना और BASE_URL जोड़ना
  return this.images.map((imagePath) => {
    const cleanedPath = imagePath.replace(/\\/g, "/");
    return `${BASE_URL}/${cleanedPath}`;
  });
});
branchSchema.set("toObject", { virtuals: true });
branchSchema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("Branch", branchSchema);
