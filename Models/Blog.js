// // models/Blog.js
// const mongoose = require("mongoose");

// const BlogSchema = new mongoose.Schema({
//   title: { type: String, required: true, trim: true },
//   slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
//   description: { type: String },
//   content: { type: String },
//   image: { type: String }, 
//   author: { type: String, default: "Admin" },
//   meta: {
//     keywords: [String],
//     description: String,
//   },
// }, {
//   timestamps: true
// });

// module.exports = mongoose.model("Blog", BlogSchema);



// models/Blog.js
const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: { type: String },
    content: { type: String },

    // Only filename stored in DB
    image: { type: String },

    author: { type: String, default: "Admin" },

    meta: {
      keywords: [String],
      description: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//
// ✅ VIRTUAL IMAGE FULL PATH
//
BlogSchema.virtual("imageUrl").get(function () {
  if (!this.image) return null;

  return `${process.env.BASE_URL}/${this.image}`;
});

module.exports = mongoose.model("Blog", BlogSchema);
