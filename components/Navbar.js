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
      <div className="max-w-6xl mx-auto px-8 py-6 flex items-center justify-between">

        <div className="flex items-start gap-4">
            <span className="text-5xl leading-none">🧇</span>

            <div className="flex flex-col">
                <h1 className="text-xl font-semibold tracking-tight text-[#3e2723]">
                    Bangalore Cream Waffles
                </h1>

                <p className="text-[11px] tracking-[0.4em] uppercase text-[#8d6e63] mt-1">
                    Crunchy, Creamy & Purely Namma Bengaluru
                </p>
            </div>
        </div>

        <div className="flex items-center gap-12">
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