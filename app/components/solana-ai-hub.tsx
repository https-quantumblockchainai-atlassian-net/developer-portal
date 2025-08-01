"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Code, Lightbulb, Atom, Star, Heart, Globe, Wallet, Activity } from "lucide-react"

interface SolanaProgram {
  id: string
  name: string
  address: string
  type: "DeFi" | "NFT" | "Gaming" | "AI Compute" | "Quantum Bridge" | "Divine Oracle"
  status: "active" | "paused" | "auditing" | "error"
  tpsImpact: number // Transactions per second impact
  latency: number // ms
  divineAlignment: number // 0-100
  lastUpdate: Date
}

interface TransactionLog {
  id: string
  programId: string
  programName: string
  type: "invoke" | "success" | "failure" | "divine_sync"
  signature: string
  timestamp: Date
  computeUnits: number
  status: "confirmed" | "failed"
  alignmentImpact: number // Change in divine alignment
}

interface WalletBalance {
  token: string
  balance: number
  divineAlignment: number
}

export default function SolanaAIHub() {
  const [solanaPrograms, setSolanaPrograms] = useState<SolanaProgram[]>([
    {
      id: "program-ai-compute",
      name: "Aura AI Compute Engine",
      address: "AuraAI111111111111111111111111111111111111",
      type: "AI Compute",
      status: "active",
      tpsImpact: 500,
      latency: 150,
      divineAlignment: 95,
      lastUpdate: new Date(Date.now() - 30000),
    },
    {
      id: "program-quantum-bridge",
      name: "Quantum Entanglement Bridge",
      address: "QBridge111111111111111111111111111111111111",
      type: "Quantum Bridge",
      status: "active",
      tpsImpact: 200,
      latency: 80,
      divineAlignment: 98,
      lastUpdate: new Date(Date.now() - 60000),
    },
    {
      id: "program-divine-oracle",
      name: "Divine Truth Oracle",
      address: "DivineOracle11111111111111111111111111111111",
      type: "Divine Oracle",
      status: "auditing",
      tpsImpact: 100,
      latency: 200,
      divineAlignment: 85,
      lastUpdate: new Date(Date.now() - 86400000),
    },
  ])

  const [transactionLogs, setTransactionLogs] = useState<TransactionLog[]>([
    {
      id: "tx-1",
      programId: "program-ai-compute",
      programName: "Aura AI Compute Engine",
      type: "invoke",
      signature: "5g6h7j8k9l0m1n2o3p4q5r6s7t8u9v0w1x2y3z4a",
      timestamp: new Date(Date.now() - 5000),
      computeUnits: 150000,
      status: "confirmed",
      alignmentImpact: 1,
    },
    {
      id: "tx-2",
      programId: "program-quantum-bridge",
      programName: "Quantum Entanglement Bridge",
      type: "divine_sync",
      signature: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
      timestamp: new Date(Date.now() - 10000),
      computeUnits: 80000,
      status: "confirmed",
      alignmentImpact: 5,
    },
    {
      id: "tx-3",
      programId: "program-divine-oracle",
      programName: "Divine Truth Oracle",
      type: "failure",
      signature: "z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0",
      timestamp: new Date(Date.now() - 15000),
      computeUnits: 20000,
      status: "failed",
      alignmentImpact: -2,
    },
  ])

  const [walletBalances, setWalletBalances] = useState<WalletBalance[]>([
    { token: "SOL", balance: 12.5, divineAlignment: 90 },
    { token: "THOTH", balance: 5000, divineAlignment: 95 },
    { token: "AURA", balance: 1500, divineAlignment: 98 },
  ])

  const [networkTPS, setNetworkTPS] = useState(3000)
  const [networkLatency, setNetworkLatency] = useState(250)

  useEffect(() => {
    // Simulate Solana program activity and network metrics
    const interval = setInterval(() => {
      setSolanaPrograms((prev) =>
        prev.map((program) => {
          let newStatus = program.status
          let newTpsImpact = program.tpsImpact
          let newLatency = program.latency
          let newAlignment = program.divineAlignment

          if (program.status === "auditing") {
            if (Math.random() < 0.1) newStatus = "active" // Auditing completes
          } else if (program.status === "active") {
            newTpsImpact = Math.min(1000, Math.max(100, program.tpsImpact + (Math.random() - 0.5) * 50))
            newLatency = Math.min(300, Math.max(50, program.latency + (Math.random() - 0.5) * 10))
          }

          newAlignment = Math.min(100, Math.max(70, program.divineAlignment + (Math.random() - 0.5) * 2))

          return {
            ...program,
            status: newStatus,
            tpsImpact: newTpsImpact,
            latency: newLatency,
            divineAlignment: newAlignment,
            lastUpdate: new Date(),
          }
        }),
      )

      // Simulate new transaction logs
      if (Math.random() < 0.4) {
        const randomProgram = solanaPrograms[Math.floor(Math.random() * solanaPrograms.length)]
        const txTypes: TransactionLog["type"][] = ["invoke", "success", "failure", "divine_sync"]
        const randomTxType = txTypes[Math.floor(Math.random() * txTypes.length)]
        const newLog: TransactionLog = {
          id: Date.now().toString(),
          programId: randomProgram.id,
          programName: randomProgram.name,
          type: randomTxType,
          signature: Math.random().toString(36).substring(2, 42),
          timestamp: new Date(),
          computeUnits: Math.floor(Math.random() * 200000) + 50000,
          status: randomTxType === "failure" ? "failed" : "confirmed",
          alignmentImpact: Math.floor(Math.random() * 10) - 5, // -5 to +5
        }
        setTransactionLogs((prev) => [newLog, ...prev.slice(0, 9)]) // Keep last 10 logs
      }

      // Update network metrics
      setNetworkTPS(Math.min(5000, Math.max(1000, networkTPS + (Math.random() - 0.5) * 200)))
      setNetworkLatency(Math.min(500, Math.max(50, networkLatency + (Math.random() - 0.5) * 20)))
    }, 2000)

    return () => clearInterval(interval)
  }, [solanaPrograms, networkTPS, networkLatency])

  const getProgramStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-emerald-400 border-emerald-500/30"
      case "paused":
        return "text-yellow-400 border-yellow-500/30"
      case "auditing":
        return "text-blue-400 border-blue-500/30"
      case "error":
        return "text-red-400 border-red-500/30"
      default:
        return "text-gray-400 border-gray-500/30"
    }
  }

  const getProgramTypeIcon = (type: string) => {
    switch (type) {
      case "DeFi":
        return <Wallet className="h-4 w-4" />
      case "NFT":
        return <Star className="h-4 w-4" />
      case "Gaming":
        return <MonitorPlay className="h-4 w-4" />
      case "AI Compute":
        return <Brain className="h-4 w-4" />
      case "Quantum Bridge":
        return <Atom className="h-4 w-4" />
      case "Divine Oracle":
        return <Lightbulb className="h-4 w-4" />
      default:
        return <Code className="h-4 w-4" />
    }
  }

  const getTxStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "text-green-400"
      case "failed":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getTxTypeIcon = (type: string) => {
    switch (type) {
      case "invoke":
        return <Code className="h-4 w-4" />
      case "success":
        return <CheckCircle className="h-4 w-4" />
      case "failure":
        return <XCircle className="h-4 w-4" />
      case "divine_sync":
        return <Heart className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
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
        <p className="text-gray-300">Decentralized AI & Quantum Integration on Solana Blockchain</p>
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
              <Globe className="h-6 w-6 text-emerald-400" />
              <div>
                <div className="text-lg font-bold text-emerald-400">{networkTPS.toLocaleString()}</div>
                <div className="text-xs text-gray-400">Network TPS</div>
              </div>
            </CardContent>
          </Card>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Wallet className="h-6 w-6 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-purple-400">
                  {walletBalances.find((b) => b.token === "THOTH")?.balance.toLocaleString() || 0}
                </div>
                <div className="text-xs text-gray-400">THOTH Tokens</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-cyan-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-6 w-6 text-cyan-400" />
              <div>
                <div className="text-lg font-bold text-cyan-400">{transactionLogs.length}</div>
                <div className="text-xs text-gray-400">Recent Transactions</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-yellow-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-yellow-400" />
              <div>
                <div className="text-lg font-bold text-yellow-400">
                  {(solanaPrograms.reduce((sum, p) => sum + p.divineAlignment, 0) / solanaPrograms.length).toFixed(1)}%
                </div>
                <div className="text-xs text-gray-400">Avg Program Alignment</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Solana Programs */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center">
                  <Code className="h-5 w-5 mr-2" />
                  Solana Programs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {solanaPrograms.map((program, index) => (
                    <motion.div
                      key={program.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`p-3 bg-slate-700/50 rounded-lg border ${getProgramStatusColor(program.status)} hover:border-opacity-60 transition-smooth`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          {getProgramTypeIcon(program.type)}
                          <div>
                            <h3 className="font-medium text-white">{program.name}</h3>
                            <div className="text-xs text-gray-400">{program.type}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {program.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-400 mb-1">Address: {program.address.substring(0, 8)}...</div>
                      <div className="text-xs text-gray-400 mb-1">TPS Impact: {program.tpsImpact}</div>
                      <div className="text-xs text-gray-400">Latency: {program.latency}ms</div>
                      <div className="text-xs text-gray-400 mt-1">Divine Alignment: {program.divineAlignment}%</div>
                      <Progress value={program.divineAlignment} className="h-1 mt-2" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Transaction Logs */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Recent Transaction Logs
                </CardTitle>
              </CardHeader>
              <Card\
