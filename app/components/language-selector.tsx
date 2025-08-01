"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, ChevronDown } from "lucide-react"
import { useTranslation } from "./multilingual-provider"

export default function LanguageSelector() {
  const { currentLanguage, languages, setLanguage } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const currentLang = languages.find((lang) => lang.code === currentLanguage)

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="text-white hover:text-emerald-400 transition-smooth"
      >
        <Globe className="h-4 w-4 mr-2" />
        <span className="mr-1">{currentLang?.flag}</span>
        <span className="hidden sm:inline">{currentLang?.name}</span>
        <ChevronDown className="h-3 w-3 ml-1" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 z-50"
          >
            <Card className="bg-slate-800/95 border-slate-700 backdrop-blur-md">
              <CardContent className="p-2">
                <div className="space-y-1">
                  {languages.map((language) => (
                    <motion.button
                      key={language.code}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setLanguage(language.code)
                        setIsOpen(false)
                      }}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-smooth flex items-center space-x-2 ${
                        currentLanguage === language.code
                          ? "bg-emerald-600 text-white"
                          : "text-gray-300 hover:bg-slate-700 hover:text-white"
                      }`}
                    >
                      <span>{language.flag}</span>
                      <span>{language.name}</span>
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  )
}
