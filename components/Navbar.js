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

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          {/* Logo + Name */}
          <div className="flex items-start gap-3">
            <span className="text-5xl">🧇</span>

            <div>
              <h1 className="text-xl font-semibold tracking-tight leading-tight">
                Bangalore Cream Waffles
              </h1>

              <p className="text-xs tracking-[0.25em] text-[#8d6e63] mt-1 max-w-[250px] md:max-w-none">
                CRUNCHY, CREAMY & PURELY NAMMA BENGALURU
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-8 md:gap-12">
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