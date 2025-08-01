"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Coins,
  Brain,
  Zap,
  TrendingUp,
  Wallet,
  Network,
  Shield,
  Bot,
  Activity,
  DollarSign,
  Users,
  Globe,
} from "lucide-react"

interface SolanaAIAgent {
  id: string
  name: string
  type: "trading" | "defi" | "nft" | "governance" | "security"
  status: "active" | "idle" | "training" | "error"
  performance: number
  transactions: number
  profit: number
  accuracy: number
}

interface BlockchainMetrics {
  tps: number
  blockTime: number
  validators: number
  stakeRatio: number
  totalSupply: number
  price: number
  marketCap: number
  volume24h: number
}

export default function SolanaAIHub() {
  const [agents, setAgents] = useState<SolanaAIAgent[]>([
    {
      id: "1",
      name: "DeFi Yield Optimizer",
      type: "defi",
      status: "active",
      performance: 94.7,
      transactions: 1247,
      profit: 12.4,
      accuracy: 89.2,
    },
    {
      id: "2",
      name: "NFT Market Analyzer",
      type: "nft",
      status: "active",
      performance: 87.3,
      transactions: 892,
      profit: 8.7,
      accuracy: 92.1,
    },
    {
      id: "3",
      name: "Trading Bot Alpha",
      type: "trading",
      status: "training",
      performance: 91.2,
      transactions: 2341,
      profit: 15.6,
      accuracy: 85.4,
    },
    {
      id: "4",
      name: "Security Sentinel",
      type: "security",
      status: "active",
      performance: 98.1,
      transactions: 567,
      profit: 0,
      accuracy: 97.8,
    },
  ])

  const [metrics, setMetrics] = useState<BlockchainMetrics>({
    tps: 2847,
    blockTime: 0.4,
    validators: 1847,
    stakeRatio: 72.3,
    totalSupply: 573.2,
    price: 142.67,
    marketCap: 81.7,
    volume24h: 2.4,
  })

  const [aiInsights, setAiInsights] = useState([
    {
      type: "opportunity",
      message: "High yield farming opportunity detected in Raydium pool",
      confidence: 94.2,
      timestamp: new Date(),
    },
    {
      type: "warning",
      message: "Unusual trading volume spike in BONK token",
      confidence: 87.6,
      timestamp: new Date(Date.now() - 300000),
    },
    {
      type: "success",
      message: "DeFi strategy executed successfully, +12.4% yield",
      confidence: 98.1,
      timestamp: new Date(Date.now() - 600000),
    },
  ])

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      // Update metrics
      setMetrics((prev) => ({
        ...prev,
        tps: Math.max(1000, Math.min(5000, prev.tps + (Math.random() - 0.5) * 200)),
        blockTime: Math.max(0.3, Math.min(0.6, prev.blockTime + (Math.random() - 0.5) * 0.1)),
        price: Math.max(100, Math.min(200, prev.price + (Math.random() - 0.5) * 5)),
        volume24h: Math.max(1, Math.min(5, prev.volume24h + (Math.random() - 0.5) * 0.2)),
      }))

      // Update agent performance
      setAgents((prev) =>
        prev.map((agent) => ({
          ...agent,
          performance: Math.max(70, Math.min(100, agent.performance + (Math.random() - 0.5) * 2)),
          transactions:
            agent.status === "active" ? agent.transactions + Math.floor(Math.random() * 5) : agent.transactions,
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "training":
        return "bg-yellow-500"
      case "idle":
        return "bg-gray-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "trading":
        return TrendingUp
      case "defi":
        return Coins
      case "nft":
        return Bot
      case "governance":
        return Users
      case "security":
        return Shield
      default:
        return Brain
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case "opportunity":
        return "border-green-500/30 bg-green-500/10"
      case "warning":
        return "border-yellow-500/30 bg-yellow-500/10"
      case "success":
        return "border-blue-500/30 bg-blue-500/10"
      default:
        return "border-gray-500/30 bg-gray-500/10"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <Coins className="h-12 w-12 text-purple-400 mr-4" />
              <Brain className="h-6 w-6 text-cyan-400 absolute -top-1 -right-1" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">Solana.AI Hub</h1>
          </div>
          <p className="text-xl text-gray-300">AI-powered blockchain intelligence and automated trading on Solana</p>
        </motion.div>

        {/* Blockchain Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8"
        >
          <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
            <CardContent className="p-4 text-center">
              <Activity className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-purple-400">{metrics.tps.toLocaleString()}</div>
              <div className="text-xs text-gray-400">TPS</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-cyan-500/30 glass-morphism">
            <CardContent className="p-4 text-center">
              <Zap className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-cyan-400">{metrics.blockTime}s</div>
              <div className="text-xs text-gray-400">Block Time</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
            <CardContent className="p-4 text-center">
              <Network className="h-6 w-6 text-emerald-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-emerald-400">{metrics.validators}</div>
              <div className="text-xs text-gray-400">Validators</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-yellow-500/30 glass-morphism">
            <CardContent className="p-4 text-center">
              <Shield className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-yellow-400">{metrics.stakeRatio}%</div>
              <div className="text-xs text-gray-400">Staked</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-blue-500/30 glass-morphism">
            <CardContent className="p-4 text-center">
              <Coins className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-blue-400">{metrics.totalSupply}M</div>
              <div className="text-xs text-gray-400">Supply</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-green-500/30 glass-morphism">
            <CardContent className="p-4 text-center">
              <DollarSign className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-green-400">${metrics.price}</div>
              <div className="text-xs text-gray-400">SOL Price</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-pink-500/30 glass-morphism">
            <CardContent className="p-4 text-center">
              <Globe className="h-6 w-6 text-pink-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-pink-400">${metrics.marketCap}B</div>
              <div className="text-xs text-gray-400">Market Cap</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-orange-500/30 glass-morphism">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-6 w-6 text-orange-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-orange-400">${metrics.volume24h}B</div>
              <div className="text-xs text-gray-400">24h Volume</div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Agents */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <Bot className="h-6 w-6 mr-2" />
                    AI Agents
                  </div>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Brain className="h-4 w-4 mr-2" />
                    Deploy Agent
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {agents.map((agent) => {
                  const IconComponent = getTypeIcon(agent.type)
                  return (
                    <motion.div
                      key={agent.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-slate-900/50 rounded-lg border border-slate-700"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <IconComponent className="h-5 w-5 text-purple-400 mr-3" />
                          <div>
                            <h3 className="font-semibold text-white">{agent.name}</h3>
                            <p className="text-xs text-gray-400 capitalize">{agent.type} Agent</p>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(agent.status)} text-white`}>{agent.status}</Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Performance</p>
                          <p className="text-purple-400 font-semibold">{agent.performance.toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Transactions</p>
                          <p className="text-cyan-400 font-semibold">{agent.transactions}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Profit</p>
                          <p className="text-green-400 font-semibold">+{agent.profit}%</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Accuracy</p>
                          <p className="text-yellow-400 font-semibold">{agent.accuracy.toFixed(1)}%</p>
                        </div>
                      </div>

                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Performance</span>
                          <span className="text-purple-400">{agent.performance.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <motion.div
                            className="bg-purple-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${agent.performance}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Insights & Controls */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            {/* AI Insights */}
            <Card className="bg-slate-800/50 border-cyan-500/30 glass-morphism">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center">
                  <Brain className="h-6 w-6 mr-2" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {aiInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-3 rounded border ${getInsightColor(insight.type)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span
                        className={`text-xs px-2 py-1 rounded capitalize ${
                          insight.type === "opportunity"
                            ? "bg-green-500/20 text-green-400"
                            : insight.type === "warning"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {insight.type}
                      </span>
                      <span className="text-xs text-gray-400">{insight.confidence}%</span>
                    </div>
                    <p className="text-sm text-gray-300">{insight.message}</p>
                    <p className="text-xs text-gray-500 mt-1">{insight.timestamp.toLocaleTimeString()}</p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center">
                  <Zap className="h-6 w-6 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect Wallet
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                >
                  <Bot className="h-4 w-4 mr-2" />
                  Create Trading Bot
                </Button>
                <Button variant="outline" className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analyze Markets
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Security Audit
                </Button>
              </CardContent>
            </Card>

            {/* Wallet Integration */}
            <Card className="bg-slate-800/50 border-yellow-500/30 glass-morphism">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center">
                  <Wallet className="h-6 w-6 mr-2" />
                  Wallet Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Connection</span>
                    <Badge className="bg-green-500 text-white">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">SOL Balance</span>
                    <span className="text-yellow-400 font-semibold">24.67 SOL</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">USD Value</span>
                    <span className="text-green-400 font-semibold">$3,521.45</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Active Positions</span>
                    <span className="text-cyan-400 font-semibold">7</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Total P&L</span>
                    <span className="text-green-400 font-semibold">+$1,247.89</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
