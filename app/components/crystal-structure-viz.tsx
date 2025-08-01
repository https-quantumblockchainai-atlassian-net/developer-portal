"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Layers, Atom, Zap, Activity, RotateCcw, Play, Pause, Settings, Eye, Target, Cpu, Database } from "lucide-react"

interface CrystalNode {
  id: string
  x: number
  y: number
  z: number
  type: "core" | "edge" | "bridge" | "sentinel"
  energy: number
  connections: string[]
  status: "active" | "dormant" | "critical"
}

interface CrystalLayer {
  id: string
  name: string
  depth: number
  nodes: number
  integrity: number
  resonance: number
  type: "security" | "processing" | "storage" | "communication"
}

export default function CrystalStructureViz() {
  const [crystalLayers, setCrystalLayers] = useState<CrystalLayer[]>([
    {
      id: "1",
      name: "Security Matrix",
      depth: 1,
      nodes: 64,
      integrity: 98.7,
      resonance: 94.2,
      type: "security",
    },
    {
      id: "2",
      name: "Processing Core",
      depth: 2,
      nodes: 128,
      integrity: 96.4,
      resonance: 97.8,
      type: "processing",
    },
    {
      id: "3",
      name: "Data Lattice",
      depth: 3,
      nodes: 256,
      integrity: 99.1,
      resonance: 92.5,
      type: "storage",
    },
    {
      id: "4",
      name: "Neural Network",
      depth: 4,
      nodes: 512,
      integrity: 95.8,
      resonance: 96.3,
      type: "communication",
    },
  ])

  const [crystalNodes, setCrystalNodes] = useState<CrystalNode[]>([])
  const [isSimulating, setIsSimulating] = useState(true)
  const [simulationSpeed, setSimulationSpeed] = useState(1)
  const [totalEnergy, setTotalEnergy] = useState(0)
  const [networkStability, setNetworkStability] = useState(97.3)

  useEffect(() => {
    // Initialize crystal nodes
    const nodes: CrystalNode[] = []
    for (let i = 0; i < 24; i++) {
      const angle = (i * Math.PI * 2) / 24
      const radius = 100 + Math.random() * 50
      nodes.push({
        id: `node-${i}`,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: (Math.random() - 0.5) * 100,
        type: ["core", "edge", "bridge", "sentinel"][Math.floor(Math.random() * 4)] as any,
        energy: 70 + Math.random() * 30,
        connections: [],
        status: "active",
      })
    }
    setCrystalNodes(nodes)
  }, [])

  useEffect(() => {
    if (!isSimulating) return

    const interval = setInterval(() => {
      // Self-healing crystal layers
      setCrystalLayers((prev) =>
        prev.map((layer) => {
          let newIntegrity = Math.max(90, Math.min(100, layer.integrity + (Math.random() - 0.5) * 2))
          let newResonance = Math.max(85, Math.min(100, layer.resonance + (Math.random() - 0.5) * 3))

          // Auto-repair damaged layers
          if (newIntegrity < 95) {
            newIntegrity = Math.min(newIntegrity + 2, 100) // Self-repair integrity
          }

          if (newResonance < 90) {
            newResonance = Math.min(newResonance + 3, 100) // Self-repair resonance
          }

          return {
            ...layer,
            integrity: newIntegrity,
            resonance: newResonance,
          }
        }),
      )

      // Self-healing crystal nodes
      setCrystalNodes((prev) =>
        prev.map((node) => {
          let newEnergy = Math.max(50, Math.min(100, node.energy + (Math.random() - 0.5) * 5))

          // Auto-recharge low energy nodes
          if (newEnergy < 70) {
            newEnergy = Math.min(newEnergy + 10, 100) // Self-recharge
          }

          return {
            ...node,
            energy: newEnergy,
            x: node.x + (Math.random() - 0.5) * 2,
            y: node.y + (Math.random() - 0.5) * 2,
            status: newEnergy > 80 ? "active" : newEnergy > 50 ? "dormant" : "critical",
          }
        }),
      )

      setTotalEnergy((prev) => {
        let newEnergy = Math.max(85, Math.min(100, prev + (Math.random() - 0.5) * 3))
        // Auto-boost low total energy
        if (newEnergy < 90) {
          newEnergy = Math.min(newEnergy + 5, 100)
        }
        return newEnergy
      })

      setNetworkStability((prev) => {
        let newStability = Math.max(90, Math.min(100, prev + (Math.random() - 0.5) * 2))
        // Auto-stabilize network
        if (newStability < 95) {
          newStability = Math.min(newStability + 3, 100)
        }
        return newStability
      })
    }, 1000 / simulationSpeed)

    return () => clearInterval(interval)
  }, [isSimulating, simulationSpeed])

  const getLayerColor = (type: string) => {
    switch (type) {
      case "security":
        return "border-red-500/30 text-red-400"
      case "processing":
        return "border-blue-500/30 text-blue-400"
      case "storage":
        return "border-green-500/30 text-green-400"
      case "communication":
        return "border-purple-500/30 text-purple-400"
      default:
        return "border-gray-500/30 text-gray-400"
    }
  }

  const getNodeColor = (type: string) => {
    switch (type) {
      case "core":
        return "bg-red-500"
      case "edge":
        return "bg-blue-500"
      case "bridge":
        return "bg-green-500"
      case "sentinel":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const crystalSelfRepair = () => {
    setCrystalLayers((prev) =>
      prev.map((layer) => ({
        ...layer,
        integrity: Math.min(layer.integrity + 10, 100),
        resonance: Math.min(layer.resonance + 15, 100),
      })),
    )

    setCrystalNodes((prev) =>
      prev.map((node) => ({
        ...node,
        energy: Math.min(node.energy + 20, 100),
        status: "active",
      })),
    )

    setTotalEnergy((prev) => Math.min(prev + 10, 100))
    setNetworkStability((prev) => Math.min(prev + 5, 100))
  }

  return (
    <div className="space-y-6">
      {/* Crystal Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Layers className="h-6 w-6 text-emerald-400" />
              <div>
                <div className="text-lg font-bold text-emerald-400">{crystalLayers.length}</div>
                <div className="text-xs text-gray-400">Active Layers</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-cyan-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Atom className="h-6 w-6 text-cyan-400" />
              <div>
                <div className="text-lg font-bold text-cyan-400">{crystalNodes.length}</div>
                <div className="text-xs text-gray-400">Crystal Nodes</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-yellow-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-yellow-400" />
              <div>
                <div className="text-lg font-bold text-yellow-400">{totalEnergy.toFixed(1)}%</div>
                <div className="text-xs text-gray-400">Total Energy</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-6 w-6 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-purple-400">{networkStability.toFixed(1)}%</div>
                <div className="text-xs text-gray-400">Stability</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Crystal Visualization */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <Layers className="h-5 w-5 mr-2" />
                    Crystal Structure Visualization
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsSimulating(!isSimulating)}
                      className={`${
                        isSimulating
                          ? "border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
                          : "border-green-500 text-green-500 hover:bg-green-500/10"
                      } transition-smooth`}
                    >
                      {isSimulating ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-blue-500 text-blue-500 hover:bg-blue-500/10 transition-smooth bg-transparent"
                    >
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative h-96 bg-slate-900/50 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 cyber-grid opacity-20"></div>

                  {/* 3D Crystal Structure */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-80 h-80">
                      {/* Central Core */}
                      <motion.div
                        animate={{
                          rotate: isSimulating ? 360 : 0,
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                          scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                        }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full border-2 border-emerald-300 flex items-center justify-center animate-pulse-glow">
                          <Atom className="h-8 w-8 text-white" />
                        </div>
                      </motion.div>

                      {/* Crystal Nodes */}
                      {crystalNodes.map((node, index) => (
                        <motion.div
                          key={node.id}
                          animate={{
                            x: node.x,
                            y: node.y,
                            rotate: isSimulating ? 360 : 0,
                          }}
                          transition={{
                            x: { duration: 2, ease: "easeInOut" },
                            y: { duration: 2, ease: "easeInOut" },
                            rotate: { duration: 15 + index, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                          }}
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        >
                          <div
                            className={`w-3 h-3 ${getNodeColor(node.type)} rounded-full border border-white/50 ${
                              node.status === "active" ? "animate-pulse" : ""
                            }`}
                            style={{ opacity: node.energy / 100 }}
                          />
                        </motion.div>
                      ))}

                      {/* Connection Lines */}
                      <div className="absolute inset-0 pointer-events-none">
                        {crystalNodes.map((node, i) => (
                          <motion.div
                            key={`connection-${i}`}
                            className="absolute top-1/2 left-1/2 w-20 h-px bg-gradient-to-r from-emerald-400/30 to-transparent"
                            style={{
                              transformOrigin: "0 50%",
                              transform: `rotate(${(i * 360) / crystalNodes.length}deg)`,
                            }}
                            animate={{ opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.1 }}
                          />
                        ))}
                      </div>

                      {/* Energy Rings */}
                      {[1, 2, 3].map((ring) => (
                        <motion.div
                          key={`ring-${ring}`}
                          animate={{ rotate: isSimulating ? 360 * (ring % 2 === 0 ? -1 : 1) : 0 }}
                          transition={{ duration: 30 / ring, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        >
                          <div
                            className={`border border-emerald-400/20 rounded-full`}
                            style={{
                              width: `${ring * 80}px`,
                              height: `${ring * 80}px`,
                            }}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Status Overlay */}
                  <div className="absolute top-4 left-4 space-y-2">
                    <div className="text-xs text-emerald-400">Simulation: {isSimulating ? "Active" : "Paused"}</div>
                    <div className="text-xs text-cyan-400">Speed: {simulationSpeed}x</div>
                    <div className="text-xs text-purple-400">
                      Nodes: {crystalNodes.filter((n) => n.status === "active").length}/{crystalNodes.length}
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="absolute bottom-4 right-4 space-y-1">
                    <div className="flex items-center space-x-2 text-xs">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-gray-400">Core</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-400">Edge</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-400">Bridge</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-400">Sentinel</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Layer Information and Controls */}
        <div className="space-y-6">
          {/* Crystal Layers */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  Crystal Layers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {crystalLayers.map((layer, index) => (
                    <motion.div
                      key={layer.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`p-3 bg-slate-700/50 rounded-lg border ${getLayerColor(layer.type)}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-medium text-white">{layer.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          L{layer.depth}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                        <div>
                          <div className="text-gray-400">Nodes</div>
                          <div className="font-bold text-blue-400">{layer.nodes}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Integrity</div>
                          <div className="font-bold text-green-400">{layer.integrity.toFixed(1)}%</div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>Resonance</span>
                          <span>{layer.resonance.toFixed(1)}%</span>
                        </div>
                        <Progress value={layer.resonance} className="h-1" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Simulation Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Simulation Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-300">Simulation Speed</label>
                  <div className="flex space-x-2">
                    {[0.5, 1, 2, 4].map((speed) => (
                      <motion.button
                        key={speed}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSimulationSpeed(speed)}
                        className={`px-3 py-1 rounded text-xs font-medium transition-smooth ${
                          simulationSpeed === speed
                            ? "bg-purple-600 text-white"
                            : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                        }`}
                      >
                        {speed}x
                      </motion.button>
                    ))}
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={crystalSelfRepair}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 transition-smooth"
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Crystal Self-Repair
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="w-full border-blue-500 text-blue-500 hover:bg-blue-500/10 transition-smooth bg-transparent"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Analyze Patterns
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 transition-smooth bg-transparent"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset Structure
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="w-full border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 transition-smooth bg-transparent"
                  >
                    <Cpu className="h-4 w-4 mr-2" />
                    Export Configuration
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
