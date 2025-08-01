"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  RefreshCw,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Zap,
  Activity,
  BarChart3,
  Send,
  Star,
} from "lucide-react"

interface FeedbackLoop {
  id: string
  name: string
  type: "performance" | "security" | "user" | "system"
  status: "active" | "pending" | "completed" | "error"
  progress: number
  lastUpdate: Date
  metrics: {
    accuracy: number
    efficiency: number
    satisfaction: number
  }
}

interface UserFeedback {
  id: string
  user: string
  rating: number
  comment: string
  category: string
  timestamp: Date
  status: "new" | "reviewed" | "implemented"
}

export default function FeedbackLoopsSystem() {
  const [feedbackLoops, setFeedbackLoops] = useState<FeedbackLoop[]>([
    {
      id: "perf-001",
      name: "AI Model Performance Optimization",
      type: "performance",
      status: "active",
      progress: 78,
      lastUpdate: new Date(Date.now() - 300000),
      metrics: { accuracy: 94.2, efficiency: 87.5, satisfaction: 92.1 },
    },
    {
      id: "sec-001",
      name: "Threat Detection Calibration",
      type: "security",
      status: "active",
      progress: 92,
      lastUpdate: new Date(Date.now() - 180000),
      metrics: { accuracy: 97.8, efficiency: 91.3, satisfaction: 95.7 },
    },
    {
      id: "user-001",
      name: "User Experience Enhancement",
      type: "user",
      status: "pending",
      progress: 45,
      lastUpdate: new Date(Date.now() - 600000),
      metrics: { accuracy: 89.4, efficiency: 82.1, satisfaction: 88.9 },
    },
    {
      id: "sys-001",
      name: "System Resource Optimization",
      type: "system",
      status: "completed",
      progress: 100,
      lastUpdate: new Date(Date.now() - 900000),
      metrics: { accuracy: 96.1, efficiency: 94.8, satisfaction: 93.2 },
    },
  ])

  const [userFeedback, setUserFeedback] = useState<UserFeedback[]>([
    {
      id: "fb-001",
      user: "Dr. Sarah Chen",
      rating: 5,
      comment: "The quantum shield integration is exceptional. Response time has improved significantly.",
      category: "Performance",
      timestamp: new Date(Date.now() - 3600000),
      status: "reviewed",
    },
    {
      id: "fb-002",
      user: "Alex Rodriguez",
      rating: 4,
      comment: "Love the multi-modal analysis. Could use better visualization for complex data sets.",
      category: "Features",
      timestamp: new Date(Date.now() - 7200000),
      status: "new",
    },
    {
      id: "fb-003",
      user: "Maya Patel",
      rating: 5,
      comment: "AI training pipeline is incredibly efficient. The automated optimization is a game-changer.",
      category: "AI/ML",
      timestamp: new Date(Date.now() - 10800000),
      status: "implemented",
    },
  ])

  const [newFeedback, setNewFeedback] = useState({
    rating: 5,
    comment: "",
    category: "General",
  })

  useEffect(() => {
    // Simulate feedback loop updates
    const interval = setInterval(() => {
      setFeedbackLoops((prev) =>
        prev.map((loop) => {
          if (loop.status === "active") {
            const newProgress = Math.min(loop.progress + Math.random() * 5, 100)
            return {
              ...loop,
              progress: newProgress,
              lastUpdate: new Date(),
              status: newProgress >= 100 ? "completed" : "active",
              metrics: {
                accuracy: Math.min(loop.metrics.accuracy + Math.random() * 2, 100),
                efficiency: Math.min(loop.metrics.efficiency + Math.random() * 2, 100),
                satisfaction: Math.min(loop.metrics.satisfaction + Math.random() * 2, 100),
              },
            }
          }
          return loop
        }),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-blue-400"
      case "pending":
        return "text-yellow-400"
      case "completed":
        return "text-green-400"
      case "error":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <RefreshCw className="h-4 w-4 animate-spin" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "error":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "performance":
        return <TrendingUp className="h-5 w-5" />
      case "security":
        return <Target className="h-5 w-5" />
      case "user":
        return <Star className="h-5 w-5" />
      case "system":
        return <Zap className="h-5 w-5" />
      default:
        return <Activity className="h-5 w-5" />
    }
  }

  const submitFeedback = () => {
    if (!newFeedback.comment.trim()) return

    const feedback: UserFeedback = {
      id: `fb-${Date.now()}`,
      user: "You",
      rating: newFeedback.rating,
      comment: newFeedback.comment,
      category: newFeedback.category,
      timestamp: new Date(),
      status: "new",
    }

    setUserFeedback((prev) => [feedback, ...prev])
    setNewFeedback({ rating: 5, comment: "", category: "General" })
  }

  const getFeedbackStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "text-blue-400"
      case "reviewed":
        return "text-yellow-400"
      case "implemented":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* Feedback Loops Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card className="bg-slate-800/50 border-blue-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <RefreshCw className="h-6 w-6 text-blue-400" />
              <div>
                <div className="text-lg font-bold text-blue-400">
                  {feedbackLoops.filter((l) => l.status === "active").length}
                </div>
                <div className="text-xs text-gray-400">Active Loops</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-green-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <div>
                <div className="text-lg font-bold text-green-400">
                  {feedbackLoops.filter((l) => l.status === "completed").length}
                </div>
                <div className="text-xs text-gray-400">Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-6 w-6 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-purple-400">
                  {(feedbackLoops.reduce((acc, l) => acc + l.metrics.accuracy, 0) / feedbackLoops.length).toFixed(1)}%
                </div>
                <div className="text-xs text-gray-400">Avg Accuracy</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-yellow-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-6 w-6 text-yellow-400" />
              <div>
                <div className="text-lg font-bold text-yellow-400">{userFeedback.length}</div>
                <div className="text-xs text-gray-400">User Feedback</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Feedback Loops */}
        <div className="lg:col-span-2 space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center">
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Active Feedback Loops
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedbackLoops.map((loop, index) => (
                    <motion.div
                      key={loop.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-emerald-500/30 transition-smooth"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="text-cyan-400">{getTypeIcon(loop.type)}</div>
                          <div>
                            <h3 className="font-medium text-white">{loop.name}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {loop.type.toUpperCase()}
                              </Badge>
                              <div className={`flex items-center space-x-1 ${getStatusColor(loop.status)}`}>
                                {getStatusIcon(loop.status)}
                                <span className="text-xs">{loop.status.toUpperCase()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-emerald-400">{loop.progress.toFixed(1)}%</div>
                          <div className="text-xs text-gray-400">Progress</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <div className="text-xs text-gray-400">Accuracy</div>
                          <div className="text-sm font-bold text-green-400">{loop.metrics.accuracy.toFixed(1)}%</div>
                          <Progress value={loop.metrics.accuracy} className="h-1 mt-1" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Efficiency</div>
                          <div className="text-sm font-bold text-blue-400">{loop.metrics.efficiency.toFixed(1)}%</div>
                          <Progress value={loop.metrics.efficiency} className="h-1 mt-1" />
                        </div>
                        <div>
                          <div className="text-xs text-gray-400">Satisfaction</div>
                          <div className="text-sm font-bold text-purple-400">
                            {loop.metrics.satisfaction.toFixed(1)}%
                          </div>
                          <Progress value={loop.metrics.satisfaction} className="h-1 mt-1" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>Overall Progress</span>
                          <span>{loop.progress.toFixed(1)}%</span>
                        </div>
                        <Progress value={loop.progress} className="h-2" />
                        <div className="text-xs text-gray-400">
                          Last updated: {loop.lastUpdate.toLocaleTimeString()}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* User Feedback and Controls */}
        <div className="space-y-6">
          {/* Submit Feedback */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center">
                  <Send className="h-5 w-5 mr-2" />
                  Submit Feedback
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Rating</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <motion.button
                        key={rating}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setNewFeedback({ ...newFeedback, rating })}
                        className={`p-1 ${rating <= newFeedback.rating ? "text-yellow-400" : "text-gray-600"}`}
                      >
                        <Star className="h-5 w-5 fill-current" />
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Category</label>
                  <select
                    value={newFeedback.category}
                    onChange={(e) => setNewFeedback({ ...newFeedback, category: e.target.value })}
                    className="w-full p-2 bg-slate-700/50 border border-slate-600 rounded-md text-white"
                  >
                    <option value="General">General</option>
                    <option value="Performance">Performance</option>
                    <option value="Features">Features</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Security">Security</option>
                    <option value="UI/UX">UI/UX</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-300 mb-2 block">Comment</label>
                  <Textarea
                    value={newFeedback.comment}
                    onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })}
                    placeholder="Share your thoughts and suggestions..."
                    className="bg-slate-700/50 border-slate-600 min-h-[100px]"
                  />
                </div>

                <Button onClick={submitFeedback} className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Feedback
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Feedback */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Recent Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  <AnimatePresence>
                    {userFeedback.map((feedback, index) => (
                      <motion.div
                        key={feedback.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="p-3 bg-slate-700/50 rounded-lg border border-slate-600"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-white">{feedback.user}</span>
                            <div className="flex space-x-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-3 w-3 ${
                                    star <= feedback.rating ? "text-yellow-400 fill-current" : "text-gray-600"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <Badge variant="outline" className={getFeedbackStatusColor(feedback.status)}>
                            {feedback.status.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-300 mb-2">{feedback.comment}</p>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-400">{feedback.category}</span>
                          <span className="text-gray-400">{feedback.timestamp.toLocaleDateString()}</span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
