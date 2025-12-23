const mongoose = require("mongoose");

const userCouponSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    coupon_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
      required: true,
    },

    business_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // admin / vendor
    },

    isUsed: {
      type: Boolean,
      default: false,
    },

    assignedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// ek user ko same coupon dubara assign na ho
userCouponSchema.index(
  { user_id: 1, coupon_id: 1 },
  { unique: true }
);

module.exports = mongoose.model("UserCoupon", userCouponSchema);
