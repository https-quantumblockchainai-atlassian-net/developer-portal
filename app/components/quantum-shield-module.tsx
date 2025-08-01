"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Atom,
  Zap,
  Shield,
  Activity,
  Layers,
  Lock,
  Unlock,
  RotateCcw,
  TrendingUp,
  Cpu,
  Database,
  Network,
} from "lucide-react"

interface QuantumState {
  entanglement: number
  coherence: number
  fidelity: number
  temperature: number
  qubits: number
  gates: number
}

export default function QuantumShieldModule() {
  const [quantumState, setQuantumState] = useState<QuantumState>({
    entanglement: 94.7,
    coherence: 89.3,
    fidelity: 96.8,
    temperature: 0.015,
    qubits: 1024,
    gates: 50000,
  })

  const [shieldLayers, setShieldLayers] = useState([
    { id: 1, name: "Quantum Encryption", status: "active", strength: 98.5 },
    { id: 2, name: "Entanglement Barrier", status: "active", strength: 95.2 },
    { id: 3, name: "Coherence Shield", status: "active", strength: 92.8 },
    { id: 4, name: "Superposition Lock", status: "active", strength: 97.1 },
  ])

  const [isCalibrating, setIsCalibrating] = useState(false)
  const [calibrationProgress, setCalibrationProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setQuantumState((prev) => {
        // Self-healing quantum corrections
        let newEntanglement = 90 + Math.random() * 10
        let newCoherence = 85 + Math.random() * 15
        const newFidelity = 95 + Math.random() * 5
        let newTemperature = 0.01 + Math.random() * 0.02

        // Auto-correction for quantum decoherence
        if (newCoherence < 80) {
          newCoherence = Math.max(newCoherence, 85) // Self-heal coherence
        }

        // Auto-correction for entanglement loss
        if (newEntanglement < 85) {
          newEntanglement = Math.max(newEntanglement, 90) // Self-heal entanglement
        }

        // Temperature regulation
        if (newTemperature > 0.025) {
          newTemperature = 0.015 // Auto-cool system
        }

        return {
          ...prev,
          entanglement: newEntanglement,
          coherence: newCoherence,
          fidelity: newFidelity,
          temperature: newTemperature,
        }
      })

      // Self-healing shield layers
      setShieldLayers((prev) =>
        prev.map((layer) => {
          let newStrength = layer.strength + (Math.random() - 0.5) * 2

          // Auto-repair weak shields
          if (newStrength < 85) {
            newStrength = Math.max(newStrength, 90) // Self-repair threshold
          }

          return {
            ...layer,
            strength: Math.min(newStrength, 100),
            status: newStrength > 90 ? "active" : newStrength > 70 ? "warning" : "critical",
          }
        }),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const startCalibration = () => {
    setIsCalibrating(true)
    setCalibrationProgress(0)
    const interval = setInterval(() => {
      setCalibrationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsCalibrating(false)
          return 100
        }
        return prev + 3
      })
    }, 150)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400"
      case "warning":
        return "text-yellow-400"
      case "critical":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const quantumSelfRepair = () => {
    setQuantumState((prev) => ({
      ...prev,
      entanglement: Math.min(prev.entanglement + 5, 100),
      coherence: Math.min(prev.coherence + 10, 100),
      fidelity: Math.min(prev.fidelity + 2, 100),
      temperature: Math.max(prev.temperature - 0.005, 0.01),
    }))

    setShieldLayers((prev) =>
      prev.map((layer) => ({
        ...layer,
        strength: Math.min(layer.strength + 15, 100),
        status: "active",
      })),
    )
  }

  return (
    <div className="space-y-6">
      {/* Quantum State Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        <Card className="bg-slate-800/50 border-cyan-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Atom className="h-6 w-6 text-cyan-400 animate-quantum-spin" />
              <div>
                <div className="text-lg font-bold text-cyan-400">{quantumState.entanglement.toFixed(1)}%</div>
                <div className="text-xs text-gray-400">Entanglement</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-6 w-6 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-purple-400">{quantumState.coherence.toFixed(1)}%</div>
                <div className="text-xs text-gray-400">Coherence</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-emerald-400" />
              <div>
                <div className="text-lg font-bold text-emerald-400">{quantumState.fidelity.toFixed(1)}%</div>
                <div className="text-xs text-gray-400">Fidelity</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-blue-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-blue-400" />
              <div>
                <div className="text-lg font-bold text-blue-400">{quantumState.temperature.toFixed(3)}K</div>
                <div className="text-xs text-gray-400">Temperature</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-yellow-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Cpu className="h-6 w-6 text-yellow-400" />
              <div>
                <div className="text-lg font-bold text-yellow-400">{quantumState.qubits}</div>
                <div className="text-xs text-gray-400">Qubits</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-orange-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Database className="h-6 w-6 text-orange-400" />
              <div>
                <div className="text-lg font-bold text-orange-400">{quantumState.gates.toLocaleString()}</div>
                <div className="text-xs text-gray-400">Gates</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Shield Layers */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-emerald-400 flex items-center">
                <Layers className="h-5 w-5 mr-2" />
                Quantum Shield Layers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {shieldLayers.map((layer, index) => (
                  <motion.div
                    key={layer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-4 bg-slate-700/50 rounded-lg border border-slate-600"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Shield className={`h-5 w-5 ${getStatusColor(layer.status)}`} />
                        <span className="font-medium text-white">{layer.name}</span>
                        <Badge variant="outline" className={getStatusColor(layer.status)}>
                          {layer.status.toUpperCase()}
                        </Badge>
                      </div>
                      <span className="text-sm font-bold text-emerald-400">{layer.strength.toFixed(1)}%</span>
                    </div>
                    <Progress value={layer.strength} className="h-2" />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quantum Controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center">
                <Atom className="h-5 w-5 mr-2" />
                Quantum Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Calibration */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-300">System Calibration</h3>
                <Progress value={calibrationProgress} className="h-2" />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={startCalibration}
                    disabled={isCalibrating}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 transition-smooth"
                  >
                    {isCalibrating ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="mr-2"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </motion.div>
                        Calibrating...
                      </>
                    ) : (
                      <>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Start Calibration
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>

              {/* Emergency Controls */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-300">Emergency Controls</h3>
                <div className="grid grid-cols-2 gap-3">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 bg-transparent"
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Lock Down
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className="w-full border-red-500 text-red-500 hover:bg-red-500/10 bg-transparent"
                    >
                      <Unlock className="h-4 w-4 mr-2" />
                      Emergency Stop
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* Quantum Visualization */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-300">Quantum State Visualization</h3>
                <div className="relative h-32 bg-slate-900/50 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 cyber-grid opacity-30"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={{
                        rotate: 360,
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                        scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                      }}
                      className="relative"
                    >
                      <Atom className="h-16 w-16 text-cyan-400" />
                      <div className="absolute inset-0 animate-pulse-glow rounded-full"></div>
                    </motion.div>
                  </div>
                  <div className="absolute bottom-2 left-2 text-xs text-cyan-400">
                    Quantum Field: {quantumState.entanglement.toFixed(1)}% Entangled
                  </div>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={quantumSelfRepair}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 transition-smooth"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Quantum Self-Repair
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quantum Network Topology */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center">
              <Network className="h-5 w-5 mr-2" />
              Quantum Network Topology
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-64 bg-slate-900/50 rounded-lg overflow-hidden">
              <div className="absolute inset-0 cyber-grid opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Central Node */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-16 h-16 bg-purple-500/20 rounded-full border-2 border-purple-400 flex items-center justify-center"
                  >
                    <Atom className="h-8 w-8 text-purple-400" />
                  </motion.div>

                  {/* Satellite Nodes */}
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      animate={{
                        rotate: 360,
                        x: Math.cos((i * Math.PI) / 3) * 80,
                        y: Math.sin((i * Math.PI) / 3) * 80,
                      }}
                      transition={{
                        rotate: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                      }}
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    >
                      <div className="w-8 h-8 bg-cyan-500/20 rounded-full border border-cyan-400 flex items-center justify-center">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Connection Lines */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={`line-${i}`}
                        className="absolute inset-0 w-20 h-px bg-gradient-to-r from-purple-400 to-cyan-400 opacity-60"
                        style={{
                          transformOrigin: "0 50%",
                          transform: `rotate(${i * 60}deg)`,
                        }}
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute top-2 left-2 text-xs text-purple-400">
                Network Status: {shieldLayers.filter((l) => l.status === "active").length}/{shieldLayers.length} Nodes
                Active
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
