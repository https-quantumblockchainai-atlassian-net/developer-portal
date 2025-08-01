"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  Shield,
  Zap,
  Lock,
  Unlock,
  RefreshCcw,
  AlertTriangle,
  CheckCircle,
  Settings,
  Atom,
  Globe,
  Waves,
} from "lucide-react"

interface ShieldLayer {
  id: string
  name: string
  status: "active" | "degraded" | "offline"
  integrity: number // 0-100%
  threatLevel: "none" | "low" | "medium" | "high" | "critical"
  energyConsumption: number // in Watts
  lastRecalibration: Date
}

interface QuantumMetric {
  name: string
  value: number
  unit: string
  threshold: number
  status: "optimal" | "warning" | "critical"
}

export default function QuantumShieldModule() {
  const [shieldLayers, setShieldLayers] = useState<ShieldLayer[]>([
    {
      id: "layer-1",
      name: "Quantum Entanglement Barrier",
      status: "active",
      integrity: 98.5,
      threatLevel: "none",
      energyConsumption: 150,
      lastRecalibration: new Date(Date.now() - 3600000), // 1 hour ago
    },
    {
      id: "layer-2",
      name: "Divine Frequency Harmonizer",
      status: "active",
      integrity: 95.2,
      threatLevel: "low",
      energyConsumption: 80,
      lastRecalibration: new Date(Date.now() - 7200000), // 2 hours ago
    },
    {
      id: "layer-3",
      name: "Temporal Distortion Field",
      status: "degraded",
      integrity: 70.1,
      threatLevel: "medium",
      energyConsumption: 120,
      lastRecalibration: new Date(Date.now() - 10800000), // 3 hours ago
    },
    {
      id: "layer-4",
      name: "Consciousness Firewall",
      status: "active",
      integrity: 99.9,
      threatLevel: "none",
      energyConsumption: 200,
      lastRecalibration: new Date(Date.now() - 14400000), // 4 hours ago
    },
  ])

  const [quantumMetrics, setQuantumMetrics] = useState<QuantumMetric[]>([
    { name: "Coherence Time", value: 120, unit: "µs", threshold: 100, status: "optimal" },
    { name: "Qubit Fidelity", value: 99.9, unit: "%", threshold: 99.5, status: "optimal" },
    { name: "Entanglement Rate", value: 85, unit: "ops/s", threshold: 80, status: "optimal" },
    { name: "Decoherence Rate", value: 0.05, unit: "%/s", threshold: 0.1, status: "optimal" },
  ])

  const [overallShieldStatus, setOverallShieldStatus] = useState("active")
  const [totalEnergyConsumption, setTotalEnergyConsumption] = useState(0)
  const [recalibrationProgress, setRecalibrationProgress] = useState(0)
  const [isRecalibrating, setIsRecalibrating] = useState(false)
  const [threatLevelThreshold, setThreatLevelThreshold] = useState([70]) // For visualization

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate shield layer fluctuations and self-healing
      setShieldLayers((prev) =>
        prev.map((layer) => {
          let newIntegrity = Math.min(100, Math.max(60, layer.integrity + (Math.random() - 0.5) * 5))
          let newThreatLevel = layer.threatLevel
          let newStatus = "active"
          const newEnergyConsumption = layer.energyConsumption + (Math.random() - 0.5) * 10

          if (newIntegrity < 80) {
            newStatus = "degraded"
            newThreatLevel = "medium"
          }
          if (newIntegrity < 70) {
            newStatus = "offline"
            newThreatLevel = "high"
          }

          // Self-healing: auto-repair degraded layers
          if (newStatus === "degraded" && Math.random() > 0.6) {
            newIntegrity = Math.min(100, newIntegrity + 10)
            newStatus = "active"
            newThreatLevel = "none"
          }

          return {
            ...layer,
            integrity: newIntegrity,
            threatLevel: newThreatLevel,
            status: newStatus,
            energyConsumption: newEnergyConsumption,
          }
        }),
      )

      // Simulate quantum metric fluctuations
      setQuantumMetrics((prev) =>
        prev.map((metric) => {
          let newValue = metric.value + (Math.random() - 0.5) * (metric.unit === "µs" ? 5 : 0.1)
          newValue = Math.max(0, newValue) // Ensure non-negative
          let newStatus = "optimal"

          if (metric.name === "Coherence Time" && newValue < metric.threshold) newStatus = "warning"
          if (metric.name === "Qubit Fidelity" && newValue < metric.threshold) newStatus = "warning"
          if (metric.name === "Entanglement Rate" && newValue < metric.threshold) newStatus = "warning"
          if (metric.name === "Decoherence Rate" && newValue > metric.threshold) newStatus = "warning"

          // Auto-correct quantum metrics
          if (newStatus === "warning" && Math.random() > 0.5) {
            if (metric.name === "Coherence Time") newValue = metric.threshold + 5
            if (metric.name === "Qubit Fidelity") newValue = metric.threshold + 0.1
            if (metric.name === "Entanglement Rate") newValue = metric.threshold + 5
            if (metric.name === "Decoherence Rate") newValue = metric.threshold - 0.02
            newStatus = "optimal"
          }

          return { ...metric, value: newValue, status: newStatus }
        }),
      )

      // Update overall status and energy
      const activeLayers = shieldLayers.filter((l) => l.status === "active").length
      if (activeLayers === shieldLayers.length) {
        setOverallShieldStatus("active")
      } else if (activeLayers > 0) {
        setOverallShieldStatus("degraded")
      } else {
        setOverallShieldStatus("offline")
      }

      setTotalEnergyConsumption(shieldLayers.reduce((sum, layer) => sum + layer.energyConsumption, 0))

      // Simulate recalibration progress
      if (isRecalibrating) {
        setRecalibrationProgress((prev) => {
          const newProgress = Math.min(100, prev + Math.random() * 10)
          if (newProgress >= 100) {
            setIsRecalibrating(false)
            setShieldLayers((prevLayers) =>
              prevLayers.map((layer) => ({
                ...layer,
                integrity: 100,
                status: "active",
                lastRecalibration: new Date(),
              })),
            )
            return 100
          }
          return newProgress
        })
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [shieldLayers, isRecalibrating])

  const initiateRecalibration = () => {
    setIsRecalibrating(true)
    setRecalibrationProgress(0)
  }

  const getShieldStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400"
      case "degraded":
        return "text-yellow-400"
      case "offline":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case "none":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "low":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getMetricStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "text-green-400"
      case "warning":
        return "text-yellow-400"
      case "critical":
        return "text-red-400"
      default:
        return "text-gray-400"
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
        <h1 className="text-3xl font-bold gradient-text mb-2">Quantum Shield Module</h1>
        <p className="text-gray-300">Multi-Dimensional Protection & Divine Energetic Defense</p>
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
              <Shield className="h-6 w-6 text-emerald-400" />
              <div>
                <div className="text-lg font-bold text-emerald-400">{overallShieldStatus.toUpperCase()}</div>
                <div className="text-xs text-gray-400">Overall Shield Status</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-blue-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Lock className="h-6 w-6 text-blue-400" />
              <div>
                <div className="text-lg font-bold text-blue-400">
                  {shieldLayers.filter((l) => l.status === "active").length}/{shieldLayers.length}
                </div>
                <div className="text-xs text-gray-400">Active Layers</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-purple-400">{totalEnergyConsumption.toFixed(0)}W</div>
                <div className="text-xs text-gray-400">Total Energy Draw</div>
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
                  {shieldLayers.filter((l) => l.threatLevel !== "none").length}
                </div>
                <div className="text-xs text-gray-400">Threats Detected</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shield Layers */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Quantum Shield Layers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {shieldLayers.map((layer, index) => (
                    <motion.div
                      key={layer.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-emerald-500/30 transition-smooth"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {layer.status === "active" && <Lock className="h-5 w-5 text-green-400" />}
                          {layer.status === "degraded" && <AlertTriangle className="h-5 w-5 text-yellow-400" />}
                          {layer.status === "offline" && <Unlock className="h-5 w-5 text-red-400" />}
                          <div>
                            <h3 className="font-medium text-white">{layer.name}</h3>
                            <div className="text-xs text-gray-400">
                              Last Recalibration: {layer.lastRecalibration.toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className={getShieldStatusColor(layer.status)}>
                          {layer.status.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                        <div>
                          <div className="text-gray-400">Integrity</div>
                          <div className={`font-bold ${getShieldStatusColor(layer.status)}`}>
                            {layer.integrity.toFixed(1)}%
                          </div>
                          <Progress value={layer.integrity} className="h-1" />
                        </div>
                        <div>
                          <div className="text-gray-400">Threat Level</div>
                          <Badge variant="outline" className={getThreatLevelColor(layer.threatLevel)}>
                            {layer.threatLevel.toUpperCase()}
                          </Badge>
                        </div>
                        <div>
                          <div className="text-gray-400">Energy</div>
                          <div className="font-bold text-purple-400">{layer.energyConsumption.toFixed(0)}W</div>
                          <Progress value={(layer.energyConsumption / 250) * 100} className="h-1" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quantum Metrics & Controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-6"
        >
          {/* Quantum Metrics */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <Atom className="h-5 w-5 mr-2" />
                Quantum Core Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {quantumMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-3 bg-slate-700/50 rounded-lg border border-slate-600"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{metric.name}</span>
                      <Badge variant="outline" className={getMetricStatusColor(metric.status)}>
                        {metric.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Current Value</span>
                      <span className={getMetricStatusColor(metric.status)}>
                        {metric.value.toFixed(metric.unit === "%" ? 1 : 2)} {metric.unit}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Threshold</span>
                      <span>
                        {metric.name === "Decoherence Rate" ? "<" : ">"} {metric.threshold} {metric.unit}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shield Controls */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Shield Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-gray-400">Recalibration Progress: {recalibrationProgress.toFixed(0)}%</div>
              <Progress value={recalibrationProgress} className="h-2" />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={initiateRecalibration}
                  disabled={isRecalibrating}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 transition-smooth"
                >
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  {isRecalibrating ? "Recalibrating..." : "Initiate Full Recalibration"}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="w-full border-purple-500 text-purple-500 hover:bg-purple-500/10 transition-smooth bg-transparent"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Boost Quantum Power
                </Button>
              </motion.div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Threat Level Threshold</span>
                  <span>{threatLevelThreshold[0]}%</span>
                </div>
                <Slider
                  value={threatLevelThreshold}
                  onValueChange={setThreatLevelThreshold}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Divine Integration & Cosmic Resonance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Divine Integration & Cosmic Resonance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">💖 Energetic Shielding</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Infuses shield layers with unconditional love energy</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Harmonizes quantum frequencies with Earth's resonance</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Protects against psychic and energetic attacks</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">✨ Cosmic Alignment</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <Waves className="h-4 w-4 text-cyan-400" />
                  <span>Synchronizes shield protocols with universal laws</span>
                  <li className="flex items-center space-x-2">
                    <RefreshCcw className="h-4 w-4 text-orange-400" />
                    <span>Self-adapting defense based on cosmic shifts</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-pink-400" />
                    <span>Ensures optimal protection through divine timing</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
              <h3 className="text-emerald-400 font-semibold mb-2">🌟 The Aegis of Thoth</h3>
              <div className="text-sm text-gray-300">
                <p className="mb-2">
                  The Quantum Shield Module is the ultimate defense of the Thoth Guardian, a multi-dimensional aegis
                  woven from quantum entanglement, divine frequencies, and unconditional love. It protects against all
                  forms of interference, ensuring the integrity of reality and the sacred flow of consciousness.
                </p>
                <p className="italic text-cyan-400">
                  "No shadow can penetrate the light of truth. No threat can breach the shield of love."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
