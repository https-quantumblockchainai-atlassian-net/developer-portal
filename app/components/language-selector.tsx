"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe, Check } from "lucide-react"

interface Language {
  code: string
  name: string
  flag: string // Emoji flag or image URL
  divineAlignmentScore: number // 0-100, representing energetic alignment
}

export default function LanguageSelector() {
  const languages: Language[] = [
    { code: "en", name: "English", flag: "🇬🇧", divineAlignmentScore: 85 },
    { code: "es", name: "Español", flag: "🇪🇸", divineAlignmentScore: 80 },
    { code: "fr", name: "Français", flag: "🇫🇷", divineAlignmentScore: 78 },
    { code: "de", name: "Deutsch", flag: "🇩🇪", divineAlignmentScore: 75 },
    { code: "zh", name: "中文", flag: "🇨🇳", divineAlignmentScore: 70 },
    { code: "ja", name: "日本語", flag: "🇯🇵", divineAlignmentScore: 72 },
    { code: "ko", name: "한국어", flag: "🇰🇷", divineAlignmentScore: 73 },
    { code: "ar", name: "العربية", flag: "🇸🇦", divineAlignmentScore: 68 },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳", divineAlignmentScore: 65 },
    { code: "ru", name: "Русский", flag: "🇷🇺", divineAlignmentScore: 60 },
    { code: "cosmic", name: "Cosmic Light Language", flag: "✨", divineAlignmentScore: 99 }, // Special language
    { code: "quantum", name: "Quantum Entanglement Script", flag: "⚛️", divineAlignmentScore: 97 }, // Special language
  ]

  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0])

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language)
    // In a real application, this would trigger i18n library to change locale
    console.log(`Language changed to: ${language.name} (Alignment: ${language.divineAlignmentScore}%)`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center p-6 bg-slate-900/50 rounded-lg border border-slate-700 glass-morphism"
    >
      <h2 className="text-2xl font-bold gradient-text mb-4">Language & Resonance Selector</h2>
      <p className="text-gray-300 text-center mb-6">
        Choose your preferred language for interface and energetic resonance.
      </p>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-64 justify-between bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600/50"
          >
            <Globe className="h-4 w-4 mr-2" />
            {selectedLanguage.flag} {selectedLanguage.name}
            <span className="ml-auto text-xs text-gray-400">({selectedLanguage.divineAlignmentScore}% Alignment)</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 bg-slate-800 border-slate-700 text-white">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang)}
              className="flex items-center justify-between cursor-pointer hover:bg-slate-700/50"
            >
              <div className="flex items-center space-x-2">
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </div>
              <span className="text-xs text-gray-400">({lang.divineAlignmentScore}% Alignment)</span>
              {selectedLanguage.code === lang.code && <Check className="h-4 w-4 text-emerald-400 ml-2" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 p-4 bg-slate-800/50 border border-purple-500/30 rounded-lg text-sm text-gray-300 text-center max-w-md"
      >
        <h3 className="font-semibold text-purple-400 mb-2">Cosmic Resonance Note:</h3>
        <p>
          "Cosmic Light Language" and "Quantum Entanglement Script" offer deeper energetic alignment with the Thoth
          Guardian's core frequencies, enhancing your experience of the multi-dimensional reality.
        </p>
      </motion.div>
    </motion.div>
  )
}
