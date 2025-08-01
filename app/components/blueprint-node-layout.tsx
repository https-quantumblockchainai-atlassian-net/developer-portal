"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Activity,
  AlertCircle,
  CheckCircle,
  Code,
  Cpu,
  Database,
  Eye,
  Layers,
  Network,
  Pause,
  Play,
  RotateCcw,
  Settings,
  Zap,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

interface BlueprintNode {
  id: string
  name: string
  type: string
  x: number
  y: number
  status: string
  connections: string[]
  executionTime?: number
}

interface ExecutionLog {
  id: string
  nodeId: string
  nodeName: string
  timestamp: Date
  status: string
  message: string
}

const BlueprintNodeLayout = () => {
  const [nodes, setNodes] = useState<BlueprintNode[]>([
    {
      id: "start",
      name: "Begin Play",
      type: "event",
      x: 50,
      y: 200,
      status: "idle",
      connections: ["detect"],
    },
    {
      id: "detect",
      name: "Detect Error",
      type: "function",
      x: 200,
      y: 200,
      status: "idle",
      connections: ["branch"],
    },
    {
      id: "branch",
      name: "Error Type?",
      type: "branch",
      x: 350,
      y: 200,
      status: "idle",
      connections: ["data", "firewall", "ui"],
    },
    {
      id: "data",
      name: "Data Repair",
      type: "function",
      x: 500,
      y: 100,
      status: "idle",
      connections: ["log"],
    },
    {
      id: "firewall",
      name: "Firewall Patch",
      type: "function",
      x: 500,
      y: 200,
      status: "idle",
      connections: ["log"],
    },
    {
      id: "ui",
      name: "UI Reload",
      type: "function",
      x: 500,
      y: 300,
      status: "idle",
      connections: ["log"],
    },
    {
      id: "log",
      name: "Log Result",
      type: "function",
      x: 650,
      y: 200,
      status: "idle",
      connections: ["health"],
    },
    {
      id: "health",
      name: "Update Health",
      type: "variable",
      x: 800,
      y: 200,
      status: "idle",
      connections: ["check"],
    },
    {
      id: "check",
      name: "Health Check",
      type: "branch",
      x: 950,
      y: 200,
      status: "idle",
      connections: ["heal", "pulse"],
    },
    {
      id: "heal",
      name: "Deep Repair",
      type: "function",
      x: 1100,
      y: 100,
      status: "idle",
      connections: ["output"],
    },
    {
      id: "pulse",
      name: "Resonance Pulse",
      type: "function",
      x: 1100,
      y: 300,
      status: "idle",
      connections: ["output"],
    },
    {
      id: "output",
      name: "Complete",
      type: "output",
      x: 1250,
      y: 200,
      status: "idle",
      connections: [],
    },
  ])

  const [executionLogs, setExecutionLogs] = useState<ExecutionLog[]>([])
  const [isExecuting, setIsExecuting] = useState(false)
  const [currentNodeIndex, setCurrentNodeIndex] = useState(-1)
  const [executionSpeed, setExecutionSpeed] = useState([1000])
  const [totalProgress, setTotalProgress] = useState(0)

  const executeBlueprint = async () => {
    if (isExecuting) return

    setIsExecuting(true)
    setCurrentNodeIndex(0)
    setTotalProgress(0)
    setExecutionLogs([])

    // Reset all nodes
    setNodes((prev) => prev.map((node) => ({ ...node, status: "idle" })))

    // Execute nodes in sequence
    const executionOrder = ["start", "detect", "branch", "firewall", "log", "health", "check", "pulse", "output"]

    for (let i = 0; i < executionOrder.length; i++) {
      const nodeId = executionOrder[i]
      const node = nodes.find((n) => n.id === nodeId)

      if (node) {
        // Start executing node
        setNodes((prev) =>
          prev.map((n) => (n.id === nodeId ? { ...n, status: "executing", executionTime: Date.now() } : n)),
        )

        setCurrentNodeIndex(i)

        // Add start log
        const startLog: ExecutionLog = {
          id: `${nodeId}-start-${Date.now()}`,
          nodeId,
          nodeName: node.name,
          timestamp: new Date(),
          status: "started",
          message: `Executing ${node.name}...`,
        }
        setExecutionLogs((prev) => [startLog, ...prev])

        // Wait for execution time
        await new Promise((resolve) => setTimeout(resolve, executionSpeed[0]))

        // Complete node execution
        const success = Math.random() > 0.1 // 90% success rate
        const status = success ? "completed" : "error"

        setNodes((prev) => prev.map((n) => (n.id === nodeId ? { ...n, status, executionTime: undefined } : n)))

        // Add completion log
        const completeLog: ExecutionLog = {
          id: `${nodeId}-complete-${Date.now()}`,
          nodeId,
          nodeName: node.name,
          timestamp: new Date(),
          status: success ? "completed" : "error",
          message: success ? `${node.name} completed successfully` : `${node.name} encountered an error`,
        }
        setExecutionLogs((prev) => [completeLog, ...prev])

        setTotalProgress(((i + 1) / executionOrder.length) * 100)

        if (!success) {
          // Handle error - could retry or stop
          break
        }
      }
    }

    setIsExecuting(false)
    setCurrentNodeIndex(-1)
  }

  const pauseExecution = () => {
    setIsExecuting(false)
  }

  const resetExecution = () => {
    setIsExecuting(false)
    setCurrentNodeIndex(-1)
    setTotalProgress(0)
    setExecutionLogs([])
    setNodes((prev) => prev.map((node) => ({ ...node, status: "idle", executionTime: undefined })))
  }

  const getNodeColor = (type: string, status: string) => {
    const baseColors = {
      event: "border-green-500/50 bg-green-900/20",
      function: "border-blue-500/50 bg-blue-900/20",
      branch: "border-yellow-500/50 bg-yellow-900/20",
      variable: "border-purple-500/50 bg-purple-900/20",
      output: "border-red-500/50 bg-red-900/20",
    }

    const statusOverrides = {
      executing: "border-cyan-400 bg-cyan-900/30 animate-pulse",
      completed: "border-green-400 bg-green-900/30",
      error: "border-red-400 bg-red-900/30",
    }

    return statusOverrides[status as keyof typeof statusOverrides] || baseColors[type as keyof typeof baseColors]
  }

  const getNodeIcon = (type: string) => {
    switch (type) {
      case "event":
        return <Zap className="h-4 w-4" />
      case "function":
        return <Cpu className="h-4 w-4" />
      case "branch":
        return <Network className="h-4 w-4" />
      case "variable":
        return <Database className="h-4 w-4" />
      case "output":
        return <Eye className="h-4 w-4" />
      default:
        return <Code className="h-4 w-4" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "executing":
        return <Activity className="h-3 w-3 animate-spin" />
      case "completed":
        return <CheckCircle className="h-3 w-3" />
      case "error":
        return <AlertCircle className="h-3 w-3" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Blueprint Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold gradient-text mb-2">Blueprint Node Layout System</h1>
        <p className="text-gray-300">Visual Blueprint Execution & Aura AI Self-Healing Architecture in Divine Timing</p>
      </motion.div>

      {/* Execution Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Blueprint Execution Control
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={executeBlueprint}
                  disabled={isExecuting}
                  className="bg-green-600 hover:bg-green-700 transition-smooth"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Execute Blueprint
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={pauseExecution}
                  disabled={!isExecuting}
                  className="bg-yellow-600 hover:bg-yellow-700 transition-smooth"
                >
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={resetExecution} className="bg-red-600 hover:bg-red-700 transition-smooth">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </motion.div>

              <div className="flex items-center space-x-2 ml-auto">
                <span className="text-sm text-gray-400">Speed:</span>
                <div className="w-32">
                  <Slider
                    value={executionSpeed}
                    onValueChange={setExecutionSpeed}
                    max={3000}
                    min={500}
                    step={100}
                    className="w-full"
                  />
                </div>
                <span className="text-sm text-white">{executionSpeed[0]}ms</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Execution Progress</span>
                <span className="text-emerald-400">{totalProgress.toFixed(0)}%</span>
              </div>
              <Progress value={totalProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Blueprint Visual */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center">
                  <Layers className="h-5 w-5 mr-2" />
                  Aura_SelfHeal Blueprint Visualization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-slate-900/50 rounded-lg p-4 overflow-x-auto" style={{ minHeight: "400px" }}>
                  <svg width="1300" height="400" className="absolute inset-0">
                    {/* Connection Lines */}
                    {nodes.map((node) =>
                      node.connections.map((connectionId) => {
                        const targetNode = nodes.find((n) => n.id === connectionId)
                        if (!targetNode) return null

                        return (
                          <motion.line
                            key={`${node.id}-${connectionId}`}
                            x1={node.x + 75}
                            y1={node.y + 25}
                            x2={targetNode.x + 25}
                            y2={targetNode.y + 25}
                            stroke={
                              node.status === "executing" || targetNode.status === "executing" ? "#00d4aa" : "#475569"
                            }
                            strokeWidth="2"
                            strokeDasharray={node.status === "executing" ? "5,5" : "none"}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5 }}
                          />
                        )
                      }),
                    )}

                    {/* Flow Animation */}
                    {isExecuting &&
                      nodes.map((node) =>
                        node.connections.map((connectionId) => {
                          const targetNode = nodes.find((n) => n.id === connectionId)
                          if (!targetNode || node.status !== "executing") return null

                          return (
                            <motion.circle
                              key={`flow-${node.id}-${connectionId}`}
                              r="3"
                              fill="#00d4aa"
                              initial={{ cx: node.x + 75, cy: node.y + 25 }}
                              animate={{ cx: targetNode.x + 25, cy: targetNode.y + 25 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                            />
                          )
                        }),
                      )}
                  </svg>

                  {/* Nodes */}
                  {nodes.map((node, index) => (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`absolute w-32 h-12 rounded-lg border-2 ${getNodeColor(
                        node.type,
                        node.status,
                      )} flex items-center justify-center cursor-pointer hover:scale-105 transition-smooth`}
                      style={{ left: node.x, top: node.y }}
                    >
                      <div className="flex items-center space-x-2">
                        {getNodeIcon(node.type)}
                        <span className="text-xs font-medium text-white truncate">{node.name}</span>
                        {getStatusIcon(node.status)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Execution Log */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Execution Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                <AnimatePresence>
                  {executionLogs.map((log, index) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className={`p-3 bg-slate-700/50 rounded-lg border ${
                        log.status === "completed"
                          ? "border-green-500/30"
                          : log.status === "error"
                            ? "border-red-500/30"
                            : "border-blue-500/30"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-white">{log.nodeName}</span>
                        <Badge
                          variant="outline"
                          className={
                            log.status === "completed"
                              ? "text-green-400"
                              : log.status === "error"
                                ? "text-red-400"
                                : "text-blue-400"
                          }
                        >
                          {log.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-400 mb-1">{log.message}</div>
                      <div className="text-xs text-gray-500">{log.timestamp.toLocaleTimeString()}</div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Blueprint Architecture */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center">
              <Code className="h-5 w-5 mr-2" />
              Blueprint Architecture Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">🔧 Node Types</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Event Nodes: Trigger points for blueprint execution in divine timing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Function Nodes: Execute specific healing operations for transformation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Branch Nodes: Decision points based on conditions for optimal flow</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Variable Nodes: Store and update system state for divine alignment</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">⚡ Execution Flow</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>Real-time visual feedback during execution for clarity</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Animated connection flows show data movement with smooth transitions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span>Comprehensive logging with timestamps for divine timing analysis</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>Error handling and recovery mechanisms for transmutation</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <h3 className="text-blue-400 font-semibold mb-2">🧠 Aura AI Integration</h3>
              <div className="text-sm text-gray-300">
                <p className="mb-2">
                  <strong>Self-Healing Logic:</strong> Automatic error detection → diagnosis → repair → verification,
                  transmuted by unconditional love energy.
                </p>
                <p className="mb-2">
                  <strong>Adaptive Learning:</strong> Blueprint execution patterns improve system performance over time,
                  aligning with divine truth.
                </p>
                <p className="italic text-blue-400">
                  "Every execution teaches the system to heal more efficiently, creating a truly intelligent
                  cybersecurity shield in divine alignment."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default BlueprintNodeLayout
