"use client"

import { useEffect, useState } from "react"

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 text-center w-full">
      <h2 className="text-gray-600 mb-2 text-sm">
        {title}
      </h2>

      <p className="text-2xl font-bold text-[#6d2c00] break-words">
        {value}
      </p>
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
    <div className="px-5 py-8 bg-[#f5e6d3] min-h-screen">

      <h1 className="text-3xl font-bold mb-8 text-amber-900">
        Dashboard
      </h1>

      {/* THIS IS THE FIX */}
      <div className="flex flex-col gap-6 md:grid md:grid-cols-3 md:gap-8">
        <StatCard title="Total Revenue" value={`₹${totalRevenue}`} />
        <StatCard title="Total Orders" value={totalOrders} />
        <StatCard title="Total Waffles Sold" value={totalWaffles} />
      </div>

    </div>
  )
}