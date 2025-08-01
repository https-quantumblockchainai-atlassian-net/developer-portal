"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Mic,
  FileText,
  ImageIcon,
  Video,
  Brain,
  Network,
  Zap,
  Activity,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Play,
  Pause,
  Settings,
} from "lucide-react"

interface AnalysisStream {
  id: string
  type: "vision" | "audio" | "text" | "video" | "sensor"
  name: string
  status: "active" | "processing" | "idle" | "error"
  confidence: number
  throughput: number
  accuracy: number
  latency: number
}

interface DetectionResult {
  id: string
  timestamp: Date
  type: string
  confidence: number
  description: string
  severity: "low" | "medium" | "high" | "critical"
  source: string
}

export default function MultiModalAnalysis() {
  const [analysisStreams, setAnalysisStreams] = useState<AnalysisStream[]>([
    {
      id: "vision-1",
      type: "vision",
      name: "Computer Vision Pipeline",
      status: "active",
      confidence: 94.7,
      throughput: 120,
      accuracy: 96.2,
      latency: 45,
    },
    {
      id: "audio-1",
      type: "audio",
      name: "Audio Analysis Engine",
      status: "active",
      confidence: 89.3,
      throughput: 85,
      accuracy: 92.8,
      latency: 32,
    },
    {
      id: "text-1",
      type: "text",
      name: "NLP Processing Unit",
      status: "processing",
      confidence: 97.1,
      throughput: 200,
      accuracy: 98.5,
      latency: 28,
    },
    {
      id: "video-1",
      type: "video",
      name: "Video Stream Analyzer",
      status: "active",
      confidence: 91.8,
      throughput: 60,
      accuracy: 94.1,
      latency: 67,
    },
    {
      id: "sensor-1",
      type: "sensor",
      name: "IoT Sensor Network",
      status: "idle",
      confidence: 88.4,
      throughput: 150,
      accuracy: 90.7,
      latency: 15,
    },
  ])

  const [detectionResults, setDetectionResults] = useState<DetectionResult[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [totalProcessed, setTotalProcessed] = useState(0)
  const [averageConfidence, setAverageConfidence] = useState(0)

  useEffect(() => {
    if (!isAnalyzing) return

    const interval = setInterval(() => {
      // Update analysis streams
      setAnalysisStreams((prev) =>
        prev.map((stream) => ({
          ...stream,
          confidence: Math.max(80, Math.min(100, stream.confidence + (Math.random() - 0.5) * 5)),
          throughput: Math.max(10, Math.min(300, stream.throughput + (Math.random() - 0.5) * 20)),
          accuracy: Math.max(85, Math.min(100, stream.accuracy + (Math.random() - 0.5) * 3)),
          latency: Math.max(10, Math.min(100, stream.latency + (Math.random() - 0.5) * 10)),
          status: Math.random() > 0.9 ? "processing" : stream.status === "processing" ? "active" : stream.status,
        })),
      )

      // Generate new detection results
      if (Math.random() > 0.7) {
        const types = [
          "Anomaly Detection",
          "Pattern Recognition",
          "Threat Identification",
          "Behavioral Analysis",
          "Data Correlation",
        ]
        const sources = ["Vision System", "Audio Monitor", "Text Analyzer", "Video Stream", "Sensor Network"]
        const severities = ["low", "medium", "high", "critical"] as const

        const newResult: DetectionResult = {
          id: Date.now().toString(),
          timestamp: new Date(),
          type: types[Math.floor(Math.random() * types.length)],
          confidence: 70 + Math.random() * 30,
          description: "Multi-modal analysis detected potential security event",
          severity: severities[Math.floor(Math.random() * severities.length)],
          source: sources[Math.floor(Math.random() * sources.length)],
        }

        setDetectionResults((prev) => [newResult, ...prev.slice(0, 9)])
      }

      setTotalProcessed((prev) => prev + Math.floor(Math.random() * 10) + 1)
    }, 2000)

    return () => clearInterval(interval)
  }, [isAnalyzing])

  useEffect(() => {
    const activeStreams = analysisStreams.filter((s) => s.status === "active" || s.status === "processing")
    if (activeStreams.length > 0) {
      const avgConf = activeStreams.reduce((acc, s) => acc + s.confidence, 0) / activeStreams.length
      setAverageConfidence(avgConf)
    }
  }, [analysisStreams])

  const getStreamIcon = (type: string) => {
    switch (type) {
      case "vision":
        return <ImageIcon className="h-5 w-5" />
      case "audio":
        return <Mic className="h-5 w-5" />
      case "text":
        return <FileText className="h-5 w-5" />
      case "video":
        return <Video className="h-5 w-5" />
      case "sensor":
        return <Activity className="h-5 w-5" />
      default:
        return <Brain className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400"
      case "processing":
        return "text-blue-400"
      case "idle":
        return "text-yellow-400"
      case "error":
        return "text-red-400"
      default:
        return "text-gray-400"
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
      {/* Analysis Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-emerald-400" />
              <div>
                <div className="text-lg font-bold text-emerald-400">{analysisStreams.length}</div>
                <div className="text-xs text-gray-400">Active Streams</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-cyan-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-6 w-6 text-cyan-400" />
              <div>
                <div className="text-lg font-bold text-cyan-400">{totalProcessed.toLocaleString()}</div>
                <div className="text-xs text-gray-400">Items Processed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-purple-400">{averageConfidence.toFixed(1)}%</div>
                <div className="text-xs text-gray-400">Avg Confidence</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-yellow-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6 text-yellow-400" />
              <div>
                <div className="text-lg font-bold text-yellow-400">{detectionResults.length}</div>
                <div className="text-xs text-gray-400">Recent Detections</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Analysis Streams */}
        <div className="lg:col-span-2 space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <Network className="h-5 w-5 mr-2" />
                    Multi-Modal Analysis Streams
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={getStatusColor(isAnalyzing ? "active" : "idle")}>
                      {isAnalyzing ? "Analyzing" : "Paused"}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsAnalyzing(!isAnalyzing)}
                      className="border-blue-500 text-blue-500 hover:bg-blue-500/10 transition-smooth"
                    >
                      {isAnalyzing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analysisStreams.map((stream, index) => (
                    <motion.div
                      key={stream.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-emerald-500/30 transition-smooth"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={getStatusColor(stream.status)}>{getStreamIcon(stream.type)}</div>
                          <div>
                            <h3 className="font-medium text-white">{stream.name}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {stream.type.toUpperCase()}
                              </Badge>
                              <Badge variant="outline" className={getStatusColor(stream.status)}>
                                {stream.status.toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-emerald-400">{stream.confidence.toFixed(1)}%</div>
                          <div className="text-xs text-gray-400">Confidence</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <div className="text-xs text-gray-400">Throughput</div>
                          <div className="text-sm font-bold text-blue-400">{stream.throughput}/s</div>
                          <Progress value={(stream.throughput / 300) * 100} className="h-1 mt-1" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Accuracy</div>
                          <div className="text-sm font-bold text-green-400">{stream.accuracy.toFixed(1)}%</div>
                          <Progress value={stream.accuracy} className="h-1 mt-1" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Latency</div>
                          <div className="text-sm font-bold text-yellow-400">{stream.latency}ms</div>
                          <Progress value={(stream.latency / 100) * 100} className="h-1 mt-1" />
                        </div>
                      </div>

                      {/* Stream Activity Visualization */}
                      <div className="h-12 bg-slate-900/50 rounded border border-slate-600 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-end justify-end p-1 space-x-px">
                          {Array.from({ length: 30 }).map((_, i) => (
                            <motion.div
                              key={i}
                              className="w-1 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-sm"
                              style={{
                                height: `${Math.random() * 80 + 10}%`,
                              }}
                              animate={{
                                height: stream.status === "active" ? `${Math.random() * 80 + 10}%` : "10%",
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: i * 0.05,
                              }}
                            />
                          ))}
                        </div>
                        <div className="absolute top-1 left-2 text-xs text-gray-400">Activity</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Detection Results and Controls */}
        <div className="space-y-6">
          {/* Recent Detections */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Recent Detections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  <AnimatePresence>
                    {detectionResults.map((result, index) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="p-3 bg-slate-700/50 rounded-lg border border-slate-600"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-sm font-medium text-white">{result.type}</h4>
                          <Badge variant="outline" className={getSeverityColor(result.severity)}>
                            {result.severity.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-300 mb-2">{result.description}</p>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-400">{result.source}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-emerald-400">{result.confidence.toFixed(1)}%</span>
                            <span className="text-gray-400">{result.timestamp.toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {detectionResults.length === 0 && (
                    <div className="text-center py-4 text-gray-400">
                      <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-400" />
                      <p className="text-sm">No recent detections</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Analysis Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Analysis Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 transition-smooth">
                    <Brain className="h-4 w-4 mr-2" />
                    Enhance AI Models
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="w-full border-blue-500 text-blue-500 hover:bg-blue-500/10 transition-smooth bg-transparent"
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Calibrate Vision
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 transition-smooth bg-transparent"
                  >
                    <Mic className="h-4 w-4 mr-2" />
                    Audio Tuning
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="w-full border-purple-500 text-purple-500 hover:bg-purple-500/10 transition-smooth bg-transparent"
                  >
                    <Network className="h-4 w-4 mr-2" />
                    Sync Streams
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="w-full border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 transition-smooth bg-transparent"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Boost Performance
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
