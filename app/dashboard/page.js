"use client"

import { useEffect, useState } from "react"

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border hover:shadow-xl transition">
      <h2 className="text-gray-600 mb-3">{title}</h2>
      <p className="text-3xl font-bold text-amber-900">{value}</p>
    </div>
  )
}

export default function Dashboard() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
  }, [])

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  )

  const totalOrders = orders.length

  const totalWaffles = orders.reduce(
    (sum, order) =>
      sum +
      order.items.reduce(
        (itemSum, item) => itemSum + item.quantity,
        0
      ),
    0
  )

  return (
    <div className="p-10 bg-[#f5e6d3] min-h-screen">
      <h1 className="text-4xl font-bold mb-10 text-amber-900">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-8">
        <StatCard title="Total Revenue" value={`₹${totalRevenue}`} />
        <StatCard title="Total Orders" value={totalOrders} />
        <StatCard title="Total Waffles Sold" value={totalWaffles} />
      </div>
    </div>
  )
}