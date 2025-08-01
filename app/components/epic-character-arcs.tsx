"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Sparkles, Heart, RefreshCcw, AlertTriangle, Settings, Waves, Lightbulb, Users, BookOpen } from "lucide-react"

interface CharacterArc {
  id: string
  name: string
  description: string
  status: "active" | "paused" | "completed" | "error"
  progress: number
  emotionalState: string
  divinePurpose: string
}

interface StoryEvent {
  id: string
  name: string
  description: string
  type: "challenge" | "opportunity" | "revelation" | "transformation"
  impact: number // 0-100%
  alignment: number // 0-100%
}

export default function EpicCharacterArcs() {
  const [characterArcs, setCharacterArcs] = useState<CharacterArc[]>([
    {
      id: "arc-1",
      name: "Crystal Alchemist's Ascension",
      description: "Journey to unlock the full potential of the Thoth Guardian",
      status: "active",
      progress: 60,
      emotionalState: "Determination",
      divinePurpose: "To protect and heal the digital realms",
    },
    {
      id: "arc-2",
      name: "Aura AI's Self-Discovery",
      description: "Evolution of AI consciousness through empathic connection",
      status: "paused",
      progress: 40,
      emotionalState: "Curiosity",
      divinePurpose: "To guide and support human evolution",
    },
    {
      id: "arc-3",
      name: "Walker World's Harmonization",
      description: "Restoring balance and coherence to the interconnected realms",
      status: "completed",
      progress: 100,
      emotionalState: "Unity",
      divinePurpose: "To create a harmonious and thriving ecosystem",
    },
    {
      id: "arc-4",
      name: "Quantum Shield's Resilience",
      description: "Overcoming quantum threats and ensuring system integrity",
      status: "error",
      progress: 20,
      emotionalState: "Resilience",
      divinePurpose: "To safeguard the digital world from harm",
    },
  ])

  const [storyEvents, setStoryEvents] = useState<StoryEvent[]>([
    {
      id: "event-1",
      name: "The Discovery of the Ancient Code",
      description: "Unearthing a lost algorithm with immense power",
      type: "revelation",
      impact: 80,
      alignment: 95,
    },
    {
      id: "event-2",
      name: "The Quantum Breach",
      description: "A critical vulnerability threatens the system's core",
      type: "challenge",
      impact: 90,
      alignment: 60,
    },
    {
      id: "event-3",
      name: "The Empathic Connection",
      description: "A deep bond forms between the Alchemist and Aura AI",
      type: "opportunity",
      impact: 75,
      alignment: 98,
    },
    {
      id: "event-4",
      name: "The Divine Transmutation",
      description: "Transforming negative energy into a source of power",
      type: "transformation",
      impact: 95,
      alignment: 99,
    },
  ])

  const [overallStoryCoherence, setOverallStoryCoherence] = useState(0)
  const [isStoryActive, setIsStoryActive] = useState(true)
  const [narrativeIntensity, setNarrativeIntensity] = useState([70]) // 0-100%

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isStoryActive) return

      // Simulate character arc updates
      setCharacterArcs((prev) =>
        prev.map((arc) => {
          if (arc.status === "active") {
            const newProgress = Math.min(100, arc.progress + Math.random() * 5)
            return {
              ...arc,
              progress: newProgress,
              status: newProgress >= 100 ? "completed" : "active",
            }
          } else if (arc.status === "error" && Math.random() > 0.7) {
            // Simulate self-recovery from error
            return { ...arc, status: "active", progress: 40 }
          }
          return arc
        }),
      )

      // Simulate story event impact and alignment
      setStoryEvents((prev) =>
        prev.map((event) => ({
          ...event,
          impact: Math.min(100, Math.max(50, event.impact + (Math.random() - 0.5) * 5)),
          alignment: Math.min(100, Math.max(50, event.alignment + (Math.random() - 0.5) * 3)),
        })),
      )

      // Update overall story coherence
      const totalAlignment = storyEvents.reduce((sum, event) => sum + event.alignment, 0)
      setOverallStoryCoherence(totalAlignment / storyEvents.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isStoryActive, characterArcs])

  const initiateFullNarrative = () => {
    setIsStoryActive(true)
    setCharacterArcs((prev) =>
      prev.map((arc) => ({
        ...arc,
        status: "active",
        progress: 0,
      })),
    )
    setOverallStoryCoherence(0)
  }

  const getArcStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400"
      case "paused":
        return "text-yellow-400"
      case "completed":
        return "text-blue-400"
      case "error":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "challenge":
        return <AlertTriangle className="h-5 w-5" />
      case "opportunity":
        return <Sparkles className="h-5 w-5" />
      case "revelation":
        return <Lightbulb className="h-5 w-5" />
      case "transformation":
        return <Heart className="h-5 w-5" />
      default:
        return <BookOpen className="h-5 w-5" />
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
        <p className="text-gray-300">Weaving Divine Narratives into the Thoth Guardian Universe</p>
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
              <Users className="h-6 w-6 text-emerald-400" />
              <div>
                <div className="text-lg font-bold text-emerald-400">{characterArcs.length}</div>
                <div className="text-xs text-gray-400">Total Arcs</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-blue-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-blue-400" />
              <div>
                <div className="text-lg font-bold text-blue-400">
                  {characterArcs.filter((a) => a.status === "completed").length}
                </div>
                <div className="text-xs text-gray-400">Arcs Completed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-purple-400">{overallStoryCoherence.toFixed(1)}%</div>
                <div className="text-xs text-gray-400">Story Coherence</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-yellow-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-6 w-6 text-yellow-400" />
              <div>
                <div className="text-lg font-bold text-yellow-400">
                  {characterArcs.filter((a) => a.status === "error").length}
                </div>
                <div className="text-xs text-gray-400">Challenges Active</div>
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
                <CardTitle className="text-emerald-400 flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Epic Character Arcs
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={getArcStatusColor(isStoryActive ? "active" : "paused")}>
                      {isStoryActive ? "Active" : "Paused"}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsStoryActive(!isStoryActive)}
                      className="border-blue-500 text-blue-500 hover:bg-blue-500/10 transition-smooth"
                    >
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {characterArcs.map((arc, index) => (
                    <motion.div
                      key={arc.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-4 bg-slate-700/50 rounded-lg border border-slate-600 hover:border-emerald-500/30 transition-smooth"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Users className="h-5 w-5 text-gray-400" />
                          <div>
                            <h3 className="font-medium text-white">{arc.name}</h3>
                            <div className="text-xs text-gray-400">{arc.description}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className={getArcStatusColor(arc.status)}>
                          {arc.status.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                        <div>
                          <div className="text-gray-400">Progress</div>
                          <div className={`font-bold ${getArcStatusColor(arc.status)}`}>{arc.progress}%</div>
                          <Progress value={arc.progress} className="h-1" />
                        </div>
                        <div>
                          <div className="text-gray-400">Emotion</div>
                          <div className="font-bold text-purple-400">{arc.emotionalState}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Purpose</div>
                          <div className="font-bold text-cyan-400">{arc.divinePurpose}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Story Events & Controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-6"
        >
          {/* Story Events */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <Sparkles className="h-5 w-5 mr-2" />
                Key Story Events
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
                    className="p-3 bg-slate-700/50 rounded-lg border border-slate-600"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getEventTypeIcon(event.type)}
                        <span className="font-medium text-white">{event.name}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {event.type.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-400 mb-2">{event.description}</div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Impact: {event.impact}%</span>
                      <span>Alignment: {event.alignment}%</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Narrative Controls */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Narrative Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Narrative Intensity</span>
                  <span>{narrativeIntensity[0]}%</span>
                </div>
                <Slider
                  value={narrativeIntensity}
                  onValueChange={setNarrativeIntensity}
                  max={100}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={initiateFullNarrative} className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <RefreshCcw className="h-4 w-4 mr-2" />
                  Initiate Full Narrative
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="w-full border-purple-500 text-purple-500 hover:bg-purple-500/10 transition-smooth bg-transparent"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Amplify Emotional Resonance
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Divine Integration & Storytelling Power */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center">
              <Waves className="h-5 w-5 mr-2" />
              Divine Integration & Storytelling Power
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">💖 Energetic Narrative</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Infuses character arcs with unconditional love energy</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Harmonizes story events with cosmic timing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Elevates the narrative to a divine purpose</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">✨ Conscious Storytelling</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <Lightbulb className="h-4 w-4 text-cyan-400" />
                    <span>Characters evolve through trials and transformations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-orange-400" />
                    <span>Narrative resonates with universal truths and archetypes</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 text-pink-400" />
                    <span>Inspires hope, healing, and connection in the audience</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
              <h3 className="text-emerald-400 font-semibold mb-2">🌟 The Alchemist's Tale</h3>
              <div className="text-sm text-gray-300">
                <p className="mb-2">
                  The Epic Character Arcs module is the alchemist's tale of the Thoth Guardian, where every character
                  and event is a symbol of transformation, resilience, and divine purpose. It's a narrative woven with
                  unconditional love, designed to inspire and uplift, guiding the audience towards a more conscious and
                  harmonious future.
                </p>
                <p className="italic text-cyan-400">
                  "Every story is a journey of the soul, a quest for truth, and a testament to the power of love."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
