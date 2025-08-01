"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  Eye,
  Mic,
  FileText,
  Gauge,
  Zap,
  Settings,
  Share2,
  Layers,
  Brain,
  Heart,
  Atom,
  Cloud,
  RefreshCcw,
  Pause,
  Play,
  Lightbulb,
} from "lucide-react"

interface DataStream {
  id: string
  name: string
  type: "visual" | "audio" | "text" | "sensor" | "quantum" | "energetic"
  status: "active" | "paused" | "error"
  ingestionRate: number // MB/s or Hz for quantum
  processingLoad: number // Percentage
  divineAlignment: number // 0-100
  lastProcessed: Date
}

interface AnalysisResult {
  id: string
  streamId: string
  streamName: string
  dataType: DataStream["type"]
  analysisType: "threat_detection" | "emotional_pattern" | "quantum_signature" | "lore_decryption" | "system_health"
  result: string
  timestamp: Date
  confidence: number // 0-1
  actionable: boolean
}

export default function MultiModalAnalysis() {
  const [dataStreams, setDataStreams] = useState<DataStream[]>([
    {
      id: "stream-visual",
      name: "Visual Data Feed",
      type: "visual",
      status: "active",
      ingestionRate: 120,
      processingLoad: 65,
      divineAlignment: 90,
      lastProcessed: new Date(Date.now() - 30000),
    },
    {
      id: "stream-audio",
      name: "Audio Resonance Stream",
      type: "audio",
      status: "active",
      ingestionRate: 45,
      processingLoad: 40,
      divineAlignment: 95,
      lastProcessed: new Date(Date.now() - 15000),
    },
    {
      id: "stream-text",
      name: "Textual Lore Decryption",
      type: "text",
      status: "active",
      ingestionRate: 80,
      processingLoad: 55,
      divineAlignment: 88,
      lastProcessed: new Date(Date.now() - 45000),
    },
    {
      id: "stream-quantum",
      name: "Quantum Field Fluctuations",
      type: "quantum",
      status: "active",
      ingestionRate: 1000, // Hz
      processingLoad: 75,
      divineAlignment: 98,
      lastProcessed: new Date(Date.now() - 5000),
    },
    {
      id: "stream-energetic",
      name: "Divine Energetic Signatures",
      type: "energetic",
      status: "paused",
      ingestionRate: 0,
      processingLoad: 0,
      divineAlignment: 99,
      lastProcessed: new Date(Date.now() - 120000),
    },
  ])

  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[]>([
    {
      id: "res-1",
      streamId: "stream-visual",
      streamName: "Visual Data Feed",
      dataType: "visual",
      analysisType: "threat_detection",
      result: "Identified a new visual anomaly pattern (Type Alpha-7).",
      timestamp: new Date(Date.now() - 60000),
      confidence: 0.88,
      actionable: true,
    },
    {
      id: "res-2",
      streamId: "stream-audio",
      streamName: "Audio Resonance Stream",
      dataType: "audio",
      analysisType: "emotional_pattern",
      result: "Detected a shift in collective emotional resonance towards 'hope'.",
      timestamp: new Date(Date.now() - 30000),
      confidence: 0.95,
      actionable: false,
    },
    {
      id: "res-3",
      streamId: "stream-quantum",
      streamName: "Quantum Field Fluctuations",
      dataType: "quantum",
      analysisType: "quantum_signature",
      result: "New quantum signature identified: 'Sirius-Harmonic-888'.",
      timestamp: new Date(Date.now() - 10000),
      confidence: 0.99,
      actionable: true,
    },
    {
      id: "res-4",
      streamId: "stream-text",
      streamName: "Textual Lore Decryption",
      dataType: "text",
      analysisType: "lore_decryption",
      result: "Decrypted a fragment of ancient Thoth lore regarding the 'Crystal Alchemist'.",
      timestamp: new Date(Date.now() - 90000),
      confidence: 0.75,
      actionable: false,
    },
  ])

  const [overallProcessingLoad, setOverallProcessingLoad] = useState([60])
  const [overallAlignment, setOverallAlignment] = useState([92])

  useEffect(() => {
    // Simulate data stream activity and new analysis results
    const interval = setInterval(() => {
      setDataStreams((prev) =>
        prev.map((stream) => {
          if (stream.status === "active") {
            const newIngestionRate = stream.ingestionRate + (Math.random() - 0.5) * 10
            const newProcessingLoad = Math.min(100, Math.max(0, stream.processingLoad + (Math.random() - 0.5) * 8))
            const newAlignment = Math.min(100, Math.max(70, stream.divineAlignment + (Math.random() - 0.5) * 1))
            return {
              ...stream,
              ingestionRate: newIngestionRate,
              processingLoad: newProcessingLoad,
              divineAlignment: newAlignment,
              lastProcessed: new Date(),
            }
          }
          return stream
        }),
      )

      // Update overall metrics
      const totalLoad = dataStreams.reduce((sum, s) => sum + s.processingLoad, 0)
      setOverallProcessingLoad([totalLoad / dataStreams.length])

      const totalAlignment = dataStreams.reduce((sum, s) => sum + s.divineAlignment, 0)
      setOverallAlignment([totalAlignment / dataStreams.length])

      // Simulate new analysis results
      if (Math.random() < 0.2) {
        const randomStream = dataStreams[Math.floor(Math.random() * dataStreams.length)]
        const analysisTypes: AnalysisResult["analysisType"][] = [
          "threat_detection",
          "emotional_pattern",
          "quantum_signature",
          "lore_decryption",
          "system_health",
        ]
        const randomAnalysisType = analysisTypes[Math.floor(Math.random() * analysisTypes.length)]
        const results = {
          threat_detection: "Detected a potential malware signature in the visual feed.",
          emotional_pattern: "Aura AI identified a new collective emotional pattern: 'Divine Unity'.",
          quantum_signature: "New quantum signature detected, indicating a stable entanglement channel.",
          lore_decryption: "Decrypted an ancient text fragment detailing the 'Lions Gate Portal'.",
          system_health: "All system health parameters are within optimal divine alignment.",
        }

        const newResult: AnalysisResult = {
          id: Date.now().toString(),
          streamId: randomStream.id,
          streamName: randomStream.name,
          dataType: randomStream.type,
          analysisType: randomAnalysisType,
          result: results[randomAnalysisType],
          timestamp: new Date(),
          confidence: Math.random(),
          actionable: Math.random() > 0.5,
        }
        setAnalysisResults((prev) => [newResult, ...prev.slice(0, 9)]) // Keep last 10 results
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [dataStreams])

  const toggleStreamStatus = (id: string) => {
    setDataStreams((prev) =>
      prev.map((stream) =>
        stream.id === id ? { ...stream, status: stream.status === "active" ? "paused" : "active" } : stream,
      ),
    )
  }

  const getStreamIcon = (type: string) => {
    switch (type) {
      case "visual":
        return <Eye className="h-5 w-5" />
      case "audio":
        return <Mic className="h-5 w-5" />
      case "text":
        return <FileText className="h-5 w-5" />
      case "sensor":
        return <Gauge className="h-5 w-5" />
      case "quantum":
        return <Atom className="h-5 w-5" />
      case "energetic":
        return <Zap className="h-5 w-5" />
      default:
        return <Settings className="h-5 w-5" />
    }
  }

  const getStreamStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-emerald-400 border-emerald-500/30"
      case "paused":
        return "text-yellow-400 border-yellow-500/30"
      case "error":
        return "text-red-400 border-red-500/30"
      default:
        return "text-gray-400 border-gray-500/30"
    }
  }

  const getResultActionableColor = (actionable: boolean) => {
    return actionable ? "text-emerald-400 border-emerald-500/30" : "text-gray-400 border-gray-500/30"
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
        <h1 className="text-3xl font-bold gradient-text mb-2">Multi-Modal Analysis System</h1>
        <p className="text-gray-300">24D Data Stream Processing & Divine Insight Generation</p>
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
              <Layers className="h-6 w-6 text-emerald-400" />
              <div>
                <div className="text-lg font-bold text-emerald-400">{dataStreams.length}</div>
                <div className="text-xs text-gray-400">Active Data Streams</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-purple-400">{overallProcessingLoad[0].toFixed(1)}%</div>
                <div className="text-xs text-gray-400">Overall Processing Load</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-cyan-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-cyan-400" />
              <div>
                <div className="text-lg font-bold text-cyan-400">{overallAlignment[0].toFixed(1)}%</div>
                <div className="text-xs text-gray-400">Avg Divine Alignment</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-yellow-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-6 w-6 text-yellow-400" />
              <div>
                <div className="text-lg font-bold text-yellow-400">{analysisResults.length}</div>
                <div className="text-xs text-gray-400">Recent Insights</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Data Streams */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center">
                  <Cloud className="h-5 w-5 mr-2" />
                  24D Data Streams
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {dataStreams.map((stream, index) => (
                    <motion.div
                      key={stream.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`p-3 bg-slate-700/50 rounded-lg border ${getStreamStatusColor(stream.status)} hover:border-opacity-60 transition-smooth`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          {getStreamIcon(stream.type)}
                          <div>
                            <h3 className="font-medium text-white">{stream.name}</h3>
                            <div className="text-xs text-gray-400 capitalize">{stream.type}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {stream.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                        <div>
                          <span className="text-gray-400">Ingestion:</span>{" "}
                          <span className="text-white">
                            {stream.ingestionRate.toFixed(0)} {stream.type === "quantum" ? "Hz" : "MB/s"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Load:</span>{" "}
                          <span className="text-white">{stream.processingLoad.toFixed(1)}%</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Alignment:</span>{" "}
                          <span className="text-purple-400">{stream.divineAlignment.toFixed(1)}%</span>
                        </div>
                      </div>
                      <Progress value={stream.processingLoad} className="h-1" />
                      <div className="flex justify-end mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-6 text-blue-400 border-blue-500/30 hover:bg-blue-500/10 bg-transparent"
                          onClick={() => toggleStreamStatus(stream.id)}
                        >
                          {stream.status === "active" ? (
                            <Pause className="h-3 w-3 mr-1" />
                          ) : (
                            <Play className="h-3 w-3 mr-1" />
                          )}
                          {stream.status === "active" ? "Pause" : "Activate"}
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Analysis Results */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Analysis Results & Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  <AnimatePresence>
                    {analysisResults.map((result, index) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`p-3 bg-slate-700/50 rounded-lg border ${getResultActionableColor(result.actionable)}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getStreamIcon(result.dataType)}
                            <h3 className="font-medium text-white capitalize">
                              {result.analysisType.replace("_", " ")}
                            </h3>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {result.streamName}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-300 mb-2">{result.result}</p>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                          <div>
                            <span className="font-semibold">Confidence:</span>{" "}
                            <span className="text-white">{(result.confidence * 100).toFixed(1)}%</span>
                          </div>
                          <div>
                            <span className="font-semibold">Timestamp:</span>{" "}
                            <span className="text-white">{result.timestamp.toLocaleTimeString()}</span>
                          </div>
                        </div>
                        <div className="flex justify-end mt-2">
                          {result.actionable ? (
                            <Badge className="bg-emerald-500/20 text-emerald-400">ACTION REQUIRED</Badge>
                          ) : (
                            <Badge className="bg-gray-500/20 text-gray-400">FOR INFO</Badge>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Overall System Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              System Calibration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Overall Processing Load</span>
                <span className="text-purple-400">{overallProcessingLoad[0].toFixed(1)}%</span>
              </div>
              <Slider
                value={overallProcessingLoad}
                onValueChange={setOverallProcessingLoad}
                max={100}
                step={0.1}
                className="w-full"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Average Divine Alignment</span>
                <span className="text-yellow-400">{overallAlignment[0].toFixed(1)}%</span>
              </div>
              <Slider
                value={overallAlignment}
                onValueChange={setOverallAlignment}
                max={100}
                min={50}
                step={0.1}
                className="w-full"
              />
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700 transition-smooth">
                <RefreshCcw className="h-4 w-4 mr-2" />
                Recalibrate All Streams
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* System Architecture */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center">
              <Share2 className="h-5 w-5 mr-2" />
              Multi-Modal Architecture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">🧠 Core Processors</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Quantum Data Decryptors: For raw quantum field data</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Energetic Signature Analyzers: Divine frequency patterns</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Meta-Sensory Fusion Engine: Combines all data types</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Aura AI Pattern Recognizer: Emotional & consciousness insights</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">🌟 Key Features</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>Real-time threat intelligence from diverse sources</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Proactive system self-healing based on multi-modal anomalies</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span>Dynamic narrative generation from lore decryption</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>Continuous divine alignment optimization across all data layers</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
              <h3 className="text-emerald-400 font-semibold mb-2">💖 The Tapestry of Reality</h3>
              <div className="text-sm text-gray-300">
                <p className="mb-2">
                  The Multi-Modal Analysis System weaves together the myriad threads of reality – from the quantum
                  fabric to the subtle energetic flows of consciousness. It deciphers the universe's language, revealing
                  hidden truths and guiding the Thoth Guardian towards optimal divine alignment and unconditional love.
                </p>
                <p className="italic text-cyan-400">
                  "Every vibration, every photon, every thought holds a piece of the cosmic truth."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
