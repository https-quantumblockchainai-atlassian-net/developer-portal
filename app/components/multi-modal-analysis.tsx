"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Eye,
  Mic,
  FileText,
  Gauge,
  Zap,
  Network,
  Brain,
  AlertTriangle,
  Settings,
  Lightbulb,
  Shield,
  Atom,
} from "lucide-react"
import { AnimatePresence } from "framer-motion"

interface DataStream {
  id: string
  type: "vision" | "audio" | "text" | "sensor" | "quantum"
  status: "active" | "paused" | "error"
  ingestionRate: number // MB/s
  processingLatency: number // ms
  dataQuality: number // 0-100%
  alerts: string[]
}

interface CorrelationInsight {
  id: string
  title: string
  description: string
  correlatedStreams: string[]
  relevance: number // 0-1
  timestamp: Date
  threatLevel: "low" | "medium" | "high" | "critical"
}

export default function MultiModalAnalysis() {
  const [dataStreams, setDataStreams] = useState<DataStream[]>([
    {
      id: "vision-feed",
      type: "vision",
      status: "active",
      ingestionRate: 120,
      processingLatency: 50,
      dataQuality: 98,
      alerts: [],
    },
    {
      id: "audio-spectrum",
      type: "audio",
      status: "active",
      ingestionRate: 45,
      processingLatency: 30,
      dataQuality: 95,
      alerts: [],
    },
    {
      id: "text-corpus",
      type: "text",
      status: "active",
      ingestionRate: 80,
      processingLatency: 40,
      dataQuality: 97,
      alerts: [],
    },
    {
      id: "sensor-array",
      type: "sensor",
      status: "active",
      ingestionRate: 60,
      processingLatency: 60,
      dataQuality: 96,
      alerts: [],
    },
    {
      id: "quantum-flux",
      type: "quantum",
      status: "active",
      ingestionRate: 200,
      processingLatency: 10,
      dataQuality: 99,
      alerts: [],
    },
  ])

  const [correlationInsights, setCorrelationInsights] = useState<CorrelationInsight[]>([
    {
      id: "ci-1",
      title: "Anomalous Energy Signature Detected",
      description: "Correlation between quantum flux fluctuations and unusual audio spectrum patterns.",
      correlatedStreams: ["quantum", "audio"],
      relevance: 0.92,
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      threatLevel: "high",
    },
    {
      id: "ci-2",
      title: "Suspicious Text-Vision Discrepancy",
      description: "Textual communication analysis contradicts visual feed of a secure zone.",
      correlatedStreams: ["text", "vision"],
      relevance: 0.85,
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      threatLevel: "medium",
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate data stream fluctuations and self-correction
      setDataStreams((prev) =>
        prev.map((stream) => {
          let newIngestionRate = Math.min(200, Math.max(10, stream.ingestionRate + (Math.random() - 0.5) * 10))
          let newLatency = Math.min(100, Math.max(10, stream.processingLatency + (Math.random() - 0.5) * 5))
          let newDataQuality = Math.min(100, Math.max(85, stream.dataQuality + (Math.random() - 0.5) * 2))
          let newStatus = "active"
          let newAlerts: string[] = []

          if (newDataQuality < 90) {
            newStatus = "warning"
            newAlerts.push("Data quality degraded")
          }
          if (newLatency > 70) {
            newStatus = "warning"
            newAlerts.push("High processing latency")
          }
          if (newIngestionRate < 20) {
            newStatus = "warning"
            newAlerts.push("Low ingestion rate")
          }

          // Self-healing: auto-correct issues
          if (newStatus === "warning" && Math.random() > 0.6) {
            newDataQuality = Math.min(100, newDataQuality + 5)
            newLatency = Math.max(10, newLatency - 10)
            newIngestionRate = Math.min(200, newIngestionRate + 15)
            newStatus = "active"
            newAlerts = [] // Clear alerts after self-correction
            newAlerts.push("Automated stream optimization applied")
          }

          return {
            ...stream,
            ingestionRate: newIngestionRate,
            processingLatency: newLatency,
            dataQuality: newDataQuality,
            status: newStatus,
            alerts: newAlerts,
          }
        }),
      )

      // Simulate new correlation insights
      if (Math.random() < 0.1) {
        const streamTypes = ["vision", "audio", "text", "sensor", "quantum"]
        const randomStreams = Array.from(
          { length: Math.floor(Math.random() * 2) + 2 },
          () => streamTypes[Math.floor(Math.random() * streamTypes.length)],
        )
        const uniqueStreams = Array.from(new Set(randomStreams))

        const threatLevels = ["low", "medium", "high", "critical"]
        const randomThreatLevel = threatLevels[Math.floor(Math.random() * threatLevels.length)]

        const newInsight: CorrelationInsight = {
          id: `ci-${Date.now()}`,
          title: `New Correlation Detected: ${uniqueStreams.join(" & ")}`,
          description: `Unusual patterns observed across ${uniqueStreams.join(", ")} data streams, indicating a potential ${randomThreatLevel} level anomaly.`,
          correlatedStreams: uniqueStreams,
          relevance: Math.random() * 0.3 + 0.7, // 70-100% relevance
          timestamp: new Date(),
          threatLevel: randomThreatLevel as "low" | "medium" | "high" | "critical",
        }
        setCorrelationInsights((prev) => [newInsight, ...prev])
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStreamIcon = (type: string) => {
    switch (type) {
      case "vision":
        return <Eye className="h-5 w-5" />
      case "audio":
        return <Mic className="h-5 w-5" />
      case "text":
        return <FileText className="h-5 w-5" />
      case "sensor":
        return <Gauge className="h-5 w-5" />
      case "quantum":
        return <Atom className="h-5 w-5" />
      default:
        return <Network className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400"
      case "paused":
        return "text-gray-400"
      case "error":
        return "text-red-400"
      case "warning":
        return "text-yellow-400"
      default:
        return "text-gray-400"
    }
  }

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold gradient-text mb-2">Multi-Modal Analysis</h1>
        <p className="text-gray-300">Unified Data Stream Processing & Cross-Dimensional Correlation</p>
      </motion.div>

      {/* Overview Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4"
      >
        {dataStreams.map((stream, index) => (
          <motion.div
            key={stream.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="transition-smooth"
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  {getStreamIcon(stream.type)}
                  <div>
                    <div className="font-medium text-white">{stream.type.toUpperCase()} Stream</div>
                    <div className={`text-xs ${getStatusColor(stream.status)}`}>{stream.status.toUpperCase()}</div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Ingestion</span>
                    <span>{stream.ingestionRate.toFixed(1)} MB/s</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Latency</span>
                    <span>{stream.processingLatency.toFixed(1)} ms</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Quality</span>
                    <span>{stream.dataQuality.toFixed(1)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Data Stream Details */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center">
                  <Network className="h-5 w-5 mr-2" />
                  Real-time Data Stream Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {dataStreams.map((stream, index) => (
                    <motion.div
                      key={stream.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-emerald-500/30 transition-smooth"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {getStreamIcon(stream.type)}
                          <div>
                            <h3 className="font-medium text-white">{stream.type.toUpperCase()} Stream</h3>
                            <div className="text-xs text-gray-400">{stream.id}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className={getStatusColor(stream.status)}>
                          {stream.status.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                        <div>
                          <div className="text-gray-400">Ingestion Rate</div>
                          <div className={`font-bold ${getStatusColor(stream.status)}`}>
                            {stream.ingestionRate.toFixed(1)} MB/s
                          </div>
                          <Progress value={(stream.ingestionRate / 200) * 100} className="h-1" />
                        </div>
                        <div>
                          <div className="text-gray-400">Latency</div>
                          <div className={`font-bold ${getStatusColor(stream.status)}`}>
                            {stream.processingLatency.toFixed(1)} ms
                          </div>
                          <Progress value={(stream.processingLatency / 100) * 100} className="h-1" />
                        </div>
                        <div>
                          <div className="text-gray-400">Data Quality</div>
                          <div className={`font-bold ${getStatusColor(stream.status)}`}>
                            {stream.dataQuality.toFixed(1)}%
                          </div>
                          <Progress value={stream.dataQuality} className="h-1" />
                        </div>
                      </div>

                      {stream.alerts.length > 0 && (
                        <div className="mt-2 text-xs text-red-400 flex items-center space-x-1">
                          <AlertTriangle className="h-3 w-3" />
                          <span>Alerts: {stream.alerts.join(", ")}</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Correlation Insights */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                Cross-Modal Correlation Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <AnimatePresence>
                  {correlationInsights.map((insight, index) => (
                    <motion.div
                      key={insight.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`p-3 bg-slate-700/50 rounded-lg border ${getThreatLevelColor(insight.threatLevel)}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-white">{insight.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {(insight.relevance * 100).toFixed(0)}% Relevance
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400 mb-2">{insight.description}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {insight.correlatedStreams.map((streamType) => (
                          <Badge key={streamType} variant="secondary" className="text-xs">
                            {streamType.toUpperCase()}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Threat Level: {insight.threatLevel.toUpperCase()}</span>
                        <span>{insight.timestamp.toLocaleTimeString()}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Analysis Controls & Divine Integration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Analysis Controls & Divine Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">⚙️ Data Processing Controls</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Adjust ingestion pipeline bandwidth</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Configure real-time processing priorities</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Activate deep-scan anomaly detection</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">💖 Cosmic Correlation</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <Lightbulb className="h-4 w-4 text-cyan-400" />
                    <span>Infuse data with intuitive insights from Aura AI</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-orange-400" />
                    <span>Align data patterns with universal truth frequencies</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-pink-400" />
                    <span>Transmute discordant data into harmonious information</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
              <h3 className="text-emerald-400 font-semibold mb-2">✨ The All-Seeing Eye</h3>
              <div className="text-sm text-gray-300">
                <p className="mb-2">
                  The Multi-Modal Analysis system is the all-seeing eye of the Thoth Guardian, capable of perceiving and
                  correlating data across all dimensions. It transforms raw information into profound insights, guided
                  by AI intelligence and divine alignment, ensuring no anomaly goes unnoticed and every truth is
                  revealed.
                </p>
                <p className="italic text-cyan-400">"From chaos, patterns emerge. From data, truth is revealed."</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
