"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  Shield,
  Eye,
  Brain,
  Network,
  Activity,
  Target,
  Radar,
  Lock,
  Unlock,
  CheckCircle,
  XCircle,
} from "lucide-react"

interface ThreatData {
  id: string
  type: string
  severity: "low" | "medium" | "high" | "critical"
  source: string
  target: string
  timestamp: Date
  status: "active" | "blocked" | "investigating" | "resolved"
  confidence: number
  description: string
}

export default function ThreatDetectionPanel() {
  const [threats, setThreats] = useState<ThreatData[]>([])
  const [scanProgress, setScanProgress] = useState(0)
  const [isScanning, setIsScanning] = useState(false)
  const [detectionMode, setDetectionMode] = useState<"passive" | "active" | "aggressive">("active")

  useEffect(() => {
    // Self-healing threat detection with auto-resolution
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        const newThreat: ThreatData = {
          id: Date.now().toString(),
          type: ["DDoS", "Malware", "Phishing", "SQL Injection", "XSS", "Brute Force"][Math.floor(Math.random() * 6)],
          severity: ["low", "medium", "high", "critical"][Math.floor(Math.random() * 4)] as any,
          source: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          target: "Web Server",
          timestamp: new Date(),
          status: Math.random() > 0.7 ? "blocked" : "active",
          confidence: 70 + Math.random() * 30,
          description: "Suspicious activity detected from external source",
        }
        setThreats((prev) => [newThreat, ...prev.slice(0, 9)])
      }

      // Self-healing: Auto-resolve old threats
      setThreats((prev) =>
        prev.map((threat) => {
          const ageMinutes = (Date.now() - threat.timestamp.getTime()) / (1000 * 60)
          if (ageMinutes > 2 && threat.status === "active") {
            return { ...threat, status: "blocked" } // Auto-resolve after 2 minutes
          }
          return threat
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const startDeepScan = () => {
    setIsScanning(true)
    setScanProgress(0)
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsScanning(false)
          return 100
        }
        return prev + 2
      })
    }, 100)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "high":
        return "bg-orange-500"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "blocked":
        return <Lock className="h-4 w-4 text-green-400" />
      case "active":
        return <Unlock className="h-4 w-4 text-red-400" />
      case "investigating":
        return <Eye className="h-4 w-4 text-yellow-400" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      default:
        return <XCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const autoHealThreats = () => {
    setThreats((prev) =>
      prev.map((threat) => ({
        ...threat,
        status: threat.status === "active" ? "blocked" : threat.status,
        confidence: Math.min(threat.confidence + 10, 100),
      })),
    )
  }

  return (
    <div className="space-y-6">
      {/* Detection Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
              <Radar className="h-4 w-4 mr-2" />
              Detection Mode
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {["passive", "active", "aggressive"].map((mode) => (
                <motion.button
                  key={mode}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setDetectionMode(mode as any)}
                  className={`w-full p-2 rounded-md text-sm font-medium transition-smooth ${
                    detectionMode === mode
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-700/50 text-gray-300 hover:bg-slate-600/50"
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </motion.button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-cyan-500/30 glass-morphism">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
              <Activity className="h-4 w-4 mr-2" />
              System Scan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Progress value={scanProgress} className="h-2" />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={startDeepScan}
                  disabled={isScanning}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 transition-smooth"
                >
                  {isScanning ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="mr-2"
                      >
                        <Radar className="h-4 w-4" />
                      </motion.div>
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Target className="h-4 w-4 mr-2" />
                      Deep Scan
                    </>
                  )}
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={autoHealThreats} className="w-full bg-green-600 hover:bg-green-700 transition-smooth">
                  <Shield className="h-4 w-4 mr-2" />
                  Auto-Heal Threats
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
              <Brain className="h-4 w-4 mr-2" />
              AI Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-purple-400">99.7%</div>
              <div className="text-xs text-gray-400">Accuracy Rate</div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400">AI Active</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Real-time Threat Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Real-time Threat Detection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {threats.map((threat, index) => (
                  <motion.div
                    key={threat.id}
                    initial={{ opacity: 0, x: -50, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 50, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-emerald-500/30 transition-smooth"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${getSeverityColor(threat.severity)}`}></div>
                          <span className="font-medium text-white">{threat.type}</span>
                          <Badge variant="outline" className="text-xs">
                            {threat.severity.toUpperCase()}
                          </Badge>
                          {getStatusIcon(threat.status)}
                        </div>
                        <div className="text-sm text-gray-300">
                          <div>Source: {threat.source}</div>
                          <div>Target: {threat.target}</div>
                          <div>Confidence: {threat.confidence.toFixed(1)}%</div>
                        </div>
                        <div className="text-xs text-gray-400">{threat.description}</div>
                      </div>
                      <div className="text-xs text-gray-400">{threat.timestamp.toLocaleTimeString()}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {threats.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <Shield className="h-12 w-12 mx-auto mb-4 text-green-400" />
                  <p>No active threats detected</p>
                  <p className="text-sm">System is secure</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Threat Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card className="bg-slate-800/50 border-red-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-8 w-8 text-red-400" />
              <div>
                <div className="text-2xl font-bold text-red-400">
                  {threats.filter((t) => t.status === "active").length}
                </div>
                <div className="text-xs text-gray-400">Active Threats</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-green-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-green-400" />
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {threats.filter((t) => t.status === "blocked").length}
                </div>
                <div className="text-xs text-gray-400">Blocked</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-yellow-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Eye className="h-8 w-8 text-yellow-400" />
              <div>
                <div className="text-2xl font-bold text-yellow-400">
                  {threats.filter((t) => t.status === "investigating").length}
                </div>
                <div className="text-xs text-gray-400">Investigating</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-blue-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Network className="h-8 w-8 text-blue-400" />
              <div>
                <div className="text-2xl font-bold text-blue-400">
                  {threats.length > 0
                    ? (threats.reduce((acc, t) => acc + t.confidence, 0) / threats.length).toFixed(1)
                    : 0}
                  %
                </div>
                <div className="text-xs text-gray-400">Avg Confidence</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
