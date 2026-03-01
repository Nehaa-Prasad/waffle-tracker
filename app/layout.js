import "./globals.css"
import Navbar from "@/components/Navbar"

export const metadata = {
  title: "Bangalore Cream Waffles",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#f5e6d3] text-[#3e2723] min-h-screen antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  )
}