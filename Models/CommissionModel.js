// const mongoose = require("mongoose");

// const commissionSchema = new mongoose.Schema(
//   {
//     vendorId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       unique: true,
//     },
//     commissionPercentage: {
//       type: Number,
//       default: 50,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Commission", commissionSchema);



const mongoose = require("mongoose");

const commissionSchema = new mongoose.Schema(
  {
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      unique: true,
    },
    branchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    commissionPercentage: {
      type: Number,
      default: 50,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Commission", commissionSchema);
