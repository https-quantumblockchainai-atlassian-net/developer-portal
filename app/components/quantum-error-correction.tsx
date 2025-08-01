"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Atom, Shield, RefreshCcw, Waves } from "lucide-react"

interface QubitStatus {
  id: string
  name: string
  coherence: number // 0-100%
  fidelity: number // 0-100%
  errorRate: number // 0-1%
  status: "stable" | "fluctuating" | "critical"
  lastCorrection: Date
}

interface CorrectionProtocol {
  id: string
  name: string
  type: "stabilization" | "re-entanglement" | "decoherence_reversal"
  status: "active" | "paused" | "completed" | "error"
  progress: number
  successRate: number
}

export default function QuantumErrorCorrection() {
  const [qubitStatuses, setQubitStatuses] = useState<QubitStatus[]>([
    {
      id: "qbit-1",
      name: "Qubit Array Alpha",
      coherence: 98.5,
      fidelity: 99.9,
      errorRate: 0.01,
      status: "stable",
      lastCorrection: new Date(Date.now() - 300000), // 5 mins ago
    },
    {
      id: "qbit-2",
      name: "Qubit Array Beta",
      coherence: 70.1,
      fidelity: 88.0,
      errorRate: 0.15,
      status: "fluctuating",
      lastCorrection: new Date(Date.now() - 900000), // 15 mins ago
    },
    {
      id: "qbit-3",
      name: "Qubit Array Gamma",
      coherence: 99.9,
      fidelity: 99.99,
      errorRate: 0.001,
      status: "stable",
      lastCorrection: new Date(Date.now() - 60000), // 1 min ago
    },
    {
      id: "qbit-4",
      name: "Qubit Array Delta",
      coherence: 45.0,
      fidelity: 70.0,
      errorRate: 0.3,
      status: "critical",
      lastCorrection: new Date(Date.now() - 3600000), // 1 hour ago
    },
  ])

  const [correctionProtocols, setCorrectionProtocols] = useState<CorrectionProtocol[]>([
    {
      id: "corr-1",
      name: "Quantum Stabilization Field",
      type: "stabilization",
      status: "active",
      progress: 85,
      successRate: 95.2,
    },
    {
      id: "corr-2",
      name: "Entanglement Re-weaving",
      type: "re-entanglement",
      status: "paused",
      progress: 60,
      successRate: 88.0,
    },
    {
      id: "corr-3",
      name: "Decoherence Reversal Protocol",
      type: "decoherence_reversal",
      status: "completed",
      progress: 100,
      successRate: 99.9,
    },
  ])

  const [overallQubitHealth, setOverallQubitHealth] = useState(0)
  const [isCorrectionActive, setIsCorrectionActive] = useState(true)
  const [errorThreshold, setErrorThreshold] = useState([0.1]) // 0-1%

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isCorrectionActive) return

      // Simulate qubit status fluctuations and self-correction
      setQubitStatuses((prev) =>
        prev.map((qubit) => {
          let newCoherence = Math.min(100, Math.max(30, qubit.coherence + (Math.random() - 0.5) * 5))
          let newFidelity = Math.min(100, Math.max(60, qubit.fidelity + (Math.random() - 0.5) * 3))
          let newErrorRate = Math.min(0.5, Math.max(0.001, qubit.errorRate + (Math.random() - 0.5) * 0.05))
          let newStatus = "stable"

          if (newCoherence < 80 || newFidelity < 90 || newErrorRate > 0.1) {
            newStatus = "fluctuating"
          }
          if (newCoherence < 60 || newFidelity < 75 || newErrorRate > 0.2) {
            newStatus = "critical"
          }

          // Self-correction: auto-stabilize fluctuating/critical qubits
          if (newStatus !== "stable" && Math.random() > 0.6) {
            newCoherence = Math.min(100, newCoherence + 10)
            newFidelity = Math.min(100, newFidelity + 5)
            newErrorRate = Math.max(0.01, newErrorRate - 0.05)
            newStatus = "stable"
          }

          return {
            ...qubit,
            coherence: newCoherence,
            fidelity: newFidelity,
            errorRate: newErrorRate,
            status: newStatus,
            lastCorrection: new Date(),
          }
        }),
      )

      // Simulate correction protocol updates
      setCorrectionProtocols((prev) =>
        prev.map((protocol) => {
          if (protocol.status === "active") {
            const newProgress = Math.min(100, protocol.progress + Math.random() * 5)
            const newSuccessRate = Math.min(99.9, protocol.successRate + Math.random() * 0.5)
            return {
              ...protocol,
              progress: newProgress,
              successRate: newSuccessRate,
              status: newProgress >= 100 ? "completed" : "active",
            }
          } else if (protocol.status === "error" && Math.random() > 0.7) {
            // Simulate self-recovery from error
            return { ...protocol, status: "active", progress: 50, successRate: 75 }
          }
          return protocol
        }),
      )

      // Update overall qubit health
      const totalHealth = qubitStatuses.reduce((sum, qubit) => sum + qubit.coherence, 0)
      setOverallQubitHealth(totalHealth / qubitStatuses.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isCorrectionActive, qubitStatuses])

  const initiateFullCorrection = () => {
    setIsCorrectionActive(true)
    setCorrectionProtocols((prev) =>
      prev.map((protocol) => ({
        ...protocol,
        status: "active",
        progress: 0,
        successRate: 70 + Math.random() * 20, // Reset success rate to a starting point
      })),
    )
    setOverallQubitHealth(0)
  }

  const getQubitStatusColor = (status: string) => {
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

  const getProtocolStatusColor = (status: string) => {
    switch (status) {
      case "active":
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

  const getCorrectionTypeIcon = (type: string) => {
    switch (type) {
      case "stabilization":
        return <Shield className="h-5 w-5" />
      case "re-entanglement":
        return <Waves className="h-5 w-5" />
      case "decoherence_reversal":
        return <RefreshCcw className="h-5 w-5" />
      default:
        return <Atom className="h-5 w-5" />
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
        <h1 className="text-3xl font-bold gradient-text mb-2">Quantum Error Correction</h1>
        <p className="text-gray-300">Maintaining Qubit Coherence & Quantum Data Integrity</p>
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
              <Atom className="h-6 w-6 text-emerald-400" />
              <div>
                <div className="text-lg font-bold text-emerald-400">
                  {qubitStatuses.filter((q) => q.status === "stable").length}/{qubitStatuses.length}
                </div>
                <div className="text-xs text-gray-400">Stable Qubits</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-blue-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-blue-400" />
              <div>
                <div className="text-lg font-bold text-blue-400">
                  {correctionProtocols.filter((p) => p\
