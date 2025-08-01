"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Star, Network, Code, Heart, Sparkles, Globe, Music, Users, Map } from "lucide-react"

interface WorldZone {
  id: string
  name: string
  vibe: string
  audioTheme: string
  coreFeature: string
  isActive: boolean
  playerCount: number
  emotionalResonance: number
}

interface WalkerRole {
  id: string
  name: string
  description: string
  icon: string
  abilities: string[]
  isSelected: boolean
}

interface MemoryShard {
  id: string
  emotion: string
  track: string
  location: string
  seedColor: string
  memoryType: "visual" | "audio" | "experiential"
  shared: boolean
  resonanceLevel: number
}

export default function WalkerWorldEcosystem() {
  const [worldZones, setWorldZones] = useState<WorldZone[]>([
    {
      id: "fade",
      name: "The Fade",
      vibe: "Lost/Haunting",
      audioTheme: "Faded",
      coreFeature: "Disintegrating architecture & fog memory trails",
      isActive: true,
      playerCount: 47,
      emotionalResonance: 0.72,
    },
    {
      id: "lumina",
      name: "Lumina Fields",
      vibe: "Hopeful",
      audioTheme: "Spectre",
      coreFeature: "Bioluminescent flora & music-reactive sky",
      isActive: true,
      playerCount: 89,
      emotionalResonance: 0.85,
    },
    {
      id: "signal",
      name: "Signal Tower",
      vibe: "Empowered",
      audioTheme: "On My Way",
      coreFeature: "Tower of memory uploads & global story arcs",
      isActive: false,
      playerCount: 23,
      emotionalResonance: 0.63,
    },
    {
      id: "pulse",
      name: "Pulse Basin",
      vibe: "Love/Unity",
      audioTheme: "Unity",
      coreFeature: "Shared player-made zones w/ mood syncing",
      isActive: true,
      playerCount: 156,
      emotionalResonance: 0.91,
    },
  ])

  const [walkerRoles, setWalkerRoles] = useState<WalkerRole[]>([
    {
      id: "remnants",
      name: "The Remnants",
      description: "Discoverers of forgotten architecture / past Walkers",
      icon: "🔍",
      abilities: ["Archaeological Vision", "Memory Trace", "Relic Identification"],
      isSelected: false,
    },
    {
      id: "tuners",
      name: "The Tuners",
      description: "Use MetaSound interfaces to tune emotional state of areas",
      icon: "🎵",
      abilities: ["Harmonic Resonance", "Frequency Modulation", "Emotional Calibration"],
      isSelected: true,
    },
    {
      id: "signalers",
      name: "The Signalers",
      description: "Spread messages via musical symbols and glyphs",
      icon: "📡",
      abilities: ["Symbol Broadcasting", "Network Amplification", "Message Encoding"],
      isSelected: false,
    },
    {
      id: "formers",
      name: "The Formers",
      description: "Builders, designers, and 24D Seed shapers",
      icon: "🧱",
      abilities: ["Terrain Shaping", "Seed Cultivation", "Reality Architecture"],
      isSelected: false,
    },
  ])

  const [memoryShards, setMemoryShards] = useState<MemoryShard[]>([
    {
      id: "1",
      emotion: "Hope",
      track: "Faded",
      location: "The Fade",
      seedColor: "#303AAE",
      memoryType: "visual",
      shared: true,
      resonanceLevel: 0.78,
    },
    {
      id: "2",
      emotion: "Longing",
      track: "Spectre",
      location: "Lumina Fields",
      seedColor: "#00D4AA",
      memoryType: "audio",
      shared: false,
      resonanceLevel: 0.65,
    },
    {
      id: "3",
      emotion: "Unity",
      track: "Unity",
      location: "Pulse Basin",
      seedColor: "#FFD700",
      memoryType: "experiential",
      shared: true,
      resonanceLevel: 0.92,
    },
  ])

  const [globalPulseActive, setGlobalPulseActive] = useState(false)
  const [communityMood, setCommunityMood] = useState([75])
  const [worldEvolution, setWorldEvolution] = useState([68])
  const [musicSync, setMusicSync] = useState([82])
  const [isLiveMixMode, setIsLiveMixMode] = useState(false)

  useEffect(() => {
    // Simulate dynamic world evolution
    const interval = setInterval(() => {
      setWorldZones((prev) =>
        prev.map((zone) => ({
          ...zone,
          emotionalResonance: Math.max(0.3, Math.min(1.0, zone.emotionalResonance + (Math.random() - 0.5) * 0.1)),
          playerCount: Math.max(0, zone.playerCount + Math.floor((Math.random() - 0.5) * 10)),
        })),
      )

      setMemoryShards((prev) =>
        prev.map((shard) => ({
          ...shard,
          resonanceLevel: Math.max(0.2, Math.min(1.0, shard.resonanceLevel + (Math.random() - 0.5) * 0.08)),
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const activateZone = (zoneId: string) => {
    setWorldZones((prev) =>
      prev.map((zone) => ({
        ...zone,
        isActive: zone.id === zoneId ? !zone.isActive : zone.isActive,
      })),
    )
  }

  const selectRole = (roleId: string) => {
    setWalkerRoles((prev) =>
      prev.map((role) => ({
        ...role,
        isSelected: role.id === roleId,
      })),
    )
  }

  const triggerGlobalPulse = () => {
    setGlobalPulseActive(true)
    setWorldZones((prev) =>
      prev.map((zone) => ({
        ...zone,
        emotionalResonance: Math.min(1.0, zone.emotionalResonance + 0.15),
      })),
    )
    setTimeout(() => setGlobalPulseActive(false), 8000)
  }

  const getZoneColor = (vibe: string) => {
    switch (vibe.toLowerCase()) {
      case "lost/haunting":
        return "border-purple-500/30 text-purple-400"
      case "hopeful":
        return "border-green-500/30 text-green-400"
      case "empowered":
        return "border-yellow-500/30 text-yellow-400"
      case "love/unity":
        return "border-pink-500/30 text-pink-400"
      default:
        return "border-gray-500/30 text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* Walker World Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold gradient-text mb-2">Walker World Ecosystem</h1>
        <p className="text-gray-300">AI-Augmented, Emotionally Intelligent Virtual World</p>
      </motion.div>

      {/* Global Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-emerald-400" />
              <div>
                <div className="text-lg font-bold text-emerald-400">
                  {worldZones.reduce((sum, zone) => sum + zone.playerCount, 0)}
                </div>
                <div className="text-xs text-gray-400">Active Walkers</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-purple-400">{communityMood[0]}%</div>
                <div className="text-xs text-gray-400">Community Mood</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-cyan-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-6 w-6 text-cyan-400" />
              <div>
                <div className="text-lg font-bold text-cyan-400">{worldEvolution[0]}%</div>
                <div className="text-xs text-gray-400">World Evolution</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-yellow-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Music className="h-6 w-6 text-yellow-400" />
              <div>
                <div className="text-lg font-bold text-yellow-400">{isLiveMixMode ? "LIVE" : "SYNC"}</div>
                <div className="text-xs text-gray-400">Music Mode</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* World Zones */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center">
                  <Map className="h-5 w-5 mr-2" />
                  World Zones (Themed Biomes)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {worldZones.map((zone, index) => (
                    <motion.div
                      key={zone.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`p-4 bg-slate-700/50 rounded-lg border ${getZoneColor(zone.vibe)} hover:border-opacity-60 transition-smooth`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <motion.div
                            animate={zone.isActive ? { scale: [1, 1.2, 1] } : {}}
                            transition={{
                              duration: 2,
                              repeat: zone.isActive ? Number.POSITIVE_INFINITY : 0,
                            }}
                          >
                            <Globe className={`h-5 w-5 ${getZoneColor(zone.vibe).split(" ")[1]}`} />
                          </motion.div>
                          <div>
                            <h3 className="font-medium text-white">{zone.name}</h3>
                            <div className="text-xs text-gray-400">{zone.vibe}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className={zone.isActive ? "text-green-400" : "text-gray-400"}>
                          {zone.isActive ? "ACTIVE" : "DORMANT"}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <div className="text-gray-400">Audio Theme</div>
                          <div className={`font-bold ${getZoneColor(zone.vibe).split(" ")[1]}`}>{zone.audioTheme}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Players</div>
                          <div className={`font-bold ${getZoneColor(zone.vibe).split(" ")[1]}`}>{zone.playerCount}</div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="text-xs text-gray-400">{zone.coreFeature}</div>
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>Emotional Resonance</span>
                          <span>{(zone.emotionalResonance * 100).toFixed(0)}%</span>
                        </div>
                        <Progress value={zone.emotionalResonance * 100} className="h-2" />
                      </div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          size="sm"
                          onClick={() => activateZone(zone.id)}
                          className={`w-full ${
                            zone.isActive ? "bg-green-600 hover:bg-green-700" : "bg-slate-600 hover:bg-slate-700"
                          } transition-smooth`}
                        >
                          {zone.isActive ? <Pause className="h-3 w-3 mr-2" /> : <Play className="h-3 w-3 mr-2" />}
                          {zone.isActive ? "Deactivate" : "Activate"} Zone
                        </Button>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Walker Roles & Controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-6"
        >
          {/* Walker Roles */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Walker Roles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {walkerRoles.map((role, index) => (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-3 bg-slate-700/50 rounded-lg border cursor-pointer hover:border-opacity-60 transition-smooth ${
                      role.isSelected ? "border-purple-500/50" : "border-slate-600"
                    }`}
                    onClick={() => selectRole(role.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{role.icon}</span>
                        <span className="font-medium text-white text-sm">{role.name}</span>
                      </div>
                      {role.isSelected && (
                        <Badge variant="outline" className="text-purple-400">
                          SELECTED
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mb-2">{role.description}</div>
                    <div className="flex flex-wrap gap-1">
                      {role.abilities.slice(0, 2).map((ability) => (
                        <Badge key={ability} variant="outline" className="text-xs">
                          {ability}
                        </Badge>
                      ))}
                      {role.abilities.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{role.abilities.length - 2}
                        </Badge>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Community Controls */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center">
                <Network className="h-5 w-5 mr-2" />
                Community Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Community Mood</span>
                  <span className="text-cyan-400">{communityMood[0]}%</span>
                </div>
                <Slider value={communityMood} onValueChange={setCommunityMood} max={100} step={1} className="w-full" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Music Sync</span>
                  <span className="text-yellow-400">{musicSync[0]}%</span>
                </div>
                <Slider value={musicSync} onValueChange={setMusicSync} max={100} step={1} className="w-full" />
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => setIsLiveMixMode(!isLiveMixMode)}
                  className={`w-full ${
                    isLiveMixMode ? "bg-yellow-600 hover:bg-yellow-700" : "bg-slate-600 hover:bg-slate-700"
                  } transition-smooth`}
                >
                  <Music className="h-4 w-4 mr-2" />
                  {isLiveMixMode ? "Exit Live Mix" : "Enter Live Mix Mode"}
                </Button>
              </motion.div>
            </CardContent>
          </Card>

          {/* Memory Shards */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center">
                <Sparkles className="h-5 w-5 mr-2" />
                24D Memory Shards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {memoryShards.map((shard, index) => (
                  <motion.div
                    key={shard.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-3 bg-slate-700/50 rounded-lg border border-slate-600"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: shard.seedColor }}></div>
                        <span className="font-medium text-white text-sm">{shard.emotion}</span>
                      </div>
                      <Badge variant="outline" className={shard.shared ? "text-green-400" : "text-gray-400"}>
                        {shard.shared ? "SHARED" : "PRIVATE"}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-400 mb-2">
                      {shard.track} • {shard.location} • {shard.memoryType}
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Resonance</span>
                        <span>{(shard.resonanceLevel * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={shard.resonanceLevel * 100} className="h-1" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Global Pulse Control */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Global Walker Pulse
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={triggerGlobalPulse}
                  disabled={globalPulseActive}
                  className="bg-emerald-600 hover:bg-emerald-700 transition-smooth"
                >
                  <Star className="h-4 w-4 mr-2" />
                  {globalPulseActive ? "Global Pulse Active..." : "Trigger Global Pulse"}
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="border-blue-500 text-blue-500 hover:bg-blue-500/10 transition-smooth bg-transparent"
                >
                  <Network className="h-4 w-4 mr-2" />
                  Sync All Zones
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="border-purple-500 text-purple-500 hover:bg-purple-500/10 transition-smooth bg-transparent"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Community Broadcast
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 transition-smooth bg-transparent"
                >
                  <Music className="h-4 w-4 mr-2" />
                  Harmonic Alignment
                </Button>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Global Pulse Visualization */}
      <AnimatePresence>
        {globalPulseActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-gradient-to-br from-emerald-900/20 via-cyan-900/20 to-purple-900/20 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.3, 1] }}
              transition={{ duration: 8, ease: "easeInOut" }}
              className="relative"
            >
              <div className="w-96 h-96 border-4 border-emerald-400/50 rounded-full flex items-center justify-center">
                <div className="w-80 h-80 border-2 border-cyan-400/50 rounded-full flex items-center justify-center">
                  <div className="w-64 h-64 border-2 border-purple-400/50 rounded-full flex items-center justify-center">
                    <div className="w-48 h-48 bg-gradient-to-br from-emerald-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                      <Globe className="h-24 w-24 text-white animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-3xl font-bold text-white mb-2">Global Walker Pulse</div>
                <div className="text-lg text-gray-300">Synchronizing All Zones...</div>
                <div className="text-sm text-gray-400 mt-2">You Never Walk Alone</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* System Architecture */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center">
              <Code className="h-5 w-5 mr-2" />
              Walker World Development Toolkit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">🎼 Core Systems</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Music AI Driver: MetaSounds + Aura AI</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>World Evolver: World Partition + PCG</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Player Resonance: Gameplay Tags + EQS</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Memory Shards: Data Assets + JSON</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">🌍 Features</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>Music drives emotion state + transitions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Terrain & flora change dynamically</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span>Community mood affects zones</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>Procedural structures from emotion</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
              <h3 className="text-emerald-400 font-semibold mb-2">🖤 Walker World Vision</h3>
              <div className="text-sm text-gray-300">
                <p className="mb-2">
                  An AI-augmented, emotionally intelligent virtual world powered by music, mystique, and community —
                  like a hybrid of Ready Player One, Journey, and Alan Walker's cinematic universe.
                </p>
                <p className="italic text-cyan-400">"You never walk alone." 🌍</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
