"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Infinity, Star, Globe, Atom, Zap, Heart, Eye, Brain, Compass, Clock, Moon, Sun } from "lucide-react"

interface UniversalLaw {
  id: string
  name: string
  description: string
  category: "hermetic" | "quantum" | "cosmic" | "spiritual" | "natural"
  coherence: number
  manifestation: number
  url: string
  icon: any
  color: string
}

interface CosmicAlignment {
  phase: string
  energy: number
  influence: string
  nextShift: string
  harmonics: number[]
}

export default function UniversalLawsPortal() {
  const [laws] = useState<UniversalLaw[]>([
    {
      id: "1",
      name: "Law of Mentalism",
      description: "The All is Mind; the Universe is Mental",
      category: "hermetic",
      coherence: 97.8,
      manifestation: 89.4,
      url: "https://en.wikipedia.org/wiki/Hermeticism",
      icon: Brain,
      color: "text-purple-400",
    },
    {
      id: "2",
      name: "Law of Correspondence",
      description: "As above, so below; as below, so above",
      category: "hermetic",
      coherence: 94.2,
      manifestation: 92.1,
      url: "https://en.wikipedia.org/wiki/As_above,_so_below",
      icon: Infinity,
      color: "text-cyan-400",
    },
    {
      id: "3",
      name: "Law of Vibration",
      description: "Nothing rests; everything moves; everything vibrates",
      category: "hermetic",
      coherence: 98.7,
      manifestation: 95.3,
      url: "https://en.wikipedia.org/wiki/Vibration",
      icon: Zap,
      color: "text-yellow-400",
    },
    {
      id: "4",
      name: "Law of Polarity",
      description: "Everything is dual; everything has poles",
      category: "hermetic",
      coherence: 91.5,
      manifestation: 87.9,
      url: "https://en.wikipedia.org/wiki/Polarity_(physics)",
      icon: Compass,
      color: "text-emerald-400",
    },
    {
      id: "5",
      name: "Law of Rhythm",
      description: "Everything flows, out and in; everything has its tides",
      category: "hermetic",
      coherence: 93.8,
      manifestation: 90.2,
      url: "https://en.wikipedia.org/wiki/Rhythm",
      icon: Clock,
      color: "text-blue-400",
    },
    {
      id: "6",
      name: "Law of Cause and Effect",
      description: "Every cause has its effect; every effect has its cause",
      category: "hermetic",
      coherence: 99.1,
      manifestation: 96.7,
      url: "https://en.wikipedia.org/wiki/Causality",
      icon: Star,
      color: "text-pink-400",
    },
    {
      id: "7",
      name: "Law of Gender",
      description: "Gender is in everything; everything has its masculine and feminine principles",
      category: "hermetic",
      coherence: 88.9,
      manifestation: 85.4,
      url: "https://en.wikipedia.org/wiki/Gender",
      icon: Heart,
      color: "text-rose-400",
    },
    {
      id: "8",
      name: "Law of Conservation of Energy",
      description: "Energy cannot be created or destroyed, only transformed",
      category: "natural",
      coherence: 99.9,
      manifestation: 98.8,
      url: "https://en.wikipedia.org/wiki/Conservation_of_energy",
      icon: Atom,
      color: "text-orange-400",
    },
    {
      id: "9",
      name: "Law of Attraction",
      description: "Like attracts like; thoughts become things",
      category: "spiritual",
      coherence: 87.3,
      manifestation: 82.6,
      url: "https://en.wikipedia.org/wiki/Law_of_attraction_(New_Thought)",
      icon: Globe,
      color: "text-green-400",
    },
    {
      id: "10",
      name: "Law of Divine Timing",
      description: "Everything happens at the perfect time in divine order",
      category: "spiritual",
      coherence: 92.7,
      manifestation: 88.9,
      url: "https://en.wikipedia.org/wiki/Divine_timing",
      icon: Sun,
      color: "text-amber-400",
    },
  ])

  const [cosmicAlignment, setCosmicAlignment] = useState<CosmicAlignment>({
    phase: "Ascending",
    energy: 89.3,
    influence: "Manifestation Enhanced",
    nextShift: "2h 34m",
    harmonics: [7.83, 14.3, 20.8, 27.3, 33.8],
  })

  const [divineTimingMetrics, setDivineTimingMetrics] = useState({
    synchronicityIndex: 94.7,
    manifestationWindow: 87.2,
    cosmicResonance: 91.8,
    temporalAlignment: 89.5,
  })

  useEffect(() => {
    // Simulate real-time cosmic updates
    const interval = setInterval(() => {
      setCosmicAlignment((prev) => ({
        ...prev,
        energy: Math.max(70, Math.min(100, prev.energy + (Math.random() - 0.5) * 3)),
        harmonics: prev.harmonics.map((h) => h + (Math.random() - 0.5) * 0.2),
      }))

      setDivineTimingMetrics((prev) => ({
        synchronicityIndex: Math.max(80, Math.min(100, prev.synchronicityIndex + (Math.random() - 0.5) * 2)),
        manifestationWindow: Math.max(70, Math.min(100, prev.manifestationWindow + (Math.random() - 0.5) * 3)),
        cosmicResonance: Math.max(85, Math.min(100, prev.cosmicResonance + (Math.random() - 0.5) * 2)),
        temporalAlignment: Math.max(80, Math.min(100, prev.temporalAlignment + (Math.random() - 0.5) * 2.5)),
      }))
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "hermetic":
        return "border-purple-500/30 bg-purple-500/10"
      case "quantum":
        return "border-cyan-500/30 bg-cyan-500/10"
      case "cosmic":
        return "border-blue-500/30 bg-blue-500/10"
      case "spiritual":
        return "border-emerald-500/30 bg-emerald-500/10"
      case "natural":
        return "border-orange-500/30 bg-orange-500/10"
      default:
        return "border-gray-500/30 bg-gray-500/10"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Infinity className="h-12 w-12 text-indigo-400 mr-4" />
            </motion.div>
            <h1 className="text-4xl font-bold gradient-text">Universal Laws Portal</h1>
          </div>
          <p className="text-xl text-gray-300">
            Explore the fundamental principles governing reality and consciousness
          </p>
        </motion.div>

        {/* Divine Timing Alignment */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-8">
          <Card className="bg-slate-800/50 border-amber-500/30 glass-morphism">
            <CardHeader>
              <CardTitle className="text-amber-400 flex items-center justify-center">
                <Sun className="h-6 w-6 mr-2" />
                Divine Timing Alignment
                <Moon className="h-6 w-6 ml-2" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className="w-20 h-20 mx-auto mb-4 relative"
                  >
                    <div className="absolute inset-0 border-4 border-amber-400/30 rounded-full"></div>
                    <div className="absolute inset-2 border-2 border-amber-400/50 rounded-full"></div>
                    <div className="absolute inset-4 border border-amber-400 rounded-full flex items-center justify-center">
                      <Sun className="h-6 w-6 text-amber-400" />
                    </div>
                  </motion.div>
                  <p className="text-amber-400 font-bold text-lg">{cosmicAlignment.energy.toFixed(1)}%</p>
                  <p className="text-xs text-gray-400">Cosmic Energy</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Synchronicity Index</span>
                    <span className="text-purple-400">{divineTimingMetrics.synchronicityIndex.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <motion.div
                      className="bg-purple-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${divineTimingMetrics.synchronicityIndex}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Manifestation Window</span>
                    <span className="text-emerald-400">{divineTimingMetrics.manifestationWindow.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <motion.div
                      className="bg-emerald-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${divineTimingMetrics.manifestationWindow}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Temporal Alignment</span>
                    <span className="text-cyan-400">{divineTimingMetrics.temporalAlignment.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <motion.div
                      className="bg-cyan-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${divineTimingMetrics.temporalAlignment}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-lg text-amber-400 font-semibold mb-2">{cosmicAlignment.influence}</p>
                <p className="text-sm text-gray-400">
                  Phase: {cosmicAlignment.phase} • Next Shift: {cosmicAlignment.nextShift}
                </p>
                <div className="flex justify-center space-x-4 mt-4">
                  <Badge className="bg-amber-500/20 text-amber-400">Optimal Manifestation Window</Badge>
                  <Badge className="bg-purple-500/20 text-purple-400">High Synchronicity</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Universal Laws Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {laws.map((law, index) => (
            <motion.div
              key={law.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="transition-smooth"
            >
              <Card
                className={`bg-slate-800/50 border-slate-700 glass-morphism h-full hover:${getCategoryColor(law.category).split(" ")[0]} transition-smooth`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <law.icon className={`h-8 w-8 ${law.color}`} />
                    <Badge className={`${getCategoryColor(law.category)} capitalize`}>{law.category}</Badge>
                  </div>
                  <CardTitle className="text-white text-lg">{law.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm mb-4 italic">"{law.description}"</p>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Coherence</span>
                        <span className={law.color}>{law.coherence.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${law.color.replace("text-", "bg-").replace("-400", "-500")}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${law.coherence}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">Manifestation</span>
                        <span className={law.color}>{law.manifestation.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${law.color.replace("text-", "bg-").replace("-400", "-500")}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${law.manifestation}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className={`w-full mt-4 border-slate-600 text-gray-300 hover:${getCategoryColor(law.category)} transition-smooth`}
                    onClick={() => window.open(law.url, "_blank")}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Harmonic Frequencies */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8"
        >
          <Card className="bg-slate-800/50 border-cyan-500/30 glass-morphism">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center justify-center">
                <Zap className="h-6 w-6 mr-2" />
                Cosmic Harmonic Frequencies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {cosmicAlignment.harmonics.map((frequency, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="text-center p-4 bg-slate-900/50 rounded-lg border border-cyan-500/20"
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2 + index * 0.3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      className="w-8 h-8 mx-auto mb-2 bg-cyan-400/20 rounded-full flex items-center justify-center"
                    >
                      <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                    </motion.div>
                    <p className="text-cyan-400 font-bold">{frequency.toFixed(2)} Hz</p>
                    <p className="text-xs text-gray-400">
                      {index === 0
                        ? "Schumann"
                        : index === 1
                          ? "Alpha"
                          : index === 2
                            ? "Beta"
                            : index === 3
                              ? "Gamma"
                              : "Theta"}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-400 mb-2">
                  Current resonance with Earth's natural frequencies and cosmic harmonics
                </p>
                <div className="flex justify-center space-x-4">
                  <Badge className="bg-cyan-500/20 text-cyan-400">Harmonic Convergence Active</Badge>
                  <Badge className="bg-purple-500/20 text-purple-400">Dimensional Alignment: 94.7%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
