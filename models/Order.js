import mongoose from "mongoose"

const OrderSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: Number,
  orderedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Order ||
  mongoose.model("Order", OrderSchema)