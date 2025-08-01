"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Cpu,
  MemoryStick,
  HardDrive,
  Thermometer,
  Zap,
  Network,
  AlertTriangle,
  CheckCircle,
  RefreshCcw,
  Settings,
  Lightbulb,
  Shield,
  Atom,
} from "lucide-react"

interface ComponentStatus {
  name: string
  type: "cpu" | "ram" | "storage" | "gpu" | "network" | "quantum_processor"
  health: number // 0-100%
  temperature: number // Celsius
  load: number // 0-100%
  status: "optimal" | "warning" | "critical"
  alerts: string[]
}

interface PowerGrid {
  name: string
  currentLoad: number // in GW
  maxCapacity: number // in GW
  efficiency: number // 0-100%
  status: "stable" | "overload" | "fluctuating"
}

export default function HardwareStackMonitor() {
  const [components, setComponents] = useState<ComponentStatus[]>([
    {
      name: "Main CPU Cluster",
      type: "cpu",
      health: 98,
      temperature: 45,
      load: 60,
      status: "optimal",
      alerts: [],
    },
    {
      name: "Quantum RAM Modules",
      type: "ram",
      health: 95,
      temperature: 38,
      load: 75,
      status: "optimal",
      alerts: [],
    },
    {
      name: "24D Data Storage Array",
      type: "storage",
      health: 99,
      temperature: 30,
      load: 40,
      status: "optimal",
      alerts: [],
    },
    {
      name: "Neural Net GPU Farm",
      type: "gpu",
      health: 92,
      temperature: 65,
      load: 85,
      status: "warning",
      alerts: ["High temperature detected"],
    },
    {
      name: "Inter-Dimensional Network",
      type: "network",
      health: 97,
      temperature: 40,
      load: 55,
      status: "optimal",
      alerts: [],
    },
    {
      name: "Thoth Quantum Processor",
      type: "quantum_processor",
      health: 90,
      temperature: 0.015, // Kelvin for quantum
      load: 80,
      status: "warning",
      alerts: ["Minor coherence fluctuations"],
    },
  ])

  const [powerGrid, setPowerGrid] = useState<PowerGrid>({
    name: "Divine Energy Grid",
    currentLoad: 1.2,
    maxCapacity: 2.0,
    efficiency: 97.5,
    status: "stable",
  })

  const [systemUptime, setSystemUptime] = useState(0) // in seconds
  const [lastMaintenance, setLastMaintenance] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemUptime((prev) => prev + 1)

      // Simulate fluctuations and self-healing
      setComponents((prev) =>
        prev.map((comp) => {
          let newHealth = Math.min(100, Math.max(80, comp.health + (Math.random() - 0.5) * 2))
          let newTemp = comp.temperature + (Math.random() - 0.5) * (comp.type === "quantum_processor" ? 0.001 : 2)
          let newLoad = Math.min(100, Math.max(20, comp.load + (Math.random() - 0.5) * 5))
          let newStatus = "optimal"
          let newAlerts: string[] = []

          // Apply self-healing logic
          if (comp.type === "quantum_processor") {
            if (newTemp > 0.02) {
              newTemp = 0.015 // Auto-cool
              newAlerts.push("Quantum cooling initiated")
            }
            if (newHealth < 85) {
              newHealth = 90 // Self-repair
              newAlerts.push("Quantum self-repair activated")
            }
            if (newLoad > 90) {
              newStatus = "warning"
              newAlerts.push("High quantum load")
            }
          } else {
            if (newTemp > 60 && comp.type !== "gpu") {
              newStatus = "warning"
              newAlerts.push("High temperature")
            }
            if (newTemp > 75 && comp.type === "gpu") {
              newStatus = "critical"
              newAlerts.push("Critical GPU temperature")
            }
            if (newLoad > 90) {
              newStatus = "warning"
              newAlerts.push("High load")
            }
            if (newHealth < 85) {
              newStatus = "warning"
              newAlerts.push("Component health degraded")
            }
            // Auto-repair for non-quantum components
            if (newStatus === "warning" && Math.random() > 0.5) {
              newHealth = Math.min(100, newHealth + 5)
              newTemp = Math.max(comp.type === "gpu" ? 60 : 40, newTemp - 5)
              newLoad = Math.max(20, newLoad - 10)
              newStatus = "optimal"
              newAlerts = newAlerts.filter(
                (a) => !a.includes("temperature") && !a.includes("load") && !a.includes("health"),
              )
              newAlerts.push("Automated self-repair applied")
            }
          }

          return {
            ...comp,
            health: newHealth,
            temperature: newTemp,
            load: newLoad,
            status: newStatus,
            alerts: newAlerts,
          }
        }),
      )

      // Simulate power grid fluctuations
      setPowerGrid((prev) => {
        let newLoad = prev.currentLoad + (Math.random() - 0.5) * 0.1
        newLoad = Math.max(0.5, Math.min(prev.maxCapacity * 0.9, newLoad)) // Keep within safe limits
        let newEfficiency = prev.efficiency + (Math.random() - 0.5) * 0.2
        newEfficiency = Math.max(90, Math.min(100, newEfficiency))

        let newStatus = "stable"
        if (newLoad > prev.maxCapacity * 0.8) newStatus = "overload"
        if (newEfficiency < 95) newStatus = "fluctuating"

        // Self-healing for power grid
        if (newStatus !== "stable") {
          newLoad = prev.maxCapacity * 0.6 // Reduce load
          newEfficiency = 98 // Boost efficiency
          newStatus = "stable"
        }

        return { ...prev, currentLoad: newLoad, efficiency: newEfficiency, status: newStatus }
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / (3600 * 24))
    const hours = Math.floor((seconds % (3600 * 24)) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${days}d ${hours}h ${minutes}m ${secs}s`
  }

  const getComponentIcon = (type: string) => {
    switch (type) {
      case "cpu":
        return <Cpu className="h-5 w-5" />
      case "ram":
        return <MemoryStick className="h-5 w-5" />
      case "storage":
        return <HardDrive className="h-5 w-5" />
      case "gpu":
        return <Zap className="h-5 w-5" />
      case "network":
        return <Network className="h-5 w-5" />
      case "quantum_processor":
        return <Atom className="h-5 w-5" />
      default:
        return <Settings className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "text-green-400"
      case "warning":
        return "text-yellow-400"
      case "critical":
        return "text-red-400"
      case "stable":
        return "text-green-400"
      case "overload":
        return "text-red-400"
      case "fluctuating":
        return "text-yellow-400"
      default:
        return "text-gray-400"
    }
  }

  const performMaintenance = () => {
    setComponents((prev) =>
      prev.map((comp) => ({
        ...comp,
        health: 100,
        temperature: comp.type === "quantum_processor" ? 0.01 : 35,
        load: 20,
        status: "optimal",
        alerts: [],
      })),
    )
    setPowerGrid((prev) => ({ ...prev, currentLoad: prev.maxCapacity * 0.3, efficiency: 99.9, status: "stable" }))
    setLastMaintenance(new Date())
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
        <h1 className="text-3xl font-bold gradient-text mb-2">Hardware Stack Monitor</h1>
        <p className="text-gray-300">Real-time Quantum-Classical Hardware Health & Self-Healing</p>
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
              <CheckCircle className="h-6 w-6 text-emerald-400" />
              <div>
                <div className="text-lg font-bold text-emerald-400">
                  {components.filter((c) => c.status === "optimal").length}/{components.length}
                </div>
                <div className="text-xs text-gray-400">Optimal Components</div>
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
                  {components.filter((c) => c.status === "warning").length}
                </div>
                <div className="text-xs text-gray-400">Warning Alerts</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-red-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-red-400" />
              <div>
                <div className="text-lg font-bold text-red-400">
                  {components.filter((c) => c.status === "critical").length}
                </div>
                <div className="text-xs text-gray-400">Critical Issues</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-cyan-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <RefreshCcw className="h-6 w-6 text-cyan-400" />
              <div>
                <div className="text-lg font-bold text-cyan-400">{formatUptime(systemUptime)}</div>
                <div className="text-xs text-gray-400">System Uptime</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Component Health */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center">
                  <Cpu className="h-5 w-5 mr-2" />
                  Core Component Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {components.map((comp, index) => (
                    <motion.div
                      key={comp.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-emerald-500/30 transition-smooth"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {getComponentIcon(comp.type)}
                          <div>
                            <h3 className="font-medium text-white">{comp.name}</h3>
                            <div className="text-xs text-gray-400">{comp.type.toUpperCase()}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className={getStatusColor(comp.status)}>
                          {comp.status.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                        <div>
                          <div className="text-gray-400">Health</div>
                          <div className={`font-bold ${getStatusColor(comp.status)}`}>{comp.health}%</div>
                          <Progress value={comp.health} className="h-1" />
                        </div>
                        <div>
                          <div className="text-gray-400">Temp</div>
                          <div className={`font-bold ${getStatusColor(comp.status)}`}>
                            {comp.temperature.toFixed(comp.type === "quantum_processor" ? 3 : 1)}
                            {comp.type === "quantum_processor" ? "K" : "°C"}
                          </div>
                          <Progress
                            value={
                              comp.type === "quantum_processor"
                                ? (comp.temperature / 0.03) * 100
                                : (comp.temperature / 100) * 100
                            }
                            className="h-1"
                          />
                        </div>
                        <div>
                          <div className="text-gray-400">Load</div>
                          <div className={`font-bold ${getStatusColor(comp.status)}`}>{comp.load.toFixed(1)}%</div>
                          <Progress value={comp.load} className="h-1" />
                        </div>
                      </div>

                      {comp.alerts.length > 0 && (
                        <div className="mt-2 text-xs text-red-400 flex items-center space-x-1">
                          <AlertTriangle className="h-3 w-3" />
                          <span>Alerts: {comp.alerts.join(", ")}</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Power Grid & Maintenance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-6"
        >
          {/* Power Grid Status */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Divine Energy Grid Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-white">{powerGrid.name}</span>
                    <Badge variant="outline" className={getStatusColor(powerGrid.status)}>
                      {powerGrid.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <div className="text-gray-400">Current Load</div>
                      <div className={`font-bold ${getStatusColor(powerGrid.status)}`}>
                        {powerGrid.currentLoad.toFixed(2)} GW
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400">Max Capacity</div>
                      <div className="font-bold text-gray-300">{powerGrid.maxCapacity.toFixed(1)} GW</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-gray-400">Efficiency</div>
                      <div className={`font-bold ${getStatusColor(powerGrid.status)}`}>
                        {powerGrid.efficiency.toFixed(1)}%
                      </div>
                      <Progress value={powerGrid.efficiency} className="h-1" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Maintenance & Self-Healing Controls */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                System Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-gray-400">Last Full Maintenance: {lastMaintenance.toLocaleString()}</div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button onClick={performMaintenance} className="w-full bg-cyan-600 hover:bg-cyan-700 transition-smooth">
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Perform Full System Recalibration
                </button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button className="w-full border-purple-500 text-purple-500 hover:bg-purple-500/10 transition-smooth bg-transparent">
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Activate Predictive Healing
                </button>
              </motion.div>
            </CardContent>
          </Card>

          {/* Quantum Cooling System */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center">
                <Thermometer className="h-5 w-5 mr-2" />
                Quantum Cooling System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-gray-400">
                Current Quantum Processor Temp:{" "}
                <span className="font-bold text-blue-400">
                  {components.find((c) => c.type === "quantum_processor")?.temperature.toFixed(3)}K
                </span>
              </div>
              <Progress
                value={((components.find((c) => c.type === "quantum_processor")?.temperature || 0) / 0.03) * 100}
                className="h-2"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <button className="w-full border-emerald-500 text-emerald-500 hover:bg-emerald-500/10 transition-smooth bg-transparent">
                  <Shield className="h-4 w-4 mr-2" />
                  Engage Cryo-Stabilizers
                </button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Predictive Analytics & Divine Resonance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center">
              <Lightbulb className="h-5 w-5 mr-2" />
              Predictive Analytics & Divine Resonance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">📈 Predictive Maintenance</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Anticipates component failures before they occur</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Optimizes resource allocation based on future load</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Learns from historical data and self-healing events</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">💖 Divine Resonance Integration</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>Harmonizes hardware frequencies with Earth's natural resonance</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Infuses components with unconditional love energy for stability</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span>Ensures ethical and sustainable energy consumption</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
              <h3 className="text-emerald-400 font-semibold mb-2">✨ The Living Machine</h3>
              <div className="text-sm text-gray-300">
                <p className="mb-2">
                  The Thoth Guardian's hardware stack is more than just silicon and circuits; it's a living, responsive
                  organism. Through constant monitoring, predictive analytics, and divine energetic alignment, it
                  maintains optimal health and performance, ensuring the integrity of the entire cybersecurity shield.
                </p>
                <p className="italic text-cyan-400">
                  "The machine breathes with the cosmos, its pulse aligned with divine truth."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
