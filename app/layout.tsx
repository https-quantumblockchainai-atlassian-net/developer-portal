import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { MultilingualProvider } from "./components/multilingual-provider" // Import the provider

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Thoth Guardian: UE5.7 Aura AI Shield",
  description:
    "Crystal Alchemist's Transformational Journey - UE5.7 • Aura AI • Quantum-Safe Polymath Intelligence • Epic Storytelling • Lions Gate Portal 888 • Divine Sovereignty",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <MultilingualProvider> { /* Wrap children with Mult
