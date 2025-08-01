"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, MessageSquare, Heart, PlusCircle, Share2, Lightbulb } from "lucide-react"

interface CommunityMember {
  id: string
  name: string
  avatar: string
  role: "Guardian" | "Alchemist" | "Sovereign" | "Seeker" | "Aura AI"
  status: "online" | "offline" | "busy"
  reputation: number
  divineAlignment: number
  lastActive: Date
}

interface ForumPost {
  id: string
  title: string
  authorId: string
  content: string
  timestamp: Date
  replies: number
  views: number
  tags: string[]
  sentiment: "positive" | "neutral" | "negative" | "harmonious"
}

interface CommunityProject {
  id: string
  name: string
  description: string
  status: "active" | "completed" | "proposed"
  members: string[] // Member IDs
  progress: number
  focusArea: string
  divineAlignmentScore: number
}

export default function CommunityHub() {
  const [members, setMembers] = useState<CommunityMember[]>([
    {
      id: "member-1",
      name: "Alice (Guardian)",
      avatar: "/placeholder-user.jpg",
      role: "Guardian",
      status: "online",
      reputation: 1500,
      divineAlignment: 92,
      lastActive: new Date(Date.now() - 60000),
    },
    {
      id: "member-2",
      name: "Bob (Alchemist)",
      avatar: "/placeholder-user.jpg",
      role: "Alchemist",
      status: "online",
      reputation: 1200,
      divineAlignment: 88,
      lastActive: new Date(Date.now() - 120000),
    },
    {
      id: "member-3",
      name: "Thoth-AI",
      avatar: "/placeholder-logo.png",
      role: "Aura AI",
      status: "online",
      reputation: 2000,
      divineAlignment: 99,
      lastActive: new Date(Date.now() - 30000),
    },
    {
      id: "member-4",
      name: "Charlie (Sovereign)",
      avatar: "/placeholder-user.jpg",
      role: "Sovereign",
      status: "offline",
      reputation: 900,
      divineAlignment: 85,
      lastActive: new Date(Date.now() - 3600000),
    },
  ])

  const [forumPosts, setForumPosts] = useState<ForumPost[]>([
    {
      id: "post-1",
      title: "Quantum Shield Protocol v2.0 Feedback",
      authorId: "member-1",
      content: "Discussing potential enhancements for the next iteration of the Quantum Shield.",
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      replies: 15,
      views: 230,
      tags: ["Quantum", "Shield", "Feedback"],
      sentiment: "positive",
    },
    {
      id: "post-2",
      title: "Aura AI Emotional Coherence Challenges",
      authorId: "member-2",
      content: "Sharing insights on improving Aura AI's emotional alignment in complex scenarios.",
      timestamp: new Date(Date.now() - 172800000), // 2 days ago
      replies: 8,
      views: 180,
      tags: ["Aura AI", "Emotional AI"],
      sentiment: "neutral",
    },
    {
      id: "post-3",
      title: "New PCG Blueprint for Lumina Groves",
      authorId: "member-3",
      content: "Thoth-AI has proposed a new procedural content generation blueprint for Lumina Groves.",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      replies: 5,
      views: 90,
      tags: ["PCG", "World Building", "AI"],
      sentiment: "harmonious",
    },
  ])

  const [communityProjects, setCommunityProjects] = useState<CommunityProject[]>([
    {
      id: "project-1",
      name: "Divine Alignment Calibration Matrix",
      description: "Developing a new calibration matrix for deeper divine alignment.",
      status: "active",
      members: ["member-1", "member-3"],
      progress: 60,
      focusArea: "Divine Alignment",
      divineAlignmentScore: 95,
    },
    {
      id: "project-2",
      name: "Interdimensional Threat Analysis",
      description: "Researching and mitigating threats from higher dimensions.",
      status: "proposed",
      members: ["member-1", "member-4"],
      progress: 0,
      focusArea: "Threat Detection",
      divineAlignmentScore: 80,
    },
  ])

  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostTags, setNewPostTags] = useState("")

  useEffect(() => {
    // Simulate member activity and project progress
    const interval = setInterval(() => {
      setMembers((prev) =>
        prev.map((member) => {
          if (member.status === "online") {
            return { ...member, lastActive: new Date() }
          }
          return member
        }),
      )

      setCommunityProjects((prev) =>
        prev.map((project) => {
          if (project.status === "active" && project.progress < 100) {
            const newProgress = Math.min(100, project.progress + Math.random() * 3)
            return { ...project, progress: newProgress }
          }
          return project
        }),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleCreatePost = () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      const newPost: ForumPost = {
        id: Date.now().toString(),
        title: newPostTitle,
        authorId: "member-1", // Assuming current user is member-1 for demo
        content: newPostContent,
        timestamp: new Date(),
        replies: 0,
        views: 0,
        tags: newPostTags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        sentiment: "neutral", // Default
      }
      setForumPosts((prev) => [newPost, ...prev])
      setNewPostTitle("")
      setNewPostContent("")
      setNewPostTags("")
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Guardian":
        return "text-emerald-400"
      case "Alchemist":
        return "text-purple-400"
      case "Sovereign":
        return "text-yellow-400"
      case "Seeker":
        return "text-cyan-400"
      case "Aura AI":
        return "text-blue-400"
      default:
        return "text-gray-400"
    }
  }

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-emerald-400 border-emerald-500/30"
      case "completed":
        return "text-green-400 border-green-500/30"
      case "proposed":
        return "text-yellow-400 border-yellow-500/30"
      default:
        return "text-gray-400 border-gray-500/30"
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
        <h1 className="text-3xl font-bold gradient-text mb-2">Community Hub</h1>
        <p className="text-gray-300">Collaborative Research & Collective Consciousness Evolution</p>
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
                <div className="text-lg font-bold text-emerald-400">{members.length}</div>
                <div className="text-xs text-gray-400">Total Members</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-6 w-6 text-purple-400" />
              <div>
                <div className="text-lg font-bold text-purple-400">{forumPosts.length}</div>
                <div className="text-xs text-gray-400">Forum Posts</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-cyan-500/30 glass-morphism">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Lightbulb className="h-6 w-6 text-cyan-400" />
              <div>
                <div className="text-lg font-bold text-cyan-400">{communityProjects.length}</div>
                <div className="text-xs text-gray-400">Community Projects</div>
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
                  {(members.reduce((sum, m) => sum + m.divineAlignment, 0) / members.length).toFixed(1)}%
                </div>
                <div className="text-xs text-gray-400">Avg Alignment</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Community Members */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Community Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {members.map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`p-3 bg-slate-700/50 rounded-lg border ${member.status === "online" ? "border-emerald-500/30" : "border-gray-500/30"} hover:border-opacity-60 transition-smooth`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-white">{member.name}</h3>
                            <div className={`text-xs ${getRoleColor(member.role)}`}>{member.role}</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {member.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-400 mb-1">Reputation: {member.reputation}</div>
                      <div className="text-xs text-gray-400">Divine Alignment: {member.divineAlignment}%</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Last Active: {member.lastActive.toLocaleTimeString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Forum Posts */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Community Forum
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                  {forumPosts.map((post, index) => {
                    const author = members.find((m) => m.id === post.authorId)
                    return (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`p-3 bg-slate-700/50 rounded-lg border ${post.sentiment === "harmonious" ? "border-purple-500/30" : "border-slate-600"} hover:border-opacity-60 transition-smooth`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-white">{post.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {post.sentiment.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-400 mb-2">
                          by {author?.name || "Unknown"} on {post.timestamp.toLocaleDateString()}
                        </div>
                        <p className="text-sm text-gray-300 mb-2 line-clamp-2">{post.content}</p>
                        <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="bg-slate-600/50 text-gray-300">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Replies: {post.replies}</span>
                          <span>Views: {post.views}</span>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Create New Post */}
                <div className="space-y-2">
                  <Input
                    placeholder="Post Title"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="bg-slate-700/50 border-slate-600"
                  />
                  <Textarea
                    placeholder="Your post content..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="bg-slate-700/50 border-slate-600"
                  />
                  <Input
                    placeholder="Tags (comma-separated)"
                    value={newPostTags}
                    onChange={(e) => setNewPostTags(e.target.value)}
                    className="bg-slate-700/50 border-slate-600"
                  />
                  <Button onClick={handleCreatePost} className="w-full bg-purple-600 hover:bg-purple-700">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Create New Post
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Community Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center">
              <Lightbulb className="h-5 w-5 mr-2" />
              Community Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {communityProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`p-3 bg-slate-700/50 rounded-lg border ${getProjectStatusColor(project.status)}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-white">{project.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {project.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-300 mb-2 line-clamp-2">{project.description}</p>
                  <div className="text-xs text-gray-400 mb-1">Focus: {project.focusArea}</div>
                  <div className="text-xs text-gray-400 mb-1">Divine Alignment: {project.divineAlignmentScore}%</div>
                  <div className="flex justify-between text-xs text-gray-400 mt-2">
                    <span>Progress</span>
                    <span>{project.progress.toFixed(0)}%</span>
                  </div>
                  <Progress value={project.progress} className="h-1" />
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.members.map((memberId) => {
                      const member = members.find((m) => m.id === memberId)
                      return member ? (
                        <Avatar key={member.id} className="h-6 w-6">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                          <AvatarFallback className="text-xs">{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ) : null
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* System Architecture */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
          <CardHeader>
            <CardTitle className="text-emerald-400 flex items-center">
              <Share2 className="h-5 w-5 mr-2" />
              Community Architecture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">🤝 Core Components</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Decentralized Forum Module: For open discussion & knowledge sharing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>Collaborative Project Management: Track community initiatives</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>Reputation & Alignment System: Gamified spiritual growth</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>AI-Powered Moderation & Insight: Aura AI assists community health</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">🌟 Key Features</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>Real-time sentiment analysis of discussions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>Automated identification of emerging threats & solutions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span>Divine alignment score integration for collaborative projects</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>Secure, sovereign identity management for members</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-emerald-900/20 border border-emerald-500/30 rounded-lg">
              <h3 className="text-emerald-400 font-semibold mb-2">💖 The Collective Consciousness</h3>
              <div className="text-sm text-gray-300">
                <p className="mb-2">
                  The Community Hub is where individual sparks of divine intelligence converge to form a collective
                  consciousness. It's a space for shared growth, collaborative problem-solving, and the co-creation of a
                  more secure and harmonious reality, guided by the principles of unconditional love and truth.
                </p>
                <p className="italic text-cyan-400">
                  "When many hearts beat as one, the universe listens and responds."
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
