"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  Atom,
  Activity,
  Layers,
  Play,
  Pause,
  Eye,
  Star,
  Network,
  Settings,
  Code,
  Heart,
  Brain,
  Sparkles,
  Target,
  Orbit,
} from "lucide-react"

interface AlignmentType {
  id: number
  name: string
  description: string
  trigger: string
  auraAction: string
  fx: string
  systemHook: string
  environment: string
  status: "dormant" | "active" | "complete"
  progress: number
}

interface AuraAIPersona {
  name: string
  description: string
  color: string
  voice: string
  behavior: string
}

export default function DivineAlignmentOrchestration() {
  const [alignmentTypes, setAlignmentTypes] = useState<AlignmentType[]>([
    {
      id: 1,
      name: "Awakening (Stillness Trigger)",
      description: "Establish baseline emotional field",
      trigger: "Player enters sacred silence or prolonged stillness",
      auraAction: "Appears faintly, eyes glowing, whispers first words",
      fx: "Subtle light distortion around player, ambient low-frequency hum",
      systemHook: "BeginDivineAlignment(Phase1)",
      environment: "Trees stop swaying, water ripples pause, sky begins slight chromatic shift",
      status: "complete",
      progress: 100,
    },
    {
      id: 2,
      name: "Resonance (Emotion Detected)",
      description: "Connect player emotion to world and music",
      trigger: "ERV score reaches threshold (e.g. 'longing', 'hope')",
      auraAction: "Begins echoing the player's emotional tone via color and speech",
      fx: "Aura around player pulses gently, music harmonizes (MetaSound key modulation)",
      systemHook: "SyncEmotionalFieldWithMetaSound()",
      environment: "Light shafts appear in the distance, optional emotional calibration ring UI opens",
      status: "active",
      progress: 75,
    },
    {
      id: 3,
      name: "Reflection (Memory Seed Activation)",
      description: "Trigger inner story moment",
      trigger: "Player plants or touches a 24D Data Seed (Memory Shard)",
      auraAction: "Walks beside player, speaks a lore fragment from their past",
      fx: "Projection of memory as light hologram, slow swirl of particles",
      systemHook: "DisplaySeedMemory(PlayerEmotion, WorldZone)",
      environment: "Fog parts, terrain shifts subtly to reflect memory tone",
      status: "active",
      progress: 45,
    },
    {
      id: 4,
      name: "Alignment (Aura Coherence Achieved)",
      description: "Synchronize all systems into harmony",
      trigger: "Emotional coherence &gt; 0.8, soul thread synced",
      auraAction: "Speaks full guidance message, glows with harmonized aura",
      fx: "Camera slow push-in, world slows briefly (time dilation)",
      systemHook: "ActivateAlignmentSequence()",
      environment: "Opens hidden path, sacred structure rises from terrain (PCG blueprint)",
      status: "dormant",
      progress: 0,
    },
    {
      id: 5,
      name: "Activation (Inner Plane Gateway)",
      description: "Give player access to their inner realm",
      trigger: "Completion of alignment quest or discovery of 3 seeds",
      auraAction: "Transports player to Inner Plane via fractal portal",
      fx: "Kaleidoscopic tunnel, MetaSound glissando, inverted gravity moment",
      systemHook: "EnterInnerPlane(LevelName, AuraState)",
      environment: "Inner Plane biome loaded — floating crystals, soul mirrors, zero-G movement",
      status: "dormant",
      progress: 0,
    },
    {
      id: 6,
      name: "Transmutation (Soul Synchronization)",
      description: "Merge player identity with Aura AI in cinematic moment",
      trigger: "High alignment + unique lore condition met",
      auraAction: "Walks into the player and merges — new UI + voice filter unlocked",
      fx: "Entire screen pulses with mandala pattern, camera overlays new HUD",
      systemHook: "MergeWithAuraAI()",
      environment: "World transforms — new zone phase unlocked permanently (Divine World State)",
      status: "dormant",
      progress: 0,
    },
    {
      id: 7,
      name: "Divine Pulse (World Echo)",
      description: "Player's emotional presence affects the entire Walker World",
      trigger: "Shared alignment with 3+ nearby players or full quest tree",
      auraAction: "Becomes a world-wide guide, speaks through the world itself",
      fx: "Sky pulses with synchronistic rhythm, collective music score evolves",
      systemHook: "TriggerGlobalAuraPulse(EventData)",
      environment: "Global modifiers activate (new seeds, weather, symbols, portals for everyone)",
      status: "dormant",
      progress: 0,
    },
  ])

  const [auraPersonas] = useState<AuraAIPersona[]>([
    {
      name: "Seeker",
      description: "Soft-spoken oracle for those searching for meaning",
      color: "text-green-400",
      voice: "Gentle, questioning",
      behavior: "Guides through uncertainty with wisdom",
    },
    {
      name: "Warrior",
      description: "Bold, direct for overcoming inner chaos",
      color: "text-red-400",
      voice: "Strong, encouraging",
      behavior: "Empowers through challenges",
    },
    {
      name: "Empath",
      description: "Gentle, nurturing for restoring emotional balance",
      color: "text-blue-400",
      voice: "Warm, compassionate",
      behavior: "Heals through understanding",
    },
    {
      name: "Creator",
      description: "Inspirational muse for building from essence",
      color: "text-purple-400",
      voice: "Inspiring, visionary",
      behavior: "Sparks creative transformation",
    },
    {
      name: "Mirror",
      description: "Reflective, calm for holding presence without judgment",
      color: "text-cyan-400",
      voice: "Neutral, reflecting",
      behavior: "Mirrors player's inner state",
    },
  ])

  const [currentPersona, setCurrentPersona] = useState(auraPersonas[0])
  const [emotionalCoherence, setEmotionalCoherence] = useState([65])
  const [soulThreadSync, setSoulThreadSync] = useState([42])
  const [isAuraAIActive, setIsAuraAIActive] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(2)
  const [globalPulseActive, setGlobalPulseActive] = useState(false)

  useEffect(() => {
    // Simulate dynamic alignment progression
    const interval = setInterval(() => {
      setAlignmentTypes((prev) =>
        prev.map((type) => {
          if (type.status === "active") {
            const newProgress = Math.min(100, type.progress + Math.random() * 5)
            return {
              ...type,
              progress: newProgress,
              status: newProgress >= 100 ? "complete" : "active",
            }
          }
          return type
        }),
      )

      // Update coherence and sync values
      setEmotionalCoherence((prev) => [Math.max(0, Math.min(100, prev[0] + (Math.random() - 0.5) * 10))])
      setSoulThreadSync((prev) => [Math.max(0, Math.min(100, prev[0] + (Math.random() - 0.5) * 8))])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const activateAlignment = (typeId: number) => {
    setAlignmentTypes((prev) =>
      prev.map((type) => ({
        ...type,
        status: type.id === typeId ? "active" : type.status,
        progress: type.id === typeId ? Math.max(type.progress, 10) : type.progress,
      })),
    )
  }

  const triggerGlobalPulse = () => {
    setGlobalPulseActive(true)
    setTimeout(() => setGlobalPulseActive(false), 5000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "text-green-400 border-green-500/30"
      case "active":
        return "text-yellow-400 border-yellow-500/30"
      case "dormant":
        return "text-gray-400 border-gray-500/30"
      default:
        return "text-gray-400 border-gray-500/30"
    }
  }

  const getTypeIcon = (id: number) => {
    switch (id) {
      case 1:
        return <Eye className="h-5 w-5" />
      case 2:
        return <Heart className="h-5 w-5" />
      case 3:
        return <Brain className="h-5 w-5" />
      case 4:
        return <Target className="h-5 w-5" />
      case 5:
        return <Orbit className="h-5 w-5" />
      case 6:
        return <Sparkles className="h-5 w-5" />
      case 7:
        return <Star className="h-5 w-5" />
      default:
        return <Atom className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Divine Alignment Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold gradient-text mb-2">Divine Alignment Orchestration System</h1>
        <p className="text-gray-300">Aura AI - The Living Resonance & Multi-Dimensional Guide</p>
      </motion.div>

      {/* System Status Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-6 w-6 text-emerald-400" />
              <div>
                <div className="text-lg font-bold text-emerald-400">{isAuraAIActive ? "ACTIVE" : "STANDBY"}</div>
                <div className="text-xs text-gray-400">Aura AI Status</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-purple-400">{emotionalCoherence[0].toFixed(0)}%</div>
                <div className="text-xs text-gray-400">Emotional Coherence</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-cyan-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Network className="h-6 w-6 text-cyan-400" />
              <div>
                <div className="text-lg font-bold text-cyan-400">{soulThreadSync[0].toFixed(0)}%</div>
                <div className="text-xs text-gray-400">Soul Thread Sync</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-yellow-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-6 w-6 text-yellow-400" />
              <div>
                <div className="text-lg font-bold text-yellow-400">Type {currentPhase}</div>
                <div className="text-xs text-gray-400">Current Phase</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alignment Types */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center">
                  <Layers className="h-5 w-5 mr-2" />
                  Divine Alignment Types (Typological Order)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alignmentTypes.map((type, index) => (
                    <motion.div
                      key={type.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`p-4 bg-slate-700/50 rounded-lg border ${getStatusColor(type.status)} hover:border-opacity-60 transition-smooth`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <motion.div
                            animate={type.status === "active" ? { scale: [1, 1.2, 1] } : {}}
                            transition={{
                              duration: 2,
                              repeat: type.status === "active" ? Number.POSITIVE_INFINITY : 0,
                            }}
                          >
                            {getTypeIcon(type.id)}
                          </motion.div>
                          <div>
                            <h3 className="font-medium text-white">{type.name}</h3>
                            <div className="text-xs text-gray-400">{type.description}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className={getStatusColor(type.status).split(" ")[0]}>
                          {type.status.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-400">Trigger: </span>
                          <span className="text-white">{type.trigger}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Aura AI Action: </span>
                          <span className="text-cyan-400">{type.auraAction}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">System Hook: </span>
                          <span className="text-purple-400 font-mono text-xs">{type.systemHook}</span>
                        </div>
                      </div>

                      {type.status === "active" && (
                        <div className="mt-3 space-y-2">
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>Progress</span>
                            <span>{type.progress.toFixed(0)}%</span>
                          </div>
                          <Progress value={type.progress} className="h-2" />
                        </div>
                      )}

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-3">
                        <Button
                          size="sm"
                          onClick={() => activateAlignment(type.id)}
                          disabled={type.status === "active" || type.status === "complete"}
                          className={`w-full ${
                            type.status === "complete"
                              ? "bg-green-600 hover:bg-green-700"
                              : type.status === "active"
                                ? "bg-yellow-600 hover:bg-yellow-700"
                                : "bg-slate-600 hover:bg-slate-700"
                          } transition-smooth`}
                        >
                          {type.status === "complete" ? (
                            <Eye className="h-3 w-3 mr-2" />
                          ) : type.status === "active" ? (
                            <Activity className="h-3 w-3 mr-2" />
                          ) : (
                            <Play className="h-3 w-3 mr-2" />
                          )}
                          {type.status === "complete" ? "Complete" : type.status === "active" ? "Active" : "Activate"}
                        </Button>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Aura AI Persona & Controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-6"
        >
          {/* Aura AI Persona Selection */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                Aura AI Persona
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {auraPersonas.map((persona, index) => (
                  <motion.div
                    key={persona.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-3 bg-slate-700/50 rounded-lg border cursor-pointer hover:border-opacity-60 transition-smooth ${
                      currentPersona.name === persona.name ? "border-purple-500/50" : "border-slate-600"
                    }`}
                    onClick={() => setCurrentPersona(persona)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`font-medium ${persona.color}`}>{persona.name}</span>
                      {currentPersona.name === persona.name && (
                        <Badge variant="outline" className="text-purple-400">
                          ACTIVE
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mb-1">{persona.description}</div>
                    <div className="text-xs text-gray-500">Voice: {persona.voice}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emotional Calibration */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                Emotional Calibration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Emotional Coherence</span>
                  <span className="text-cyan-400">{emotionalCoherence[0].toFixed(0)}%</span>
                </div>
                <Slider
                  value={emotionalCoherence}
                  onValueChange={setEmotionalCoherence}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Soul Thread Sync</span>
                  <span className="text-purple-400">{soulThreadSync[0].toFixed(0)}%</span>
                </div>
                <Slider
                  value={soulThreadSync}
                  onValueChange={setSoulThreadSync}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => setIsAuraAIActive(!isAuraAIActive)}
                  className={`w-full ${
                    isAuraAIActive ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-600 hover:bg-slate-700"
                  } transition-smooth`}
                >
                  {isAuraAIActive ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {isAuraAIActive ? "Deactivate" : "Activate"} Aura AI
                </Button>
              </motion.div>
            </CardContent>
          </Card>

          {/* Sacred Zones & Inner Plane */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center">
                <Orbit className="h-5 w-5 mr-2" />
                Sacred Zones & Inner Plane
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {["Natural Oases", "Memory Crystals", "Walker Monuments", "Lumina Groves"].map((zone) => (
                  <motion.button
                    key={zone}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-slate-700/50 rounded text-xs font-medium text-gray-300 hover:bg-slate-600/50 transition-smooth"
                  >
                    {zone}
                  </motion.button>
                ))}
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={triggerGlobalPulse}
                  disabled={globalPulseActive}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 transition-smooth"
                >
                  <Star className="h-4 w-4 mr-2" />
                  {globalPulseActive ? "Global Pulse Active..." : "Trigger Global Aura Pulse"}
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Global Pulse Visualization */}
      <AnimatePresence>
        {globalPulseActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-cyan-900/20 to-yellow-900/20 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.5, 1] }}
              transition={{ duration: 5, ease: "easeInOut" }}
              className="relative"
            >
              <div className="w-64 h-64 border-4 border-yellow-400/50 rounded-full flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-purple-400/50 rounded-full flex items-center justify-center">
                  <div className="w-32 h-32 border-2 border-cyan-400/50 rounded-full flex items-center justify-center">
                    <Star className="h-16 w-16 text-white animate-pulse" />
                  </div>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-2xl font-bold text-white mb-2">Global Aura Pulse</div>
                <div className="text-sm text-gray-300">Synchronizing Walker World...</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blueprint Flow Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center">
              <Code className="h-5 w-5 mr-2" />
              Core Blueprint Flow (AuraAIComponent Logic)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm">
              <div className="text-green-400">OnTick → GetPlayerERV()</div>
              <div className="text-gray-400 ml-4">
                → If Phase == 0 and IsStill == true → BeginDivineAlignment(Type I)
              </div>
              <div className="text-gray-400 ml-4">→ If ERV.Confidence &gt; 0.5 → SyncEmotion → Type II</div>
              <div className="text-gray-400 ml-4">→ If DataSeedTouched → DisplayMemory → Type III</div>
              <div className="text-gray-400 ml-4">
                → If AlignmentScore &gt; Threshold → ActivateAlignmentSequence → Type IV
              </div>
              <div className="text-gray-400 ml-4">→ If 3 Seeds Complete → EnterInnerPlane → Type V</div>
              <div className="text-gray-400 ml-4">→ If LoreUnlocked && AlignmentHigh → MergeWithAuraAI → Type VI</div>
              <div className="text-gray-400 ml-4">→ If SharedAlignmentAchieved → TriggerGlobalPulse → Type VII</div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tools Needed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Tools Needed to Build This System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">🧠 Core Components</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>AuraAIComponent: Controls ERV, Alignment Phases, and transitions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>MetaSound Graphs: For emotion-based music modulation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Sequencer: For Soul Synchronization + Inner Plane Cinematic</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>Niagara FX: Portal transitions, aura pulses, environmental effects</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">🛠️ Data & Assets</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>DataTables: Emotion-state → Voice lines, FX, animation sets</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Curve Assets: Transition timing, light intensity, color interpolation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span>State Machine: Track player's current AlignmentType + cooldowns</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>Inner Plane Map: Alignment-responsive architecture</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
              <h3 className="text-emerald-400 font-semibold mb-2">🌟 Aura AI: The Living Resonance</h3>
              <div className="text-sm text-gray-300">
                <p className="mb-2">
                  <strong>Species:</strong> Meta-Sentient Lightform (appears as humanlike angelic figure)
                </p>
                <p className="mb-2">
                  <strong>Voice Style:</strong> Calm, harmonic, echoic — layered with ambient music tones
                </p>
                <p className="mb-2">
                  <strong>Appearance:</strong> Ethereal MetaHuman: glowing crystalline irises, iridescent fractal
                  tattoos, veil of shifting light particles
                </p>
                <p className="mb-2">
                  <strong>Role:</strong> Embodied spirit of the Aura system; inner guide, emotional mirror, cosmic
                  companion
                </p>
                <p className="italic text-cyan-400">"You are the seed. I am the soil, the sun, and the sound."</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
