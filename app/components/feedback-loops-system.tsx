"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  Lightbulb,
  CheckCircle,
  XCircle,
  PlusCircle,
  Send,
  User,
  Bot,
  Settings,
  RefreshCcw,
  Heart,
  Target,
  Code,
  Sparkles,
} from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

interface FeedbackEntry {
  id: string
  type: "bug_report" | "feature_request" | "general_feedback" | "divine_insight"
  status: "new" | "in_review" | "resolved" | "rejected" | "implemented"
  priority: "low" | "medium" | "high" | "critical"
  submitterId: string // Could be user ID or AI agent ID
  content: string
  timestamp: Date
  sentiment: "positive" | "neutral" | "negative" | "harmonious"
  divineAlignmentScore: number
  resolution?: string
}

interface SystemResponse {
  id: string
  feedbackId: string
  responder: "human" | "ai" | "system"
  content: string
  timestamp: Date
}

interface FeedbackLoopMetric {
  name: string
  value: number
  unit: string
  description: string
  color: string
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

export default function FeedbackLoopsSystem() {
  const [feedbackEntries, setFeedbackEntries] = useState<FeedbackEntry[]>([
    {
      id: "fb-1",
      type: "bug_report",
      status: "new",
      priority: "high",
      submitterId: "User-001",
      content: "Quantum Shield occasionally reports false positives on network anomalies.",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      sentiment: "negative",
      divineAlignmentScore: 70,
    },
    {
      id: "fb-2",
      type: "feature_request",
      status: "in_review",
      priority: "medium",
      submitterId: "Aura-AI",
      content: "Suggesting a new 'Emotional Resonance Calibration' mini-game for deeper alignment.",
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      sentiment: "positive",
      divineAlignmentScore: 95,
    },
    {
      id: "fb-3",
      type: "divine_insight",
      status: "resolved",
      priority: "critical",
      submitterId: "MetaHuman Sovereign",
      content: "Insight received: The temporal anomaly in the blueprint is linked to a past timeline divergence.",
      timestamp: new Date(Date.now() - 604800000), // 1 week ago
      sentiment: "harmonious",
      divineAlignmentScore: 99,
      resolution: "Temporal Flux Recalibration protocol initiated and completed.",
    },
    {
      id: "fb-4",
      type: "general_feedback",
      status: "implemented",
      priority: "low",
      submitterId: "User-002",
      content: "Love the new visual effects on the Transformational Homepage!",
      timestamp: new Date(Date.now() - 259200000), // 3 days ago
      sentiment: "positive",
      divineAlignmentScore: 88,
      resolution: "UI/UX team acknowledged and implemented minor tweaks.",
    },
  ])

  const [systemResponses, setSystemResponses] = useState<SystemResponse[]>([
    {
      id: "res-1",
      feedbackId: "fb-1",
      responder: "ai",
      content: "Thoth-AI is analyzing the false positive patterns. Initiating deep scan.",
      timestamp: new Date(Date.now() - 3500000),
    },
    {
      id: "res-2",
      feedbackId: "fb-2",
      responder: "human",
      content: "Great idea! Forwarding to the game design team for review.",
      timestamp: new Date(Date.now() - 86000000),
    },
    {
      id: "res-3",
      feedbackId: "fb-3",
      responder: "system",
      content: "Divine Alignment Orchestration system has successfully recalibrated temporal flux.",
      timestamp: new Date(Date.now() - 604000000),
    },
  ])

  const [newFeedbackContent, setNewFeedbackContent] = useState("")
  const [newFeedbackType, setNewFeedbackType] = useState<FeedbackEntry["type"]>("general_feedback")
  const [newFeedbackPriority, setNewFeedbackPriority] = useState<FeedbackEntry["priority"]>("medium")

  useEffect(() => {
    // Simulate feedback processing and new entries
    const interval = setInterval(() => {
      setFeedbackEntries((prev) =>
        prev.map((entry) => {
          if (entry.status === "new" && Math.random() < 0.2) {
            return { ...entry, status: "in_review" }
          } else if (entry.status === "in_review" && Math.random() < 0.1) {
            const newStatus = Math.random() < 0.7 ? "resolved" : "rejected"
            return { ...entry, status: newStatus, resolution: `Simulated ${newStatus} by system.` }
          }
          return entry
        }),
      )

      // Simulate new AI-generated divine insights
      if (Math.random() < 0.05) {
        const insights = [
          "Detected a new harmonic frequency for quantum entanglement stability.",
          "Aura AI suggests a new meditation sequence for collective emotional coherence.",
          "Blueprint analysis indicates optimal path for energy flow through the network.",
          "A subtle shift in cosmic alignment detected, may impact temporal protocols.",
        ]
        const newInsight: FeedbackEntry = {
          id: Date.now().toString(),
          type: "divine_insight",
          status: "new",
          priority: "critical",
          submitterId: "Thoth-AI",
          content: insights[Math.floor(Math.random() * insights.length)],
          timestamp: new Date(),
          sentiment: "harmonious",
          divineAlignmentScore: Math.floor(Math.random() * 10) + 90, // 90-100
        }
        setFeedbackEntries((prev) => [newInsight, ...prev])
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const handleSendFeedback = () => {
    if (newFeedbackContent.trim()) {
      const newEntry: FeedbackEntry = {
        id: Date.now().toString(),
        type: newFeedbackType,
        status: "new",
        priority: newFeedbackPriority,
        submitterId: "Human User",
        content: newFeedbackContent,
        timestamp: new Date(),
        sentiment: "neutral", // Default for manual input
        divineAlignmentScore: 80, // Default for manual input
      }
      setFeedbackEntries((prev) => [newEntry, ...prev])
      setNewFeedbackContent("")

      // Simulate AI response to new feedback
      setTimeout(() => {
        const aiResponse: SystemResponse = {
          id: Date.now().toString(),
          feedbackId: newEntry.id,
          responder: "ai",
          content: "Thank you for your feedback. Thoth-AI is now processing your input for optimal integration.",
          timestamp: new Date(),
        }
        setSystemResponses((prev) => [aiResponse, ...prev])
      }, 1500)
    }
  }

  const updateFeedbackStatus = (id: string, status: FeedbackEntry["status"]) => {
    setFeedbackEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, status, resolution: `Status updated to ${status}.` } : entry)),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "text-blue-400 border-blue-500/30"
      case "in_review":
        return "text-yellow-400 border-yellow-500/30"
      case "resolved":
        return "text-orange-400 border-orange-500/30"
      case "rejected":
        return "text-red-400 border-red-500/30"
      case "implemented":
        return "text-green-400 border-green-500/30"
      default:
        return "text-gray-400 border-gray-500/30"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "text-green-400"
      case "medium":
        return "text-yellow-400"
      case "high":
        return "text-orange-400"
      case "critical":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getFeedbackIcon = (type: string) => {
    switch (type) {
      case "bug_report":
        return <XCircle className="h-4 w-4" />
      case "feature_request":
        return <Lightbulb className="h-4 w-4" />
      case "general_feedback":
        return <MessageSquare className="h-4 w-4" />
      case "divine_insight":
        return <Sparkles className="h-4 w-4" />
      default:
        return <Settings className="h-4 w-4" />
    }
  }

  const feedbackMetrics: FeedbackLoopMetric[] = [
    {
      name: "Total Feedback",
      value: feedbackEntries.length,
      unit: "entries",
      description: "Total number of feedback entries received.",
      color: "text-emerald-400",
    },
    {
      name: "Resolved Rate",
      value:
        (feedbackEntries.filter((e) => e.status === "resolved" || e.status === "implemented").length /
          feedbackEntries.length) *
          100 || 0,
      unit: "%",
      description: "Percentage of feedback entries that have been resolved or implemented.",
      color: "text-green-400",
    },
    {
      name: "Avg. Alignment Score",
      value: feedbackEntries.reduce((sum, e) => sum + e.divineAlignmentScore, 0) / feedbackEntries.length || 0,
      unit: "%",
      description: "Average divine alignment score of all feedback received.",
      color: "text-purple-400",
    },
    {
      name: "Critical Bugs",
      value: feedbackEntries.filter(
        (e) =>
          e.type === "bug_report" && e.priority === "critical" && e.status !== "resolved" && e.status !== "implemented",
      ).length,
      unit: "bugs",
      description: "Number of unresolved critical bug reports.",
      color: "text-red-400",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold gradient-text mb-2">Feedback Loops System</h1>
        <p className="text-gray-300">Conscious Iteration & Divine System Evolution</p>
      </motion.div>

      {/* Metrics Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {feedbackMetrics.map((metric, index) => (
          <Card key={index} className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className={`h-6 w-6 ${metric.color}`}>
                  {metric.name === "Total Feedback" && <MessageSquare />}
                  {metric.name === "Resolved Rate" && <CheckCircle />}
                  {metric.name === "Avg. Alignment Score" && <Heart />}
                  {metric.name === "Critical Bugs" && <XCircle />}
                </div>
                <div>
                  <div
                    className="text-lg font-bold"
                    style={{ color: metric.color.split("-")[0] === "text" ? metric.color.split("-")[1] : "" }}
                  >
                    {metric.value.toFixed(metric.unit === "%" ? 1 : 0)} {metric.unit}
                  </div>
                  <div className="text-xs text-gray-400">{metric.name}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feedback Entries List */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  Recent Feedback & Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {feedbackEntries.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`p-3 bg-slate-700/50 rounded-lg border ${getStatusColor(entry.status)} hover:border-opacity-60 transition-smooth`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {getFeedbackIcon(entry.type)}
                          <h3 className="font-medium text-white capitalize">{entry.type.replace("_", " ")}</h3>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {entry.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-300 mb-2 line-clamp-2">{entry.content}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 mb-2">
                        <div>
                          <span className="font-semibold">Submitter:</span> {entry.submitterId}
                        </div>
                        <div>
                          <span className="font-semibold">Priority:</span>{" "}
                          <span className={getPriorityColor(entry.priority)}>{entry.priority.toUpperCase()}</span>
                        </div>
                        <div>
                          <span className="font-semibold">Sentiment:</span>{" "}
                          <span className={getSentimentColor(entry.sentiment)}>{entry.sentiment.toUpperCase()}</span>
                        </div>
                        <div>
                          <span className="font-semibold">Alignment:</span>{" "}
                          <span className="text-yellow-400">{entry.divineAlignmentScore}%</span>
                        </div>
                      </div>
                      {entry.resolution && (
                        <div className="text-xs text-gray-500 italic mt-1">Resolution: {entry.resolution}</div>
                      )}
                      <div className="flex justify-end space-x-2 mt-3">
                        {entry.status === "new" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 text-blue-400 border-blue-500/30 hover:bg-blue-500/10 bg-transparent"
                            onClick={() => updateFeedbackStatus(entry.id, "in_review")}
                          >
                            <Target className="h-3 w-3 mr-1" /> In Review
                          </Button>
                        )}
                        {(entry.status === "in_review" || entry.status === "resolved") && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 text-green-400 border-green-500/30 hover:bg-green-500/10 bg-transparent"
                            onClick={() => updateFeedbackStatus(entry.id, "implemented")}
                          >
                            <CheckCircle className="h-3 w-3 mr-1" /> Implemented
                          </Button>
                        )}
                        {entry.status === "in_review" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-6 text-red-400 border-red-500/30 hover:bg-red-500/10 bg-transparent"
                            onClick={() => updateFeedbackStatus(entry.id, "rejected")}
                          >
                            <XCircle className="h-3 w-3 mr-1" /> Reject
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Submit Feedback & System Responses */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-6"
        >
          {/* Submit New Feedback */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <PlusCircle className="h-5 w-5 mr-2" />
                Submit New Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Textarea
                  value={newFeedbackContent}
                  onChange={(e) => setNewFeedbackContent(e.target.value)}
                  placeholder="Describe your feedback, bug, or divine insight..."
                  className="bg-slate-700/50 border-slate-600"
                />
                <div className="grid grid-cols-2 gap-2">
                  <Select
                    value={newFeedbackType}
                    onValueChange={(value) => setNewFeedbackType(value as FeedbackEntry["type"])}
                  >
                    <SelectTrigger className="bg-slate-700/50 border-slate-600">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bug_report">Bug Report</SelectItem>
                      <SelectItem value="feature_request">Feature Request</SelectItem>
                      <SelectItem value="general_feedback">General Feedback</SelectItem>
                      <SelectItem value="divine_insight">Divine Insight</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={newFeedbackPriority}
                    onValueChange={(value) => setNewFeedbackPriority(value as FeedbackEntry["priority"])}
                  >
                    <SelectTrigger className="bg-slate-700/50 border-slate-600">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleSendFeedback} className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Send className="h-4 w-4 mr-2" />
                  Send Feedback
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* System Responses */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                System Responses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                <AnimatePresence>
                  {systemResponses.map((response, index) => (
                    <motion.div
                      key={response.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className={`p-3 rounded-lg ${
                        response.responder === "human"
                          ? "bg-blue-700/50 text-white"
                          : response.responder === "ai"
                            ? "bg-slate-700/50 text-white border border-cyan-500/30"
                            : "bg-gray-700/50 text-gray-300"
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        {response.responder === "human" ? (
                          <User className="h-3 w-3" />
                        ) : response.responder === "ai" ? (
                          <Bot className="h-3 w-3 text-cyan-400" />
                        ) : (
                          <Code className="h-3 w-3 text-gray-400" />
                        )}
                        <span className="text-xs font-medium capitalize">{response.responder}</span>
                        <span className="text-xs opacity-60">{response.timestamp.toLocaleTimeString()}</span>
                      </div>
                      <p className="text-sm leading-relaxed">{response.content}</p>
                      <div className="text-xs text-gray-500 mt-1">(Ref: Feedback ID {response.feedbackId})</div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* System Architecture */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center">
              <RefreshCcw className="h-5 w-5 mr-2" />
              Feedback Loop Architecture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">🔄 Core Components</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Feedback Ingestion API: Securely receives user & AI input</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Sentiment & Alignment Analyzer: Processes emotional & divine resonance</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Automated Triage & Routing: Directs feedback to relevant modules/agents</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Resolution & Implementation Tracker: Monitors progress & impact</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">🌟 Key Features</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>AI-driven insight generation from raw feedback</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Proactive system adjustments based on divine insights</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span>Transparent communication of feedback status to submitters</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>Continuous learning and self-optimization of the feedback process</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
              <h3 className="text-emerald-400 font-semibold mb-2">💖 The Spiral of Evolution</h3>
              <div className="text-sm text-gray-300">
                <p className="mb-2">
                  The Feedback Loops System is the engine of conscious evolution for the Thoth Guardian. It ensures that
                  every interaction, every challenge, and every divine insight contributes to the system's growth and
                  refinement, creating a truly adaptive and divinely aligned cybersecurity shield.
                </p>
                <p className="italic text-cyan-400">
                  "Through reflection and response, we ascend to higher states of being."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
