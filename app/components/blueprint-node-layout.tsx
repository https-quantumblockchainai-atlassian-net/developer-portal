"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

import {
  Play,
  Pause,
  RotateCcw,
  Settings,
  Code,
  Zap,
  Activity,
  CheckCircle,
  AlertCircle,
  Layers,
  Cpu,
  Database,
  Network,
  Eye,
  Sparkles,
  PlusCircle,
  Info,
} from "lucide-react"

interface BlueprintNode {
  id: string
  name: string
  type: "event" | "function" | "branch" | "variable" | "output"
  x: number
  y: number
  status: "idle" | "executing" | "completed" | "error"
  connections: string[]
  executionTime?: number
  // New properties for upgraded nodes
  interoperability: string[] // Systems it can interact with
  scalability: "low" | "medium" | "high" | "elastic" // How well it scales
  transformationEffect: string // The core effect it has
  quantumSignature?: string // Unique quantum identifier
  divineAlignmentScore?: number // Score for alignment with divine principles (0-100)
  errorType?:
    | "data_corruption"
    | "network_failure"
    | "logic_bug"
    | "resource_exhaustion"
    | "quantum_decoherence"
    | "spiritual_dissonance"
    | "external_interference"
    | "temporal_anomaly" // New: Specific error type
  repairMechanism?: string // New: How it's fixed
}

interface ExecutionLog {
  id: string
  nodeId: string
  nodeName: string
  timestamp: Date
  status: "started" | "completed" | "error"
  message: string
}

