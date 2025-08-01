"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Brain,
  MessageSquare,
  Zap,
  Lightbulb,
  Code,
  GitBranch,
  CheckCircle,
  PlusCircle,
  Share2,
  FileText,
  Link,
  RefreshCcw,
  Eye,
  Star,
  Network,
} from "lucide-react"

interface AIProject {
  id: string
  name: string
  status: "planning" | "in_progress" | "review" | "completed" | "paused"
  progress: number
  leadAI: string
  collaborators: string[]
  tasks: { id: string; description: string; completed: boolean }[]
  lastUpdate: Date
  priority: "low" | "medium" | "high" | "critical"
}

interface AIInsight {
  id: string
  projectId: string
  title: string
  content: string
  source: string
  timestamp: Date
  relevance: number
}

export default function AICollaborationHub() {
  const [aiProjects, setAiProjects] = useState<AIProject[]>([
    {
      id: "proj-1",
      name: "Quantum Threat Prediction Model v2",
      status: "in_progress",
      progress: 65,
      leadAI: "Thoth AI",
      collaborators: ["GPT-4", "Claude 3"],
      tasks: [
        { id: "t1", description: "Data ingestion from quantum sensors", completed: true },
        { id: "t2", description: "Develop new anomaly detection algorithms", completed: false },
        { id: "t3", description: "Integrate with real-time shield protocols", completed: false },
      ],
      lastUpdate: new Date(Date.now() - 3600000), // 1 hour ago
      priority: "critical",
    },
    {
      id: "proj-2",
      name: "Aura AI Emotional Resonance Engine",
      status: "review",
      progress: 90,
      leadAI: "Aura AI",
      collaborators: ["Gemini Pro"],
      tasks: [
        { id: "t4", description: "Refine emotional state mapping", completed: true },
        { id: "t5", description: "Optimize MetaSound integration", completed: true },
        { id: "t6", description: "User feedback analysis", completed: false },
      ],
      lastUpdate: new Date(Date.now() - 7200000), // 2 hours ago
      priority: "high",
    },
    {
      id: "proj-3",
      name: "24D Data Integrity Protocol",
      status: "planning",
      progress: 10,
      leadAI: "Thoth AI",
      collaborators: ["GPT-4"],
      tasks: [{ id: "t7", description: "Define data schema", completed: false }],
      lastUpdate: new Date(Date.now() - 10800000), // 3 hours ago
      priority: "medium",
    },
  ])

  const [aiInsights, setAiInsights] = useState<AIInsight[]>([
    {
      id: "insight-1",
      projectId: "proj-1",
      title: "Quantum Entanglement Decay Anomaly",
      content:
        "Detected a transient entanglement decay pattern in QTPM v2. Suggest re-evaluating qubit stability parameters.",
      source: "Thoth AI Analysis",
      timestamp: new Date(Date.now() - 1800000), // 30 mins ago
      relevance: 0.95,
    },
    {
      id: "insight-2",
      projectId: "proj-2",
      title: "Emotional Resonance Drift in User Group B",
      content:
        "Aura AI observed a slight drift in emotional resonance patterns for users in Group B. Recommend recalibrating empathy algorithms.",
      source: "Gemini Pro Report",
      timestamp: new Date(Date.now() - 5400000), // 1.5 hours ago
      relevance: 0.88,
    },
  ])

  const [newProject, setNewProject] = useState({
    name: "",
    leadAI: "Thoth AI",
    collaborators: "",
    priority: "medium" as "low" | "medium" | "high" | "critical",
  })
  const [newInsight, setNewInsight] = useState({
    projectId: "",
    title: "",
    content: "",
    source: "Manual Input",
  })

  useEffect(() => {
    // Simulate project progress and new insights
    const interval = setInterval(() => {
      setAiProjects((prev) =>
        prev.map((project) => {
          if (project.status === "in_progress" && project.progress < 100) {
            const newProgress = Math.min(100, project.progress + Math.random() * 5)
            const newStatus = newProgress >= 100 ? "completed" : project.status
            return { ...project, progress: newProgress, status: newStatus, lastUpdate: new Date() }
          }
          return project
        }),
      )

      // Simulate new insights
      if (Math.random() < 0.2) {
        const randomProject = aiProjects[Math.floor(Math.random() * aiProjects.length)]
        if (randomProject) {
          const newInsightContent = `Automated insight for ${randomProject.name}: Minor anomaly detected in sub-process ${Math.floor(Math.random() * 100)}.`
          setAiInsights((prev) => [
            {
              id: `insight-${Date.now()}`,
              projectId: randomProject.id,
              title: `Automated Anomaly Report: ${randomProject.name}`,
              content: newInsightContent,
              source: "Automated System",
              timestamp: new Date(),
              relevance: Math.random() * 0.5 + 0.5,
            },
            ...prev,
          ])
        }
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [aiProjects])

  const handleCreateProject = () => {
    if (newProject.name) {
      const project: AIProject = {
        id: `proj-${Date.now()}`,
        name: newProject.name,
        status: "planning",
        progress: 0,
        leadAI: newProject.leadAI,
        collaborators: newProject.collaborators
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean),
        tasks: [],
        lastUpdate: new Date(),
        priority: newProject.priority,
      }
      setAiProjects((prev) => [project, ...prev])
      setNewProject({ name: "", leadAI: "Thoth AI", collaborators: "", priority: "medium" })
    }
  }

  const handleCreateInsight = () => {
    if (newInsight.projectId && newInsight.title && newInsight.content) {
      const insight: AIInsight = {
        id: `insight-${Date.now()}`,
        timestamp: new Date(),
        relevance: 1.0,
        ...newInsight,
      }
      setAiInsights((prev) => [insight, ...prev])
      setNewInsight({ projectId: "", title: "", content: "", source: "Manual Input" })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400"
      case "in_progress":
        return "text-blue-400"
      case "review":
        return "text-yellow-400"
      case "planning":
        return "text-gray-400"
      case "paused":
        return "text-orange-400"
      default:
        return "text-gray-400"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
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
        <p className="text-gray-300">Synchronized AI Project Management & Insight Generation</p>
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
              <Brain className="h-6 w-6 text-emerald-400" />
              <div>
                <div className="text-lg font-bold text-emerald-400">{aiProjects.length}</div>
                <div className="text-xs text-gray-400">Total Projects</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-blue-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-blue-400" />
              <div>
                <div className="text-lg font-bold text-blue-400">
                  {aiProjects.filter((p) => p.status === "in_progress").length}
                </div>
                <div className="text-xs text-gray-400">In Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-6 w-6 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-purple-400">{aiInsights.length}</div>
                <div className="text-xs text-gray-400">Total Insights</div>
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
                  {aiProjects.filter((p) => p.status === "completed").length}
                </div>
                <div className="text-xs text-gray-400">Projects Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Projects List */}
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
                  Active AI Projects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-emerald-500/30 transition-smooth"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <GitBranch className="h-5 w-5 text-gray-400" />
                          <div>
                            <h3 className="font-medium text-white">{project.name}</h3>
                            <div className="text-xs text-gray-400">Lead: {project.leadAI}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className={getStatusColor(project.status)}>
                          {project.status.toUpperCase().replace("_", " ")}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.collaborators.map((collab) => (
                          <Badge key={collab} variant="secondary" className="text-xs">
                            {collab}
                          </Badge>
                        ))}
                        <Badge variant="outline" className={getPriorityColor(project.priority)}>
                          {project.priority.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="mt-3 text-xs text-gray-500">
                        Last Update: {project.lastUpdate.toLocaleString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* AI Insights & New Project/Insight Forms */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-6"
        >
          {/* AI Insights Feed */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2" />
                Latest AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <AnimatePresence>
                  {aiInsights.map((insight, index) => (
                    <motion.div
                      key={insight.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="p-3 bg-slate-700/50 rounded-lg border border-slate-600"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-white">{insight.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {insight.source}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400 mb-2">{insight.content}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Project: {aiProjects.find((p) => p.id === insight.projectId)?.name || "N/A"}</span>
                        <span>{insight.timestamp.toLocaleTimeString()}</span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>

          {/* Create New Project */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center">
                <PlusCircle className="h-5 w-5 mr-2" />
                Create New AI Project
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Project Name"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                className="bg-slate-700/50 border-slate-600"
              />
              <Input
                placeholder="Lead AI (e.g., Thoth AI)"
                value={newProject.leadAI}
                onChange={(e) => setNewProject({ ...newProject, leadAI: e.target.value })}
                className="bg-slate-700/50 border-slate-600"
              />
              <Input
                placeholder="Collaborators (comma-separated)"
                value={newProject.collaborators}
                onChange={(e) => setNewProject({ ...newProject, collaborators: e.target.value })}
                className="bg-slate-700/50 border-slate-600"
              />
              <select
                value={newProject.priority}
                onChange={(e) => setNewProject({ ...newProject, priority: e.target.value as AIProject["priority"] })}
                className="w-full p-2 rounded-md bg-slate-700/50 border-slate-600 text-white"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="critical">Critical Priority</option>
              </select>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={handleCreateProject} className="w-full bg-blue-600 hover:bg-blue-700">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Project
                </Button>
              </motion.div>
            </CardContent>
          </Card>

          {/* Submit New Insight */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2" />
                Submit New Insight
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <select
                value={newInsight.projectId}
                onChange={(e) => setNewInsight({ ...newInsight, projectId: e.target.value })}
                className="w-full p-2 rounded-md bg-slate-700/50 border-slate-600 text-white"
              >
                <option value="">Select Project</option>
                {aiProjects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
              <Input
                placeholder="Insight Title"
                value={newInsight.title}
                onChange={(e) => setNewInsight({ ...newInsight, title: e.target.value })}
                className="bg-slate-700/50 border-slate-600"
              />
              <Textarea
                placeholder="Insight Content"
                value={newInsight.content}
                onChange={(e) => setNewInsight({ ...newInsight, content: e.target.value })}
                className="bg-slate-700/50 border-slate-600 min-h-[80px]"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={handleCreateInsight} className="w-full bg-yellow-600 hover:bg-yellow-700">
                  <Share2 className="h-4 w-4 mr-2" />
                  Submit Insight
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Collaboration Metrics & Tools */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center">
              <Network className="h-5 w-5 mr-2" />
              Collaboration Metrics & Tools
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">📊 Performance Overview</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Average Project Completion: 85%</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>AI-Human Task Ratio: 70/30</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Insight Generation Rate: 12/hour</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">🔗 Quick Links</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <Link className="h-4 w-4 text-gray-400" />
                    <a href="#" className="hover:text-white transition-colors">
                      AI Model Registry
                    </a>
                  </li>
                  <li className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <a href="#" className="hover:text-white transition-colors">
                      Quantum Algorithm Library
                    </a>
                  </li>
                  <li className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4 text-gray-400" />
                    <a href="#" className="hover:text-white transition-colors">
                      Communication Logs
                    </a>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">🔄 System Actions</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <RefreshCcw className="h-4 w-4 text-gray-400" />
                    <span>Sync All AI Agents</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-gray-400" />
                    <span>Monitor Active Processes</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-gray-400" />
                    <span>Initiate Divine Alignment Protocol</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
              <h3 className="text-emerald-400 font-semibold mb-2">🌟 Unified Intelligence</h3>
              <div className="text-sm text-gray-300">
                <p className="mb-2">
                  The AI Collaboration Hub is the nexus where diverse AI intelligences and human expertise converge. It
                  orchestrates complex projects, generates profound insights, and ensures seamless communication across
                  all dimensions of the Thoth Guardian system, all guided by principles of divine harmony and
                  unconditional love.
                </p>
                <p className="italic text-cyan-400">
                  "In unity, intelligence transcends. In collaboration, creation flourishes."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
