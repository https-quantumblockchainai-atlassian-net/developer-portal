"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Atom,
  Zap,
  Network,
  RefreshCcw,
  Send,
  Lightbulb,
  Code,
  Database,
  Activity,
  Globe,
  Coins,
  Wallet,
  TrendingUp,
  Shield,
} from "lucide-react"

interface SolanaMetric {
  name: string
  value: number
  unit: string
  status: "optimal" | "warning" | "critical"
}

interface AIProgram {
  id: string
  name: string
  address: string
  status: "active" | "paused" | "upgrading" | "error"
  transactions: number
  computeUnits: number
  lastActivity: Date
  aiModelVersion: string
}

interface TransactionLog {
  id: string
  programId: string
  type: "invoke" | "transfer" | "data_update" | "error"
  status: "success" | "failed"
  timestamp: Date
  details: string
}

export default function SolanaAIHub() {
  const [solanaMetrics, setSolanaMetrics] = useState<SolanaMetric[]>([
    { name: "Current TPS", value: 3500, unit: "TPS", status: "optimal" },
    { name: "Avg Block Time", value: 0.4, unit: "s", status: "optimal" },
    { name: "Active Validators", value: 1800, unit: "", status: "optimal" },
    { name: "Network Health", value: 99.9, unit: "%", status: "optimal" },
  ])

  const [aiPrograms, setAiPrograms] = useState<AIProgram[]>([
    {
      id: "ai-threat-detector",
      name: "AI Threat Detector",
      address: "ThothGuard11111111111111111111111111111111",
      status: "active",
      transactions: 123456,
      computeUnits: 5000000,
      lastActivity: new Date(Date.now() - 60000), // 1 min ago
      aiModelVersion: "v2.1-quantum-aware",
    },
    {
      id: "aura-ai-oracle",
      name: "Aura AI Oracle",
      address: "AuraOracle22222222222222222222222222222222",
      status: "active",
      transactions: 87654,
      computeUnits: 3000000,
      lastActivity: new Date(Date.now() - 300000), // 5 min ago
      aiModelVersion: "v1.5-emotional-resonance",
    },
    {
      id: "quantum-encryption-agent",
      name: "Quantum Encryption Agent",
      address: "QuantumEncrypt3333333333333333333333333333",
      status: "upgrading",
      transactions: 45678,
      computeUnits: 7000000,
      lastActivity: new Date(Date.now() - 1200000), // 20 min ago
      aiModelVersion: "v3.0-post-quantum",
    },
  ])

  const [transactionLogs, setTransactionLogs] = useState<TransactionLog[]>([
    {
      id: "tx1",
      programId: "ai-threat-detector",
      type: "invoke",
      status: "success",
      timestamp: new Date(Date.now() - 10000),
      details: "Threat analysis initiated for network segment Alpha.",
    },
    {
      id: "tx2",
      programId: "aura-ai-oracle",
      type: "data_update",
      status: "success",
      timestamp: new Date(Date.now() - 30000),
      details: "Emotional resonance data updated for user profile 7B.",
    },
    {
      id: "tx3",
      programId: "quantum-encryption-agent",
      type: "error",
      status: "failed",
      timestamp: new Date(Date.now() - 50000),
      details: "Encryption key generation failed due to temporary network congestion.",
    },
  ])

  const [newProgramInput, setNewProgramInput] = useState({ name: "", address: "" })
  const [invokeProgramInput, setInvokeProgramInput] = useState({ programId: "", data: "" })

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate Solana metrics fluctuations
      setSolanaMetrics((prev) =>
        prev.map((metric) => {
          let newValue = metric.value + (Math.random() - 0.5) * (metric.unit === "TPS" ? 100 : 0.1)
          newValue = Math.max(
            metric.unit === "TPS" ? 2000 : 0.1,
            Math.min(metric.unit === "TPS" ? 5000 : 100, newValue),
          )
          let newStatus = "optimal"
          if (metric.unit === "TPS" && newValue < 3000) newStatus = "warning"
          if (metric.unit === "%" && newValue < 99) newStatus = "warning"
          if (metric.unit === "s" && newValue > 0.5) newStatus = "warning"

          // Self-healing: auto-correct if warning/critical
          if (newStatus !== "optimal" && Math.random() > 0.7) {
            if (metric.unit === "TPS") newValue = 4000
            if (metric.unit === "%") newValue = 99.9
            if (metric.unit === "s") newValue = 0.4
            newStatus = "optimal"
          }

          return { ...metric, value: newValue, status: newStatus }
        }),
      )

      // Simulate AI program activity and status changes
      setAiPrograms((prev) =>
        prev.map((program) => {
          const newTransactions = program.transactions + Math.floor(Math.random() * 100)
          const newComputeUnits = program.computeUnits + Math.floor(Math.random() * 10000)
          let newStatus = program.status

          if (newStatus === "upgrading" && Math.random() > 0.8) {
            newStatus = "active" // Finish upgrade
          } else if (newStatus === "active" && Math.random() < 0.02) {
            newStatus = "error" // Simulate error
          } else if (newStatus === "error" && Math.random() < 0.5) {
            newStatus = "active" // Self-recover from error
          }

          return {
            ...program,
            transactions: newTransactions,
            computeUnits: newComputeUnits,
            status: newStatus,
            lastActivity: new Date(),
          }
        }),
      )

      // Simulate new transaction logs
      if (Math.random() < 0.3) {
        const randomProgram = aiPrograms[Math.floor(Math.random() * aiPrograms.length)]
        if (randomProgram) {
          const types = ["invoke", "transfer", "data_update", "error"]
          const randomType = types[Math.floor(Math.random() * types.length)]
          const success = randomType !== "error" || Math.random() > 0.5 // Errors can also succeed if self-corrected
          const newLog: TransactionLog = {
            id: `tx-${Date.now()}`,
            programId: randomProgram.id,
            type: randomType as TransactionLog["type"],
            status: success ? "success" : "failed",
            timestamp: new Date(),
            details: `Simulated transaction for ${randomProgram.name}: ${randomType} - ${success ? "successful" : "failed"}.`,
          }
          setTransactionLogs((prev) => [newLog, ...prev])
        }
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [aiPrograms])

  const handleDeployProgram = () => {
    if (newProgramInput.name && newProgramInput.address) {
      const newProgram: AIProgram = {
        id: `ai-prog-${Date.now()}`,
        status: "active",
        transactions: 0,
        computeUnits: 0,
        lastActivity: new Date(),
        aiModelVersion: "v1.0-new-deployment",
        ...newProgramInput,
      }
      setAiPrograms((prev) => [...prev, newProgram])
      setNewProgramInput({ name: "", address: "" })
    }
  }

  const handleInvokeProgram = () => {
    if (invokeProgramInput.programId && invokeProgramInput.data) {
      const program = aiPrograms.find((p) => p.id === invokeProgramInput.programId)
      if (program) {
        const newLog: TransactionLog = {
          id: `tx-${Date.now()}`,
          programId: program.id,
          type: "invoke",
          status: "success", // Assume success for manual invoke
          timestamp: new Date(),
          details: `Manual invocation of ${program.name} with data: "${invokeProgramInput.data.substring(0, 20)}..."`,
        }
        setTransactionLogs((prev) => [newLog, ...prev])
        setInvokeProgramInput({ programId: "", data: "" })
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
      case "active":
        return "text-green-400"
      case "warning":
      case "upgrading":
        return "text-yellow-400"
      case "critical":
      case "error":
        return "text-red-400"
      case "paused":
        return "text-gray-400"
      default:
        return "text-gray-400"
    }
  }

  const getTxStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-400"
      case "failed":
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
        <h1 className="text-3xl font-bold gradient-text mb-2">Solana AI Hub</h1>
        <p className="text-gray-300">Decentralized AI Programs on the Solana Blockchain</p>
      </motion.div>

      {/* Solana Network Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {solanaMetrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="transition-smooth"
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  {metric.unit === "TPS" ? (
                    <TrendingUp className="h-5 w-5 text-emerald-400" />
                  ) : metric.unit === "s" ? (
                    <Activity className="h-5 w-5 text-blue-400" />
                  ) : metric.unit === "%" ? (
                    <Shield className="h-5 w-5 text-purple-400" />
                  ) : (
                    <Network className="h-5 w-5 text-cyan-400" />
                  )}
                  <div>
                    <div className="font-medium text-white">{metric.name}</div>
                    <div className={`text-xs ${getStatusColor(metric.status)}`}>{metric.status.toUpperCase()}</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">
                  {metric.value.toFixed(metric.unit === "s" ? 1 : 0)}
                  {metric.unit}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Programs on Solana */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center">
                  <Code className="h-5 w-5 mr-2" />
                  AI Programs on Solana
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {aiPrograms.map((program, index) => (
                    <motion.div
                      key={program.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-emerald-500/30 transition-smooth"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Atom className="h-5 w-5 text-gray-400" />
                          <div>
                            <h3 className="font-medium text-white">{program.name}</h3>
                            <div className="text-xs text-gray-400">Model: {program.aiModelVersion}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className={getStatusColor(program.status)}>
                          {program.status.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="text-xs text-gray-400 mb-2 truncate">Address: {program.address}</div>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <div className="text-gray-400">Transactions</div>
                          <div className="font-bold text-white">{program.transactions.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Compute Units</div>
                          <div className="font-bold text-white">{program.computeUnits.toLocaleString()}</div>
                        </div>
                      </div>

                      <div className="mt-2 text-xs text-gray-500">
                        Last Activity: {program.lastActivity.toLocaleString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Transaction Logs & Controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-6"
        >
          {/* Transaction Logs */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Recent Transaction Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {transactionLogs.map((log, index) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`p-3 bg-slate-700/50 rounded-lg border ${
                      log.status === "success" ? "border-green-500/30" : "border-red-500/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium text-white">
                        {aiPrograms.find((p) => p.id === log.programId)?.name || "Unknown Program"}
                      </h4>
                      <Badge variant="outline" className={getTxStatusColor(log.status)}>
                        {log.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{log.details}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Type: {log.type.toUpperCase()}</span>
                      <span>{log.timestamp.toLocaleTimeString()}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Deploy New Program */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Deploy New AI Program
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Program Name"
                value={newProgramInput.name}
                onChange={(e) => setNewProgramInput({ ...newProgramInput, name: e.target.value })}
                className="bg-slate-700/50 border-slate-600"
              />
              <Input
                placeholder="Solana Program Address"
                value={newProgramInput.address}
                onChange={(e) => setNewProgramInput({ ...newProgramInput, address: e.target.value })}
                className="bg-slate-700/50 border-slate-600"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={handleDeployProgram} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Send className="h-4 w-4 mr-2" />
                  Deploy Program
                </Button>
              </motion.div>
            </CardContent>
          </Card>

          {/* Invoke Program */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center">
                <RefreshCcw className="h-5 w-5 mr-2" />
                Invoke AI Program
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <select
                value={invokeProgramInput.programId}
                onChange={(e) => setInvokeProgramInput({ ...invokeProgramInput, programId: e.target.value })}
                className="w-full p-2 rounded-md bg-slate-700/50 border-slate-600 text-white"
              >
                <option value="">Select Program</option>
                {aiPrograms.map((program) => (
                  <option key={program.id} value={program.id}>
                    {program.name}
                  </option>
                ))}
              </select>
              <Textarea
                placeholder="Input Data (e.g., JSON, string)"
                value={invokeProgramInput.data}
                onChange={(e) => setInvokeProgramInput({ ...invokeProgramInput, data: e.target.value })}
                className="bg-slate-700/50 border-slate-600 min-h-[80px]"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={handleInvokeProgram} className="w-full bg-yellow-600 hover:bg-yellow-700">
                  <Send className="h-4 w-4 mr-2" />
                  Invoke Program
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Decentralized AI & Quantum Integration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Decentralized AI & Quantum Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">🔗 Blockchain Benefits</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Immutable audit trails for AI decisions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Transparent and verifiable AI model updates</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Secure, decentralized execution of quantum algorithms</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">💰 Tokenomics & Incentives</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <Coins className="h-4 w-4 text-cyan-400" />
                    <span>Staking mechanisms for AI program validators</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Wallet className="h-4 w-4 text-orange-400" />
                    <span>Rewards for contributing compute power to AI training</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Lightbulb className="h-4 w-4 text-pink-400" />
                    <span>Incentives for reporting and resolving vulnerabilities</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
              <h3 className="text-emerald-400 font-semibold mb-2">✨ The Sovereign Network</h3>
              <div className="text-sm text-gray-300">
                <p className="mb-2">
                  The Solana AI Hub empowers the Thoth Guardian with a decentralized, high-throughput backbone for its
                  AI and quantum operations. This ensures unparalleled security, transparency, and resilience, aligning
                  the digital infrastructure with principles of divine sovereignty and collective well-being.
                </p>
                <p className="italic text-cyan-400">
                  "On the blockchain of light, intelligence flows freely and securely."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
