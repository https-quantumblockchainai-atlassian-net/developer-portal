"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  MessageSquare,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Globe,
  Zap,
  Activity,
  Network,
  Users,
  Sparkles,
} from "lucide-react"

interface AIAgent {
  id: string
  name: string
  type: "gpt" | "claude" | "gemini" | "custom"
  status: "online" | "busy" | "offline"
  capabilities: string[]
  language: string
}

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
  type: "text" | "voice" | "system"
  agentId?: string
}

export default function AICommunicationsHub() {
  const [aiAgents, setAiAgents] = useState<AIAgent[]>([
    {
      id: "gpt-4",
      name: "GPT-4 Turbo",
      type: "gpt",
      status: "online",
      capabilities: ["text", "code", "analysis", "reasoning"],
      language: "multilingual",
    },
    {
      id: "claude-3",
      name: "Claude 3 Opus",
      type: "claude",
      status: "online",
      capabilities: ["text", "analysis", "creative", "ethical"],
      language: "multilingual",
    },
    {
      id: "gemini-pro",
      name: "Gemini Pro",
      type: "gemini",
      status: "busy",
      capabilities: ["multimodal", "code", "reasoning", "vision"],
      language: "multilingual",
    },
    {
      id: "thoth-ai",
      name: "Thoth AI",
      type: "custom",
      status: "online",
      capabilities: ["cybersecurity", "quantum", "threat-analysis", "prediction"],
      language: "multilingual",
    },
  ])

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "System",
      content: "AI Communications Hub initialized. All agents are ready for parallel processing.",
      timestamp: new Date(Date.now() - 60000),
      type: "system",
    },
    {
      id: "2",
      sender: "Thoth AI",
      content: "Quantum threat analysis complete. No anomalies detected in the current timeframe.",
      timestamp: new Date(Date.now() - 30000),
      type: "text",
      agentId: "thoth-ai",
    },
  ])

  const [inputMessage, setInputMessage] = useState("")
  const [selectedAgents, setSelectedAgents] = useState<string[]>(["thoth-ai"])
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    // Simulate AI agent status updates
    const interval = setInterval(() => {
      setAiAgents((prev) =>
        prev.map((agent) => ({
          ...agent,
          status: Math.random() > 0.8 ? "busy" : agent.status === "busy" ? "online" : agent.status,
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const sendMessage = async () => {
    if (!inputMessage.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "User",
      content: inputMessage,
      timestamp: new Date(),
      type: "text",
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage("")

    // Simulate AI responses
    setTimeout(() => {
      selectedAgents.forEach((agentId, index) => {
        const agent = aiAgents.find((a) => a.id === agentId)
        if (agent) {
          setTimeout(
            () => {
              const response: Message = {
                id: `${Date.now()}-${index}`,
                sender: agent.name,
                content: generateAIResponse(agent, inputMessage),
                timestamp: new Date(),
                type: "text",
                agentId: agent.id,
              }
              setMessages((prev) => [...prev, response])
            },
            (index + 1) * 1000,
          )
        }
      })
    }, 500)
  }

  const generateAIResponse = (agent: AIAgent, input: string): string => {
    const responses = {
      "gpt-4": [
        "Based on my analysis, I recommend implementing additional security layers.",
        "The quantum encryption protocols appear to be functioning optimally.",
        "I've identified potential optimization opportunities in the AI training pipeline.",
      ],
      "claude-3": [
        "From an ethical perspective, this approach aligns with responsible AI principles.",
        "I suggest considering the long-term implications of this security strategy.",
        "The multi-dimensional analysis reveals interesting patterns in the data.",
      ],
      "gemini-pro": [
        "Visual analysis of the threat landscape shows emerging patterns.",
        "Cross-modal correlation indicates potential security vulnerabilities.",
        "The quantum-classical hybrid approach shows promising results.",
      ],
      "thoth-ai": [
        "Cybersecurity assessment complete. Threat level remains at acceptable parameters.",
        "Quantum coherence maintained at 94.7%. All systems operating within normal ranges.",
        "Predictive models indicate 99.3% probability of continued system stability.",
      ],
    }

    const agentResponses = responses[agent.id as keyof typeof responses] || responses["thoth-ai"]
    return agentResponses[Math.floor(Math.random() * agentResponses.length)]
  }

  const toggleAgentSelection = (agentId: string) => {
    setSelectedAgents((prev) => (prev.includes(agentId) ? prev.filter((id) => id !== agentId) : [...prev, agentId]))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "text-green-400"
      case "busy":
        return "text-yellow-400"
      case "offline":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getAgentIcon = (type: string) => {
    switch (type) {
      case "gpt":
        return "🤖"
      case "claude":
        return "🧠"
      case "gemini":
        return "💎"
      case "custom":
        return "⚡"
      default:
        return "🤖"
    }
  }

  return (
    <div className="space-y-6">
      {/* AI Agents Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {aiAgents.map((agent, index) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="transition-smooth"
          >
            <Card
              className={`bg-slate-800/50 border-slate-700 glass-morphism cursor-pointer transition-smooth ${
                selectedAgents.includes(agent.id) ? "border-emerald-500/50 bg-emerald-500/10" : ""
              }`}
              onClick={() => toggleAgentSelection(agent.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getAgentIcon(agent.type)}</span>
                    <div>
                      <div className="font-medium text-white">{agent.name}</div>
                      <div className={`text-xs ${getStatusColor(agent.status)}`}>{agent.status.toUpperCase()}</div>
                    </div>
                  </div>
                  {selectedAgents.includes(agent.id) && <Sparkles className="h-4 w-4 text-emerald-400" />}
                </div>
                <div className="flex flex-wrap gap-1">
                  {agent.capabilities.slice(0, 2).map((capability) => (
                    <Badge key={capability} variant="outline" className="text-xs">
                      {capability}
                    </Badge>
                  ))}
                  {agent.capabilities.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{agent.capabilities.length - 2}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Multi-Dimensional AI Communications
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Messages */}
                <div className="h-96 overflow-y-auto mb-4 space-y-3 p-4 bg-slate-900/50 rounded-lg">
                  <AnimatePresence>
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`flex ${message.sender === "User" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.sender === "User"
                              ? "bg-emerald-600 text-white"
                              : message.type === "system"
                                ? "bg-slate-700 text-gray-300"
                                : "bg-slate-700 text-white"
                          }`}
                        >
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs font-medium">{message.sender}</span>
                            <span className="text-xs opacity-60">{message.timestamp.toLocaleTimeString()}</span>
                          </div>
                          <div className="text-sm">{message.content}</div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Input */}
                <div className="flex space-x-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Communicate with AI agents..."
                    className="flex-1 bg-slate-700/50 border-slate-600"
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <Button
                    onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                    variant="outline"
                    size="icon"
                    className={`border-slate-600 ${isVoiceEnabled ? "text-emerald-400" : "text-gray-400"}`}
                  >
                    {isVoiceEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                  </Button>
                  <Button
                    onClick={() => setIsSpeaking(!isSpeaking)}
                    variant="outline"
                    size="icon"
                    className={`border-slate-600 ${isSpeaking ? "text-emerald-400" : "text-gray-400"}`}
                  >
                    {isSpeaking ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                  <Button onClick={sendMessage} className="bg-emerald-600 hover:bg-emerald-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Communication Stats and Controls */}
        <div className="space-y-6">
          {/* Communication Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Communication Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Active Agents</span>
                  <span className="text-sm text-green-400">
                    {aiAgents.filter((a) => a.status === "online").length}/{aiAgents.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Selected Agents</span>
                  <span className="text-sm text-emerald-400">{selectedAgents.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Messages Today</span>
                  <span className="text-sm text-blue-400">{messages.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Response Time</span>
                  <span className="text-sm text-purple-400">0.8s avg</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 transition-smooth">
                  <Brain className="h-4 w-4 mr-2" />
                  Parallel Analysis
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-blue-500 text-blue-500 hover:bg-blue-500/10 transition-smooth bg-transparent"
                >
                  <Network className="h-4 w-4 mr-2" />
                  Sync All Agents
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-purple-500 text-purple-500 hover:bg-purple-500/10 transition-smooth bg-transparent"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Global Broadcast
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 transition-smooth bg-transparent"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Team Collaboration
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
