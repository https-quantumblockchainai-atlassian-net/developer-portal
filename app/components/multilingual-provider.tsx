"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface Translation {
  [key: string]: string | Translation
}

interface Language {
  code: string
  name: string
  flag: string
  translations: Translation
}

interface MultilingualContextType {
  currentLanguage: string
  languages: Language[]
  translate: (key: string, fallback?: string) => string
  setLanguage: (code: string) => void
}

const MultilingualContext = createContext<MultilingualContextType | undefined>(undefined)

const languages: Language[] = [
  {
    code: "en",
    name: "English",
    flag: "🇺🇸",
    translations: {
      dashboard: "Dashboard",
      threatDetection: "Threat Detection",
      quantumShield: "Quantum Shield",
      aiTraining: "AI Training",
      community: "Community",
      settings: "Settings",
      analytics: "Analytics",
      welcome: "Welcome to Thoth Emerald",
      systemStatus: "System Status",
      allSystemsOperational: "All Systems Operational",
      activeThreats: "Active Threats",
      protectedAssets: "Protected Assets",
      threatIntelligence: "Threat Intelligence",
      quantumCoherence: "Quantum Coherence",
      aiModelsActive: "AI Models Active",
      globalUsers: "Global Users",
      systemUptime: "System Uptime",
      dataProcessed: "Data Processed",
    },
  },
  {
    code: "es",
    name: "Español",
    flag: "🇪🇸",
    translations: {
      dashboard: "Panel de Control",
      threatDetection: "Detección de Amenazas",
      quantumShield: "Escudo Cuántico",
      aiTraining: "Entrenamiento IA",
      community: "Comunidad",
      settings: "Configuración",
      analytics: "Analíticas",
      welcome: "Bienvenido a Thoth Emerald",
      systemStatus: "Estado del Sistema",
      allSystemsOperational: "Todos los Sistemas Operativos",
      activeThreats: "Amenazas Activas",
      protectedAssets: "Activos Protegidos",
      threatIntelligence: "Inteligencia de Amenazas",
      quantumCoherence: "Coherencia Cuántica",
      aiModelsActive: "Modelos IA Activos",
      globalUsers: "Usuarios Globales",
      systemUptime: "Tiempo de Actividad",
      dataProcessed: "Datos Procesados",
    },
  },
  {
    code: "fr",
    name: "Français",
    flag: "🇫🇷",
    translations: {
      dashboard: "Tableau de Bord",
      threatDetection: "Détection des Menaces",
      quantumShield: "Bouclier Quantique",
      aiTraining: "Formation IA",
      community: "Communauté",
      settings: "Paramètres",
      analytics: "Analytiques",
      welcome: "Bienvenue à Thoth Emerald",
      systemStatus: "État du Système",
      allSystemsOperational: "Tous les Systèmes Opérationnels",
      activeThreats: "Menaces Actives",
      protectedAssets: "Actifs Protégés",
      threatIntelligence: "Intelligence des Menaces",
      quantumCoherence: "Cohérence Quantique",
      aiModelsActive: "Modèles IA Actifs",
      globalUsers: "Utilisateurs Globaux",
      systemUptime: "Temps de Fonctionnement",
      dataProcessed: "Données Traitées",
    },
  },
  {
    code: "de",
    name: "Deutsch",
    flag: "🇩🇪",
    translations: {
      dashboard: "Dashboard",
      threatDetection: "Bedrohungserkennung",
      quantumShield: "Quantenschild",
      aiTraining: "KI-Training",
      community: "Gemeinschaft",
      settings: "Einstellungen",
      analytics: "Analytik",
      welcome: "Willkommen bei Thoth Emerald",
      systemStatus: "Systemstatus",
      allSystemsOperational: "Alle Systeme Betriebsbereit",
      activeThreats: "Aktive Bedrohungen",
      protectedAssets: "Geschützte Assets",
      threatIntelligence: "Bedrohungsintelligenz",
      quantumCoherence: "Quantenkohärenz",
      aiModelsActive: "Aktive KI-Modelle",
      globalUsers: "Globale Benutzer",
      systemUptime: "Systemlaufzeit",
      dataProcessed: "Verarbeitete Daten",
    },
  },
  {
    code: "zh",
    name: "中文",
    flag: "🇨🇳",
    translations: {
      dashboard: "仪表板",
      threatDetection: "威胁检测",
      quantumShield: "量子盾牌",
      aiTraining: "AI训练",
      community: "社区",
      settings: "设置",
      analytics: "分析",
      welcome: "欢迎来到托特翡翠",
      systemStatus: "系统状态",
      allSystemsOperational: "所有系统正常运行",
      activeThreats: "活跃威胁",
      protectedAssets: "受保护资产",
      threatIntelligence: "威胁情报",
      quantumCoherence: "量子相干性",
      aiModelsActive: "活跃AI模型",
      globalUsers: "全球用户",
      systemUptime: "系统正常运行时间",
      dataProcessed: "已处理数据",
    },
  },
  {
    code: "ja",
    name: "日本語",
    flag: "🇯🇵",
    translations: {
      dashboard: "ダッシュボード",
      threatDetection: "脅威検出",
      quantumShield: "量子シールド",
      aiTraining: "AIトレーニング",
      community: "コミュニティ",
      settings: "設定",
      analytics: "分析",
      welcome: "トート・エメラルドへようこそ",
      systemStatus: "システム状態",
      allSystemsOperational: "全システム稼働中",
      activeThreats: "アクティブな脅威",
      protectedAssets: "保護された資産",
      threatIntelligence: "脅威インテリジェンス",
      quantumCoherence: "量子コヒーレンス",
      aiModelsActive: "アクティブなAIモデル",
      globalUsers: "グローバルユーザー",
      systemUptime: "システム稼働時間",
      dataProcessed: "処理されたデータ",
    },
  },
]

export function MultilingualProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("thoth-language")
    if (savedLanguage && languages.find((lang) => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage)
    }
  }, [])

  const translate = (key: string, fallback?: string): string => {
    const language = languages.find((lang) => lang.code === currentLanguage)
    if (!language) return fallback || key

    const keys = key.split(".")
    let value: any = language.translations

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        return fallback || key
      }
    }

    return typeof value === "string" ? value : fallback || key
  }

  const setLanguage = (code: string) => {
    setCurrentLanguage(code)
    localStorage.setItem("thoth-language", code)
  }

  return (
    <MultilingualContext.Provider
      value={{
        currentLanguage,
        languages,
        translate,
        setLanguage,
      }}
    >
      {children}
    </MultilingualContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(MultilingualContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a MultilingualProvider")
  }
  return context
}
