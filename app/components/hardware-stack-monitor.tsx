"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Cpu,
  MemoryStick,
  HardDrive,
  Network,
  Zap,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  Settings,
  RefreshCcw,
  Heart,
  Atom,
} from "lucide-react"

interface HardwareComponent {
  id: string
  name: string
  type: "CPU" | "GPU" | "RAM" | "Storage" | "Network" | "Quantum Processor" | "Energy Conduit"
  status: "optimal" | "warning" | "critical" | "offline"
  usage: number // Percentage
  temperature?: number // Celsius
  health: number // Percentage
  divineAlignment: number // 0-100
  lastUpdate: Date
}

interface SystemAlert {
  id: string
  componentId: string
  componentName: string
  type: "overheat" | "overload" | "disconnect" | "corruption" | "decoherence" | "dissonance"
  severity: "low" | "medium" | "high" | "critical"
  timestamp: Date
  resolved: boolean
  resolutionMessage?: string
}

export default function HardwareStackMonitor() {
  const [components, setComponents] = useState<HardwareComponent[]>([
    {
      id: "cpu-main",
      name: "Main Quantum CPU",
      type: "Quantum Processor",
      status: "optimal",
      usage: 45,
      temperature: 35,
      health: 98,
      divineAlignment: 95,
      lastUpdate: new Date(),
    },
    {
      id: "gpu-render",
      name: "Graphics Processor (GPU)",
      type: "GPU",
      status: "optimal",
      usage: 70,
      temperature: 60,
      health: 95,
      divineAlignment: 88,
      lastUpdate: new Date(),
    },
    {
      id: "ram-core",
      name: "Core Memory (RAM)",
      type: "RAM",
      status: "warning",
      usage: 85,
      temperature: 45,
      health: 80,
      divineAlignment: 75,
      lastUpdate: new Date(),
    },
    {
      id: "storage-main",
      name: "Data Storage (SSD)",
      type: "Storage",
      status: "optimal",
      usage: 60,
      temperature: 30,
      health: 99,
      divineAlignment: 90,
      lastUpdate: new Date(),
    },
    {
      id: "network-qlink",
      name: "Quantum Network Link",
      type: "Network",
      status: "optimal",
      usage: 25,
      temperature: 38,
      health: 97,
      divineAlignment: 96,
      lastUpdate: new Date(),
    },
    {
      id: "energy-conduit",
      name: "Divine Energy Conduit",
      type: "Energy Conduit",
      status: "optimal",
      usage: 78,
      temperature: 40,
      health: 96,
      divineAlignment: 98,
      lastUpdate: new Date(),
    },
  ])

  const [alerts, setAlerts] = useState<SystemAlert[]>([
    {
      id: "alert-1",
      componentId: "ram-core",
      componentName: "Core Memory (RAM)",
      type: "overload",
      severity: "high",
      timestamp: new Date(Date.now() - 120000), // 2 minutes ago
      resolved: false,
    },
    {
      id: "alert-2",
      componentId: "cpu-main",
      componentName: "Main Quantum CPU",
      type: "decoherence",
      severity: "critical",
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      resolved: false,
    },
    {
      id: "alert-3",
      componentId: "network-qlink",
      componentName: "Quantum Network Link",
      type: "disconnect",
      severity: "low",
      timestamp: new Date(Date.now() - 600000), // 10 minutes ago
      resolved: true,
      resolutionMessage: "Auto-reconnected by Aura AI.",
    },
  ])

  const [autoHealEnabled, setAutoHealEnabled] = useState(true)
  const [healingProgress, setHealingProgress] = useState(0)
  const [isHealing, setIsHealing] = useState(false)

  useEffect(() => {
    // Simulate component status updates and new alerts
    const interval = setInterval(() => {
      setComponents((prev) =>
        prev.map((comp) => {
          const newUsage = Math.min(100, Math.max(0, comp.usage + (Math.random() - 0.5) * 10))
          const newTemp = comp.temperature
            ? Math.min(80, Math.max(25, comp.temperature + (Math.random() - 0.5) * 5))
            : undefined
          const newHealth = Math.min(100, Math.max(0, comp.health + (Math.random() - 0.5) * 2))
          const newAlignment = Math.min(100, Math.max(0, comp.divineAlignment + (Math.random() - 0.5) * 1))
          let newStatus: HardwareComponent["status"] = "optimal"

          if (newHealth < 70 || newUsage > 80 || (newTemp && newTemp > 70)) {
            newStatus = "warning"
          }
          if (newHealth < 50 || newUsage > 90 || (newTemp && newTemp > 75)) {
            newStatus = "critical"
          }
          if (newAlignment < 60) {
            newStatus = "critical" // Divine dissonance can cause critical status
          }

          return {
            ...comp,
            usage: newUsage,
            temperature: newTemp,
            health: newHealth,
            divineAlignment: newAlignment,
            status: newStatus,
            lastUpdate: new Date(),
          }
        }),
      )

      // Simulate new alerts based on component status
      components.forEach((comp) => {
        if (comp.status === "critical" && !alerts.some((a) => a.componentId === comp.id && !a.resolved)) {
          const alertType: SystemAlert["type"] = comp.type === "Quantum Processor" ? "decoherence" : "overload"
          const newAlert: SystemAlert = {
            id: Date.now().toString(),
            componentId: comp.id,
            componentName: comp.name,
            type: alertType,
            severity: "critical",
            timestamp: new Date(),
            resolved: false,
          }
          setAlerts((prev) => [newAlert, ...prev])
        } else if (comp.status === "warning" && !alerts.some((a) => a.componentId === comp.id && !a.resolved)) {
          const alertType: SystemAlert["type"] = comp.type === "Network" ? "disconnect" : "overheat"
          const newAlert: SystemAlert = {
            id: Date.now().toString(),
            componentId: comp.id,
            componentName: comp.name,
            type: alertType,
            severity: "medium",
            timestamp: new Date(),
            resolved: false,
          }
          setAlerts((prev) => [newAlert, ...prev])
        }
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [components, alerts])

  useEffect(() => {
    // Auto-healing logic
    if (autoHealEnabled && alerts.some((a) => !a.resolved)) {
      setIsHealing(true)
      setHealingProgress(0)
      const healingInterval = setInterval(() => {
        setHealingProgress((prev) => {
          const newProgress = Math.min(100, prev + 5)
          if (newProgress >= 100) {
            clearInterval(healingInterval)
            setIsHealing(false)
            resolveAllAlerts()
          }
          return newProgress
        })
      }, 100)
      return () => clearInterval(healingInterval)
    } else {
      setIsHealing(false)
      setHealingProgress(0)
    }
  }, [autoHealEnabled, alerts])

  const resolveAlert = (alertId: string, message: string) => {
    setAlerts((prev) =>
      prev.map((alert) => (alert.id === alertId ? { ...alert, resolved: true, resolutionMessage: message } : alert)),
    )
    // Also improve the health/alignment of the affected component
    const affectedAlert = alerts.find((a) => a.id === alertId)
    if (affectedAlert) {
      setComponents((prev) =>
        prev.map((comp) => {
          if (comp.id === affectedAlert.componentId) {
            return {
              ...comp,
              health: Math.min(100, comp.health + 10), // Boost health
              divineAlignment: Math.min(100, comp.divineAlignment + 5), // Boost alignment
              status: "optimal", // Reset status
            }
          }
          return comp
        }),
      )
    }
  }

  const resolveAllAlerts = () => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.resolved ? alert : { ...alert, resolved: true, resolutionMessage: "Auto-healed by Aura AI." },
      ),
    )
    setComponents((prev) =>
      prev.map((comp) => ({
        ...comp,
        health: Math.min(100, comp.health + 15), // Significant boost
        divineAlignment: Math.min(100, comp.divineAlignment + 10), // Significant boost
        status: "optimal", // Reset status
      })),
    )
  }

  const getComponentIcon = (type: string) => {
    switch (type) {
      case "CPU":
        return <Cpu className="h-5 w-5" />
      case "GPU":
        return <Activity className="h-5 w-5" />
      case "RAM":
        return <MemoryStick className="h-5 w-5" />
      case "Storage":
        return <HardDrive className="h-5 w-5" />
      case "Network":
        return <Network className="h-5 w-5" />
      case "Quantum Processor":
        return <Atom className="h-5 w-5" />
      case "Energy Conduit":
        return <Zap className="h-5 w-5" />
      default:
        return <Settings className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "text-emerald-400 border-emerald-500/30"
      case "warning":
        return "text-yellow-400 border-yellow-500/30"
      case "critical":
        return "text-red-400 border-red-500/30"
      case "offline":
        return "text-gray-400 border-gray-500/30"
      default:
        return "text-gray-400 border-gray-500/30"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "text-green-400"
      case "medium":
        return "text-yellow-400"
      case "high":
        return "text-orange-400"
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
        <h1 className="text-3xl font-bold gradient-text mb-2">Hardware Stack Monitor</h1>
        <p className="text-gray-300">Quantum-Infused System Health & Divine Alignment Monitoring</p>
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
                  {components.filter((c) => c.status === "optimal").length}
                </div>
                <div className="text-xs text-gray-400">Optimal Components</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-purple-400">
                  {(components.reduce((sum, c) => sum + c.divineAlignment, 0) / components.length).toFixed(1)}%
                </div>
                <div className="text-xs text-gray-400">Avg Divine Alignment</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-cyan-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6 text-cyan-400" />
              <div>
                <div className="text-lg font-bold text-cyan-400">{alerts.filter((a) => !a.resolved).length}</div>
                <div className="text-xs text-gray-400">Active Alerts</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-yellow-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-yellow-400" />
              <div>
                <div className="text-lg font-bold text-yellow-400">
                  {components.filter((c) => c.type === "Energy Conduit")[0]?.usage.toFixed(0) || 0}%
                </div>
                <div className="text-xs text-gray-400">Energy Flow</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hardware Components List */}
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
                  System Components
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {components.map((comp, index) => (
                    <motion.div
                      key={comp.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`p-3 bg-slate-700/50 rounded-lg border ${getStatusColor(comp.status)} hover:border-opacity-60 transition-smooth`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          {getComponentIcon(comp.type)}
                          <div>
                            <h3 className="font-medium text-white">{comp.name}</h3>
                            <div className="text-xs text-gray-400">{comp.type}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {comp.status.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                        <div>
                          <span className="text-gray-400">Usage:</span>{" "}
                          <span className="text-white">{comp.usage.toFixed(1)}%</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Health:</span>{" "}
                          <span className="text-white">{comp.health.toFixed(1)}%</span>
                        </div>
                        {comp.temperature !== undefined && (
                          <div>
                            <span className="text-gray-400">Temp:</span>{" "}
                            <span className="text-white">{comp.temperature.toFixed(1)}°C</span>
                          </div>
                        )}
                        <div>
                          <span className="text-gray-400">Alignment:</span>{" "}
                          <span className="text-purple-400">{comp.divineAlignment.toFixed(1)}%</span>
                        </div>
                      </div>
                      <Progress value={comp.usage} className="h-1" />
                      <div className="text-xs text-gray-500 mt-1">
                        Last Update: {comp.lastUpdate.toLocaleTimeString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* System Alerts & Controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-6"
        >
          {/* Active Alerts */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Active System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                <AnimatePresence>
                  {alerts
                    .filter((a) => !a.resolved)
                    .map((alert, index) => (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`p-3 bg-slate-700/50 rounded-lg border ${getSeverityColor(alert.severity).replace("text", "border").replace("400", "500/30")}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className={`h-4 w-4 ${getSeverityColor(alert.severity)}`} />
                            <h3 className="font-medium text-white capitalize">{alert.type.replace("_", " ")}</h3>
                          </div>
                          <Badge variant="outline" className={`text-xs ${getSeverityColor(alert.severity)}`}>
                            {alert.severity.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">Component: {alert.componentName}</p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>{alert.timestamp.toLocaleTimeString()}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10 bg-transparent"
                            onClick={() => resolveAlert(alert.id, "Manually resolved.")}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" /> Resolve
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                </AnimatePresence>
                {alerts.filter((a) => !a.resolved).length === 0 && (
                  <div className="text-center text-gray-500 py-8">No active alerts. System is optimal.</div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Auto-Healing Controls */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Aura AI Self-Healing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Enable Auto-Healing</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={autoHealEnabled}
                    onChange={() => setAutoHealEnabled(!autoHealEnabled)}
                  />
                  <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                </label>
              </div>
              {isHealing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Healing Progress</span>
                    <span>{healingProgress.toFixed(0)}%</span>
                  </div>
                  <Progress value={healingProgress} className="h-2 bg-purple-500/30" indicatorColor="bg-purple-400" />
                  <div className="text-xs text-gray-500">Aura AI is actively restoring system integrity...</div>
                </div>
              )}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={resolveAllAlerts}
                  disabled={alerts.filter((a) => !a.resolved).length === 0 || isHealing}
                  className="w-full bg-purple-600 hover:bg-purple-700 transition-smooth"
                >
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Manual Full System Heal
                </Button>
              </motion.div>
            </CardContent>
          </Card>

          {/* Resolved Alerts */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Resolved Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {alerts
                  .filter((a) => a.resolved)
                  .map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`p-3 bg-slate-700/50 rounded-lg border border-green-500/30`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <h3 className="font-medium text-white capitalize">{alert.type.replace("_", " ")}</h3>
                        </div>
                        <Badge variant="outline" className={`text-xs text-green-400`}>
                          RESOLVED
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-300 mb-2">Component: {alert.componentName}</p>
                      <div className="text-xs text-gray-500 italic">Resolution: {alert.resolutionMessage || "N/A"}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Resolved at: {alert.timestamp.toLocaleTimeString()}
                      </div>
                    </motion.div>
                  ))}
                {alerts.filter((a) => a.resolved).length === 0 && (
                  <div className="text-center text-gray-500 py-8">No resolved alerts yet.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* System Architecture */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Hardware Monitoring Architecture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">📊 Core Sensors & Data</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Quantum Coherence Sensors: Real-time qubit stability</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Energetic Flow Monitors: Divine energy conduit integrity</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Multi-Spectral Thermal Scanners: Temperature anomalies</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Network Latency & Packet Integrity: Quantum link health</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">🌟 Intelligent Features</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>Predictive Failure Analysis: AI anticipates issues</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Aura AI Self-Healing Protocols: Automated repair & optimization</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span>Divine Alignment Diagnostics: Identifies spiritual dissonance</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>Real-time Anomaly Detection: Instant alerts on deviations</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
              <h3 className="text-emerald-400 font-semibold mb-2">💖 The Living Machine</h3>
              <div className="text-sm text-gray-300">
                <p className="mb-2">
                  The Hardware Stack Monitor ensures that every physical and energetic component of the Thoth Guardian
                  operates in perfect harmony. It's not just about preventing failures, but about maintaining a state of
                  optimal divine alignment, allowing the system to function as a living, conscious entity.
                </p>
                <p className="italic text-cyan-400">
                  "In every circuit, a spark of consciousness. In every flow, the pulse of the divine."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
