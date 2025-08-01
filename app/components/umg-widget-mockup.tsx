"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import {
  Atom,
  Zap,
  Layers,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Target,
  Sparkles,
  Orbit,
  Brain,
  Heart,
  Cpu,
  Database,
} from "lucide-react"

interface HealingLog {
  timestamp: string
  action: string
  status: "success" | "failed" | "in-progress"
  details: string
}

export default function UMGWidgetMockup() {
  const [quantumInput, setQuantumInput] = useState("")
  const [quantumOutput, setQuantumOutput] = useState("System initialized. Awaiting divine input...")
  const [seedBloomProgress, setSeedBloomProgress] = useState(0)
  const [breathCycle, setBreathCycle] = useState(50)
  const [loveInfusion, setLoveInfusion] = useState([75])
  const [healingLogs, setHealingLogs] = useState<HealingLog[]>([
    {
      timestamp: "14:32:15",
      action: "Quantum Field Stabilization",
      status: "success",
      details: "All quantum layers aligned successfully",
    },
    {
      timestamp: "14:31:42",
      action: "Memory Leak Repair",
      status: "in-progress",
      details: "Optimizing memory allocation patterns",
    },
    {
      timestamp: "14:31:08",
      action: "Network Firewall Activation",
      status: "success",
      details: "Firewall shields deployed and active",
    },
  ])
  const [teleportTarget, setTeleportTarget] = useState("Lumeria Crystal Grid")
  const [timelinePosition, setTimelinePosition] = useState([50])
  const [activeErrorCodes, setActiveErrorCodes] = useState(["QD-001", "ML-003", "NF-007"])
  const [isBreathing, setIsBreathing] = useState(true)

  useEffect(() => {
    // Simulate breathing cycle
    if (isBreathing) {
      const breathInterval = setInterval(() => {
        setBreathCycle((prev) => {
          const newValue = 50 + Math.sin(Date.now() / 2000) * 40
          return Math.max(10, Math.min(90, newValue))
        })
      }, 100)

      return () => clearInterval(breathInterval)
    }
  }, [isBreathing])

  useEffect(() => {
    // Simulate seed bloom progress
    const bloomInterval = setInterval(() => {
      setSeedBloomProgress((prev) => {
        const newProgress = prev + Math.random() * 2
        return newProgress > 100 ? 0 : newProgress
      })
    }, 1000)

    return () => clearInterval(bloomInterval)
  }, [])

  const handleQuantumInput = () => {
    if (quantumInput.trim()) {
      const newLog: HealingLog = {
        timestamp: new Date().toLocaleTimeString(),
        action: quantumInput,
        status: "in-progress",
        details: "Processing quantum command...",
      }
      setHealingLogs((prev) => [newLog, ...prev.slice(0, 4)])
      setQuantumOutput(
        `Processing: "${quantumInput}"\nQuantum field resonance detected...\nInitiating healing sequence...`,
      )
      setQuantumInput("")
    }
  }

  const triggerTeleportation = () => {
    setQuantumOutput(
      `Initiating teleportation to ${teleportTarget}...\nQuantum coordinates locked.\nRipple distortion activated.`,
    )
    const newLog: HealingLog = {
      timestamp: new Date().toLocaleTimeString(),
      action: `Teleport to ${teleportTarget}`,
      status: "success",
      details: "Quantum teleportation completed successfully",
    }
    setHealingLogs((prev) => [newLog, ...prev.slice(0, 4)])
  }

  const adjustTimeline = () => {
    const position = timelinePosition[0]
    const timeDescription =
      position < 33 ? "Past Healing States" : position > 66 ? "Future Possibilities" : "Present Moment"
    setQuantumOutput(
      `Time travel dial adjusted to ${position}%\nNavigating to: ${timeDescription}\nTemporal alignment in progress...`,
    )
  }

  return (
    <div className="space-y-6">
      {/* UMG Widget Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold gradient-text mb-2">Aura Self-Heal UMG Widget</h1>
        <p className="text-gray-300">Divine Interface for Quantum Healing & Multidimensional Alignment</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel: Quantum Input/Output */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Quantum Input Field */}
          <Card className="bg-slate-800/50 border-cyan-500/30 glass-morphism">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                Quantum Input Field
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input
                  value={quantumInput}
                  onChange={(e) => setQuantumInput(e.target.value)}
                  placeholder="Enter healing intention or command..."
                  className="bg-slate-700/50 border-cyan-500/30 text-white placeholder-gray-400"
                  onKeyPress={(e) => e.key === "Enter" && handleQuantumInput()}
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleQuantumInput}
                    className="w-full bg-cyan-600 hover:bg-cyan-700 transition-smooth"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Process Quantum Command
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>

          {/* Quantum Output Console */}
          <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
            <CardHeader>
              <CardTitle className="text-emerald-400 flex items-center">
                <Cpu className="h-5 w-5 mr-2" />
                Quantum Output Console
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={quantumOutput}
                readOnly
                className="bg-slate-900/50 border-emerald-500/30 text-emerald-400 font-mono text-sm min-h-[120px] resize-none"
              />
            </CardContent>
          </Card>

          {/* Error Code Visualizer */}
          <Card className="bg-slate-800/50 border-red-500/30 glass-morphism">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Error Code Visualizer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {activeErrorCodes.map((code, index) => (
                  <motion.div
                    key={code}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-2 bg-red-900/30 border border-red-500/30 rounded text-center"
                  >
                    <div className="text-xs font-mono text-red-400">{code}</div>
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="w-2 h-2 bg-red-400 rounded-full mx-auto mt-1"
                    />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Center Panel: Seed Bloom & Breath Sync */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-6"
        >
          {/* Seed Bloom Meter */}
          <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <Sparkles className="h-5 w-5 mr-2" />
                Seed Bloom Meter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="w-32 h-32 mx-auto relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute inset-0 border-4 border-purple-500/30 rounded-full"
                  />
                  <div className="absolute inset-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{seedBloomProgress.toFixed(0)}%</div>
                      <div className="text-xs text-gray-400">Bloom</div>
                    </div>
                  </div>
                </div>
                <Progress value={seedBloomProgress} className="mt-4" />
              </div>
            </CardContent>
          </Card>

          {/* Breath Sync Indicator */}
          <Card className="bg-slate-800/50 border-blue-500/30 glass-morphism">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                Breath Sync Indicator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="w-24 h-24 mx-auto relative">
                  <motion.div
                    animate={{ scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-sm font-bold text-blue-400">{breathCycle.toFixed(0)}%</div>
                      <div className="text-xs text-gray-400">Breath</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <Button
                    size="sm"
                    onClick={() => setIsBreathing(!isBreathing)}
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-blue-500/10 bg-transparent"
                  >
                    {isBreathing ? <Pause className="h-3 w-3 mr-2" /> : <Play className="h-3 w-3 mr-2" />}
                    {isBreathing ? "Pause" : "Start"} Breath
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Love Infusion Slider */}
          <Card className="bg-slate-800/50 border-pink-500/30 glass-morphism">
            <CardHeader>
              <CardTitle className="text-pink-400 flex items-center">
                <Heart className="h-5 w-5 mr-2" />
                Love Infusion Slider
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-pink-400">{loveInfusion[0]}%</div>
                  <div className="text-xs text-gray-400">Healing Intensity</div>
                </div>
                <Slider value={loveInfusion} onValueChange={setLoveInfusion} max={100} step={1} className="w-full" />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Gentle</span>
                  <span>Divine</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Panel: Controls & Logs */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-6"
        >
          {/* Teleportation Anchor */}
          <Card className="bg-slate-800/50 border-yellow-500/30 glass-morphism">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Teleportation Anchor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <select
                value={teleportTarget}
                onChange={(e) => setTeleportTarget(e.target.value)}
                className="w-full p-2 bg-slate-700/50 border border-yellow-500/30 rounded text-white"
              >
                <option value="Lumeria Crystal Grid">Lumeria Crystal Grid</option>
                <option value="Orion Healing Chamber">Orion Healing Chamber</option>
                <option value="Pleiades Light Portal">Pleiades Light Portal</option>
                <option value="Sirius Binary Core">Sirius Binary Core</option>
              </select>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={triggerTeleportation}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 transition-smooth"
                >
                  <Orbit className="h-4 w-4 mr-2" />
                  Initiate Teleportation
                </Button>
              </motion.div>
            </CardContent>
          </Card>

          {/* Time Travel Dial */}
          <Card className="bg-slate-800/50 border-indigo-500/30 glass-morphism">
            <CardHeader>
              <CardTitle className="text-indigo-400 flex items-center">
                <RotateCcw className="h-5 w-5 mr-2" />
                Time Travel Dial
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-lg font-bold text-indigo-400">{timelinePosition[0]}%</div>
                <div className="text-xs text-gray-400">Timeline Position</div>
              </div>
              <Slider
                value={timelinePosition}
                onValueChange={(value) => {
                  setTimelinePosition(value)
                  adjustTimeline()
                }}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>Past</span>
                <span>Present</span>
                <span>Future</span>
              </div>
            </CardContent>
          </Card>

          {/* Crystallization Log */}
          <Card className="bg-slate-800/50 border-green-500/30 glass-morphism">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Crystallization Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                <AnimatePresence>
                  {healingLogs.map((log, index) => (
                    <motion.div
                      key={`${log.timestamp}-${index}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                      className="p-2 bg-slate-700/50 rounded border-l-2 border-green-500/30"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono text-gray-400">{log.timestamp}</span>
                        <Badge
                          variant="outline"
                          className={
                            log.status === "success"
                              ? "text-green-400"
                              : log.status === "failed"
                                ? "text-red-400"
                                : "text-yellow-400"
                          }
                        >
                          {log.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-sm text-white font-medium">{log.action}</div>
                      <div className="text-xs text-gray-400">{log.details}</div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Sacred Geometry Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center">
              <Layers className="h-5 w-5 mr-2" />
              Sacred Geometry Overlay
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative h-32 bg-slate-900/50 rounded-lg overflow-hidden">
              <div className="absolute inset-0 cyber-grid opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="relative"
                >
                  <div className="w-16 h-16 border-2 border-purple-400/50 rounded-full"></div>
                  <div className="absolute inset-2 border-2 border-pink-400/50 rounded-full"></div>
                  <div className="absolute inset-4 border-2 border-cyan-400/50 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Atom className="h-6 w-6 text-white animate-pulse" />
                  </div>
                </motion.div>
              </div>
              <div className="absolute bottom-2 left-2 text-xs text-purple-400">
                Mandala: Active | Fractals: Synchronized
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
