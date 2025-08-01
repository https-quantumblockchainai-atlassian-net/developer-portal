"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Wand2,
  Database,
  Cpu,
  Zap,
  Play,
  Pause,
  Square,
  Settings,
  Monitor,
  Code,
  GitBranch,
  Activity,
} from "lucide-react"
import Image from "next/image"

interface Pipeline {
  id: string
  name: string
  status: "running" | "stopped" | "error" | "completed"
  type: "etl" | "ml" | "streaming" | "batch"
  progress: number
  lastRun: Date
  duration: string
}

interface DataSource {
  name: string
  type: string
  status: "connected" | "disconnected" | "error"
  records: number
}

export default function MageAIIntegration() {
  const [pipelines, setPipelines] = useState<Pipeline[]>([
    {
      id: "1",
      name: "Threat Data ETL Pipeline",
      status: "running",
      type: "etl",
      progress: 67,
      lastRun: new Date(),
      duration: "12m 34s",
    },
    {
      id: "2",
      name: "ML Model Training",
      status: "running",
      type: "ml",
      progress: 89,
      lastRun: new Date(Date.now() - 300000),
      duration: "45m 12s",
    },
    {
      id: "3",
      name: "Real-time Stream Processing",
      status: "running",
      type: "streaming",
      progress: 100,
      lastRun: new Date(Date.now() - 60000),
      duration: "2h 15m",
    },
    {
      id: "4",
      name: "Batch Analytics",
      status: "completed",
      type: "batch",
      progress: 100,
      lastRun: new Date(Date.now() - 3600000),
      duration: "1h 23m",
    },
  ])

  const [dataSources] = useState<DataSource[]>([
    { name: "PostgreSQL", type: "Database", status: "connected", records: 1247892 },
    { name: "Kafka Stream", type: "Streaming", status: "connected", records: 89234 },
    { name: "S3 Bucket", type: "Storage", status: "connected", records: 567123 },
    { name: "API Gateway", type: "REST API", status: "connected", records: 234567 },
    { name: "Redis Cache", type: "Cache", status: "connected", records: 45678 },
  ])

  const [systemMetrics, setSystemMetrics] = useState({
    cpuUsage: 67,
    memoryUsage: 45,
    diskUsage: 23,
    networkIO: 89,
    activeConnections: 234,
    queuedJobs: 12,
  })

  useEffect(() => {
    // Simulate real-time metrics updates
    const interval = setInterval(() => {
      setSystemMetrics((prev) => ({
        cpuUsage: Math.max(20, Math.min(95, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(20, Math.min(90, prev.memoryUsage + (Math.random() - 0.5) * 8)),
        diskUsage: Math.max(10, Math.min(80, prev.diskUsage + (Math.random() - 0.5) * 5)),
        networkIO: Math.max(30, Math.min(100, prev.networkIO + (Math.random() - 0.5) * 15)),
        activeConnections: Math.max(
          100,
          Math.min(500, prev.activeConnections + Math.floor((Math.random() - 0.5) * 20)),
        ),
        queuedJobs: Math.max(0, Math.min(50, prev.queuedJobs + Math.floor((Math.random() - 0.5) * 5))),
      }))

      // Update pipeline progress
      setPipelines((prev) =>
        prev.map((pipeline) => ({
          ...pipeline,
          progress:
            pipeline.status === "running" ? Math.min(100, pipeline.progress + Math.random() * 5) : pipeline.progress,
        })),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-500"
      case "completed":
        return "bg-blue-500"
      case "error":
        return "bg-red-500"
      case "stopped":
        return "bg-gray-500"
      case "connected":
        return "bg-green-500"
      case "disconnected":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPipelineIcon = (type: string) => {
    switch (type) {
      case "etl":
        return Database
      case "ml":
        return Cpu
      case "streaming":
        return Activity
      case "batch":
        return GitBranch
      default:
        return Code
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Wand2 className="h-12 w-12 text-indigo-400 mr-4" />
            <h1 className="text-4xl font-bold gradient-text">Mage.AI Integration</h1>
          </div>
          <p className="text-xl text-gray-300">Your AI data engineer - Build, deploy, and run data pipelines</p>
        </motion.div>

        {/* Mage.AI Interface Preview */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-8">
          <Card className="bg-slate-800/50 border-indigo-500/30 glass-morphism overflow-hidden">
            <CardHeader>
              <CardTitle className="text-indigo-400 flex items-center">
                <Monitor className="h-6 w-6 mr-2" />
                Mage.AI Platform Interface
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative h-64 bg-slate-900/50">
                <Image
                  src="/images/mage-ai-interface.png"
                  alt="Mage.AI Interface"
                  fill
                  className="object-cover rounded-b-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-400 font-semibold">Sonnet 3.7 and GPT-4.5 Active</p>
                      <p className="text-sm text-gray-300">Powering your data pipelines</p>
                    </div>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Play className="h-4 w-4 mr-2" />
                      Start Building
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pipeline Management */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            <Card className="bg-slate-800/50 border-indigo-500/30 glass-morphism">
              <CardHeader>
                <CardTitle className="text-indigo-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <GitBranch className="h-6 w-6 mr-2" />
                    Active Pipelines
                  </div>
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                    <Code className="h-4 w-4 mr-2" />
                    New Pipeline
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pipelines.map((pipeline) => {
                  const IconComponent = getPipelineIcon(pipeline.type)
                  return (
                    <motion.div
                      key={pipeline.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-slate-900/50 rounded-lg border border-slate-700"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <IconComponent className="h-5 w-5 text-indigo-400 mr-3" />
                          <div>
                            <h3 className="font-semibold text-white">{pipeline.name}</h3>
                            <p className="text-xs text-gray-400">
                              Last run: {pipeline.lastRun.toLocaleTimeString()} • Duration: {pipeline.duration}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={`${getStatusColor(pipeline.status)} text-white`}>{pipeline.status}</Badge>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                              <Play className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                              <Pause className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                              <Square className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-indigo-400">{pipeline.progress.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <motion.div
                            className="bg-indigo-500 h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${pipeline.progress}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Data Sources */}
            <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center">
                  <Database className="h-6 w-6 mr-2" />
                  Data Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dataSources.map((source, index) => (
                    <motion.div
                      key={source.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 bg-slate-900/50 rounded border border-emerald-500/20"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-white">{source.name}</h4>
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(source.status)}`} />
                      </div>
                      <p className="text-xs text-gray-400 mb-1">{source.type}</p>
                      <p className="text-sm text-emerald-400">{source.records.toLocaleString()} records</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* System Metrics */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <Card className="bg-slate-800/50 border-yellow-500/30 glass-morphism">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center">
                  <Activity className="h-6 w-6 mr-2" />
                  System Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(systemMetrics).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                      <span className="text-yellow-400">
                        {typeof value === "number" && key.includes("Usage") ? `${value}%` : value}
                      </span>
                    </div>
                    {typeof value === "number" && key.includes("Usage") && (
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${
                            value > 80 ? "bg-red-500" : value > 60 ? "bg-yellow-500" : "bg-green-500"
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${value}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <Zap className="h-6 w-6 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
                >
                  <Code className="h-4 w-4 mr-2" />
                  Create ETL Pipeline
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/10"
                >
                  <Cpu className="h-4 w-4 mr-2" />
                  Train ML Model
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                >
                  <Database className="h-4 w-4 mr-2" />
                  Connect Data Source
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Configure Settings
                </Button>
              </CardContent>
            </Card>

            {/* Integration Status */}
            <Card className="bg-slate-800/50 border-cyan-500/30 glass-morphism">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center">
                  <Monitor className="h-6 w-6 mr-2" />
                  Integration Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Mage.AI Platform</span>
                    <Badge className="bg-green-500 text-white">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Sonnet 3.7</span>
                    <Badge className="bg-green-500 text-white">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">GPT-4.5</span>
                    <Badge className="bg-green-500 text-white">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Thoth Integration</span>
                    <Badge className="bg-green-500 text-white">Synced</Badge>
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
