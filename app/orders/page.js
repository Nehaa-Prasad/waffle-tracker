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
    await fetch(`/api/orders/${id}`, {
      method: "DELETE",
    })
    fetchOrders()
  }

  const updateOrder = async (order) => {
    await fetch(`/api/orders/${order._id}`, {
      method: "PUT",
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

  return (
    <div className="p-10 bg-[#f5e6d3] min-h-screen">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white p-6 rounded shadow mb-6"
        >
          <p className="text-sm text-gray-500 mb-2">
            {new Date(order.orderedAt).toLocaleString()}
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
                (sum, item) => sum + item.price * item.quantity,
                0
              )}
            </span>
          </div>

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
        </div>
      ))}
    </div>
  )
}