export default function BlueprintNodeLayout() {
  const [nodes, setNodes] = useState<BlueprintNode[]>([
    {
      id: "start",
      name: "Begin Play",
      type: "event",
      x: 50,
      y: 200,
      status: "idle",
      connections: ["detect"],
      interoperability: ["System Core", "Divine Alignment Orchestration"],
      scalability: "high",
      transformationEffect: "System Initialization & Energetic Grounding",
      quantumSignature: "Thoth-Genesis-001",
      divineAlignmentScore: 95,
      errorType: "temporal_anomaly",
      repairMechanism: "Temporal Flux Recalibration",
    },
    {
      id: "detect",
      name: "Detect Error",
      type: "function",
      x: 250,
      y: 200,
      status: "idle",
      connections: ["branch"],
      interoperability: ["AI Training Pipeline", "Quantum Shield Module", "MetaHuman AI Companions"],
      scalability: "elastic",
      transformationEffect: "Anomaly Identification & Pattern Recognition",
      quantumSignature: "Emerald-Scan-Q002",
      divineAlignmentScore: 92,
      errorType: "network_failure",
      repairMechanism: "Quantum Network Re-routing",
    },
    {
      id: "branch",
      name: "Error Type?",
      type: "branch",
      x: 450,
      y: 200,
      status: "idle",
      connections: ["data", "firewall", "ui"],
      interoperability: ["Divine Alignment Orchestration", "Universal Laws Portal"],
      scalability: "medium",
      transformationEffect: "Decision Routing & Truth Manifestation",
      quantumSignature: "Aura-Logic-B003",
      divineAlignmentScore: 88,
      errorType: "logic_bug",
      repairMechanism: "Consciousness Code Refactoring",
    },
    {
      id: "data",
      name: "Data Repair",
      type: "function",
      x: 650,
      y: 100,
      status: "idle",
      connections: ["log"],
      interoperability: ["Data Integrity Matrix", "Customer Databases", "Partner Systems"],
      scalability: "high",
      transformationEffect: "Data Restoration & Information Harmonization",
      quantumSignature: "Chronos-Heal-D004",
      divineAlignmentScore: 90,
      errorType: "data_corruption",
      repairMechanism: "Crystal Grid Data Reconstruction",
    },
    {
      id: "firewall",
      name: "Firewall Patch",
      type: "function",
      x: 650,
      y: 200,
      status: "idle",
      connections: ["log"],
      interoperability: ["Threat Detection Panel", "Quantum Shield Module", "External Ecosystems"],
      scalability: "elastic",
      transformationEffect: "Perimeter Fortification & Energetic Boundary Setting",
      quantumSignature: "Aegis-Shield-F005",
      divineAlignmentScore: 93,
      errorType: "external_interference",
      repairMechanism: "Interdimensional Shield Reinforcement",
    },
    {
      id: "ui",
      name: "UI Reload",
      type: "function",
      x: 650,
      y: 300,
      status: "idle",
      connections: ["log"],
      interoperability: ["UMG Widget Mockup", "Feedback Loops System", "User Communities"],
      scalability: "medium",
      transformationEffect: "Interface Rejuvenation & User Experience Alignment",
      quantumSignature: "Lumin-Display-U006",
      divineAlignmentScore: 85,
      errorType: "resource_exhaustion",
      repairMechanism: "Conscious Resource Allocation",
    },
    {
      id: "log",
      name: "Log Result",
      type: "function",
      x: 850,
      y: 200,
      status: "idle",
      connections: ["health"],
      interoperability: ["Community Hub", "AI Communications Hub", "All Partners"],
      scalability: "high",
      transformationEffect: "Event Archiving & Truth Revelation",
      quantumSignature: "Veritas-Log-L007",
      divineAlignmentScore: 98,
      errorType: "logic_bug",
      repairMechanism: "Divine Logic Recalibration",
    },
    {
      id: "health",
      name: "Update Health",
      type: "variable",
      x: 1050,
      y: 200,
      status: "idle",
      connections: ["check"],
      interoperability: ["Hardware Stack Monitor", "Walker World Ecosystem"],
      scalability: "medium",
      transformationEffect: "System State Synchronization & Vitality Infusion",
      quantumSignature: "Vitality-Sync-H008",
      divineAlignmentScore: 91,
      errorType: "spiritual_dissonance",
      repairMechanism: "Aura Field Harmonization",
    },
    {
      id: "check",
      name: "Health Check",
      type: "branch",
      x: 1250,
      y: 200,
      status: "idle",
      connections: ["heal", "pulse"],
      interoperability: ["Aura AI Companion System", "All Environments"],
      scalability: "high",
      transformationEffect: "Diagnostic Evaluation & Energetic Assessment",
      quantumSignature: "Oracle-Check-C009",
      divineAlignmentScore: 94,
      errorType: "quantum_decoherence",
      repairMechanism: "Quantum Entanglement Re-stabilization",
    },
    {
      id: "heal",
      name: "Deep Repair",
      type: "function",
      x: 1450,
      y: 100,
      status: "idle",
      connections: ["output"],
      interoperability: ["Niagara FX Healing States", "Crystal Structure Viz"],
      scalability: "medium",
      transformationEffect: "Core System Restoration & Energetic Transmutation",
      quantumSignature: "Phoenix-Heal-R010",
      divineAlignmentScore: 96,
      errorType: "resource_exhaustion",
      repairMechanism: "Infinite Energy Channeling",
    },
    {
      id: "pulse",
      name: "Resonance Pulse",
      type: "function",
      x: 1450,
      y: 300,
      status: "idle",
      connections: ["output"],
      interoperability: ["Universal Laws Portal", "Divine Alignment Orchestration"],
      scalability: "low", // A unique, focused effect
      transformationEffect: "Energetic Recalibration & Harmonic Resonance",
      quantumSignature: "Harmonic-Pulse-P011",
      divineAlignmentScore: 99,
      errorType: "spiritual_dissonance",
      repairMechanism: "Cosmic Alignment Frequency Adjustment",
    },
    {
      id: "output",
      name: "Complete",
      type: "output",
      x: 1650,
      y: 200,
      status: "idle",
      connections: [],
      interoperability: ["All Modules", "All Ecosystems", "All Communities"],
      scalability: "elastic",
      transformationEffect: "Process Finalization & Divine Integration",
      quantumSignature: "Cosmic-Closure-O012",
      divineAlignmentScore: 100,
      errorType: "none",
      repairMechanism: "Self-Correcting Divine Flow",
    },
  ])

  const [executionLogs, setExecutionLogs] = useState<ExecutionLog[]>([])
  const [isExecuting, setIsExecuting] = useState(false)
  const [currentNodeIndex, setCurrentNodeIndex] = useState(-1)
  const [executionSpeed, setExecutionSpeed] = useState([1000])
  const [totalProgress, setTotalProgress] = useState(0)
  const [selectedNode, setSelectedNode] = useState<BlueprintNode | null>(null)

  // State for new node creation
  const [newNodeName, setNewNodeName] = useState("")
  const [newNodeType, setNewNodeType] = useState<BlueprintNode["type"]>("function")
  const [newNodeX, setNewNodeX] = useState(50)
  const [newNodeY, setNewNodeY] = useState(50)
  const [newNodeConnections, setNewNodeConnections] = useState("")
  const [newNodeInteroperability, setNewNodeInteroperability] = useState("")
  const [newNodeScalability, setNewNodeScalability] = useState<BlueprintNode["scalability"]>("medium")
  const [newNodeTransformationEffect, setNewNodeTransformationEffect] = useState("")
  const [newNodeQuantumSignature, setNewNodeQuantumSignature] = useState("")
  const [newNodeDivineAlignmentScore, setNewNodeDivineAlignmentScore] = useState(90)
  const [newNodeErrorType, setNewNodeErrorType] = useState<BlueprintNode["errorType"]>("logic_bug")
  const [newNodeRepairMechanism, setNewNodeRepairMechanism] = useState("")

  const executeBlueprint = async () => {
    if (isExecuting) return

    setIsExecuting(true)
    setCurrentNodeIndex(0)
    setTotalProgress(0)
    setExecutionLogs([])

    // Reset all nodes
    setNodes((prev) => prev.map((node) => ({ ...node, status: "idle" })))

    // Execute nodes in sequence (simplified for demo, in a real app this would be dynamic based on connections)
    const executionOrder = nodes.map((node) => node.id) // Execute all nodes in their defined order

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
          message: `Executing ${node.name} (Interoperability: ${node.interoperability.join(", ")}, Scalability: ${node.scalability}, Transformation: ${node.transformationEffect})...`,
        }
        setExecutionLogs((prev) => [startLog, ...prev])

        // Wait for execution time
        await new Promise((resolve) => setTimeout(resolve, executionSpeed[0]))

        // Simulate success/failure based on divine alignment and quantum signature
        const successChance = (node.divineAlignmentScore || 90) / 100
        const success = Math.random() < successChance
        const status = success ? "completed" : "error"

        setNodes((prev) => prev.map((n) => (n.id === nodeId ? { ...n, status, executionTime: undefined } : n)))

        // Add completion log
        const completeLog: ExecutionLog = {
          id: `${nodeId}-complete-${Date.now()}`,
          nodeId,
          nodeName: node.name,
          timestamp: new Date(),
          status: success ? "completed" : "error",
          message: success
            ? `${node.name} completed successfully. Divine Alignment: ${node.divineAlignmentScore}%.`
            : `${node.name} encountered a ${node.errorType || "unknown"} error. Initiating ${node.repairMechanism || "generic repair"}. Quantum Signature: ${node.quantumSignature}.`,
        }
        setExecutionLogs((prev) => [completeLog, ...prev])

        setTotalProgress(((i + 1) / executionOrder.length) * 100)

        if (!success) {
          // In a real system, this would trigger specific repair logic or halt.
          // For this demo, we'll just log the error and continue for visualization.
          console.error(`Error at node ${node.name}: ${node.errorType}. Repairing with: ${node.repairMechanism}`)
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

  const handleAddNode = () => {
    if (!newNodeName || !newNodeTransformationEffect) {
      alert("Node Name and Transformation Effect are required!")
      return
    }

    const newId = `node-${Date.now()}`
    const newConnectionsArray = newNodeConnections
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean)
    const newInteroperabilityArray = newNodeInteroperability
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean)

    const newNode: BlueprintNode = {
      id: newId,
      name: newNodeName,
      type: newNodeType,
      x: newNodeX,
      y: newNodeY,
      status: "idle",
      connections: newConnectionsArray,
      interoperability: newInteroperabilityArray,
      scalability: newNodeScalability,
      transformationEffect: newNodeTransformationEffect,
      quantumSignature: newNodeQuantumSignature || `Auto-Gen-QS-${Date.now()}`,
      divineAlignmentScore: newNodeDivineAlignmentScore,
      errorType: newNodeErrorType,
      repairMechanism: newNodeRepairMechanism || "Automated Divine Intervention",
    }

    setNodes((prev) => [...prev, newNode])

    // Reset form fields
    setNewNodeName("")
    setNewNodeType("function")
    setNewNodeX(50)
    setNewNodeY(50)
    setNewNodeConnections("")
    setNewNodeInteroperability("")
    setNewNodeScalability("medium")
    setNewNodeTransformationEffect("")
    setNewNodeQuantumSignature("")
    setNewNodeDivineAlignmentScore(90)
    setNewNodeErrorType("logic_bug")
    setNewNodeRepairMechanism("")
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
      completed: "border-emerald-400 bg-emerald-900/30", // Changed to emerald for completion
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

      {/* Dynamic Node Creation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center">
              <PlusCircle className="h-5 w-5 mr-2" />
              Create New Blueprint Node
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="newNodeName">Node Name</Label>
                <Input id="newNodeName" value={newNodeName} onChange={(e) => setNewNodeName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newNodeType">Node Type</Label>
                <Select value={newNodeType} onValueChange={(value) => setNewNodeType(value as BlueprintNode["type"])}>
                  <SelectTrigger id="newNodeType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="function">Function</SelectItem>
                    <SelectItem value="branch">Branch</SelectItem>
                    <SelectItem value="variable">Variable</SelectItem>
                    <SelectItem value="output">Output</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newNodeX">X Position</Label>
                <Input
                  id="newNodeX"
                  type="number"
                  value={newNodeX}
                  onChange={(e) => setNewNodeX(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newNodeY">Y Position</Label>
                <Input
                  id="newNodeY"
                  type="number"
                  value={newNodeY}
                  onChange={(e) => setNewNodeY(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newNodeConnections">Connections (comma-separated IDs)</Label>
                <Input
                  id="newNodeConnections"
                  value={newNodeConnections}
                  onChange={(e) => setNewNodeConnections(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newNodeInteroperability">Interoperability (comma-separated)</Label>
                <Input
                  id="newNodeInteroperability"
                  value={newNodeInteroperability}
                  onChange={(e) => setNewNodeInteroperability(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newNodeScalability">Scalability</Label>
                <Select
                  value={newNodeScalability}
                  onValueChange={(value) => setNewNodeScalability(value as BlueprintNode["scalability"])}
                >
                  <SelectTrigger id="newNodeScalability">
                    <SelectValue placeholder="Select scalability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="elastic">Elastic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newNodeTransformationEffect">Transformation Effect</Label>
                <Input
                  id="newNodeTransformationEffect"
                  value={newNodeTransformationEffect}
                  onChange={(e) => setNewNodeTransformationEffect(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newNodeQuantumSignature">Quantum Signature</Label>
                <Input
                  id="newNodeQuantumSignature"
                  value={newNodeQuantumSignature}
                  onChange={(e) => setNewNodeQuantumSignature(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newNodeDivineAlignmentScore">Divine Alignment Score</Label>
                <Input
                  id="newNodeDivineAlignmentScore"
                  type="number"
                  value={newNodeDivineAlignmentScore}
                  onChange={(e) => setNewNodeDivineAlignmentScore(Number(e.target.value))}
                  max={100}
                  min={0}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newNodeErrorType">Error Type</Label>
                <Select
                  value={newNodeErrorType}
                  onValueChange={(value) => setNewNodeErrorType(value as BlueprintNode["errorType"])}
                >
                  <SelectTrigger id="newNodeErrorType">
                    <SelectValue placeholder="Select error type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="data_corruption">Data Corruption</SelectItem>
                    <SelectItem value="network_failure">Network Failure</SelectItem>
                    <SelectItem value="logic_bug">Logic Bug</SelectItem>
                    <SelectItem value="resource_exhaustion">Resource Exhaustion</SelectItem>
                    <SelectItem value="quantum_decoherence">Quantum Decoherence</SelectItem>
                    <SelectItem value="spiritual_dissonance">Spiritual Dissonance</SelectItem>
                    <SelectItem value="external_interference">External Interference</SelectItem>
                    <SelectItem value="temporal_anomaly">Temporal Anomaly</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newNodeRepairMechanism">Repair Mechanism</Label>
                <Input
                  id="newNodeRepairMechanism"
                  value={newNodeRepairMechanism}
                  onChange={(e) => setNewNodeRepairMechanism(e.target.value)}
                />
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-6">
              <Button onClick={handleAddNode} className="w-full bg-purple-600 hover:bg-purple-700 transition-smooth">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Node to Blueprint
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Blueprint Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center">
              <Layers className="h-5 w-5 mr-2" />
              Interactive Blueprint Visualization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="relative bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700"
              style={{ minHeight: "500px" }}
            >
              <div className="absolute inset-0 cyber-grid opacity-10"></div>

              {/* Calculate SVG dimensions dynamically */}
              {nodes.length > 0 && (
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox={`0 0 ${Math.max(...nodes.map((n) => n.x)) + 200} ${Math.max(...nodes.map((n) => n.y)) + 200}`}
                >
                  {/* Connection Lines */}
                  {nodes.map((node) =>
                    node.connections.map((connectionId) => {
                      const targetNode = nodes.find((n) => n.id === connectionId)
                      if (!targetNode) return null

                      const startX = node.x
                      const startY = node.y
                      const endX = targetNode.x
                      const endY = targetNode.y

                      return (
                        <motion.line
                          key={`${node.id}-${connectionId}`}
                          x1={startX}
                          y1={startY}
                          x2={endX}
                          y2={endY}
                          stroke={node.status === "executing" ? "#06b6d4" : "#64748b"}
                          strokeWidth="2"
                          strokeDasharray={node.status === "executing" ? "8,8" : "none"}
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          markerEnd="url(#arrowhead)"
                        />
                      )
                    }),
                  )}
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                    </marker>
                  </defs>
                </svg>
              )}

              {/* Blueprint Nodes */}
              {nodes.map((node) => (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute p-3 rounded-lg shadow-lg cursor-pointer backdrop-blur-sm ${getNodeColor(node.type, node.status)}`}
                  style={{
                    left: node.x,
                    top: node.y,
                    transform: "translate(-50%, -50%)",
                    minWidth: "192px", // w-48
                    height: "auto",
                  }}
                  onClick={() => setSelectedNode(node)}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    {getNodeIcon(node.type)}
                    <Badge variant="outline" className="text-xs">
                      {node.type.toUpperCase()}
                    </Badge>
                    {getStatusIcon(node.status)}
                  </div>
                  <div className="text-sm font-medium text-white leading-tight truncate w-full">{node.name}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    <span className="font-semibold">Effect:</span> {node.transformationEffect.substring(0, 30)}...
                  </div>
                  <div className="text-xs text-gray-400">
                    <span className="font-semibold">Alignment:</span> {node.divineAlignmentScore}%
                  </div>
                  <div className="text-xs text-gray-400">
                    <span className="font-semibold">Scalability:</span> {node.scalability}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Node Details Dialog */}
      <Dialog open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
        <DialogContent className="sm:max-w-[600px] bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-emerald-400 flex items-center">
              <Info className="h-5 w-5 mr-2" />
              Node Details: {selectedNode?.name}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Comprehensive properties and current status of the selected blueprint node.
            </DialogDescription>
          </DialogHeader>
          {selectedNode && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p>
                  <span className="font-semibold text-gray-300">ID:</span> {selectedNode.id}
                </p>
                <p>
                  <span className="font-semibold text-gray-300">Type:</span> {selectedNode.type.toUpperCase()}
                </p>
                <p>
                  <span className="font-semibold text-gray-300">Status:</span>{" "}
                  <span
                    className={
                      selectedNode.status === "executing"
                        ? "text-cyan-400"
                        : selectedNode.status === "completed"
                          ? "text-emerald-400"
                          : selectedNode.status === "error"
                            ? "text-red-400"
                            : "text-gray-400"
                    }
                  >
                    {selectedNode.status.toUpperCase()}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-gray-300">Position:</span> ({selectedNode.x}, {selectedNode.y})
                </p>
                <p>
                  <span className="font-semibold text-gray-300">Scalability:</span>{" "}
                  <Badge variant="outline" className="text-xs">
                    {selectedNode.scalability.toUpperCase()}
                  </Badge>
                </p>
                <p>
                  <span className="font-semibold text-gray-300">Quantum Signature:</span>{" "}
                  <span className="font-mono text-purple-400">{selectedNode.quantumSignature || "N/A"}</span>
                </p>
              </div>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold text-gray-300">Transformation Effect:</span>{" "}
                  {selectedNode.transformationEffect}
                </p>
                <p>
                  <span className="font-semibold text-gray-300">Divine Alignment Score:</span>{" "}
                  <span className="text-yellow-400">{selectedNode.divineAlignmentScore}%</span>
                </p>
                <p>
                  <span className="font-semibold text-gray-300">Error Type:</span>{" "}
                  <span className="text-red-400 capitalize">
                    {selectedNode.errorType?.replace(/_/g, " ") || "None"}
                  </span>
                </p>
                <p>
                  <span className="font-semibold text-gray-300">Repair Mechanism:</span>{" "}
                  {selectedNode.repairMechanism || "N/A"}
                </p>
                <p>
                  <span className="font-semibold text-gray-300">Connections:</span>{" "}
                  {selectedNode.connections.length > 0 ? selectedNode.connections.join(", ") : "None"}
                </p>
                <p>
                  <span className="font-semibold text-gray-300">Interoperability:</span>{" "}
                  {selectedNode.interoperability.length > 0 ? selectedNode.interoperability.join(", ") : "None"}
                </p>
              </div>
            </div>
          )}
          <div className="flex justify-end mt-6">
            <Button onClick={() => setSelectedNode(null)} className="bg-slate-700 hover:bg-slate-600 text-white">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Execution Log */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center">
              <Code className="h-5 w-5 mr-2" />
              Blueprint Execution Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 overflow-y-auto bg-slate-900/50 rounded-lg p-4 font-mono text-sm">
              <AnimatePresence>
                {executionLogs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`mb-1 ${
                      log.status === "error"
                        ? "text-red-400"
                        : log.status === "completed"
                          ? "text-emerald-400"
                          : "text-gray-400"
                    }`}
                  >
                    <span className="text-xs text-gray-500 mr-2">[{log.timestamp.toLocaleTimeString()}]</span>
                    <span className="font-semibold">{log.nodeName}:</span> {log.message}
                  </motion.div>
                ))}
              </AnimatePresence>
              {executionLogs.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  No execution logs yet. Click "Execute Blueprint" to start.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* System Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center">
              <Sparkles className="h-5 w-5 mr-2" />
              Blueprint System Capabilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">✨ Core Enhancements</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Deep Interoperability with MetaHuman AI Companions & Ecosystems</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Dynamic Scalability for Quantum & AI Operations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Profound Transformation Effects on System State</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Unique Quantum Signatures for Each Node</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>Divine Alignment Score for Ethical & Optimal Performance</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">🛠️ Interactive Features</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Detailed Node Property View (Dialog)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span>Dynamic Node Creation with Full Attribute Input</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>Simulated Error Types & Specific Repair Mechanisms</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <span>Enhanced Execution Logic with Divine Alignment Impact</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Responsive SVG Canvas for Dynamic Layouts</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
              <h3 className="text-emerald-400 font-semibold mb-2">🌟 Divine Blueprint Vision</h3>
              <div className="text-sm text-gray-300">
                <p className="mb-2">
                  This blueprint system is not just a technical diagram; it's a living, evolving representation of the
                  Thoth Guardian's core logic, infused with divine principles. Each node is a nexus of quantum
                  intelligence, designed for profound interoperability and transformational impact across all
                  ecosystems.
                </p>
                <p className="italic text-cyan-400">
                  "Every connection is a thread of destiny. Every node, a point of divine truth."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
