"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Atom, Brain, Sparkles, Code, Heart, Globe, Menu, X, Zap, Star, Network, Home } from "lucide-react"

export default function NavigationHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigationItems = [
    { id: "home", label: "Home", icon: Home, color: "text-white", href: "/" }, // Added Home link
    { id: "shield", label: "Quantum Shield", icon: Shield, color: "text-emerald-400", href: "#quantum-shield" },
    { id: "alchemy", label: "Crystal Alchemy", icon: Sparkles, color: "text-purple-400", href: "#crystal-structure" },
    { id: "aura-ai", label: "Aura AI", icon: Brain, color: "text-cyan-400", href: "#aura-companion" },
    { id: "blueprint", label: "Blueprint", icon: Code, color: "text-blue-400", href: "#blueprint" },
    { id: "walker-world", label: "Walker World", icon: Globe, color: "text-green-400", href: "#walker-world" },
    { id: "divine", label: "Divine Alignment", icon: Heart, color: "text-pink-400", href: "#divine-alignment" },
  ]

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center space-x-3"
          >
            <div className="flex items-center space-x-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Shield className="h-8 w-8 text-emerald-400" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Atom className="h-8 w-8 text-cyan-400" />
              </motion.div>
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">
                Thoth Guardian Cybersecurity Shield - Crystal Alchemist's Transformational Journey
              </h1>
              <p className="text-xs text-gray-400">
                UE5.7 • Aura AI • Quantum-Safe Polymath Intelligence • Epic Storytelling • Lions Gate Portal 888 •
                Divine Sovereignty
              </p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:flex items-center space-x-2"
          >
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="ghost" size="sm" className={`${item.color} hover:bg-slate-800/50 transition-smooth`}>
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              </motion.div>
            ))}
          </motion.nav>

          {/* Status Indicators */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden md:flex items-center space-x-3"
          >
            <Badge variant="outline" className="text-emerald-400 border-emerald-500/30">
              <Zap className="h-3 w-3 mr-1" />
              ACTIVE
            </Badge>
            <Badge variant="outline" className="text-cyan-400 border-cyan-500/30">
              <Star className="h-3 w-3 mr-1" />
              ALIGNED
            </Badge>
            <Badge variant="outline" className="text-purple-400 border-purple-500/30">
              <Network className="h-3 w-3 mr-1" />
              SYNCED
            </Badge>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:hidden"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-white"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden mt-4 pt-4 border-t border-slate-700"
          >
            <div className="grid grid-cols-2 gap-2">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.05 * index }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start ${item.color} hover:bg-slate-800/50 transition-smooth`}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                </motion.div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <Badge variant="outline" className="text-emerald-400 border-emerald-500/30">
                <Zap className="h-3 w-3 mr-1" />
                ACTIVE
              </Badge>
              <Badge variant="outline" className="text-cyan-400 border-cyan-500/30">
                <Star className="h-3 w-3 mr-1" />
                ALIGNED
              </Badge>
              <Badge variant="outline" className="text-purple-400 border-purple-500/30">
                <Network className="h-3 w-3 mr-1" />
                SYNCED
              </Badge>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}
