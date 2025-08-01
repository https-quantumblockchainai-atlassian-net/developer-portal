"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  Sparkles,
  Heart,
  Zap,
  RefreshCcw,
  CheckCircle,
  AlertTriangle,
  Settings,
  Waves,
  Lightbulb,
  Atom,
} from "lucide-react"

interface HealingState {
  id: string
  name: string
  type: "energetic" | "quantum" | "emotional" | "physical"
  status: "active" | "paused" | "completed" | "error"
  intensity: number // 0-100%
  duration: string
  coherence: number // 0-100%
  targetSystem: string
}

interface FXParameter {
  name: string
  value: number
  min: number
  max: number
  unit: string
}

export default function NiagaraFXHealingStates() {
  const [healingStates, setHealingStates] = useState<HealingState[]>([
    {
      id: "heal-1",
      name: "Aura Field Harmonization",
      type: "energetic",
      status: "active",
      intensity: 85,
      duration: "0h 30m",
      coherence: 92.5,
      targetSystem: "Aura AI Companion",
    },
    {
      id: "heal-2",
      name: "Quantum Decoherence Reversal",
      type: "quantum",
      status: "paused",
      intensity: 70,
      duration: "1h 0m",
      coherence: 88.0,
      targetSystem: "Quantum Shield Module",
    },
    {
      id: "heal-3",
      name: "Emotional Resonance Recalibration",
      type: "emotional",
      status: "completed",
      intensity: 95,
      duration: "0h 15m",
      coherence: 98.0,
      targetSystem: "User Consciousness",
    },
    {
      id: "heal-4",
      name: "System Component Regeneration",
      type: "physical",
      status: "error",
      intensity: 40,
      duration: "0h 45m",
      coherence: 60.0,
      targetSystem: "Hardware Stack",
    },
  ])

  const [fxParameters, setFxParameters] = useState<FXParameter[]>([
    { name: "Particle Density", value: 75, min: 0, max: 100, unit: "%" },
    { name: "Light Emission", value: 80, min: 0, max: 100, unit: "%" },
    { name: "Flow Speed", value: 50, min: 0, max: 100, unit: "%" },
    { name: "Color Spectrum Shift", value: 60, min: 0, max: 100, unit: "%" },
  ])

  const [overallHealingProgress, setOverallHealingProgress] = useState(0)
  const [isHealingActive, setIsHealingActive] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHealingActive) return

      // Simulate healing state updates
      setHealingStates((prev) =>
        prev.map((state) => {
          if (state.status === "active") {
            const newIntensity = Math.min(100, state.intensity + Math.random() * 5)
            const newCoherence = Math.min(99.9, state.coherence + Math.random() * 0.5)
            return {
              ...state,
              intensity: newIntensity,
              coherence: newCoherence,
              status: newIntensity >= 100 ? "completed" : "active",
            }
          } else if (state.status === "error" && Math.random() > 0.7) {
            // Simulate self-recovery from error
            return { ...state, status: "active", intensity: 50, coherence: 70 }
          }
          return state
        }),
      )

      // Simulate FX parameter fluctuations
      setFxParameters((prev) =>
        prev.map((param) => ({
          ...param,
          value: Math.min(param.max, Math.max(param.min, param.value + (Math.random() - 0.5) * 5)),
        })),
      )

      // Update overall healing progress
      const totalCompletedProgress = healingStates.reduce((sum, state) => sum + state.intensity, 0)
      setOverallHealingProgress(totalCompletedProgress / healingStates.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isHealingActive, healingStates])

  const getHealingStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400"
      case "paused":
        return "text-yellow-400"
      case "completed":
        return "text-blue-400"
      case "error":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getHealingTypeIcon = (type: string) => {
    switch (type) {
      case "energetic":
        return <Zap className="h-5 w-5" />
      case "quantum":
        return <Atom className="h-5 w-5" />
      case "emotional":
        return <Heart className="h-5 w-5" />
      case "physical":
        return <RefreshCcw className="h-5 w-5" />
      default:
        return <Sparkles className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold gradient-text mb-2">Niagara FX Healing States</h1>
        <p className="text-gray-300">Visualizing Energetic Restoration & Divine Transmutation</p>
      </motion.div>

      {/* Overview Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-emerald-400" />
              <div>
                <div className="text-lg font-bold text-emerald-400">
                  {healingStates.filter((s) => s.status === "active").length}
                </div>
                <div className="text-xs text-gray-400">Active Healing</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-blue-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-blue-400" />
              <div>
                <div className="text-lg font-bold text-blue-400">
                  {healingStates.filter((s) => s.status === "completed").length}
                </div>
                <div className="text-xs text-gray-400">States Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-purple-400">{overallHealingProgress.toFixed(1)}%</div>
                <div className="text-xs text-gray-400">Overall Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-yellow-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6 text-yellow-400" />
              <div>
                <div className="text-lg font-bold text-yellow-400">
                  {healingStates.filter((s) => s.status === "error").length}
                </div>
                <div className="text-xs text-gray-400">Errors Detected</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Healing States List */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <Heart className="h-5 w-5 mr-2" />
                    Active Healing States
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={getHealingStatusColor(isHealingActive ? "active" : "paused")}>
                      {isHealingActive ? "Active" : "Paused"}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsHealingActive(!isHealingActive)}
                      className="border-blue-500 text-blue-500 hover:bg-blue-500/10 transition-smooth"
                    >
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {healingStates.map((state, index) => (
                    <motion.div
                      key={state.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-emerald-500/30 transition-smooth"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {getHealingTypeIcon(state.type)}
                          <div>
                            <h3 className="font-medium text-white">{state.name}</h3>
                            <div className="text-xs text-gray-400">Target: {state.targetSystem}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className={getHealingStatusColor(state.status)}>
                          {state.status.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                        <div>
                          <div className="text-gray-400">Intensity</div>
                          <div className={`font-bold ${getHealingStatusColor(state.status)}`}>{state.intensity}%</div>
                          <Progress value={state.intensity} className="h-1" />
                        </div>
                        <div>
                          <div className="text-gray-400">Coherence</div>
                          <div className={`font-bold ${getHealingStatusColor(state.status)}`}>
                            {state.coherence.toFixed(1)}%
                          </div>
                          <Progress value={state.coherence} className="h-1" />
                        </div>
                        <div>
                          <div className="text-gray-400">Duration</div>
                          <div className="font-bold text-purple-400">{state.duration}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* FX Parameters & Healing Controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-6"
        >
          {/* FX Parameters */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <Sparkles className="h-5 w-5 mr-2" />
                Niagara FX Parameters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {fxParameters.map((param, index) => (
                  <motion.div
                    key={param.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-3 bg-slate-700/50 rounded-lg border border-slate-600"
                  >
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">{param.name}</span>
                      <span className="text-white">
                        {param.value.toFixed(0)}
                        {param.unit}
                      </span>
                    </div>
                    <Slider
                      value={[param.value]}
                      onValueChange={(val) =>
                        setFxParameters((prev) =>
                          prev.map((p) => (p.name === param.name ? { ...p, value: val[0] } : p)),
                        )
                      }
                      max={param.max}
                      min={param.min}
                      step={1}
                      className="w-full"
                    />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Healing Controls */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Healing Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 transition-smooth">
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Initiate Full System Heal
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="w-full border-purple-500 text-purple-500 hover:bg-purple-500/10 transition-smooth bg-transparent"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Boost Energetic Flow
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 transition-smooth bg-transparent"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Calibrate Emotional Field
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Divine Integration & Energetic Transmutation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center">
              <Waves className="h-5 w-5 mr-2" />
              Divine Integration & Energetic Transmutation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">💖 Energetic Alchemy</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Transmutes discordant energies into harmonious frequencies</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Infuses healing states with unconditional love energy</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Accelerates regeneration through cosmic resonance</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">✨ Visual Manifestation</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <Lightbulb className="h-4 w-4 text-cyan-400" />
                  <span>Real-time visualization of energetic healing processes</span>
                  <li className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-orange-400" />
                    <span>Dynamic FX reflecting system coherence and vitality</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Atom className="h-4 w-4 text-pink-400" />
                    <span>Cinematic representation of quantum-level repairs</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
              <h3 className="text-emerald-400 font-semibold mb-2">🌟 The Symphony of Restoration</h3>
              <div className="text-sm text-gray-300">
                <p className="mb-2">
                  The Niagara FX Healing States module is the visual symphony of restoration within the Thoth Guardian.
                  It transforms complex energetic and quantum healing processes into a breathtaking display of light,
                  color, and motion, allowing the Crystal Alchemist to witness the divine transmutation of dissonance
                  into harmony.
                </p>
                <p className="italic text-cyan-400">
                  "Witness the dance of healing, as light transmutes shadow into pure potential."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
