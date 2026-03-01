"use client"

import { useEffect, useState } from "react"

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [editingId, setEditingId] = useState(null)

  const fetchOrders = async () => {
    const res = await fetch("/api/orders")
    const data = await res.json()
    setOrders(data)
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const deleteOrder = async (id) => {
    await fetch(`/api/orders/${id}`, { method: "DELETE" })
    fetchOrders()
  }

  const updateOrder = async (order) => {
    await fetch(`/api/orders/${order._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: order.items }),
    })
    setEditingId(null)
    fetchOrders()
  }

  const changeQuantity = (orderId, index, value) => {
    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId
          ? {
              ...order,
              items: order.items.map((item, i) =>
                i === index
                  ? { ...item, quantity: Number(value) }
                  : item
              ),
            }
          : order
      )
    )
  }

  // 🧠 Helper: Check if order is today
  const isToday = (date) => {
    const today = new Date()
    const orderDate = new Date(date)

    return (
      orderDate.getDate() === today.getDate() &&
      orderDate.getMonth() === today.getMonth() &&
      orderDate.getFullYear() === today.getFullYear()
    )
  }

  // 🧠 Group orders by date
  const groupOrdersByDate = () => {
    const groups = {}

    orders.forEach((order) => {
      const date = new Date(order.orderedAt)
      const today = new Date()
      const yesterday = new Date()
      yesterday.setDate(today.getDate() - 1)

      let label

      if (isToday(date)) {
        label = "Today"
      } else if (
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()
      ) {
        label = "Yesterday"
      } else {
        label = date.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      }

      if (!groups[label]) {
        groups[label] = []
      }

      groups[label].push(order)
    })

    return groups
  }

  const groupedOrders = groupOrdersByDate()

  return (
    <div className="p-10 bg-[#f5e6d3] min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Orders</h1>

      {Object.entries(groupedOrders).map(([dateLabel, orders]) => (
        <div key={dateLabel} className="mb-10">
          <h2 className="text-xl font-semibold mb-4">{dateLabel}</h2>

          {orders.map((order) => {
            const editable = isToday(order.orderedAt)

            return (
              <div
                key={order._id}
                className="bg-white p-6 rounded-xl shadow mb-6"
              >
                <p className="text-sm text-gray-500 mb-3">
                  {new Date(order.orderedAt).toLocaleTimeString()}
                </p>

                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between mb-2">
                    <span>{item.name}</span>

                    {editingId === order._id ? (
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) =>
                          changeQuantity(order._id, index, e.target.value)
                        }
                        className="border px-2 w-16"
                      />
                    ) : (
                      <span>
                        {item.quantity} × ₹{item.price}
                      </span>
                    )}
                  </div>
                ))}

                <hr className="my-3" />

                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>
                    ₹
                    {order.items.reduce(
                      (sum, item) =>
                        sum + item.price * item.quantity,
                      0
                    )}
                  </span>
                </div>

                {editable ? (
                  <>
                    {editingId === order._id ? (
                      <button
                        onClick={() => updateOrder(order)}
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingId(order._id)}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded mr-3"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="mt-4 bg-red-500 text-white px-4 py-2 rounded ml-3"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <div className="mt-4 text-sm text-gray-500">
                    History (Not Editable)
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}