import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { CustomCursor } from "@/components/custom-cursor"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "My Guitar Meth - Learn Guitar with Expert Guidance",
  description: "Professional guitar lessons, workshops, and chord library",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
