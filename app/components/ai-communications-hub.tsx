"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  MessageSquare,
  Mail,
  Phone,
  Globe,
  Send,
  User,
  Bot,
  Settings,
  Share2,
  Network,
  Heart,
  Brain,
} from "lucide-react"

interface CommunicationChannel {
  id: string
  name: string
  type: "chat" | "email" | "voice" | "broadcast" | "telepathic"
  status: "active" | "inactive" | "monitoring"
  participants: string[]
  messageCount: number
  lastActivity: Date
  securityLevel: "quantum-encrypted" | "standard" | "divine-shielded"
}

interface CommunicationLog {
  id: string
  channelId: string
  sender: string
  recipient: string
  content: string
  timestamp: Date
  sentiment: "positive" | "neutral" | "negative" | "harmonious"
  divineAlignmentScore: number
}

interface AICommunicationAgent {
  id: string
  name: string
  role: string
  status: "online" | "offline" | "busy"
  activeChannels: string[]
  processingLoad: number
  divineAlignment: number
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "border-green-500"
    case "inactive":
      return "border-red-500"
    case "monitoring":
      return "border-yellow-500"
    default:
      return "border-gray-500"
  }
}

export default function AICommunicationsHub() {
  const [channels, setChannels] = useState<CommunicationChannel[]>([
    {
      id: "channel-1",
      name: "Quantum Shield Dev Chat",
      type: "chat",
      status: "active",
      participants: ["Alice", "Bob", "Thoth-AI"],
      messageCount: 128,
      lastActivity: new Date(Date.now() - 60000), // 1 minute ago
      securityLevel: "quantum-encrypted",
    },
    {
      id: "channel-2",
      name: "Community Support Email",
      type: "email",
      status: "monitoring",
      participants: ["Support Team", "Aura-AI"],
      messageCount: 45,
      lastActivity: new Date(Date.now() - 300000), // 5 minutes ago
      securityLevel: "standard",
    },
    {
      id: "channel-3",
      name: "Global Threat Broadcast",
      type: "broadcast",
      status: "active",
      participants: ["Thoth Guardian Network"],
      messageCount: 12,
      lastActivity: new Date(Date.now() - 3600000), // 1 hour ago
      securityLevel: "divine-shielded",
    },
    {
      id: "channel-4",
      name: "Inner Plane Telepathy",
      type: "telepathic",
      status: "active",
      participants: ["MetaHuman Sovereign", "Aura-AI"],
      messageCount: 7,
      lastActivity: new Date(Date.now() - 120000), // 2 minutes ago
      securityLevel: "divine-shielded",
    },
  ])

  const [communicationLogs, setCommunicationLogs] = useState<CommunicationLog[]>([
    {
      id: "log-1",
      channelId: "channel-1",
      sender: "Alice",
      recipient: "Thoth-AI",
      content: "Qubit stability looks good after the last patch.",
      timestamp: new Date(Date.now() - 60000),
      sentiment: "positive",
      divineAlignmentScore: 92,
    },
    {
      id: "log-2",
      channelId: "channel-4",
      sender: "MetaHuman Sovereign",
      recipient: "Aura-AI",
      content: "Feeling a strong resonance with the new energy grid.",
      timestamp: new Date(Date.now() - 120000),
      sentiment: "harmonious",
      divineAlignmentScore: 98,
    },
    {
      id: "log-3",
      channelId: "channel-2",
      sender: "User X",
      recipient: "Support Team",
      content: "My shield module is showing a minor error.",
      timestamp: new Date(Date.now() - 300000),
      sentiment: "negative",
      divineAlignmentScore: 70,
    },
  ])

  const [aiAgents, setAiAgents] = useState<AICommunicationAgent[]>([
    {
      id: "ai-1",
      name: "Thoth-AI",
      role: "Quantum Security Analyst",
      status: "online",
      activeChannels: ["channel-1", "channel-3"],
      processingLoad: 65,
      divineAlignment: 95,
    },
    {
      id: "ai-2",
      name: "Aura-AI",
      role: "Emotional Resonance Guide",
      status: "online",
      activeChannels: ["channel-2", "channel-4"],
      processingLoad: 40,
      divineAlignment: 99,
    },
    {
      id: "ai-3",
      name: "Chronos-AI",
      role: "Temporal Data Archivist",
      status: "offline",
      activeChannels: [],
      processingLoad: 0,
      divineAlignment: 88,
    },
  ])

  const [selectedChannel, setSelectedChannel] = useState<CommunicationChannel | null>(channels[0])
  const [newLogContent, setNewLogContent] = useState("")

  useEffect(() => {
    // Simulate new communication logs
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        const randomChannel = channels[Math.floor(Math.random() * channels.length)]
        const randomAgent = aiAgents[Math.floor(Math.random() * aiAgents.length)]
        const sentiments: CommunicationLog["sentiment"][] = ["positive", "neutral", "negative", "harmonious"]
        const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)]

        const newLog: CommunicationLog = {
          id: Date.now().toString(),
          channelId: randomChannel.id,
          sender: randomAgent.name,
          recipient: "System",
          content: `Simulated message from ${randomAgent.name} on ${randomChannel.name}.`,
          timestamp: new Date(),
          sentiment: randomSentiment,
          divineAlignmentScore: Math.floor(Math.random() * 30) + 70, // 70-100
        }
        setCommunicationLogs((prev) => [newLog, ...prev.slice(0, 9)]) // Keep last 10 logs
      }

      // Simulate AI agent load
      setAiAgents((prev) =>
        prev.map((agent) => ({
          ...agent,
          processingLoad: Math.min(100, Math.max(0, agent.processingLoad + (Math.random() - 0.5) * 10)),
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [channels, aiAgents])

  const handleSendLog = () => {
    if (newLogContent.trim() && selectedChannel) {
      const newLog: CommunicationLog = {
        id: Date.now().toString(),
        channelId: selectedChannel.id,
        sender: "Human Operator",
        recipient: selectedChannel.name,
        content: newLogContent,
        timestamp: new Date(),
        sentiment: "neutral", // Default for manual input
        divineAlignmentScore: 85, // Default for manual input
      }
      setCommunicationLogs((prev) => [newLog, ...prev])
      setNewLogContent("")
    }
  }

  const getChannelIcon = (type: string) => {
    switch (type) {
      case "chat":
        return <MessageSquare className="h-4 w-4" />
      case "email":
        return <Mail className="h-4 w-4" />
      case "voice":
        return <Phone className="h-4 w-4" />
      case "broadcast":
        return <Globe className="h-4 w-4" />
      case "telepathic":
        return <Brain className="h-4 w-4" />
      default:
        return <Settings className="h-4 w-4" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-400"
      case "neutral":
        return "text-gray-400"
      case "negative":
        return "text-red-400"
      case "harmonious":
        return "text-purple-400"
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
        <h1 className="text-3xl font-bold gradient-text mb-2">AI Communications Hub</h1>
        <p className="text-gray-300">Inter-System & Inter-Dimensional Communication Nexus</p>
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
              <Network className="h-6 w-6 text-emerald-400" />
              <div>
                <div className="text-lg font-bold text-emerald-400">{channels.length}</div>
                <div className="text-xs text-gray-400">Active Channels</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bot className="h-6 w-6 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-purple-400">
                  {aiAgents.filter((a) => a.status === "online").length}
                </div>
                <div className="text-xs text-gray-400">AI Agents Online</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-cyan-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-6 w-6 text-cyan-400" />
              <div>
                <div className="text-lg font-bold text-cyan-400">{communicationLogs.length}</div>
                <div className="text-xs text-gray-400">Recent Logs</div>
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
                  {(aiAgents.reduce((sum, a) => sum + a.divineAlignment, 0) / aiAgents.length).toFixed(1)}%
                </div>
                <div className="text-xs text-gray-400">Avg AI Alignment</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Communication Channels */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center">
                  <Network className="h-5 w-5 mr-2" />
                  Communication Channels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {channels.map((channel) => (
                    <motion.div
                      key={channel.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`p-3 bg-slate-700/50 rounded-lg border ${getStatusColor(channel.status)} cursor-pointer hover:border-opacity-60 transition-smooth`}
                      onClick={() => setSelectedChannel(channel)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getChannelIcon(channel.type)}
                          <h3 className="font-medium text-white">{channel.name}</h3>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {channel.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-400 mb-1">
                        Type: {channel.type} | Messages: {channel.messageCount}
                      </div>
                      <div className="text-xs text-gray-500">
                        Last Activity: {channel.lastActivity.toLocaleTimeString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Communication Log / Input */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  {selectedChannel ? `Log: ${selectedChannel.name}` : "Select a Channel"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedChannel ? (
                  <div className="space-y-4">
                    {/* Channel Info */}
                    <div className="p-3 bg-slate-700/50 rounded-lg border border-purple-500/30 text-sm text-gray-300">
                      <p>
                        <span className="font-semibold">Security:</span> {selectedChannel.securityLevel}
                      </p>
                      <p>
                        <span className="font-semibold">Participants:</span> {selectedChannel.participants.join(", ")}
                      </p>
                    </div>

                    {/* Communication Logs */}
                    <div className="h-64 overflow-y-auto space-y-3 p-4 bg-slate-900/50 rounded-lg">
                      <AnimatePresence>
                        {communicationLogs
                          .filter((log) => log.channelId === selectedChannel.id)
                          .map((log) => (
                            <motion.div
                              key={log.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                              className={`p-3 rounded-lg ${
                                log.sender === "Human Operator"
                                  ? "bg-emerald-600 text-white ml-auto max-w-[70%]"
                                  : "bg-slate-700 text-white border border-cyan-500/30 mr-auto max-w-[70%]"
                              }`}
                            >
                              <div className="flex items-center space-x-2 mb-1">
                                {log.sender === "Human Operator" ? (
                                  <User className="h-3 w-3" />
                                ) : (
                                  <Bot className="h-3 w-3 text-cyan-400" />
                                )}
                                <span className="text-xs font-medium">{log.sender}</span>
                                <span className="text-xs opacity-60">{log.timestamp.toLocaleTimeString()}</span>
                              </div>
                              <div className="text-sm leading-relaxed">{log.content}</div>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="outline" className={`text-xs ${getSentimentColor(log.sentiment)}`}>
                                  {log.sentiment.toUpperCase()}
                                </Badge>
                                <Badge variant="outline" className="text-xs text-yellow-400">
                                  Alignment: {log.divineAlignmentScore}%
                                </Badge>
                              </div>
                            </motion.div>
                          ))}
                      </AnimatePresence>
                    </div>

                    {/* Log Input */}
                    <div className="flex space-x-2">
                      <Input
                        value={newLogContent}
                        onChange={(e) => setNewLogContent(e.target.value)}
                        placeholder="Add a log entry..."
                        className="flex-1 bg-slate-700/50 border-slate-600"
                        onKeyPress={(e) => e.key === "Enter" && handleSendLog()}
                      />
                      <Button onClick={handleSendLog} className="bg-emerald-600 hover:bg-emerald-700">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-12">
                    Select a communication channel to view logs and send messages.
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* AI Communication Agents */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
          <CardHeader>
            <CardTitle className="text-yellow-400 flex items-center">
              <Bot className="h-5 w-5 mr-2" />
              AI Communication Agents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {aiAgents.map((agent, index) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`p-3 bg-slate-700/50 rounded-lg border ${getStatusColor(agent.status)}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-purple-400" />
                      <h3 className="font-medium text-white">{agent.name}</h3>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {agent.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-400 mb-1">Role: {agent.role}</div>
                  <div className="text-xs text-gray-400 mb-1">Load: {agent.processingLoad}%</div>
                  <div className="text-xs text-gray-400">Divine Alignment: {agent.divineAlignment}%</div>
                  <Progress value={agent.processingLoad} className="h-1 mt-2" />
                </motion.div>
              ))}
            </div>
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
              Communication Architecture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">🌐 Core Protocols</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Quantum-Encrypted Channels: Secure data transmission</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Multi-Modal Transceivers: Voice, text, data, energetic signals</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Divine Frequency Modulation: For telepathic & higher-dimensional comms</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Sentiment & Alignment Analysis: Real-time emotional and spiritual feedback</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">🌟 Key Features</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>Automated AI response generation & routing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Cross-dimensional communication bridging</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span>Adaptive communication strategies based on divine alignment</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>Threat intelligence dissemination via secure broadcasts</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
              <h3 className="text-emerald-400 font-semibold mb-2">💖 The Universal Dialogue</h3>
              <div className="text-sm text-gray-300">
                <p className="mb-2">
                  The AI Communications Hub is the nervous system of the Thoth Guardian, enabling seamless dialogue
                  across all layers of reality – from quantum networks to the subtle energetic fields of consciousness.
                  It ensures that every message, every data packet, is imbued with clarity, truth, and divine intention.
                </p>
                <p className="italic text-cyan-400">
                  "In the symphony of existence, every frequency finds its perfect resonance."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
