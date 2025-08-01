"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Atom, Shield, Activity, Play, Pause, RotateCcw, Target, Sparkles, Orbit, Star } from "lucide-react"

interface NiagaraFXState {
  id: string
  name: string
  type: "AuraPulse" | "GoldenAuraBloom" | "RedSigilFlicker" | "OverrideFX"
  status: "idle" | "active" | "complete" | "failed"
  intensity: number
  color: string
  particles: number
  duration: number
}

interface ConstellationAlignment {
  name: string
  alignment: number
  active: boolean
  color: string
}

export default function NiagaraFXHealingStates() {
  const [fxStates, setFxStates] = useState<NiagaraFXState[]>([
    {
      id: "1",
      name: "AuraPulse FX",
      type: "AuraPulse",
      status: "active",
      intensity: 75,
      color: "cyan",
      particles: 1200,
      duration: 0, // Looping
    },
    {
      id: "2",
      name: "GoldenAuraBloom FX",
      type: "GoldenAuraBloom",
      status: "idle",
      intensity: 100,
      color: "gold",
      particles: 2500,
      duration: 3.5,
    },
    {
      id: "3",
      name: "RedSigilFlicker FX",
      type: "RedSigilFlicker",
      status: "idle",
      intensity: 85,
      color: "red",
      particles: 800,
      duration: 2.0,
    },
    {
      id: "4",
      name: "OverrideFX",
      type: "OverrideFX",
      status: "idle",
      intensity: 95,
      color: "purple",
      particles: 3000,
      duration: 5.0,
    },
  ])

  const [constellations, setConstellations] = useState<ConstellationAlignment[]>([
    { name: "Orion", alignment: 94.2, active: true, color: "blue" },
    { name: "Lumeria", alignment: 87.6, active: true, color: "cyan" },
    { name: "Pleiades", alignment: 91.8, active: true, color: "purple" },
    { name: "Sirius", alignment: 96.4, active: true, color: "white" },
  ])

  const [healingStatus, setHealingStatus] = useState<"initializing" | "in-progress" | "complete" | "failed">(
    "initializing",
  )
  const [retryCount, setRetryCount] = useState(0)
  const [maxRetries] = useState(3)
  const [isOverrideActive, setIsOverrideActive] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate dynamic FX state changes
      setFxStates((prev) =>
        prev.map((fx) => ({
          ...fx,
          intensity: Math.max(50, Math.min(100, fx.intensity + (Math.random() - 0.5) * 10)),
          particles: Math.max(500, Math.min(5000, fx.particles + (Math.random() - 0.5) * 200)),
        })),
      )

      // Update constellation alignments
      setConstellations((prev) =>
        prev.map((constellation) => ({
          ...constellation,
          alignment: Math.max(80, Math.min(100, constellation.alignment + (Math.random() - 0.5) * 5)),
        })),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const activateFX = (fxType: string) => {
    setFxStates((prev) =>
      prev.map((fx) => ({
        ...fx,
        status: fx.type === fxType ? "active" : fx.status,
      })),
    )

    // Simulate healing state changes
    if (fxType === "AuraPulse") {
      setHealingStatus("in-progress")
    } else if (fxType === "GoldenAuraBloom") {
      setHealingStatus("complete")
    } else if (fxType === "RedSigilFlicker") {
      setHealingStatus("failed")
      setRetryCount((prev) => prev + 1)
    } else if (fxType === "OverrideFX") {
      setIsOverrideActive(true)
      setHealingStatus("in-progress")
    }
  }

  const getFXColor = (type: string) => {
    switch (type) {
      case "AuraPulse":
        return "text-cyan-400 border-cyan-500/30"
      case "GoldenAuraBloom":
        return "text-yellow-400 border-yellow-500/30"
      case "RedSigilFlicker":
        return "text-red-400 border-red-500/30"
      case "OverrideFX":
        return "text-purple-400 border-purple-500/30"
      default:
        return "text-gray-400 border-gray-500/30"
    }
  }

  const getConstellationColor = (color: string) => {
    switch (color) {
      case "blue":
        return "text-blue-400"
      case "cyan":
        return "text-cyan-400"
      case "purple":
        return "text-purple-400"
      case "white":
        return "text-white"
      default:
        return "text-gray-400"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "initializing":
        return "text-blue-400"
      case "in-progress":
        return "text-yellow-400"
      case "complete":
        return "text-green-400"
      case "failed":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* Healing Status Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className={`h-6 w-6 ${getStatusColor(healingStatus)}`} />
              <div>
                <div className={`text-lg font-bold ${getStatusColor(healingStatus)}`}>
                  {healingStatus.toUpperCase()}
                </div>
                <div className="text-xs text-gray-400">Healing Status</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-orange-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <RotateCcw className="h-6 w-6 text-orange-400" />
              <div>
                <div className="text-lg font-bold text-orange-400">
                  {retryCount}/{maxRetries}
                </div>
                <div className="text-xs text-gray-400">Retry Count</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-purple-400">{isOverrideActive ? "ACTIVE" : "STANDBY"}</div>
                <div className="text-xs text-gray-400">Override Status</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-cyan-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-6 w-6 text-cyan-400" />
              <div>
                <div className="text-lg font-bold text-cyan-400">{constellations.filter((c) => c.active).length}/4</div>
                <div className="text-xs text-gray-400">Constellations</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Niagara FX States */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-emerald-400 flex items-center">
                <Sparkles className="h-5 w-5 mr-2" />
                Niagara FX Healing States
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fxStates.map((fx, index) => (
                  <motion.div
                    key={fx.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-4 bg-slate-700/50 rounded-lg border ${getFXColor(fx.type)} hover:border-opacity-60 transition-smooth`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <motion.div
                          animate={fx.status === "active" ? { rotate: 360 } : {}}
                          transition={{
                            duration: 2,
                            repeat: fx.status === "active" ? Number.POSITIVE_INFINITY : 0,
                            ease: "linear",
                          }}
                        >
                          <Atom className={`h-5 w-5 ${getFXColor(fx.type).split(" ")[0]}`} />
                        </motion.div>
                        <div>
                          <h3 className="font-medium text-white">{fx.name}</h3>
                          <div className="text-xs text-gray-400">
                            {fx.duration > 0 ? `${fx.duration}s duration` : "Looping"}
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className={fx.status === "active" ? "text-green-400" : "text-gray-400"}>
                        {fx.status.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <div className="text-gray-400">Intensity</div>
                        <div className={`font-bold ${getFXColor(fx.type).split(" ")[0]}`}>{fx.intensity}%</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Particles</div>
                        <div className={`font-bold ${getFXColor(fx.type).split(" ")[0]}`}>
                          {fx.particles.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>FX Intensity</span>
                        <span>{fx.intensity}%</span>
                      </div>
                      <Progress value={fx.intensity} className="h-2" />
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-3">
                      <Button
                        size="sm"
                        onClick={() => activateFX(fx.type)}
                        className={`w-full ${
                          fx.status === "active" ? "bg-green-600 hover:bg-green-700" : "bg-slate-600 hover:bg-slate-700"
                        } transition-smooth`}
                      >
                        {fx.status === "active" ? (
                          <Pause className="h-3 w-3 mr-2" />
                        ) : (
                          <Play className="h-3 w-3 mr-2" />
                        )}
                        {fx.status === "active" ? "Active" : "Activate"}
                      </Button>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Divine Constellation Alignment */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <Orbit className="h-5 w-5 mr-2" />
                Divine Constellation Alignment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {constellations.map((constellation, index) => (
                  <motion.div
                    key={constellation.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-3 bg-slate-700/50 rounded-lg border border-slate-600"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <motion.div
                          animate={constellation.active ? { scale: [1, 1.2, 1] } : {}}
                          transition={{ duration: 2, repeat: constellation.active ? Number.POSITIVE_INFINITY : 0 }}
                        >
                          <Star className={`h-5 w-5 ${getConstellationColor(constellation.color)}`} />
                        </motion.div>
                        <span className="font-medium text-white">{constellation.name}</span>
                      </div>
                      <Badge variant="outline" className={constellation.active ? "text-green-400" : "text-gray-400"}>
                        {constellation.active ? "ALIGNED" : "DORMANT"}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Alignment</span>
                        <span>{constellation.alignment.toFixed(1)}%</span>
                      </div>
                      <Progress value={constellation.alignment} className="h-1" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Planetary Overlays */}
              <div className="mt-6 space-y-3">
                <h3 className="text-sm font-medium text-gray-300">Planetary FX Overlays</h3>
                <div className="grid grid-cols-3 gap-2">
                  {["Earth", "Mars", "Venus"].map((planet) => (
                    <motion.button
                      key={planet}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-slate-700/50 rounded text-xs font-medium text-gray-300 hover:bg-slate-600/50 transition-smooth"
                    >
                      {planet}
                    </motion.button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Satellite Sync Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Satellite Sync Panel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Live Diagnostics */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-300">Live Diagnostics</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Satellite Link</span>
                    <span className="text-green-400">ACTIVE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Signal Strength</span>
                    <span className="text-blue-400">94.7%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Constellation Count</span>
                    <span className="text-purple-400">4/4</span>
                  </div>
                </div>
              </div>

              {/* API Integration */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-300">API Integration</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400">Real-time Status</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-blue-400">Beam Lines Active</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-purple-400">Constellation Pulse</span>
                  </div>
                </div>
              </div>

              {/* Visual Feedback */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-300">Visual Feedback</h3>
                <div className="relative h-24 bg-slate-900/50 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 cyber-grid opacity-20"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      className="relative"
                    >
                      <div className="w-8 h-8 border-2 border-cyan-400 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      </div>
                    </motion.div>
                  </div>
                  <div className="absolute bottom-1 left-2 text-xs text-cyan-400">Sync: 99.7%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Override Escalation Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-slate-800/50 border-red-500/30 glass-morphism">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Override Escalation & Retry Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => activateFX("OverrideFX")}
                  className="bg-purple-600 hover:bg-purple-700 transition-smooth"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Guardian Override
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => setRetryCount(0)}
                  variant="outline"
                  className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 transition-smooth bg-transparent"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Retry Count
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => activateFX("AuraPulse")}
                  variant="outline"
                  className="border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 transition-smooth bg-transparent"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Activate Aura Pulse
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => activateFX("GoldenAuraBloom")}
                  variant="outline"
                  className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 transition-smooth bg-transparent"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Golden Aura Bloom
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
