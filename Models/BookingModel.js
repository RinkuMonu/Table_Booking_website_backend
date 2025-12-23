const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: false,
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    table_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },
    
    // --- Schedule & Slot Details ---
    slot_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Slot",
      required: true,
    },
    bookingDay: { 
      type: String, 
      required: true, 
      lowercase: true // e.g., "saturday"
    },
    timeSlotId: {
      type: mongoose.Schema.Types.ObjectId, // Schedule ke andar specific slot ki ID
      required: true,
    },
    bookingTime: { 
      type: String, 
      required: true
    },
    totalGuests: {
      type: Number,
      required: true,
      default: 2
    },

    // --- Order Details ---
    items_ordered: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item",
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        // Agar variant use kar rahe ho toh variantId varna optional
        selected_variant_id: {
          type: String, 
        }
      },
    ],

    // --- Pricing & Payments ---
    totalAmount: { type: Number, default: 0 },
    discountApplied: { type: Number, default: 0 },
    couponId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
      default: null
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
    },

    // --- Status Flags ---
    requestStatus: {
      type: String,
      enum: ["pending", "accepted", "denied"],
      default: "pending",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    refundMode: {
      type: String,
      enum: ["full", "partial"],
      default: "partial"
    },

    bookingDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);