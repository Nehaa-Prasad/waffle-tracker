"use client"

import { useState } from "react"

const classics = [
  { name: "Honey Butter Waffle", price: 69 },
  { name: "Chocolate Waffle", price: 79 },
  { name: "White Chocolate Waffle", price: 79 },
  { name: "Dark Chocolate Waffle", price: 85 },
  { name: "Nutella Waffle", price: 89 },
  { name: "Triple Chocolate Waffle", price: 99 },
  { name: "Strawberry Chocolate Waffle", price: 99 },
]

const creams = [
  { name: "Cream Waffle", price: 79 },
  { name: "Blueberry Cream Waffle", price: 89 },
  { name: "Strawberry Cream Waffle", price: 89 },
  { name: "Chocolate Cream Waffle", price: 99 },
  { name: "Dark Chocolate Cream Waffle", price: 109 },
  { name: "Cream Nutella Waffle", price: 109 },
  { name: "Triple Chocolate Cream Waffle", price: 119 },
]

export default function Home() {
  const [cart, setCart] = useState({})

  const increase = (item) => {
    setCart((prev) => ({
      ...prev,
      [item.name]: {
        ...item,
        quantity: (prev[item.name]?.quantity || 0) + 1,
      },
    }))
  }

  const decrease = (item) => {
    if (!cart[item.name]) return

    const newQty = cart[item.name].quantity - 1

    if (newQty <= 0) {
      const updated = { ...cart }
      delete updated[item.name]
      setCart(updated)
    } else {
      setCart((prev) => ({
        ...prev,
        [item.name]: { ...item, quantity: newQty },
      }))
    }
  }

  const items = Object.values(cart)

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const placeOrder = async () => {
    if (!items.length) return
    await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, totalAmount }),
    })
    setCart({})
  }

  const renderMenuSection = (title, data) => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-[0.25em] text-[#4b2e2e]">
          {title}
        </h2>
        <div className="w-16 h-[2px] bg-[#8d6e63] mx-auto mt-3"></div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {data.map((item) => (
          <div
            key={item.name}
            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between mb-6">
              <div>
                <p className="font-medium text-[#3e2723]">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500">
                  ₹{item.price}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => decrease(item)}
                className="w-9 h-9 rounded-full border border-gray-300"
              >
                –
              </button>

              <span className="text-lg font-semibold">
                {cart[item.name]?.quantity || 0}
              </span>

              <button
                onClick={() => increase(item)}
                className="w-9 h-9 rounded-full bg-black text-white"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="max-w-6xl mx-auto px-8 py-16">

      <div className="grid grid-cols-3 gap-16">

        {/* MENU */}
        <div className="col-span-2 space-y-16">

          {renderMenuSection("THE CLASSICS", classics)}

          {renderMenuSection("THE CREAM COLLECTION", creams)}

        </div>

        {/* CART */}
        <div className="bg-white rounded-3xl p-8 shadow-lg h-fit">

          <h2 className="text-lg font-semibold mb-6 text-[#3e2723]">
            Cart
          </h2>

          <div className="space-y-3 text-sm">
            {items.map((item) => (
              <div key={item.name} className="flex justify-between">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t mt-6 pt-6 flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>

          <button
            onClick={placeOrder}
            className="mt-8 w-full bg-black text-white py-3 rounded-2xl hover:opacity-90 transition"
          >
            Place Order
          </button>

        </div>

      </div>

    </div>
  )
}