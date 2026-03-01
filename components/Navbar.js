"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  const linkStyle = (path) =>
    `text-sm font-medium transition ${
      pathname === path
        ? "text-black"
        : "text-gray-500 hover:text-black"
    }`

  return (
    <div className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-6">

        {/* Main Layout */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">

          {/* LEFT SIDE */}
          <div className="flex flex-col items-center md:items-start">

            <div className="flex items-center gap-3">
              <span className="text-4xl">🧇</span>
              <h1 className="text-xl font-semibold tracking-tight">
                Bangalore Cream Waffles
              </h1>
            </div>

            <p className="text-xs tracking-[0.3em] text-[#8d6e63] mt-2 text-center md:text-left">
              CRUNCHY, CREAMY & PURELY NAMMA BENGALURU
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex justify-center md:justify-end gap-10 mt-6 md:mt-0">
            <Link href="/" className={linkStyle("/")}>
              Menu
            </Link>
            <Link href="/orders" className={linkStyle("/orders")}>
              Orders
            </Link>
            <Link href="/dashboard" className={linkStyle("/dashboard")}>
              Dashboard
            </Link>
          </div>

        </div>

      </div>
    </div>
  )
}