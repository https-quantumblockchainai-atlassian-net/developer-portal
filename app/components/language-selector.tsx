"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe, Check } from "lucide-react"

export default function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ]

  const currentLanguage = languages.find((lang) => lang.code === selectedLanguage) || languages[0]

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode)
    // In a real application, you would update the i18n context or reload with new locale
    console.log(`Language changed to: ${langCode}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-2"
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center space-x-2 bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700/50"
          >
            <Globe className="h-4 w-4" />
            <span>
              {currentLanguage.flag} {currentLanguage.name}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 bg-slate-800/90 border-slate-700 text-white">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className="flex items-center justify-between cursor-pointer hover:bg-slate-700/50"
            >
              <span>
                {lang.flag} {lang.name}
              </span>
              {selectedLanguage === lang.code && <Check className="h-4 w-4 text-emerald-400" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  )
}
