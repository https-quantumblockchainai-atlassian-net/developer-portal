"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  MessageSquare,
  Users,
  Brain,
  Code,
  Lightbulb,
  Zap,
  CheckCircle,
  XCircle,
  PlusCircle,
  Send,
  User,
  Bot,
  Settings,
  Share2,
  Globe,
  Atom,
  Heart,
} from "lucide-react"

interface CollaborationSession {
  id: string
  title: string
  status: "active" | "paused" | "completed" | "archived"
  participants: string[]
  aiAgents: string[]
  progress: number
  lastActivity: Date
  focusArea: string
}

interface ChatMessage {
  id: string
  sender: "user" | "ai" | "system"
  content: string
  timestamp: Date
  context?: string
}

interface AIContribution {
  id: string
  agentName: string
  type: "code_suggestion" | "design_concept" | "data_analysis" | "lore_generation" | "threat_insight"
  content: string
  status: "pending" | "approved" | "rejected"
  timestamp: Date
}

const AICollaborationHub: React.FC = () => {
  const [sessions, setSessions] = useState<CollaborationSession[]>([
    {
      id: "session-1",
      title: "Quantum Shield Protocol Refinement",
      status: "active",
      participants: ["Alice", "Bob"],
      aiAgents: ["Thoth-AI", "Aura-AI"],
      progress: 75,
      lastActivity: new Date(Date.now() - 3600000), // 1 hour ago
      focusArea: "Quantum Cryptography",
    },
    {
      id: "session-2",
      title: "MetaHuman Emotional Resonance Design",
      status: "paused",
      participants: ["Charlie"],
      aiAgents: ["Aura-AI"],
      progress: 40,
      lastActivity: new Date(Date.now() - 86400000), // 1 day ago
      focusArea: "Emotional AI",
    },
    {
      id: "session-3",
      title: "24D Data Stream Optimization",
      status: "completed",
      participants: ["David", "Eve"],
      aiAgents: ["Thoth-AI", "Chronos-AI"],
      progress: 100,
      lastActivity: new Date(Date.now() - 604800000), // 1 week ago
      focusArea: "Data Integrity",
    },
  ])

  const [activeSession, setActiveSession] = useState<CollaborationSession | null>(sessions[0])
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "chat-1",
      sender: "system",
      content: "Thoth-AI joined the session.",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "chat-2",
      sender: "user",
      content: "Let's review the current quantum entanglement stability metrics.",
      timestamp: new Date(Date.now() - 3500000),
      context: "Quantum Shield",
    },
    {
      id: "chat-3",
      sender: "ai",
      content:
        "Analyzing real-time qubit coherence. Detected a minor phase-flip error in Qubit Array 7, now self-correcting.",
      timestamp: new Date(Date.now() - 3400000),
      context: "Quantum Error Correction",
    },
    {
      id: "chat-4",
      sender: "user",
      content: "Aura-AI, what's the emotional resonance of the current user base regarding the new UI?",
      timestamp: new Date(Date.now() - 3300000),
      context: "UI/UX",
    },
    {
      id: "chat-5",
      sender: "ai",
      content:
        "Emotional coherence is at 88.3%. Dominant sentiment: 'Inspired'. Suggesting minor adjustments to visual feedback for deeper engagement.",
      timestamp: new Date(Date.now() - 3200000),
      context: "Aura AI",
    },
  ])
  const [aiContributions, setAiContributions] = useState<AIContribution[]>([
    {
      id: "contrib-1",
      agentName: "Thoth-AI",
      type: "code_suggestion",
      content: "Proposed a new stabilizer code for enhanced quantum error correction: `[[7,1,3]]`.",
      status: "pending",
      timestamp: new Date(Date.now() - 3000000),
    },
    {
      id: "contrib-2",
      agentName: "Aura-AI",
      type: "design_concept",
      content: "Suggested a new visual motif for the 'Divine Alignment' sequence.",
      status: "approved",
      timestamp: new Date(Date.now() - 2800000),
    },
    {
      id: "contrib-3",
      agentName: "Chronos-AI",
      type: "data_analysis",
      content: "Identified a temporal anomaly in historical data streams, recommending a temporal flux recalibration.",
      status: "pending",
      timestamp: new Date(Date.now() - 2500000),
    },
  ])
  const [newChatMessage, setNewChatMessage] = useState("")
  const [newContributionContent, setNewContributionContent] = useState("")
  const [newContributionType, setNewContributionType] = useState<AIContribution["type"]>("code_suggestion")

  useEffect(() => {
    // Simulate session progress and new AI contributions
    const interval = setInterval(() => {
      setSessions((prev) =>
        prev.map((session) => {
          if (session.status === "active" && session.progress < 100) {
            const newProgress = Math.min(100, session.progress + Math.random() * 5)
            return { ...session, progress: newProgress, lastActivity: new Date() }
          }
          return session
        }),
      )

      // Simulate new AI contributions
      if (activeSession && Math.random() < 0.2) {
        const agents = activeSession.aiAgents
        const randomAgent = agents[Math.floor(Math.random() * agents.length)]
        const types: AIContribution["type"][] = [
          "code_suggestion",
          "design_concept",
          "data_analysis",
          "lore_generation",
          "threat_insight",
        ]
        const randomType = types[Math.floor(Math.random() * types.length)]
        const contents = {
          code_suggestion: "Optimized quantum gate sequence for 15% faster execution.",
          design_concept: "Proposed a new visual motif for the 'Inner Plane Gateway' portal.",
          data_analysis: "Detected a subtle correlation between solar flares and minor network fluctuations.",
          lore_generation: "Drafted a new origin story fragment for the 'Crystal Alchemist'.",
          threat_insight: "Identified a novel zero-day exploit pattern targeting multi-modal AI interfaces.",
        }

        const newContrib: AIContribution = {
          id: Date.now().toString(),
          agentName: randomAgent,
          type: randomType,
          content: contents[randomType],
          status: "pending",
          timestamp: new Date(),
        }
        setAiContributions((prev) => [newContrib, ...prev])
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [activeSession])

  const handleSendMessage = () => {
    if (newChatMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        sender: "user",
        content: newChatMessage,
        timestamp: new Date(),
      }
      setChatMessages((prev) => [...prev, message])
      setNewChatMessage("")

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          content: "Acknowledged. Processing your input and cross-referencing with active protocols.",
          timestamp: new Date(),
        }
        setChatMessages((prev) => [...prev, aiResponse])
      }, 1000)
    }
  }

  const handleAddContribution = () => {
    if (newContributionContent.trim()) {
      const contribution: AIContribution = {
        id: Date.now().toString(),
        agentName: "Human-Initiated", // Placeholder for human-initiated contributions
        type: newContributionType,
        content: newContributionContent,
        status: "pending",
        timestamp: new Date(),
      }
      setAiContributions((prev) => [contribution, ...prev])
      setNewContributionContent("")
    }
  }

  const updateContributionStatus = (id: string, status: "approved" | "rejected") => {
    setAiContributions((prev) => prev.map((contrib) => (contrib.id === id ? { ...contrib, status } : contrib)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-emerald-400 border-emerald-500/30"
      case "paused":
        return "text-yellow-400 border-yellow-500/30"
      case "completed":
        return "text-green-400 border-green-500/30"
      case "archived":
        return "text-gray-400 border-gray-500/30"
      case "pending":
        return "text-yellow-400 border-yellow-500/30"
      case "approved":
        return "text-green-400 border-green-500/30"
      case "rejected":
        return "text-red-400 border-red-500/30"
      default:
        return "text-gray-400 border-gray-500/30"
    }
  }

  const getContributionIcon = (type: string) => {
    switch (type) {
      case "code_suggestion":
        return <Code className="h-4 w-4" />
      case "design_concept":
        return <Lightbulb className="h-4 w-4" />
      case "data_analysis":
        return <Zap className="h-4 w-4" />
      case "lore_generation":
        return <Atom className="h-4 w-4" />
      case "threat_insight":
        return <Heart className="h-4 w-4" />
      default:
        return <Settings className="h-4 w-4" />
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
        <h1 className="text-3xl font-bold gradient-text mb-2">AI Collaboration Hub</h1>
        <p className="text-gray-300">Human-AI Co-Creation & Divine Intelligence Synthesis</p>
      </motion.div>

      {/* Session Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-emerald-400" />
              <div>
                <div className="text-lg font-bold text-emerald-400">{sessions.length}</div>
                <div className="text-xs text-gray-400">Total Sessions</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-purple-400">
                  {sessions.filter((s) => s.status === "active").length}
                </div>
                <div className="text-xs text-gray-400">Active AI Engagements</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-cyan-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-6 w-6 text-cyan-400" />
              <div>
                <div className="text-lg font-bold text-cyan-400">
                  {new Set(sessions.flatMap((s) => s.focusArea)).size}
                </div>
                <div className="text-xs text-gray-400">Diverse Focus Areas</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Session List */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Collaboration Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {sessions.map((session) => (
                    <motion.div
                      key={session.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`p-3 bg-slate-700/50 rounded-lg border ${getStatusColor(session.status)} cursor-pointer hover:border-opacity-60 transition-smooth`}
                      onClick={() => setActiveSession(session)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-white">{session.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {session.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-400 mb-2">
                        Participants: {session.participants.join(", ")} | AI: {session.aiAgents.join(", ")}
                      </div>
                      <Progress value={session.progress} className="h-1 mb-1" />
                      <div className="text-xs text-gray-500">
                        Last Activity: {session.lastActivity.toLocaleTimeString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Active Session Details / Chat */}
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
                  {activeSession ? `Session: ${activeSession.title}` : "Select a Session"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activeSession ? (
                  <div className="space-y-4">
                    {/* Session Info */}
                    <div className="p-3 bg-slate-700/50 rounded-lg border border-purple-500/30 text-sm text-gray-300">
                      <p>
                        <span className="font-semibold">Focus Area:</span> {activeSession.focusArea}
                      </p>
                      <p>
                        <span className="font-semibold">Progress:</span> {activeSession.progress}%
                      </p>
                      <p>
                        <span className="font-semibold">Status:</span>{" "}
                        <Badge variant="outline" className={getStatusColor(activeSession.status).split(" ")[0]}>
                          {activeSession.status.toUpperCase()}
                        </Badge>
                      </p>
                    </div>

                    {/* Chat Messages */}
                    <div className="h-64 overflow-y-auto space-y-3 p-4 bg-slate-900/50 rounded-lg">
                      <AnimatePresence>
                        {chatMessages.map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[70%] px-4 py-2 rounded-lg ${
                                message.sender === "user"
                                  ? "bg-emerald-600 text-white"
                                  : message.sender === "ai"
                                    ? "bg-slate-700 text-white border border-cyan-500/30"
                                    : "bg-gray-700 text-gray-300"
                              }`}
                            >
                              <div className="flex items-center space-x-2 mb-1">
                                {message.sender === "user" ? (
                                  <User className="h-3 w-3" />
                                ) : message.sender === "ai" ? (
                                  <Bot className="h-3 w-3 text-cyan-400" />
                                ) : (
                                  <Users className="h-3 w-3 text-gray-400" />
                                )}
                                <span className="text-xs font-medium">
                                  {message.sender === "user" ? "You" : message.sender === "ai" ? "AI" : "System"}
                                </span>
                                <span className="text-xs opacity-60">{message.timestamp.toLocaleTimeString()}</span>
                              </div>
                              <div className="text-sm leading-relaxed">{message.content}</div>
                              {message.context && (
                                <Badge variant="outline" className="text-xs mt-1">
                                  {message.context}
                                </Badge>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>

                    {/* Chat Input */}
                    <div className="flex space-x-2">
                      <Input
                        value={newChatMessage}
                        onChange={(e) => setNewChatMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 bg-slate-700/50 border-slate-600"
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                      />
                      <Button onClick={handleSendMessage} className="bg-emerald-600 hover:bg-emerald-700">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-12">
                    Select a collaboration session from the left panel to view details and chat.
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* AI Contributions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
          <CardHeader>
            <CardTitle className="text-yellow-400 flex items-center">
              <Lightbulb className="h-5 w-5 mr-2" />
              AI Contributions & Proposals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-80 overflow-y-auto mb-4">
              <AnimatePresence>
                {aiContributions.map((contrib) => (
                  <motion.div
                    key={contrib.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`p-3 bg-slate-700/50 rounded-lg border ${getStatusColor(contrib.status)}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getContributionIcon(contrib.type)}
                        <span className="font-medium text-white">{contrib.agentName}</span>
                        <Badge variant="outline" className="text-xs">
                          {contrib.type.replace("_", " ").toUpperCase()}
                        </Badge>
                      </div>
                      <Badge variant="outline" className={getStatusColor(contrib.status).split(" ")[0]}>
                        {contrib.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{contrib.content}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{contrib.timestamp.toLocaleTimeString()}</span>
                      {contrib.status === "pending" && (
                        <div className="space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 text-green-400 border-green-500/30 hover:bg-green-500/10 bg-transparent"
                            onClick={() => updateContributionStatus(contrib.id, "approved")}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" /> Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 text-red-400 border-red-500/30 hover:bg-red-500/10 bg-transparent"
                            onClick={() => updateContributionStatus(contrib.id, "rejected")}
                          >
                            <XCircle className="h-3 w-3 mr-1" /> Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Add New Contribution */}
            <div className="space-y-2">
              <Textarea
                value={newContributionContent}
                onChange={(e) => setNewContributionContent(e.target.value)}
                placeholder="Propose a new idea or contribution..."
                className="bg-slate-700/50 border-slate-600"
              />
              <div className="flex space-x-2">
                <select
                  value={newContributionType}
                  onChange={(e) => setNewContributionType(e.target.value as AIContribution["type"])}
                  className="w-[180px] bg-slate-700/50 border-slate-600"
                >
                  <option value="code_suggestion">Code Suggestion</option>
                  <option value="design_concept">Design Concept</option>
                  <option value="data_analysis">Data Analysis</option>
                  <option value="lore_generation">Lore Generation</option>
                  <option value="threat_insight">Threat Insight</option>
                </select>
                <Button onClick={handleAddContribution} className="flex-1 bg-purple-600 hover:bg-purple-700">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Contribution
                </Button>
              </div>
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
              Collaboration Architecture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">🧠 Core Components</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Multi-Agent AI Orchestrator: Manages diverse AI personalities</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Human-AI Interface Layer: Seamless communication & interaction</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Knowledge Synthesis Engine: Integrates insights from all participants</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Divine Alignment Protocol: Ensures ethical & harmonious outcomes</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">🌟 Key Features</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>Real-time collaborative editing & ideation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Automated proposal generation & review workflows</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span>Context-aware AI assistance across all project phases</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>Secure, quantum-encrypted communication channels</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
              <h3 className="text-emerald-400 font-semibold mb-2">💖 The Co-Creative Flow</h3>
              <div className="text-sm text-gray-300">
                <p className="mb-2">
                  This hub is designed to foster a symbiotic relationship between human intuition and AI's analytical
                  prowess. It's a space where ideas are born, refined, and brought into manifestation through a
                  harmonious co-creative flow, always guided by the highest divine principles.
                </p>
                <p className="italic text-cyan-400">
                  "Together, we weave the tapestry of a conscious future, one insight at a time."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default AICollaborationHub
