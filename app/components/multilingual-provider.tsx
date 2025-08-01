"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface MultilingualContextType {
  language: string
  setLanguage: (lang: string) => void
  translate: (key: string) => string
}

const MultilingualContext = createContext<MultilingualContextType | undefined>(undefined)

// Example translations (in a real app, this would be loaded dynamically)
const translations: { [key: string]: { [lang: string]: string } } = {
  welcome_message: {
    en: "Welcome to Thoth Guardian",
    es: "Bienvenido a Thoth Guardian",
    fr: "Bienvenue à Thoth Guardian",
    de: "Willkommen bei Thoth Guardian",
    zh: "欢迎来到图特守护者",
    ja: "トートガーディアンへようこそ",
    ko: "토트 가디언에 오신 것을 환영합니다",
    ar: "مرحبًا بك في حارس تحوت",
  },
  shield_status: {
    en: "Shield Status",
    es: "Estado del Escudo",
    fr: "Statut du Bouclier",
    de: "Schildstatus",
    zh: "护盾状态",
    ja: "シールドステータス",
    ko: "방패 상태",
    ar: "حالة الدرع",
  },
  active: {
    en: "ACTIVE",
    es: "ACTIVO",
    fr: "ACTIF",
    de: "AKTIV",
    zh: "活跃",
    ja: "アクティブ",
    ko: "활성",
    ar: "نشط",
  },
  threat_level: {
    en: "Threat Level",
    es: "Nivel de Amenaza",
    fr: "Niveau de Menace",
    de: "Bedrohungsstufe",
    zh: "威胁等级",
    ja: "脅威レベル",
    ko: "위협 수준",
    ar: "مستوى التهديد",
  },
  quantum_entanglement: {
    en: "Quantum Entanglement",
    es: "Entrelazamiento Cuántico",
    fr: "Intrication Quantique",
    de: "Quantenverschränkung",
    zh: "量子纠缠",
    ja: "量子もつれ",
    ko: "양자 얽힘",
    ar: "التشابك الكمي",
  },
  ai_training: {
    en: "AI Training",
    es: "Entrenamiento de IA",
    fr: "Entraînement IA",
    de: "KI-Training",
    zh: "AI训练",
    ja: "AIトレーニング",
    ko: "AI 훈련",
    ar: "تدريب الذكاء الاصطناعي",
  },
  threats_blocked: {
    en: "Threats Blocked",
    es: "Amenazas Bloqueadas",
    fr: "Menaces Bloquées",
    de: "Bedrohungen blockiert",
    zh: "已阻止的威胁",
    ja: "ブロックされた脅威",
    ko: "차단된 위협",
    ar: "التهديدات المحظورة",
  },
  self_repair: {
    en: "Divine Quantum Self-Repair",
    es: "Autorreparación Cuántica Divina",
    fr: "Auto-réparation Quantique Divine",
    de: "Göttliche Quanten-Selbstreparatur",
    zh: "神圣量子自修复",
    ja: "神聖量子自己修復",
    ko: "신성 양자 자가 복구",
    ar: "الإصلاح الذاتي الكمي الإلهي",
  },
  system_initialized: {
    en: "Thoth Guardian Cybersecurity Shield Initialized",
    es: "Escudo de Ciberseguridad Thoth Guardian Inicializado",
    fr: "Bouclier de Cybersécurité Thoth Guardian Initialisé",
    de: "Thoth Guardian Cybersicherheits-Schild initialisiert",
    zh: "图特守护者网络安全护盾已初始化",
    ja: "トートガーディアンサイバーセキュリティシールド初期化済み",
    ko: "토트 가디언 사이버 보안 방패 초기화됨",
    ar: "تم تهيئة درع الأمن السيبراني لحارس تحوت",
  },
  loading_message: {
    en: "Activating Quantum Error Correction, Blueprint Architecture & Epic Storytelling...",
    es: "Activando Corrección de Errores Cuánticos, Arquitectura de Planos y Narración Épica...",
    fr: "Activation de la Correction d'Erreurs Quantiques, de l'Architecture de Plan et de la Narration Épique...",
    de: "Quantenfehlerkorrektur, Blueprint-Architektur & Episches Storytelling werden aktiviert...",
    zh: "正在激活量子纠错、蓝图架构和史诗故事...",
    ja: "量子エラー訂正、ブループリントアーキテクチャ、壮大なストーリーテリングをアクティブ化中...",
    ko: "양자 오류 수정, 청사진 아키텍처 및 서사적 스토리텔링 활성화 중...",
    ar: "تنشيط تصحيح الأخطاء الكمية، وهندسة المخططات، وسرد القصص الملحمي...",
  },
}

export function MultilingualProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState("en") // Default language

  const translate = (key: string): string => {
    const translation = translations[key]
    if (translation && translation[language]) {
      return translation[language]
    }
    // Fallback to English or the key itself if translation not found
    return translation?.en || key
  }

  return (
    <MultilingualContext.Provider value={{ language, setLanguage, translate }}>{children}</MultilingualContext.Provider>
  )
}

export function useMultilingual() {
  const context = useContext(MultilingualContext)
  if (context === undefined) {
    throw new Error("useMultilingual must be used within a MultilingualProvider")
  }
  return context
}
