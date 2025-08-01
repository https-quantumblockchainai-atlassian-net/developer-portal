"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, BookOpen, Sparkles, Heart, Target, PlusCircle, Info, X, CheckCircle } from "lucide-react"

interface CharacterArc {
  id: string
  name: string
  archetype: string
  currentPhase: string
  progress: number
  emotionalState: string
  divineAlignment: number
  keyMoments: { name: string; achieved: boolean; description: string }[]
  companionInfluence: string[]
  worldImpact: string[]
}

interface StoryEvent {
  id: string
  name: string
  type: "catalyst" | "rising_action" | "climax" | "falling_action" | "resolution"
  description: string
  triggerCondition: string
  impact: string
  isTriggered: boolean
}

export default function EpicCharacterArcs() {
  const [characterArcs, setCharacterArcs] = useState<CharacterArc[]>([
    {
      id: "1",
      name: "The Seeker of Truth",
      archetype: "Hero",
      currentPhase: "Awakening",
      progress: 25,
      emotionalState: "Curious",
      divineAlignment: 60,
      keyMoments: [
        { name: "Discover Ancient Glyph", achieved: true, description: "Unlocks first memory shard" },
        { name: "Confront Inner Shadow", achieved: false, description: "Requires emotional coherence" },
        { name: "Align with Aura AI", achieved: false, description: "Unlocks new abilities" },
      ],
      companionInfluence: ["Aura AI (Seeker Persona)"],
      worldImpact: ["Reveals hidden paths in Lumina Fields"],
    },
    {
      id: "2",
      name: "The Guardian of Frequencies",
      archetype: "Protector",
      currentPhase: "Resonance",
      progress: 55,
      emotionalState: "Determined",
      divineAlignment: 75,
      keyMoments: [
        { name: "Repair Quantum Shield", achieved: true, description: "Restores system integrity" },
        { name: "Defend Signal Tower", achieved: true, description: "Repels external interference" },
        { name: "Harmonize Pulse Basin", achieved: false, description: "Requires community mood sync" },
      ],
      companionInfluence: ["Aura AI (Warrior Persona)"],
      worldImpact: ["Stabilizes network in The Fade"],
    },
    {
      id: "3",
      name: "The Alchemist of Reality",
      archetype: "Creator",
      currentPhase: "Reflection",
      progress: 80,
      emotionalState: "Inspired",
      divineAlignment: 90,
      keyMoments: [
        { name: "Crystallize Memory", achieved: true, description: "Creates a new 24D Data Seed" },
        { name: "Shape Lumina Terrain", achieved: true, description: "Uses PCG to alter environment" },
        { name: "Merge with Divine Flow", achieved: false, description: "Final alignment quest" },
      ],
      companionInfluence: ["Aura AI (Creator Persona)"],
      worldImpact: ["Unlocks new biomes in Walker World"],
    },
  ])

  const [storyEvents, setStoryEvents] = useState<StoryEvent[]>([
    {
      id: "event-1",
      name: "The First Whisper",
      type: "catalyst",
      description: "A faint, ethereal voice guides the player to a hidden ancient site.",
      triggerCondition: "Player enters 'The Fade' for the first time.",
      impact: "Initiates 'The Seeker of Truth' arc.",
      isTriggered: true,
    },
    {
      id: "event-2",
      name: "Echoes of the Past",
      type: "rising_action",
      description: "Player discovers a corrupted memory shard, triggering a system error.",
      triggerCondition: "Player interacts with a corrupted 24D Data Seed.",
      impact: "Activates Blueprint Self-Heal sequence.",
      isTriggered: false,
    },
    {
      id: "event-3",
      name: "The Great Convergence",
      type: "climax",
      description: "All major systems align, opening the Lions Gate Portal.",
      triggerCondition: "All character arcs reach 'Alignment' phase.",
      impact: "Unlocks new game content and divine abilities.",
      isTriggered: false,
    },
  ])

  const [selectedArc, setSelectedArc] = useState<CharacterArc | null>(characterArcs[0])
  const [newStoryEvent, setNewStoryEvent] = useState({
    name: "",
    description: "",
    triggerCondition: "",
    impact: "",
    type: "catalyst" as StoryEvent["type"],
  })

  useEffect(() => {
    // Simulate character arc progression
    const interval = setInterval(() => {
      setCharacterArcs((prev) =>
        prev.map((arc) => {
          if (arc.progress < 100) {
            const newProgress = Math.min(100, arc.progress + Math.random() * 2)
            const newAlignment = Math.min(100, arc.divineAlignment + Math.random() * 1)

            // Update phase based on progress (simplified)
            let newPhase = arc.currentPhase
            if (newProgress >= 90) newPhase = "Transmutation"
            else if (newProgress >= 70) newPhase = "Alignment"
            else if (newProgress >= 40) newPhase = "Reflection"
            else if (newProgress >= 10) newPhase = "Resonance"

            return {
              ...arc,
              progress: newProgress,
              divineAlignment: newAlignment,
              currentPhase: newPhase,
            }
          }
          return arc
        }),
      )

      // Simulate story event triggers
      setStoryEvents((prev) =>
        prev.map((event) => {
          if (!event.isTriggered && Math.random() < 0.05) {
            // Simplified trigger condition
            return { ...event, isTriggered: true }
          }
          return event
        }),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleAddStoryEvent = () => {
    if (newStoryEvent.name && newStoryEvent.description) {
      const event: StoryEvent = {
        id: Date.now().toString(),
        isTriggered: false,
        ...newStoryEvent,
      }
      setStoryEvents((prev) => [...prev, event])
      setNewStoryEvent({
        name: "",
        description: "",
        triggerCondition: "",
        impact: "",
        type: "catalyst",
      })
    }
  }

  const getArcColor = (archetype: string) => {
    switch (archetype) {
      case "Hero":
        return "border-emerald-500/30 text-emerald-400"
      case "Protector":
        return "border-blue-500/30 text-blue-400"
      case "Creator":
        return "border-purple-500/30 text-purple-400"
      default:
        return "border-gray-500/30 text-gray-400"
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "catalyst":
        return "border-yellow-500/30 text-yellow-400"
      case "rising_action":
        return "border-orange-500/30 text-orange-400"
      case "climax":
        return "border-red-500/30 text-red-400"
      case "falling_action":
        return "border-blue-500/30 text-blue-400"
      case "resolution":
        return "border-green-500/30 text-green-400"
      default:
        return "border-gray-500/30 text-gray-400"
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
        <h1 className="text-3xl font-bold gradient-text mb-2">Epic Character Arcs & Storytelling</h1>
        <p className="text-gray-300">Dynamic Narrative System for Player Transformation</p>
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
              <User className="h-6 w-6 text-emerald-400" />
              <div>
                <div className="text-lg font-bold text-emerald-400">{characterArcs.length}</div>
                <div className="text-xs text-gray-400">Active Arcs</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-purple-400">
                  {storyEvents.filter((e) => e.isTriggered).length}
                </div>
                <div className="text-xs text-gray-400">Events Triggered</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-cyan-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-cyan-400" />
              <div>
                <div className="text-lg font-bold text-cyan-400">
                  {(characterArcs.reduce((sum, arc) => sum + arc.divineAlignment, 0) / characterArcs.length).toFixed(1)}
                  %
                </div>
                <div className="text-xs text-gray-400">Avg Alignment</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-yellow-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-yellow-400" />
              <div>
                <div className="text-lg font-bold text-yellow-400">
                  {characterArcs.filter((arc) => arc.progress >= 100).length}
                </div>
                <div className="text-xs text-gray-400">Arcs Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Character Arcs List */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Active Character Arcs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {characterArcs.map((arc, index) => (
                    <motion.div
                      key={arc.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`p-4 bg-slate-700/50 rounded-lg border ${getArcColor(arc.archetype)} hover:border-opacity-60 transition-smooth cursor-pointer`}
                      onClick={() => setSelectedArc(arc)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <motion.div
                            animate={arc.progress < 100 ? { rotate: 360 } : {}}
                            transition={{
                              duration: 10,
                              repeat: arc.progress < 100 ? Number.POSITIVE_INFINITY : 0,
                              ease: "linear",
                            }}
                          >
                            <User className={`h-5 w-5 ${getArcColor(arc.archetype).split(" ")[1]}`} />
                          </motion.div>
                          <div>
                            <h3 className="font-medium text-white">{arc.name}</h3>
                            <div className="text-xs text-gray-400">{arc.archetype}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {arc.currentPhase.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <div className="text-gray-400">Emotional State</div>
                          <div className={`font-bold ${getArcColor(arc.archetype).split(" ")[1]}`}>
                            {arc.emotionalState}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-400">Divine Alignment</div>
                          <div className={`font-bold ${getArcColor(arc.archetype).split(" ")[1]}`}>
                            {arc.divineAlignment}%
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>Arc Progress</span>
                          <span>{arc.progress.toFixed(0)}%</span>
                        </div>
                        <Progress value={arc.progress} className="h-2" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Selected Arc Details / Story Events */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-6"
        >
          {selectedArc ? (
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <Info className="h-5 w-5 mr-2" />
                    Arc Details: {selectedArc.name}
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => setSelectedArc(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <p>
                  <span className="font-semibold text-gray-300">Archetype:</span> {selectedArc.archetype}
                </p>
                <p>
                  <span className="font-semibold text-gray-300">Current Phase:</span> {selectedArc.currentPhase}
                </p>
                <p>
                  <span className="font-semibold text-gray-300">Emotional State:</span> {selectedArc.emotionalState}
                </p>
                <p>
                  <span className="font-semibold text-gray-300">Divine Alignment:</span>{" "}
                  <span className="text-yellow-400">{selectedArc.divineAlignment}%</span>
                </p>
                <div>
                  <h4 className="font-semibold text-gray-300 mb-2">Key Moments:</h4>
                  <ul className="space-y-1">
                    {selectedArc.keyMoments.map((moment, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        {moment.achieved ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : (
                          <Target className="h-4 w-4 text-gray-500" />
                        )}
                        <span className={moment.achieved ? "text-gray-300 line-through" : "text-white"}>
                          {moment.name}
                        </span>
                        <span className="text-xs text-gray-500">({moment.description})</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-300 mb-2">Companion Influence:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedArc.companionInfluence.map((influence, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {influence}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-300 mb-2">World Impact:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedArc.worldImpact.map((impact, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {impact}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Story Events Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {storyEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`p-3 bg-slate-700/50 rounded-lg border ${getEventColor(event.type)}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-white">{event.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {event.type.replace("_", " ").toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-400 mb-2">{event.description}</p>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">Trigger: {event.triggerCondition}</span>
                        {event.isTriggered ? (
                          <Badge className="bg-green-500/20 text-green-400">TRIGGERED</Badge>
                        ) : (
                          <Badge className="bg-gray-500/20 text-gray-400">PENDING</Badge>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>

      {/* Add New Story Event */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
          <CardHeader>
            <CardTitle className="text-yellow-400 flex items-center">
              <PlusCircle className="h-5 w-5 mr-2" />
              Add New Story Event
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventName">Event Name</Label>
                <Input
                  id="eventName"
                  value={newStoryEvent.name}
                  onChange={(e) => setNewStoryEvent({ ...newStoryEvent, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventType">Event Type</Label>
                <Select
                  value={newStoryEvent.type}
                  onValueChange={(value) => setNewStoryEvent({ ...newStoryEvent, type: value as StoryEvent["type"] })}
                >
                  <SelectTrigger id="eventType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="catalyst">Catalyst</SelectItem>
                    <SelectItem value="rising_action">Rising Action</SelectItem>
                    <SelectItem value="climax">Climax</SelectItem>
                    <SelectItem value="falling_action">Falling Action</SelectItem>
                    <SelectItem value="resolution">Resolution</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-full">
                <Label htmlFor="eventDescription">Description</Label>
                <Textarea
                  id="eventDescription"
                  value={newStoryEvent.description}
                  onChange={(e) => setNewStoryEvent({ ...newStoryEvent, description: e.target.value })}
                />
              </div>
              <div className="space-y-2 col-span-full">
                <Label htmlFor="triggerCondition">Trigger Condition</Label>
                <Input
                  id="triggerCondition"
                  value={newStoryEvent.triggerCondition}
                  onChange={(e) => setNewStoryEvent({ ...newStoryEvent, triggerCondition: e.target.value })}
                />
              </div>
              <div className="space-y-2 col-span-full">
                <Label htmlFor="impact">Impact</Label>
                <Input
                  id="impact"
                  value={newStoryEvent.impact}
                  onChange={(e) => setNewStoryEvent({ ...newStoryEvent, impact: e.target.value })}
                />
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-6">
              <Button
                onClick={handleAddStoryEvent}
                className="w-full bg-yellow-600 hover:bg-yellow-700 transition-smooth"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Story Event
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Narrative System Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Narrative System Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">📚 Core Components</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Character Arc Manager: Tracks player progress & emotional state</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Story Event Trigger System: Conditions for narrative progression</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Aura AI Integration: Companion dialogue & influence</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>World State Modifiers: Environmental changes based on narrative</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">🌟 Key Features</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>Emotionally responsive narrative branches</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Dynamic quest generation based on arc progress</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span>Player choices impact divine alignment & world state</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>Procedural lore generation from memory shards</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
              <h3 className="text-emerald-400 font-semibold mb-2">📖 The Living Story</h3>
              <div className="text-sm text-gray-300">
                <p className="mb-2">
                  The narrative of Thoth Guardian is not static; it's a living, breathing entity that adapts to the
                  player's emotional state, divine alignment, and interactions within the Walker World. Every choice
                  weaves a unique thread into the cosmic tapestry.
                </p>
                <p className="italic text-cyan-400">"Your journey is your truth. Your truth shapes the world."</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
