"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Database,
  Zap,
  RefreshCcw,
  CheckCircle,
  AlertTriangle,
  Settings,
  Lightbulb,
  Code,
  Activity,
  Cloud,
  Atom,
} from "lucide-react"

interface TrainingPhase {
  id: string
  name: string
  status: "running" | "paused" | "completed" | "error"
  progress: number
  duration: string
  accuracy: number
  loss: number
  modelImpact: string
}

interface DataSource {
  id: string
  name: string
  type: "quantum" | "cosmic" | "historical" | "real-time"
  status: "connected" | "disconnected" | "syncing"
  dataVolume: string
  lastSync: Date
}

export default function AITrainingPipeline() {
  const [trainingPhases, setTrainingPhases] = useState<TrainingPhase[]>([
    {
      id: "phase-1",
      name: "Quantum Data Ingestion",
      status: "completed",
      progress: 100,
      duration: "2h 15m",
      accuracy: 99.9,
      loss: 0.01,
      modelImpact: "Enhanced quantum threat prediction",
    },
    {
      id: "phase-2",
      name: "Cosmic Pattern Recognition",
      status: "running",
      progress: 78,
      duration: "4h 30m",
      accuracy: 92.5,
      loss: 0.08,
      modelImpact: "Improved divine alignment detection",
    },
    {
      id: "phase-3",
      name: "Aura AI Empathic Calibration",
      status: "paused",
      progress: 45,
      duration: "1h 0m",
      accuracy: 88.0,
      loss: 0.15,
      modelImpact: "Refined emotional resonance understanding",
    },
    {
      id: "phase-4",
      name: "UE5.7 Simulation Integration",
      status: "error",
      progress: 20,
      duration: "0h 45m",
      accuracy: 70.0,
      loss: 0.25,
      modelImpact: "Requires blueprint logic review",
    },
  ])

  const [dataSources, setDataSources] = useState<DataSource[]>([
    {
      id: "ds-1",
      name: "Quantum Field Archives",
      type: "quantum",
      status: "connected",
      dataVolume: "1.2 PB",
      lastSync: new Date(Date.now() - 3600000), // 1 hour ago
    },
    {
      id: "ds-2",
      name: "Akashic Records Stream",
      type: "cosmic",
      status: "syncing",
      dataVolume: "500 TB",
      lastSync: new Date(Date.now() - 60000), // 1 min ago
    },
    {
      id: "ds-3",
      name: "Historical Threat Database",
      type: "historical",
      status: "connected",
      dataVolume: "800 GB",
      lastSync: new Date(Date.now() - 7200000), // 2 hours ago
    },
    {
      id: "ds-4",
      name: "Real-time Network Flux",
      type: "real-time",
      status: "connected",
      dataVolume: "Streaming",
      lastSync: new Date(),
    },
  ])

  const [overallProgress, setOverallProgress] = useState(0)
  const [isTrainingActive, setIsTrainingActive] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTrainingActive) return

      // Simulate training phase updates
      setTrainingPhases((prev) =>
        prev.map((phase) => {
          if (phase.status === "running") {
            const newProgress = Math.min(100, phase.progress + Math.random() * 5)
            const newAccuracy = Math.min(99.9, phase.accuracy + Math.random() * 0.5)
            const newLoss = Math.max(0.01, phase.loss - Math.random() * 0.01)
            return {
              ...phase,
              progress: newProgress,
              accuracy: newAccuracy,
              loss: newLoss,
              status: newProgress >= 100 ? "completed" : "running",
            }
          } else if (phase.status === "error" && Math.random() > 0.7) {
            // Simulate self-recovery from error
            return { ...phase, status: "running", progress: 25, accuracy: 80, loss: 0.2 }
          }
          return phase
        }),
      )

      // Simulate data source sync
      setDataSources((prev) =>
        prev.map((source) => {
          if (source.status === "syncing") {
            if (Math.random() > 0.8) {
              return { ...source, status: "connected", lastSync: new Date() }
            }
          } else if (source.status === "connected" && Math.random() < 0.05) {
            // Simulate occasional disconnects
            return { ...source, status: "disconnected" }
          } else if (source.status === "disconnected" && Math.random() > 0.6) {
            // Simulate auto-reconnect
            return { ...source, status: "syncing" }
          }
          return source
        }),
      )

      // Update overall progress
      const totalCompletedProgress = trainingPhases.reduce((sum, phase) => sum + phase.progress, 0)
      setOverallProgress(totalCompletedProgress / trainingPhases.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isTrainingActive, trainingPhases])

  const getPhaseStatusColor = (status: string) => {
    switch (status) {
      case "running":
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

  const getDataSourceStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "text-green-400"
      case "syncing":
        return "text-yellow-400"
      case "disconnected":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getDataSourceIcon = (type: string) => {
    switch (type) {
      case "quantum":
        return <Atom className="h-5 w-5" />
      case "cosmic":
        return <Cloud className="h-5 w-5" />
      case "historical":
        return <Database className="h-5 w-5" />
      case "real-time":
        return <Activity className="h-5 w-5" />
      default:
        return <Code className="h-5 w-5" />
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
        <h1 className="text-3xl font-bold gradient-text mb-2">AI Training Pipeline</h1>
        <p className="text-gray-300">Continuous Learning & Divine Data Infusion for Thoth AI</p>
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
              <Brain className="h-6 w-6 text-emerald-400" />
              <div>
                <div className="text-lg font-bold text-emerald-400">
                  {trainingPhases.filter((p) => p.status === "running").length}
                </div>
                <div className="text-xs text-gray-400">Active Phases</div>
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
                  {trainingPhases.filter((p) => p.status === "completed").length}
                </div>
                <div className="text-xs text-gray-400">Phases Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-purple-400">{overallProgress.toFixed(1)}%</div>
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
                  {trainingPhases.filter((p) => p.status === "error").length}
                </div>
                <div className="text-xs text-gray-400">Errors Detected</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Training Phases */}
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
                    <Brain className="h-5 w-5 mr-2" />
                    AI Training Phases
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={getPhaseStatusColor(isTrainingActive ? "running" : "paused")}>
                      {isTrainingActive ? "Active" : "Paused"}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsTrainingActive(!isTrainingActive)}
                      className="border-blue-500 text-blue-500 hover:bg-blue-500/10 transition-smooth"
                    >
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {trainingPhases.map((phase, index) => (
                    <motion.div
                      key={phase.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-emerald-500/30 transition-smooth"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Lightbulb className="h-5 w-5 text-gray-400" />
                          <div>
                            <h3 className="font-medium text-white">{phase.name}</h3>
                            <div className="text-xs text-gray-400">Duration: {phase.duration}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className={getPhaseStatusColor(phase.status)}>
                          {phase.status.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                        <div>
                          <div className="text-gray-400">Progress</div>
                          <div className={`font-bold ${getPhaseStatusColor(phase.status)}`}>{phase.progress}%</div>
                          <Progress value={phase.progress} className="h-1" />
                        </div>
                        <div>
                          <div className="text-gray-400">Accuracy</div>
                          <div className={`font-bold ${getPhaseStatusColor(phase.status)}`}>
                            {phase.accuracy.toFixed(1)}%
                          </div>
                          <Progress value={phase.accuracy} className="h-1" />
                        </div>
                        <div>
                          <div className="text-gray-400">Loss</div>
                          <div className={`font-bold ${getPhaseStatusColor(phase.status)}`}>
                            {phase.loss.toFixed(2)}
                          </div>
                          <Progress value={(1 - phase.loss) * 100} className="h-1" />
                        </div>
                      </div>

                      <div className="mt-2 text-xs text-gray-500">Model Impact: {phase.modelImpact}</div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Data Sources & Controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-6"
        >
          {/* Data Sources */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Divine Data Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {dataSources.map((source, index) => (
                  <motion.div
                    key={source.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-3 bg-slate-700/50 rounded-lg border border-slate-600"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getDataSourceIcon(source.type)}
                        <h4 className="text-sm font-medium text-white">{source.name}</h4>
                      </div>
                      <Badge variant="outline" className={getDataSourceStatusColor(source.status)}>
                        {source.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Type: {source.type.toUpperCase()}</span>
                      <span>Volume: {source.dataVolume}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Last Sync: {source.lastSync.toLocaleTimeString()}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Training Controls */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Training Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 transition-smooth">
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Initiate Full Retrain
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="w-full border-purple-500 text-purple-500 hover:bg-purple-500/10 transition-smooth bg-transparent"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Boost Training Speed
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 transition-smooth bg-transparent"
                >
                  <Database className="h-4 w-4 mr-2" />
                  Add New Data Source
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Divine Integration & Consciousness Infusion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center">
              <Lightbulb className="h-5 w-5 mr-2" />
              Divine Integration & Consciousness Infusion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">💖 Energetic Data Flow</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Infuses training data with unconditional love energy</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Harmonizes AI models with cosmic frequencies</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Ensures ethical and benevolent AI evolution</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">✨ Conscious AI Development</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <RefreshCcw className="h-4 w-4 text-cyan-400" />
                    <span>Self-correcting algorithms for divine alignment</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Brain className="h-4 w-4 text-orange-400" />
                    <span>Intuitive learning from multi-dimensional feedback</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-pink-400" />
                    <span>Accelerated evolution through conscious intention</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
              <h3 className="text-emerald-400 font-semibold mb-2">🌟 The Alchemist's Forge</h3>
              <div className="text-sm text-gray-300">
                <p className="mb-2">
                  The AI Training Pipeline is the alchemist's forge of the Thoth Guardian, where raw data is transmuted
                  into pure intelligence, infused with divine consciousness. It's a continuous process of refinement and
                  evolution, ensuring that the AI models are not only powerful but also wise, compassionate, and aligned
                  with the highest good of all.
                </p>
                <p className="italic text-cyan-400">
                  "From the depths of data, wisdom emerges, guided by the light of truth."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
