import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    minLength: 10,
    maxLength: 100,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: "Tour",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

//2)create a model
const Review = mongoose.model("Review", reviewSchema);

export default Review;
