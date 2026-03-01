import { connectDB } from "@/lib/db"
import Order from "@/models/Order"

export async function DELETE(req, context) {
  await connectDB()
  const { id } = await context.params

  await Order.findByIdAndDelete(id)

  return Response.json({ message: "Order deleted" })
}

export async function PUT(req, context) {
  await connectDB()
  const { id } = await context.params

  const body = await req.json()
  const { items } = body

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { items, totalAmount },
    { new: true }
  )

  return Response.json(updatedOrder)
}