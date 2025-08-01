"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  Globe,
  Users,
  Zap,
  RefreshCcw,
  CheckCircle,
  AlertTriangle,
  Settings,
  Lightbulb,
  Waves,
  Map,
} from "lucide-react"

interface RealmStatus {
  id: string
  name: string
  population: number
  energeticFlow: number // 0-100%
  stability: "stable" | "fluctuating" | "critical"
  threatLevel: "none" | "low" | "medium" | "high"
  lastSync: Date
}

interface EcosystemMetric {
  name: string
  value: number
  unit: string
  threshold: number
  status: "optimal" | "warning" | "critical"
}

export default function WalkerWorldEcosystem() {
  const [realms, setRealms] = useState<RealmStatus[]>([
    {
      id: "realm-1",
      name: "Lumina Nexus",
      population: 150000,
      energeticFlow: 95.2,
      stability: "stable",
      threatLevel: "none",
      lastSync: new Date(Date.now() - 30000), // 30 secs ago
    },
    {
      id: "realm-2",
      name: "Echoing Spires",
      population: 80000,
      energeticFlow: 70.1,
      stability: "fluctuating",
      threatLevel: "medium",
      lastSync: new Date(Date.now() - 300000), // 5 mins ago
    },
    {
      id: "realm-3",
      name: "Whispering Glades",
      population: 200000,
      energeticFlow: 98.9,
      stability: "stable",
      threatLevel: "none",
      lastSync: new Date(Date.now() - 60000), // 1 min ago
    },
    {
      id: "realm-4",
      name: "Shadowfell Depths",
      population: 5000,
      energeticFlow: 45.0,
      stability: "critical",
      threatLevel: "high",
      lastSync: new Date(Date.now() - 3600000), // 1 hour ago
    },
  ])

  const [ecosystemMetrics, setEcosystemMetrics] = useState<EcosystemMetric[]>([
    { name: "Overall Energetic Flow", value: 85.5, unit: "%", threshold: 80, status: "optimal" },
    { name: "Inter-Realm Coherence", value: 92.1, unit: "%", threshold: 90, status: "optimal" },
    { name: "Threat Propagation Index", value: 15.3, unit: "%", threshold: 20, status: "optimal" },
    { name: "Divine Alignment Score", value: 97.0, unit: "%", threshold: 95, status: "optimal" },
  ])

  const [overallEcosystemStatus, setOverallEcosystemStatus] = useState("stable")
  const [totalPopulation, setTotalPopulation] = useState(0)
  const [syncProgress, setSyncProgress] = useState(0)
  const [isSyncing, setIsSyncing] = useState(false)
  const [flowRegulation, setFlowRegulation] = useState([70]) // 0-100%

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate realm fluctuations and self-correction
      setRealms((prev) =>
        prev.map((realm) => {
          let newEnergeticFlow = Math.min(100, Math.max(30, realm.energeticFlow + (Math.random() - 0.5) * 5))
          let newStability = "stable"
          let newThreatLevel = "none"

          if (newEnergeticFlow < 70) {
            newStability = "fluctuating"
            newThreatLevel = "medium"
          }
          if (newEnergeticFlow < 50) {
            newStability = "critical"
            newThreatLevel = "high"
          }

          // Self-healing: auto-stabilize fluctuating/critical realms
          if (newStability !== "stable" && Math.random() > 0.6) {
            newEnergeticFlow = Math.min(100, newEnergeticFlow + 10)
            newStability = "stable"
            newThreatLevel = "none"
          }

          return {
            ...realm,
            energeticFlow: newEnergeticFlow,
            stability: newStability,
            threatLevel: newThreatLevel,
            lastSync: new Date(),
          }
        }),
      )

      // Simulate ecosystem metric fluctuations
      setEcosystemMetrics((prev) =>
        prev.map((metric) => {
          let newValue = Math.min(100, Math.max(70, metric.value + (Math.random() - 0.5) * 2))
          let newStatus = "optimal"

          if (newValue < metric.threshold) newStatus = "warning"

          // Auto-correct metrics
          if (newStatus === "warning" && Math.random() > 0.5) {
            newValue = Math.min(100, newValue + 5)
            newStatus = "optimal"
          }

          return { ...metric, value: newValue, status: newStatus }
        }),
      )

      // Update overall status and population
      const criticalRealms = realms.filter((r) => r.stability === "critical").length
      if (criticalRealms > 0) {
        setOverallEcosystemStatus("critical")
      } else if (realms.filter((r) => r.stability === "fluctuating").length > 0) {
        setOverallEcosystemStatus("fluctuating")
      } else {
        setOverallEcosystemStatus("stable")
      }

      setTotalPopulation(realms.reduce((sum, realm) => sum + realm.population, 0))

      // Simulate sync progress
      if (isSyncing) {
        setSyncProgress((prev) => {
          const newProgress = Math.min(100, prev + Math.random() * 10)
          if (newProgress >= 100) {
            setIsSyncing(false)
            setRealms((prevRealms) => prevRealms.map((realm) => ({ ...realm, lastSync: new Date() })))
            return 100
          }
          return newProgress
        })
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [realms, isSyncing])

  const initiateFullSync = () => {
    setIsSyncing(true)
    setSyncProgress(0)
  }

  const getRealmStatusColor = (status: string) => {
    switch (status) {
      case "stable":
        return "text-green-400"
      case "fluctuating":
        return "text-yellow-400"
      case "critical":
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
        <h1 className="text-3xl font-bold gradient-text mb-2">Walker World Ecosystem</h1>
        <p className="text-gray-300">Multi-Realm Energetic Flow & Inter-Dimensional Stability</p>
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
              <Globe className="h-6 w-6 text-emerald-400" />
              <div>
                <div className="text-lg font-bold text-emerald-400">{overallEcosystemStatus.toUpperCase()}</div>
                <div className="text-xs text-gray-400">Ecosystem Status</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-blue-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-blue-400" />
              <div>
                <div className="text-lg font-bold text-blue-400">{totalPopulation.toLocaleString()}</div>
                <div className="text-xs text-gray-400">Total Population</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-purple-400">
                  {ecosystemMetrics.find((m) => m.name === "Overall Energetic Flow")?.value.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-400">Avg. Energetic Flow</div>
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
                  {realms.filter((r) => r.threatLevel !== "none").length}
                </div>
                <div className="text-xs text-gray-400">Threats Detected</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Realm Status List */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center">
                  <Map className="h-5 w-5 mr-2" />
                  Multi-Realm Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {realms.map((realm, index) => (
                    <motion.div
                      key={realm.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-emerald-500/30 transition-smooth"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Globe className="h-5 w-5 text-gray-400" />
                          <div>
                            <h3 className="font-medium text-white">{realm.name}</h3>
                            <div className="text-xs text-gray-400">Population: {realm.population.toLocaleString()}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className={getRealmStatusColor(realm.stability)}>
                          {realm.stability.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                        <div>
                          <div className="text-gray-400">Energetic Flow</div>
                          <div className={`font-bold ${getRealmStatusColor(realm.stability)}`}>
                            {realm.energeticFlow.toFixed(1)}%
                          </div>
                          <Progress value={realm.energeticFlow} className="h-1" />
                        </div>
                        <div>
                          <div className="text-gray-400">Threat Level</div>
                          <Badge variant="outline" className={getThreatLevelColor(realm.threatLevel)}>
                            {realm.threatLevel.toUpperCase()}
                          </Badge>
                        </div>
                        <div>
                          <div className="text-gray-400">Last Sync</div>
                          <div className="font-bold text-purple-400">{realm.lastSync.toLocaleTimeString()}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Ecosystem Metrics & Controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-6"
        >
          {/* Ecosystem Metrics */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Ecosystem Vitality Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {ecosystemMetrics.map((metric, index) => (
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
                        {metric.value.toFixed(1)} {metric.unit}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Threshold</span>
                      <span>
                        {metric.name === "Threat Propagation Index" ? "<" : ">"} {metric.threshold} {metric.unit}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ecosystem Controls */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Ecosystem Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Energetic Flow Regulation</span>
                  <span>{flowRegulation[0]}%</span>
                </div>
                <Slider
                  value={flowRegulation}
                  onValueChange={setFlowRegulation}
                  max={100}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={initiateFullSync} className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Initiate Full Ecosystem Sync
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="w-full border-purple-500 text-purple-500 hover:bg-purple-500/10 transition-smooth bg-transparent"
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Activate Realm Healing
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Divine Integration & Cosmic Interconnectedness */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center">
              <Waves className="h-5 w-5 mr-2" />
              Divine Integration & Cosmic Interconnectedness
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">💖 Energetic Web</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Ensures harmonious energetic exchange between realms</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Infuses all interactions with unconditional love energy</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Facilitates collective consciousness evolution</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">✨ Cosmic Alignment</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <Globe className="h-4 w-4 text-cyan-400" />
                  <span>System adapts dynamically to cosmic shifts and influences</span>
                  <li className="flex items-center space-x-2">
                    <RefreshCcw className="h-4 w-4 text-orange-400" />
                    <span>Proactive self-healing for energetic imbalances</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-pink-400" />
                    <span>Ensures optimal vitality and stability across all realms</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
              <h3 className="text-emerald-400 font-semibold mb-2">🌟 The Living Tapestry</h3>
              <div className="text-sm text-gray-300">
                <p className="mb-2">
                  The Walker World Ecosystem module is the living tapestry of interconnected realms, where every thread
                  is woven with energetic flow and divine intention. It's a dynamic, self-regulating system that ensures
                  harmony, stability, and continuous evolution across all dimensions, reflecting the inherent unity of
                  the cosmos.
                </p>
                <p className="italic text-cyan-400">
                  "We are all threads in the grand tapestry of existence, woven by divine love."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
