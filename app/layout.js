import "./globals.css"
import Navbar from "@/components/Navbar"

export const metadata = {
  title: "Bangalore Cream Waffles",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#f9f7f4] text-gray-900 antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  )
}