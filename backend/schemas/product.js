const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    name: String,
    image: {
        public_id: String,
        url: String,
        defaul:imgPath // add a default image
    },
    description: {
        type: String,
        required: true, 
        trim: true, // Remove extra spaces from the description
      },
      price: {
        type: Number,
        required: true, // Price is required
        min: 0, // Ensure the price can't be negative
      },
      stockQuantity: {
        type: Number,
        default: 0, // Default stock quantity is 0
        min: 0, // Ensure stock is never negative
      },
      category: {
        type: String,
        required: true, // Category is required
      },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now, // Default to the current date/time
      },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        comment: {
            type: String,
            required: true,
        },
    }],
})

module.exports = mongoose.model("Procuct", postSchema)