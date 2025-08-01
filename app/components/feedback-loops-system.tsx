"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { MessageSquare, Star, RefreshCcw, Lightbulb, Bug, CheckCircle, Send, BarChart } from "lucide-react"
import { AnimatePresence } from "framer-motion"

interface FeedbackItem {
  id: string
  type: "bug" | "feature_request" | "general" | "performance"
  category: string
  content: string
  rating?: number // 1-5 for general, performance
  status: "new" | "in_review" | "resolved" | "rejected"
  timestamp: Date
  priority: "low" | "medium" | "high"
}

interface SystemMetric {
  name: string
  value: number
  unit: string
  threshold: number
  status: "optimal" | "warning" | "critical"
}

export default function FeedbackLoopsSystem() {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([
    {
      id: "f1",
      type: "bug",
      category: "Quantum Shield",
      content: "Minor decoherence detected during high-load quantum encryption cycles.",
      status: "new",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      priority: "high",
    },
    {
      id: "f2",
      type: "feature_request",
      category: "Aura AI",
      content: "Request for more customizable Aura AI companion voice profiles.",
      status: "in_review",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      priority: "medium",
    },
    {
      id: "f3",
      type: "performance",
      category: "Blueprint System",
      content: "Blueprint execution visualization occasionally lags on complex graphs.",
      rating: 3,
      status: "new",
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      priority: "medium",
    },
    {
      id: "f4",
      type: "general",
      category: "UI/UX",
      content: "Love the new transformational homepage! Very immersive.",
      rating: 5,
      status: "resolved",
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      priority: "low",
    },
  ])

  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([
    { name: "AI Response Latency", value: 0.8, unit: "s", threshold: 1.0, status: "optimal" },
    { name: "Quantum Coherence", value: 94.7, unit: "%", threshold: 90, status: "optimal" },
    { name: "Threat Mitigation Rate", value: 99.3, unit: "%", threshold: 98, status: "optimal" },
    { name: "Blueprint Execution Success", value: 98.1, unit: "%", threshold: 95, status: "optimal" },
  ])

  const [newFeedback, setNewFeedback] = useState({
    type: "general" as FeedbackItem["type"],
    category: "",
    content: "",
    rating: 0,
  })

  useEffect(() => {
    // Simulate new feedback and metric fluctuations
    const interval = setInterval(() => {
      // Simulate new feedback
      if (Math.random() < 0.15) {
        const types = ["bug", "feature_request", "general", "performance"]
        const categories = ["Quantum Shield", "Aura AI", "Blueprint System", "UI/UX", "Hardware"]
        const contentOptions = [
          "Minor UI glitch on mobile.",
          "Consider adding a dark mode toggle.",
          "System response time feels slow sometimes.",
          "Great work on the new update!",
          "Found a bug in the data synchronization module.",
        ]
        const newType = types[Math.floor(Math.random() * types.length)] as FeedbackItem["type"]
        const newCategory = categories[Math.floor(Math.random() * categories.length)]
        const newContent = contentOptions[Math.floor(Math.random() * contentOptions.length)]
        const newRating =
          newType === "general" || newType === "performance" ? Math.floor(Math.random() * 5) + 1 : undefined

        setFeedbackItems((prev) => [
          {
            id: `f${Date.now()}`,
            type: newType,
            category: newCategory,
            content: newContent,
            rating: newRating,
            status: "new",
            timestamp: new Date(),
            priority: "medium", // Default priority
          },
          ...prev,
        ])
      }

      // Simulate metric fluctuations and self-correction
      setSystemMetrics((prev) =>
        prev.map((metric) => {
          let newValue = metric.value + (Math.random() - 0.5) * (metric.name === "AI Response Latency" ? 0.1 : 0.5)
          newValue = Math.max(0, Math.min(metric.name === "AI Response Latency" ? 2.0 : 100, newValue)) // Clamp values

          let newStatus = "optimal"
          if (metric.name === "AI Response Latency" && newValue > metric.threshold) newStatus = "warning"
          if (metric.name === "Quantum Coherence" && newValue < metric.threshold) newStatus = "warning"
          if (metric.name === "Threat Mitigation Rate" && newValue < metric.threshold) newStatus = "warning"
          if (metric.name === "Blueprint Execution Success" && newValue < metric.threshold) newStatus = "warning"

          // Self-healing: auto-correct if warning/critical
          if (newStatus !== "optimal") {
            if (metric.name === "AI Response Latency") newValue = Math.max(newValue, 0.7)
            if (metric.name === "Quantum Coherence") newValue = Math.min(newValue, 92)
            if (metric.name === "Threat Mitigation Rate") newValue = Math.min(newValue, 97)
            if (metric.name === "Blueprint Execution Success") newValue = Math.min(newValue, 96)
            newStatus = "optimal" // After self-correction
          }

          return { ...metric, value: newValue, status: newStatus }
        }),
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const handleSendFeedback = () => {
    if (newFeedback.content && newFeedback.category) {
      const feedback: FeedbackItem = {
        id: `f${Date.now()}`,
        status: "new",
        timestamp: new Date(),
        priority: "medium", // Default priority for user-submitted
        ...newFeedback,
      }
      setFeedbackItems((prev) => [feedback, ...prev])
      setNewFeedback({ type: "general", category: "", content: "", rating: 0 })
    }
  }

  const getFeedbackTypeIcon = (type: string) => {
    switch (type) {
      case "bug":
        return <Bug className="h-4 w-4 text-red-400" />
      case "feature_request":
        return <Lightbulb className="h-4 w-4 text-blue-400" />
      case "performance":
        return <BarChart className="h-4 w-4 text-yellow-400" />
      case "general":
        return <MessageSquare className="h-4 w-4 text-emerald-400" />
      default:
        return <MessageSquare className="h-4 w-4 text-gray-400" />
    }
  }

  const getMetricStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "text-green-400"
      case "warning":
        return "text-yellow-400"
      case "critical":
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
        <h1 className="text-3xl font-bold gradient-text mb-2">Feedback Loops System</h1>
        <p className="text-gray-300">Adaptive Learning & Continuous Improvement through Divine Feedback</p>
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
              <MessageSquare className="h-6 w-6 text-emerald-400" />
              <div>
                <div className="text-lg font-bold text-emerald-400">{feedbackItems.length}</div>
                <div className="text-xs text-gray-400">Total Feedback</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-blue-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bug className="h-6 w-6 text-blue-400" />
              <div>
                <div className="text-lg font-bold text-blue-400">
                  {feedbackItems.filter((f) => f.type === "bug" && f.status === "new").length}
                </div>
                <div className="text-xs text-gray-400">New Bugs</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-6 w-6 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-purple-400">
                  {feedbackItems.filter((f) => f.type === "feature_request" && f.status === "new").length}
                </div>
                <div className="text-xs text-gray-400">New Features</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-yellow-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-yellow-400" />
              <div>
                <div className="text-lg font-bold text-yellow-400">
                  {feedbackItems.filter((f) => f.status === "resolved").length}
                </div>
                <div className="text-xs text-gray-400">Resolved Items</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feedback List */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Recent Feedback & Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  <AnimatePresence>
                    {feedbackItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-emerald-500/30 transition-smooth"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            {getFeedbackTypeIcon(item.type)}
                            <div>
                              <h3 className="font-medium text-white">{item.category}</h3>
                              <div className="text-xs text-gray-400">{item.type.replace("_", " ").toUpperCase()}</div>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {item.status.toUpperCase()}
                          </Badge>
                        </div>

                        <p className="text-sm text-gray-300 mb-3">{item.content}</p>

                        {item.rating !== undefined && item.type !== "bug" && (
                          <div className="flex items-center space-x-1 mb-3">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= item.rating! ? "text-yellow-400" : "text-gray-600"
                                } fill-current`}
                              />
                            ))}
                          </div>
                        )}

                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>Priority: {item.priority.toUpperCase()}</span>
                          <span>{item.timestamp.toLocaleDateString()}</span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Submit Feedback & System Metrics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-6"
        >
          {/* Submit Feedback Form */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center">
                <Send className="h-5 w-5 mr-2" />
                Submit New Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <select
                value={newFeedback.type}
                onChange={(e) => setNewFeedback({ ...newFeedback, type: e.target.value as FeedbackItem["type"] })}
                className="w-full p-2 rounded-md bg-slate-700/50 border-slate-600 text-white"
              >
                <option value="general">General Feedback</option>
                <option value="feature_request">Feature Request</option>
                <option value="bug">Bug Report</option>
                <option value="performance">Performance Issue</option>
              </select>
              <Input
                placeholder="Category (e.g., UI/UX, Quantum Shield)"
                value={newFeedback.category}
                onChange={(e) => setNewFeedback({ ...newFeedback, category: e.target.value })}
                className="bg-slate-700/50 border-slate-600"
              />
              <Textarea
                placeholder="Your feedback or issue details..."
                value={newFeedback.content}
                onChange={(e) => setNewFeedback({ ...newFeedback, content: e.target.value })}
                className="bg-slate-700/50 border-slate-600 min-h-[100px]"
              />
              {(newFeedback.type === "general" || newFeedback.type === "performance") && (
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 cursor-pointer ${
                        star <= newFeedback.rating ? "text-yellow-400" : "text-gray-600"
                      } fill-current`}
                      onClick={() => setNewFeedback({ ...newFeedback, rating: star })}
                    />
                  ))}
                </div>
              )}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={handleSendFeedback} className="w-full bg-blue-600 hover:bg-blue-700">
                  <Send className="h-4 w-4 mr-2" />
                  Send Feedback
                </Button>
              </motion.div>
            </CardContent>
          </Card>

          {/* System Metrics */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <BarChart className="h-5 w-5 mr-2" />
                Real-time System Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-3 bg-slate-700/50 rounded-lg border border-slate-600"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white">{metric.name}</span>
                      <Badge variant="outline" className={getMetricStatusColor(metric.status)}>
                        {metric.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Current Value</span>
                      <span className={getMetricStatusColor(metric.status)}>
                        {metric.value.toFixed(metric.unit === "s" ? 2 : 1)} {metric.unit}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Threshold</span>
                      <span>
                        {metric.name === "AI Response Latency" ? "<" : ">"} {metric.threshold} {metric.unit}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Adaptive Learning & Self-Correction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center">
              <RefreshCcw className="h-5 w-5 mr-2" />
              Adaptive Learning & Self-Correction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">🧠 AI-Driven Optimization</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Automated analysis of feedback patterns</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Predictive maintenance based on metric trends</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Proactive adjustments to quantum and AI parameters</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">💖 Divine Integration</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>Harmonic recalibration for emotional resonance</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Intuitive insights from collective consciousness</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span>Alignment with universal laws for optimal flow</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
              <h3 className="text-emerald-400 font-semibold mb-2">✨ The Living System</h3>
              <div className="text-sm text-gray-300">
                <p className="mb-2">
                  The Thoth Guardian is a truly adaptive system, constantly learning and evolving through a symphony of
                  technical metrics, user feedback, and divine energetic inputs. This continuous feedback loop ensures
                  its resilience, intelligence, and alignment with the highest good.
                </p>
                <p className="italic text-cyan-400">
                  "Every interaction refines the truth. Every challenge strengthens the shield."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
