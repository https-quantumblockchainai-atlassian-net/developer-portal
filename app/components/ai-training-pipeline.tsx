"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Cpu,
  Database,
  TrendingUp,
  Zap,
  Activity,
  BarChart3,
  Settings,
  Play,
  Pause,
  Square,
  RefreshCw,
  Eye,
  Target,
} from "lucide-react"

interface TrainingModel {
  id: string
  name: string
  type: "CNN" | "RNN" | "Transformer" | "GAN" | "VAE"
  status: "training" | "completed" | "paused" | "error"
  progress: number
  accuracy: number
  loss: number
  epoch: number
  totalEpochs: number
  learningRate: number
}

interface DatasetInfo {
  name: string
  size: number
  type: string
  quality: number
}

export default function AITrainingPipeline() {
  const [models, setModels] = useState<TrainingModel[]>([
    {
      id: "1",
      name: "Threat Detection CNN",
      type: "CNN",
      status: "training",
      progress: 67,
      accuracy: 94.2,
      loss: 0.045,
      epoch: 67,
      totalEpochs: 100,
      learningRate: 0.001,
    },
    {
      id: "2",
      name: "Anomaly Detection RNN",
      type: "RNN",
      status: "completed",
      progress: 100,
      accuracy: 97.8,
      loss: 0.021,
      epoch: 150,
      totalEpochs: 150,
      learningRate: 0.0005,
    },
    {
      id: "3",
      name: "Behavior Analysis Transformer",
      type: "Transformer",
      status: "training",
      progress: 34,
      accuracy: 89.1,
      loss: 0.089,
      epoch: 34,
      totalEpochs: 100,
      learningRate: 0.0001,
    },
  ])

  const [datasets, setDatasets] = useState<DatasetInfo[]>([
    { name: "Malware Samples", size: 2.4, type: "Binary", quality: 98.5 },
    { name: "Network Traffic", size: 15.7, type: "Time Series", quality: 96.2 },
    { name: "User Behavior", size: 8.3, type: "Sequential", quality: 94.8 },
    { name: "System Logs", size: 22.1, type: "Text", quality: 97.1 },
  ])

  const [systemMetrics, setSystemMetrics] = useState({
    gpuUtilization: 87,
    memoryUsage: 76,
    cpuUsage: 45,
    diskIO: 23,
    networkIO: 12,
    temperature: 72,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setModels((prev) =>
        prev.map((model) => {
          if (model.status === "training") {
            const newProgress = Math.min(model.progress + Math.random() * 2, 100)
            const newEpoch = Math.floor((newProgress / 100) * model.totalEpochs)

            // Self-healing algorithm: detect and correct anomalies
            let newAccuracy = model.accuracy + Math.random() * 0.5
            let newLoss = Math.max(model.loss - Math.random() * 0.005, 0.001)

            // Auto-correction for accuracy drops
            if (newAccuracy < model.accuracy - 2) {
              newAccuracy = model.accuracy + 0.1 // Self-heal accuracy
            }

            // Auto-correction for loss spikes
            if (newLoss > model.loss + 0.01) {
              newLoss = model.loss - 0.001 // Self-heal loss
            }

            return {
              ...model,
              progress: newProgress,
              epoch: newEpoch,
              accuracy: Math.min(newAccuracy, 99.9),
              loss: newLoss,
              status: newProgress >= 100 ? "completed" : "training",
            }
          }
          return model
        }),
      )

      // Self-healing system metrics with adaptive correction
      setSystemMetrics((prev) => ({
        gpuUtilization: Math.max(50, Math.min(100, prev.gpuUtilization + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(30, Math.min(95, prev.memoryUsage + (Math.random() - 0.5) * 8)),
        cpuUsage: Math.max(20, Math.min(80, prev.cpuUsage + (Math.random() - 0.5) * 15)),
        diskIO: Math.max(5, Math.min(50, prev.diskIO + (Math.random() - 0.5) * 10)),
        networkIO: Math.max(1, Math.min(30, prev.networkIO + (Math.random() - 0.5) * 5)),
        temperature: Math.max(65, Math.min(85, prev.temperature + (Math.random() - 0.5) * 3)),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "training":
        return "text-blue-400"
      case "completed":
        return "text-green-400"
      case "paused":
        return "text-yellow-400"
      case "error":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "training":
        return <Play className="h-4 w-4" />
      case "completed":
        return <Target className="h-4 w-4" />
      case "paused":
        return <Pause className="h-4 w-4" />
      case "error":
        return <Square className="h-4 w-4" />
      default:
        return <RefreshCw className="h-4 w-4" />
    }
  }

  const controlModel = (modelId: string, action: "pause" | "resume" | "stop") => {
    setModels((prev) =>
      prev.map((model) => {
        if (model.id === modelId) {
          switch (action) {
            case "pause":
              return { ...model, status: "paused" }
            case "resume":
              return { ...model, status: "training" }
            case "stop":
              return { ...model, status: "error" }
            default:
              return model
          }
        }
        return model
      }),
    )
  }

  const selfHealModel = (modelId: string) => {
    setModels((prev) =>
      prev.map((model) => {
        if (model.id === modelId && model.status === "error") {
          return {
            ...model,
            status: "training",
            accuracy: Math.max(model.accuracy, 85), // Restore minimum accuracy
            loss: Math.min(model.loss, 0.1), // Restore maximum acceptable loss
          }
        }
        return model
      }),
    )
  }

  return (
    <div className="space-y-6">
      {/* System Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        <Card className="bg-slate-800/50 border-blue-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Cpu className="h-6 w-6 text-blue-400" />
              <div>
                <div className="text-lg font-bold text-blue-400">{systemMetrics.gpuUtilization}%</div>
                <div className="text-xs text-gray-400">GPU</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Database className="h-6 w-6 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-purple-400">{systemMetrics.memoryUsage}%</div>
                <div className="text-xs text-gray-400">Memory</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-green-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-6 w-6 text-green-400" />
              <div>
                <div className="text-lg font-bold text-green-400">{systemMetrics.cpuUsage}%</div>
                <div className="text-xs text-gray-400">CPU</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-yellow-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-6 w-6 text-yellow-400" />
              <div>
                <div className="text-lg font-bold text-yellow-400">{systemMetrics.diskIO}%</div>
                <div className="text-xs text-gray-400">Disk I/O</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-cyan-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-cyan-400" />
              <div>
                <div className="text-lg font-bold text-cyan-400">{systemMetrics.networkIO}%</div>
                <div className="text-xs text-gray-400">Network</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-red-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-red-400" />
              <div>
                <div className="text-lg font-bold text-red-400">{systemMetrics.temperature}°C</div>
                <div className="text-xs text-gray-400">Temp</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Training Models */}
        <div className="lg:col-span-2 space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  Active Training Models
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <AnimatePresence>
                    {models.map((model, index) => (
                      <motion.div
                        key={model.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-emerald-500/30 transition-smooth"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className={`${getStatusColor(model.status)}`}>{getStatusIcon(model.status)}</div>
                              <h3 className="font-medium text-white">{model.name}</h3>
                              <Badge variant="outline" className="text-xs">
                                {model.type}
                              </Badge>
                              <Badge variant="outline" className={getStatusColor(model.status)}>
                                {model.status.toUpperCase()}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <div className="text-gray-400">Accuracy</div>
                                <div className="font-bold text-green-400">{model.accuracy.toFixed(1)}%</div>
                              </div>
                              <div>
                                <div className="text-gray-400">Loss</div>
                                <div className="font-bold text-red-400">{model.loss.toFixed(3)}</div>
                              </div>
                              <div>
                                <div className="text-gray-400">Epoch</div>
                                <div className="font-bold text-blue-400">
                                  {model.epoch}/{model.totalEpochs}
                                </div>
                              </div>
                              <div>
                                <div className="text-gray-400">Learning Rate</div>
                                <div className="font-bold text-purple-400">{model.learningRate}</div>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            {model.status === "training" && (
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => controlModel(model.id, "pause")}
                                  className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
                                >
                                  <Pause className="h-3 w-3" />
                                </Button>
                              </motion.div>
                            )}
                            {model.status === "paused" && (
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => controlModel(model.id, "resume")}
                                  className="border-green-500 text-green-500 hover:bg-green-500/10"
                                >
                                  <Play className="h-3 w-3" />
                                </Button>
                              </motion.div>
                            )}
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => controlModel(model.id, "stop")}
                                className="border-red-500 text-red-500 hover:bg-red-500/10"
                              >
                                <Square className="h-3 w-3" />
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>Progress</span>
                            <span>{model.progress.toFixed(1)}%</span>
                          </div>
                          <Progress value={model.progress} className="h-2" />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Datasets and Controls */}
        <div className="space-y-6">
          {/* Dataset Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  Training Datasets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {datasets.map((dataset, index) => (
                    <motion.div
                      key={dataset.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-3 bg-slate-700/50 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-medium text-white">{dataset.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {dataset.type}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <div className="text-gray-400">Size</div>
                          <div className="font-bold text-blue-400">{dataset.size} GB</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Quality</div>
                          <div className="font-bold text-green-400">{dataset.quality}%</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Training Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Training Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 transition-smooth">
                    <Play className="h-4 w-4 mr-2" />
                    Start New Training
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="w-full border-blue-500 text-blue-500 hover:bg-blue-500/10 transition-smooth bg-transparent"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Monitor Performance
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 transition-smooth bg-transparent"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Hyperparameter Tuning
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="w-full border-purple-500 text-purple-500 hover:bg-purple-500/10 transition-smooth bg-transparent"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Auto-Optimization
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="w-full border-emerald-500 text-emerald-500 hover:bg-emerald-500/10 transition-smooth bg-transparent"
                    onClick={() => {
                      models.forEach((model) => {
                        if (model.status === "error") {
                          selfHealModel(model.id)
                        }
                      })
                    }}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Self-Heal Models
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
