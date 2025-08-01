"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Cpu,
  HardDrive,
  Zap,
  Thermometer,
  Activity,
  MemoryStick,
  Wifi,
  Server,
  Monitor,
  AlertTriangle,
  CheckCircle,
  Settings,
  RefreshCw,
} from "lucide-react"

interface HardwareComponent {
  id: string
  name: string
  type: "cpu" | "gpu" | "memory" | "storage" | "network" | "power"
  status: "optimal" | "warning" | "critical" | "offline"
  utilization: number
  temperature: number
  power: number
  health: number
}

interface SystemMetric {
  name: string
  value: number
  unit: string
  status: "good" | "warning" | "critical"
  trend: "up" | "down" | "stable"
}

export default function HardwareStackMonitor() {
  const [components, setComponents] = useState<HardwareComponent[]>([
    {
      id: "cpu-1",
      name: "Intel Xeon Platinum 8380",
      type: "cpu",
      status: "optimal",
      utilization: 67,
      temperature: 72,
      power: 185,
      health: 98,
    },
    {
      id: "gpu-1",
      name: "NVIDIA A100 80GB",
      type: "gpu",
      status: "optimal",
      utilization: 89,
      temperature: 78,
      power: 320,
      health: 96,
    },
    {
      id: "gpu-2",
      name: "NVIDIA A100 80GB",
      type: "gpu",
      status: "warning",
      utilization: 94,
      temperature: 82,
      power: 340,
      health: 94,
    },
    {
      id: "memory-1",
      name: "DDR4-3200 512GB",
      type: "memory",
      status: "optimal",
      utilization: 76,
      temperature: 45,
      power: 45,
      health: 99,
    },
    {
      id: "storage-1",
      name: "NVMe SSD 8TB",
      type: "storage",
      status: "optimal",
      utilization: 34,
      temperature: 42,
      power: 12,
      health: 97,
    },
    {
      id: "network-1",
      name: "100GbE Network",
      type: "network",
      status: "optimal",
      utilization: 23,
      temperature: 38,
      power: 25,
      health: 100,
    },
  ])

  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([
    { name: "Total Power", value: 1247, unit: "W", status: "good", trend: "stable" },
    { name: "Cooling Efficiency", value: 94.2, unit: "%", status: "good", trend: "up" },
    { name: "Network Throughput", value: 23.7, unit: "Gbps", status: "good", trend: "stable" },
    { name: "Storage IOPS", value: 125000, unit: "ops/s", status: "good", trend: "up" },
    { name: "Memory Bandwidth", value: 2.1, unit: "TB/s", status: "warning", trend: "down" },
    { name: "System Uptime", value: 99.97, unit: "%", status: "good", trend: "stable" },
  ])

  const [isMonitoring, setIsMonitoring] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    if (!isMonitoring) return

    const interval = setInterval(() => {
      setComponents((prev) =>
        prev.map((component) => ({
          ...component,
          utilization: Math.max(0, Math.min(100, component.utilization + (Math.random() - 0.5) * 10)),
          temperature: Math.max(30, Math.min(90, component.temperature + (Math.random() - 0.5) * 5)),
          power: Math.max(10, Math.min(400, component.power + (Math.random() - 0.5) * 20)),
          health: Math.max(85, Math.min(100, component.health + (Math.random() - 0.5) * 2)),
          status:
            component.temperature > 85 || component.utilization > 95
              ? "critical"
              : component.temperature > 75 || component.utilization > 85
                ? "warning"
                : "optimal",
        })),
      )

      setSystemMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value: Math.max(0, metric.value + (Math.random() - 0.5) * (metric.value * 0.1)),
          trend: Math.random() > 0.7 ? (Math.random() > 0.5 ? "up" : "down") : "stable",
          status:
            metric.name === "Memory Bandwidth" && metric.value < 1.8
              ? "warning"
              : metric.name === "Total Power" && metric.value > 1400
                ? "warning"
                : "good",
        })),
      )

      setLastUpdate(new Date())
    }, 3000)

    return () => clearInterval(interval)
  }, [isMonitoring])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
      case "good":
        return "text-green-400"
      case "warning":
        return "text-yellow-400"
      case "critical":
        return "text-red-400"
      case "offline":
        return "text-gray-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "optimal":
      case "good":
        return <CheckCircle className="h-4 w-4" />
      case "warning":
      case "critical":
        return <AlertTriangle className="h-4 w-4" />
      case "offline":
        return <RefreshCw className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getComponentIcon = (type: string) => {
    switch (type) {
      case "cpu":
        return <Cpu className="h-5 w-5" />
      case "gpu":
        return <Monitor className="h-5 w-5" />
      case "memory":
        return <MemoryStick className="h-5 w-5" />
      case "storage":
        return <HardDrive className="h-5 w-5" />
      case "network":
        return <Wifi className="h-5 w-5" />
      case "power":
        return <Zap className="h-5 w-5" />
      default:
        return <Server className="h-5 w-5" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return "↗"
      case "down":
        return "↘"
      case "stable":
        return "→"
      default:
        return "→"
    }
  }

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {systemMetrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{metric.name}</span>
                    <span className={`text-xs ${getStatusColor(metric.status)}`}>{getTrendIcon(metric.trend)}</span>
                  </div>
                  <div className={`text-lg font-bold ${getStatusColor(metric.status)}`}>
                    {typeof metric.value === "number" && metric.value > 1000
                      ? metric.value.toLocaleString()
                      : metric.value.toFixed(1)}
                    <span className="text-xs ml-1">{metric.unit}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Hardware Components */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center justify-between">
              <div className="flex items-center">
                <Server className="h-5 w-5 mr-2" />
                Hardware Components
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className={getStatusColor(isMonitoring ? "good" : "warning")}>
                  {isMonitoring ? "Monitoring" : "Paused"}
                </Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsMonitoring(!isMonitoring)}
                  className="border-blue-500 text-blue-500 hover:bg-blue-500/10 transition-smooth"
                >
                  {isMonitoring ? <RefreshCw className="h-3 w-3" /> : <Settings className="h-3 w-3" />}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {components.map((component, index) => (
                <motion.div
                  key={component.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-emerald-500/30 transition-smooth"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={getStatusColor(component.status)}>{getComponentIcon(component.type)}</div>
                      <div>
                        <h3 className="font-medium text-white">{component.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {component.type.toUpperCase()}
                          </Badge>
                          <div className={`flex items-center space-x-1 ${getStatusColor(component.status)}`}>
                            {getStatusIcon(component.status)}
                            <span className="text-xs">{component.status.toUpperCase()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-400">{component.health}%</div>
                      <div className="text-xs text-gray-400">Health</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <div className="text-xs text-gray-400">Utilization</div>
                      <div className="text-sm font-bold text-blue-400">{component.utilization}%</div>
                      <Progress value={component.utilization} className="h-1 mt-1" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Temperature</div>
                      <div className="text-sm font-bold text-orange-400">{component.temperature}°C</div>
                      <Progress value={(component.temperature / 100) * 100} className="h-1 mt-1" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Power</div>
                      <div className="text-sm font-bold text-yellow-400">{component.power}W</div>
                      <Progress value={(component.power / 400) * 100} className="h-1 mt-1" />
                    </div>
                  </div>

                  {/* Real-time Graph Simulation */}
                  <div className="h-16 bg-slate-900/50 rounded border border-slate-600 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-end justify-end p-2 space-x-1">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-sm"
                          style={{
                            height: `${Math.random() * 80 + 10}%`,
                          }}
                          animate={{
                            height: `${Math.random() * 80 + 10}%`,
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.1,
                          }}
                        />
                      ))}
                    </div>
                    <div className="absolute top-1 left-2 text-xs text-gray-400">
                      {component.type === "cpu" ? "CPU Load" : component.type === "gpu" ? "GPU Usage" : "Activity"}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* System Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Performance Controls */}
        <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Performance Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 transition-smooth">
                <Zap className="h-4 w-4 mr-2" />
                Optimize Performance
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="w-full border-blue-500 text-blue-500 hover:bg-blue-500/10 transition-smooth bg-transparent"
              >
                <Thermometer className="h-4 w-4 mr-2" />
                Thermal Management
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="w-full border-purple-500 text-purple-500 hover:bg-purple-500/10 transition-smooth bg-transparent"
              >
                <Activity className="h-4 w-4 mr-2" />
                Load Balancing
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 transition-smooth bg-transparent"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                System Restart
              </Button>
            </motion.div>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center">
              <Monitor className="h-5 w-5 mr-2" />
              System Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Last Update</span>
                <span className="text-sm text-white">{lastUpdate.toLocaleTimeString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Active Components</span>
                <span className="text-sm text-green-400">
                  {components.filter((c) => c.status !== "offline").length}/{components.length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Critical Alerts</span>
                <span className="text-sm text-red-400">{components.filter((c) => c.status === "critical").length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Warnings</span>
                <span className="text-sm text-yellow-400">
                  {components.filter((c) => c.status === "warning").length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Average Health</span>
                <span className="text-sm text-emerald-400">
                  {(components.reduce((acc, c) => acc + c.health, 0) / components.length).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">Total Power Draw</span>
                <span className="text-sm text-yellow-400">
                  {components.reduce((acc, c) => acc + c.power, 0).toLocaleString()}W
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
