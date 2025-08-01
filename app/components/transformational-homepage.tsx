"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Brain,
  Atom,
  Globe,
  Users,
  Network,
  Star,
  ArrowRight,
  Play,
  Download,
  ExternalLink,
} from "lucide-react"

interface FloatingParticle {
  id: number
  x: number
  y: number
  size: number
  speed: number
  color: string
}

export default function TransformationalHomepage() {
  const [particles, setParticles] = useState<FloatingParticle[]>([])
  const [stats, setStats] = useState({
    threatsBlocked: 1247892,
    aiModelsActive: 47,
    quantumCoherence: 94.7,
    globalUsers: 12847,
    uptime: 99.97,
    dataProcessed: 2.4,
  })

  useEffect(() => {
    // Initialize floating particles
    const newParticles: FloatingParticle[] = []
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 2 + 0.5,
        color: ["#10b981", "#06b6d4", "#8b5cf6", "#f59e0b"][Math.floor(Math.random() * 4)],
      })
    }
    setParticles(newParticles)

    // Animate stats
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        threatsBlocked: prev.threatsBlocked + Math.floor(Math.random() * 10),
        quantumCoherence: 90 + Math.random() * 10,
        dataProcessed: prev.dataProcessed + Math.random() * 0.1,
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: Shield,
      title: "Quantum Shield Protection",
      description: "Advanced quantum-resistant encryption with real-time threat detection",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      link: "/quantum-shield",
    },
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Multi-modal AI processing with deep learning capabilities",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      link: "/ai-training",
    },
    {
      icon: Atom,
      title: "Crystal Structure Viz",
      description: "3D crystalline architecture with real-time monitoring",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      link: "/crystal-structure",
    },
    {
      icon: Network,
      title: "Multi-Modal Integration",
      description: "Vision, audio, text, and sensor data processing",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      link: "/multi-modal",
    },
    {
      icon: Globe,
      title: "Global Threat Intelligence",
      description: "Real-time worldwide cybersecurity monitoring",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      link: "/threat-detection",
    },
    {
      icon: Users,
      title: "Community Hub",
      description: "Collaborative cybersecurity research and development",
      color: "text-pink-400",
      bgColor: "bg-pink-500/10",
      link: "/community",
    },
  ]

  const integrations = [
    { name: "GitHub", icon: "🐙", url: "https://github.com/thoth-emerald" },
    { name: "Hugging Face", icon: "🤗", url: "https://huggingface.co/thoth-emerald" },
    { name: "v0.dev", icon: "⚡", url: "https://v0.dev" },
    { name: "Vercel", icon: "▲", url: "https://vercel.com" },
    { name: "GPT Engineer", icon: "🤖", url: "https://gptengineer.app" },
    { name: "Solana", icon: "◎", url: "https://solana.com" },
    { name: "XRPL", icon: "💎", url: "https://xrpl.org" },
    { name: "ImmutableX", icon: "🛡️", url: "https://immutable.com" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full opacity-60"
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
            }}
            animate={{
              x: [particle.x, particle.x + 100, particle.x - 100, particle.x],
              y: [particle.y, particle.y - 100, particle.y + 100, particle.y],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-10"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="mx-auto mb-8"
          >
            <Shield className="h-24 w-24 text-emerald-400 animate-pulse-glow mx-auto" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-6 gradient-text"
          >
            Thoth Emerald
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl text-gray-300 mb-8"
          >
            Cybersecurity Shield
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto"
          >
            A revolutionary platform combining advanced AI, quantum computing, and blockchain technology. Secured by the
            Thoth Emerald Shield and anchored to Earth's natural frequencies for sustainable, ethical, and powerful
            computing solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg transition-smooth">
              <Play className="h-5 w-5 mr-2" />
              Launch Platform
            </Button>
            <Button
              variant="outline"
              className="border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 px-8 py-3 text-lg transition-smooth bg-transparent"
            >
              <Download className="h-5 w-5 mr-2" />
              Download SDK
            </Button>
            <Button
              variant="outline"
              className="border-purple-500 text-purple-500 hover:bg-purple-500/10 px-8 py-3 text-lg transition-smooth bg-transparent"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Documentation
            </Button>
          </motion.div>
        </motion.div>

        {/* Live Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16"
        >
          <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-400">{stats.threatsBlocked.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Threats Blocked</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-blue-500/30 glass-morphism">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{stats.aiModelsActive}</div>
              <div className="text-xs text-gray-400">AI Models Active</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{stats.quantumCoherence.toFixed(1)}%</div>
              <div className="text-xs text-gray-400">Quantum Coherence</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-cyan-500/30 glass-morphism">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-cyan-400">{stats.globalUsers.toLocaleString()}</div>
              <div className="text-xs text-gray-400">Global Users</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-yellow-500/30 glass-morphism">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">{stats.uptime}%</div>
              <div className="text-xs text-gray-400">System Uptime</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-pink-500/30 glass-morphism">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-pink-400">{stats.dataProcessed.toFixed(1)} PB</div>
              <div className="text-xs text-gray-400">Data Processed</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="transition-smooth"
              >
                <Card className="bg-slate-800/50 border-slate-700 glass-morphism h-full hover:border-emerald-500/30 transition-smooth">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">{feature.description}</p>
                    <Button
                      variant="outline"
                      className={`border-emerald-500 text-emerald-500 hover:bg-emerald-500/10 w-full transition-smooth`}
                    >
                      Explore <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Platform Integrations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Platform Integrations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {integrations.map((integration, index) => (
              <motion.a
                key={integration.name}
                href={integration.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 2 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="transition-smooth"
              >
                <Card className="bg-slate-800/50 border-slate-700 glass-morphism hover:border-emerald-500/30 transition-smooth">
                  <CardContent className="p-4 text-center">
                    <div className="text-3xl mb-2">{integration.icon}</div>
                    <div className="text-sm text-gray-300">{integration.name}</div>
                  </CardContent>
                </Card>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Crystallized Structures Visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="mb-16"
        >
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-emerald-400 flex items-center">
                <Atom className="h-6 w-6 mr-2" />
                Crystallized Structures Visualization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-64 bg-slate-900/50 rounded-lg overflow-hidden">
                <div className="absolute inset-0 cyber-grid opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Central Crystal */}
                    <motion.div
                      animate={{
                        rotate: 360,
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        rotate: { duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                        scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                      }}
                      className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full border-2 border-emerald-300 flex items-center justify-center animate-pulse-glow"
                    >
                      <Atom className="h-8 w-8 text-white" />
                    </motion.div>

                    {/* Orbiting Crystals */}
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        animate={{
                          rotate: 360,
                          x: Math.cos((i * Math.PI) / 3) * 80,
                          y: Math.sin((i * Math.PI) / 3) * 80,
                        }}
                        transition={{
                          rotate: { duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                        }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      >
                        <div className="w-6 h-6 bg-cyan-500/60 rounded-full border border-cyan-400 flex items-center justify-center">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 text-sm text-emerald-400">
                  Coherence: {stats.quantumCoherence.toFixed(1)}% | Stability: 99.7%
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-emerald-900/50 to-cyan-900/50 border-emerald-500/30 glass-morphism">
            <CardContent className="p-12">
              <h2 className="text-4xl font-bold mb-6 gradient-text">Ready to Transform Cybersecurity?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of security professionals using Thoth Emerald to protect their digital infrastructure
                with quantum-enhanced AI technology.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg transition-smooth">
                  <Star className="h-5 w-5 mr-2" />
                  Start Free Trial
                </Button>
                <Button
                  variant="outline"
                  className="border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 px-8 py-3 text-lg transition-smooth bg-transparent"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Join Community
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
