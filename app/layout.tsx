import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "./components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Thoth Emerald Cybersecurity Shield",
  description: "AI-Powered Quantum-Enhanced Multi-Dimensional Security Ecosystem",
  keywords: "cybersecurity, AI, quantum, machine learning, threat detection",
  authors: [{ name: "Thoth Emerald Team" }],
  openGraph: {
    title: "Thoth Emerald Cybersecurity Shield",
    description: "Next-generation AI cybersecurity platform",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
