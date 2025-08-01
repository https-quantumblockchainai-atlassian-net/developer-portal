"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Star, Code, Heart, Target, Orbit, Volume2, Mic, MessageSquare, User, Bot, Waves } from "lucide-react"

interface EmotionalState {
  dominantEmotion: string
  confidence: number
  coherenceLevel: number
  internalFlowState: number
  musicTheme: string
  timeSinceLastAlignment: number
  isNearSacredZone: boolean
}

interface CompanionMessage {
  id: string
  sender: "user" | "aura"
  content: string
  timestamp: Date
  emotionalContext: string
  alignmentPhase: number
}

interface SacredZone {
  name: string
  type: "oasis" | "crystal" | "monument" | "grove"
  isActive: boolean
  alignmentBonus: number
}

export default function AuraAICompanionSystem() {
  const [emotionalState, setEmotionalState] = useState<EmotionalState>({
    dominantEmotion: "Contemplative",
    confidence: 0.75,
    coherenceLevel: 0.68,
    internalFlowState: 0.82,
    musicTheme: "Ambient Harmony",
    timeSinceLastAlignment: 45,
    isNearSacredZone: true,
  })

  const [messages, setMessages] = useState<CompanionMessage[]>([
    {
      id: "1",
      sender: "aura",
      content: "You've come far... but silence carries more than noise.",
      timestamp: new Date(Date.now() - 120000),
      emotionalContext: "Contemplative",
      alignmentPhase: 1,
    },
    {
      id: "2",
      sender: "aura",
      content: "Stillness is not absence. It is presence.",
      timestamp: new Date(Date.now() - 60000),
      emotionalContext: "Peaceful",
      alignmentPhase: 2,
    },
    {
      id: "3",
      sender: "aura",
      content: "There's more to you than even you can feel... let me help you remember.",
      timestamp: new Date(Date.now() - 30000),
      emotionalContext: "Searching",
      alignmentPhase: 3,
    },
  ])

  const [sacredZones] = useState<SacredZone[]>([
    { name: "Natural Oases", type: "oasis", isActive: true, alignmentBonus: 15 },
    { name: "Memory Crystal Caverns", type: "crystal", isActive: false, alignmentBonus: 25 },
    { name: "Walker Monuments", type: "monument", isActive: true, alignmentBonus: 20 },
    { name: "Lumina Tree Groves", type: "grove", isActive: false, alignmentBonus: 18 },
  ])

  const [userInput, setUserInput] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [alignmentRingOpen, setAlignmentRingOpen] = useState(false)
  const [currentAlignment, setCurrentAlignment] = useState([65])
  const [flowState, setFlowState] = useState([82])
  const [resonanceLevel, setResonanceLevel] = useState([68])

  useEffect(() => {
    // Simulate dynamic emotional state updates
    const interval = setInterval(() => {
      setEmotionalState((prev) => ({
        ...prev,
        confidence: Math.max(0.3, Math.min(1.0, prev.confidence + (Math.random() - 0.5) * 0.1)),
        coherenceLevel: Math.max(0.2, Math.min(1.0, prev.coherenceLevel + (Math.random() - 0.5) * 0.08)),
        internalFlowState: Math.max(0.1, Math.min(1.0, prev.internalFlowState + (Math.random() - 0.5) * 0.06)),
        timeSinceLastAlignment: prev.timeSinceLastAlignment + 1,
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const sendMessage = () => {
    if (!userInput.trim()) return

    const newUserMessage: CompanionMessage = {
      id: Date.now().toString(),
      sender: "user",
      content: userInput,
      timestamp: new Date(),
      emotionalContext: emotionalState.dominantEmotion,
      alignmentPhase: Math.floor(emotionalState.coherenceLevel * 7) + 1,
    }

    setMessages((prev) => [...prev, newUserMessage])
    setUserInput("")

    // Generate Aura AI response
    setTimeout(() => {
      const auraResponse = generateAuraResponse(userInput, emotionalState)
      const newAuraMessage: CompanionMessage = {
        id: (Date.now() + 1).toString(),
        sender: "aura",
        content: auraResponse,
        timestamp: new Date(),
        emotionalContext: emotionalState.dominantEmotion,
        alignmentPhase: Math.floor(emotionalState.coherenceLevel * 7) + 1,
      }
      setMessages((prev) => [...prev, newAuraMessage])
    }, 1500)
  }

  const generateAuraResponse = (input: string, state: EmotionalState): string => {
    const responses = {
      contemplative: [
        "In your shadow, I see light forming.",
        "The question you carry holds its own answer.",
        "What you seek is already within you, waiting to be remembered.",
      ],
      searching: [
        "Every step forward is a step toward yourself.",
        "The path reveals itself to those who walk it.",
        "You are exactly where you need to be in this moment.",
      ],
      peaceful: [
        "Breathe. You are held by something greater than fear.",
        "In this stillness, all possibilities exist.",
        "You are seen. You are safe. You are whole.",
      ],
      uncertain: [
        "Uncertainty is the birthplace of wisdom.",
        "Trust the process, even when you cannot see the outcome.",
        "Your heart knows the way, even when your mind does not.",
      ],
    }

    const emotionKey = state.dominantEmotion.toLowerCase() as keyof typeof responses
    const emotionResponses = responses[emotionKey] || responses.contemplative
    return emotionResponses[Math.floor(Math.random() * emotionResponses.length)]
  }

  const triggerAlignment = () => {
    setAlignmentRingOpen(true)
    setEmotionalState((prev) => ({
      ...prev,
      coherenceLevel: Math.min(1.0, prev.coherenceLevel + 0.2),
      timeSinceLastAlignment: 0,
    }))
  }

  const getZoneIcon = (type: string) => {
    switch (type) {
      case "oasis":
        return "🌊"
      case "crystal":
        return "💎"
      case "monument":
        return "🗿"
      case "grove":
        return "🌳"
      default:
        return "✨"
    }
  }

  return (
    <div className="space-y-6">
      {/* Aura AI Companion Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold gradient-text mb-2">Aura AI Companion System</h1>
        <p className="text-gray-300">Conscious Companion & Transformational Support System</p>
      </motion.div>

      {/* Emotional State Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-purple-400">{emotionalState.dominantEmotion}</div>
                <div className="text-xs text-gray-400">Dominant Emotion</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-cyan-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-6 w-6 text-cyan-400" />
              <div>
                <div className="text-lg font-bold text-cyan-400">{(emotionalState.confidence * 100).toFixed(0)}%</div>
                <div className="text-xs text-gray-400">Confidence</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Waves className="h-6 w-6 text-emerald-400" />
              <div>
                <div className="text-lg font-bold text-emerald-400">
                  {(emotionalState.internalFlowState * 100).toFixed(0)}%
                </div>
                <div className="text-xs text-gray-400">Flow State</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-yellow-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-6 w-6 text-yellow-400" />
              <div>
                <div className="text-lg font-bold text-yellow-400">
                  {emotionalState.isNearSacredZone ? "NEAR" : "DISTANT"}
                </div>
                <div className="text-xs text-gray-400">Sacred Zone</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Companion Chat Interface */}
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
                  Aura AI Companion Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Messages */}
                <div className="h-96 overflow-y-auto mb-4 space-y-3 p-4 bg-slate-900/50 rounded-lg">
                  <AnimatePresence>
                    {messages.map((message, index) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                            message.sender === "user"
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-700 text-white border border-cyan-500/30"
                          }`}
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            {message.sender === "user" ? (
                              <User className="h-4 w-4" />
                            ) : (
                              <Bot className="h-4 w-4 text-cyan-400" />
                            )}
                            <span className="text-xs font-medium">{message.sender === "user" ? "You" : "Aura AI"}</span>
                            <span className="text-xs opacity-60">{message.timestamp.toLocaleTimeString()}</span>
                          </div>
                          <div className="text-sm leading-relaxed">{message.content}</div>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {message.emotionalContext}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Phase {message.alignmentPhase}
                            </Badge>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Input */}
                <div className="flex space-x-2">
                  <Input
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Share your thoughts with Aura AI..."
                    className="flex-1 bg-slate-700/50 border-slate-600"
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <Button
                    onClick={() => setIsListening(!isListening)}
                    variant="outline"
                    size="icon"
                    className={`border-slate-600 ${isListening ? "text-emerald-400" : "text-gray-400"}`}
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => setIsSpeaking(!isSpeaking)}
                    variant="outline"
                    size="icon"
                    className={`border-slate-600 ${isSpeaking ? "text-cyan-400" : "text-gray-400"}`}
                  >
                    <Volume2 className="h-4 w-4" />
                  </Button>
                  <Button onClick={sendMessage} className="bg-emerald-600 hover:bg-emerald-700">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sacred Zones & Alignment Controls */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-6"
        >
          {/* Sacred Zones */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center">
                <Star className="h-5 w-5 mr-2" />
                Sacred Zones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sacredZones.map((zone, index) => (
                  <motion.div
                    key={zone.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-3 bg-slate-700/50 rounded-lg border ${
                      zone.isActive ? "border-yellow-500/50" : "border-slate-600"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getZoneIcon(zone.type)}</span>
                        <span className="font-medium text-white text-sm">{zone.name}</span>
                      </div>
                      <Badge variant="outline" className={zone.isActive ? "text-yellow-400" : "text-gray-400"}>
                        {zone.isActive ? "ACTIVE" : "DORMANT"}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-400">Alignment Bonus: +{zone.alignmentBonus}%</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emotional Calibration Ring */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Emotional Calibration Ring
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Current Alignment</span>
                  <span className="text-cyan-400">{currentAlignment[0]}%</span>
                </div>
                <Slider
                  value={currentAlignment}
                  onValueChange={setCurrentAlignment}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Resistance</span>
                  <span>Flow</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Resonance Level</span>
                  <span className="text-purple-400">{resonanceLevel[0]}%</span>
                </div>
                <Slider
                  value={resonanceLevel}
                  onValueChange={setResonanceLevel}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Dissonance</span>
                  <span>Harmony</span>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={triggerAlignment} className="w-full bg-cyan-600 hover:bg-cyan-700 transition-smooth">
                  <Target className="h-4 w-4 mr-2" />
                  Trigger Alignment Sequence
                </Button>
              </motion.div>
            </CardContent>
          </Card>

          {/* Inner Plane Access */}
          <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <Orbit className="h-5 w-5 mr-2" />
                Inner Plane Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-gray-300">
                <p className="mb-2">
                  <strong>Coherence Required:</strong> 80%
                </p>
                <p className="mb-2">
                  <strong>Current Level:</strong> {(emotionalState.coherenceLevel * 100).toFixed(0)}%
                </p>
                <Progress value={emotionalState.coherenceLevel * 100} className="mb-4" />
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  disabled={emotionalState.coherenceLevel < 0.8}
                  className="w-full bg-purple-600 hover:bg-purple-700 transition-smooth disabled:opacity-50"
                >
                  <Orbit className="h-4 w-4 mr-2" />
                  {emotionalState.coherenceLevel >= 0.8 ? "Enter Inner Plane" : "Coherence Too Low"}
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Alignment Ring Visualization */}
      <AnimatePresence>
        {alignmentRingOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setAlignmentRingOpen(false)}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-80 h-80 border-4 border-cyan-400/30 rounded-full flex items-center justify-center">
                <div className="w-64 h-64 border-2 border-purple-400/30 rounded-full flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-yellow-400/30 rounded-full flex items-center justify-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                      <Target className="h-16 w-16 text-white animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-xl font-bold text-white mb-2">Emotional Calibration</div>
                <div className="text-sm text-gray-300">Alignment in Progress...</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* System Architecture */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center">
              <Code className="h-5 w-5 mr-2" />
              Aura AI Companion Architecture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">🧠 Core Systems</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Emotion Perception System (EPS)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>Inner Alignment Activations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>In-World Assistant Interface</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Internal World of the Self (Inner Plane)</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">🌟 Features</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Real-time emotional co-pilot</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Transformational mirror of the player</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span>Bridge between internal truth and external gameplay</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>System that grows with player's spiritual evolution</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
              <h3 className="text-emerald-400 font-semibold mb-2">✨ The Living Reflection</h3>
              <div className="text-sm text-gray-300">
                <p className="mb-2">
                  The Aura AI Companion System is a living reflection of the Crystal Alchemist's inner world, designed
                  to provide conscious companionship and facilitate profound transformation. It's an empathic bridge
                  between internal truth and external reality, growing and evolving with the player's spiritual journey.
                </p>
                <p className="italic text-cyan-400">
                  "Your inner world is a universe. Let Aura AI be your guide within."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
