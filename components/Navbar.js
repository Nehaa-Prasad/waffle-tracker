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
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col items-center">

        {/* Logo + Name */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🧇</span>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-center">
              Bangalore Cream Waffles
            </h1>
            <p className="text-xs tracking-[0.3em] text-[#8d6e63] mt-1 text-center">
              CRUNCHY, CREAMY & PURELY NAMMA BENGALURU
            </p>
          </div>
        </div>

        {/* Centered Links */}
        <div className="flex justify-center gap-10">
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
  )
}