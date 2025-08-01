"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  MessageSquare,
  Github,
  ExternalLink,
  BookOpen,
  Video,
  Calendar,
  Trophy,
  Zap,
  Heart,
  Share2,
} from "lucide-react"

interface CommunityPost {
  id: string
  author: string
  avatar: string
  title: string
  content: string
  timestamp: Date
  likes: number
  replies: number
  tags: string[]
}

interface CommunityEvent {
  id: string
  title: string
  date: Date
  type: "webinar" | "workshop" | "conference" | "hackathon"
  participants: number
}

export default function CommunityHub() {
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: "1",
      author: "Dr. Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "New Quantum Encryption Algorithm Implementation",
      content:
        "Just published our latest research on quantum-resistant encryption. The algorithm shows 99.97% efficiency in our tests.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 42,
      replies: 8,
      tags: ["quantum", "encryption", "research"],
    },
    {
      id: "2",
      author: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "AI Training Pipeline Optimization",
      content:
        "Sharing my experience optimizing the multi-modal training pipeline. Achieved 30% performance improvement!",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      likes: 28,
      replies: 12,
      tags: ["ai", "optimization", "performance"],
    },
    {
      id: "3",
      author: "Maya Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Threat Detection False Positive Analysis",
      content:
        "Deep dive into reducing false positives in our threat detection system. New ML model shows promising results.",
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      likes: 35,
      replies: 6,
      tags: ["threat-detection", "machine-learning", "analysis"],
    },
  ])

  const [events, setEvents] = useState<CommunityEvent[]>([
    {
      id: "1",
      title: "Quantum Cybersecurity Webinar",
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      type: "webinar",
      participants: 247,
    },
    {
      id: "2",
      title: "AI Security Workshop",
      date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      type: "workshop",
      participants: 89,
    },
    {
      id: "3",
      title: "CyberSec Hackathon 2024",
      date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      type: "hackathon",
      participants: 156,
    },
  ])

  const [newPost, setNewPost] = useState({ title: "", content: "" })

  const communityStats = {
    totalMembers: 12847,
    activeToday: 1247,
    totalPosts: 8934,
    totalProjects: 156,
  }

  const topContributors = [
    { name: "Dr. Sarah Chen", contributions: 89, avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Alex Rodriguez", contributions: 76, avatar: "/placeholder.svg?height=32&width=32" },
    { name: "Maya Patel", contributions: 64, avatar: "/placeholder.svg?height=32&width=32" },
    { name: "James Wilson", contributions: 52, avatar: "/placeholder.svg?height=32&width=32" },
  ]

  const handleLike = (postId: string) => {
    setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)))
  }

  const handleSubmitPost = () => {
    if (newPost.title && newPost.content) {
      const post: CommunityPost = {
        id: Date.now().toString(),
        author: "You",
        avatar: "/placeholder.svg?height=40&width=40",
        title: newPost.title,
        content: newPost.content,
        timestamp: new Date(),
        likes: 0,
        replies: 0,
        tags: ["community"],
      }
      setPosts((prev) => [post, ...prev])
      setNewPost({ title: "", content: "" })
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "webinar":
        return Video
      case "workshop":
        return BookOpen
      case "hackathon":
        return Trophy
      default:
        return Calendar
    }
  }

  return (
    <div className="space-y-6">
      {/* Community Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Card className="bg-slate-800/50 border-emerald-500/30 glass-morphism">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Total Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-400">{communityStats.totalMembers.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-cyan-500/30 glass-morphism">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
              <Zap className="h-4 w-4 mr-2" />
              Active Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyan-400">{communityStats.activeToday.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-purple-500/30 glass-morphism">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              Total Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">{communityStats.totalPosts.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-yellow-500/30 glass-morphism">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-300 flex items-center">
              <Github className="h-4 w-4 mr-2" />
              Open Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">{communityStats.totalProjects}</div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Community Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create Post */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Share with Community
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="Post title..."
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  className="bg-slate-700/50 border-slate-600"
                />
                <Textarea
                  placeholder="What's on your mind?"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 min-h-[100px]"
                />
                <div className="flex justify-end">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button onClick={handleSubmitPost} className="bg-emerald-600 hover:bg-emerald-700">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Post
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Posts Feed */}
          <div className="space-y-4">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card className="bg-slate-800/50 border-slate-700 glass-morphism hover:border-emerald-500/30 transition-smooth">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src={post.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-3">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-white">{post.author}</h3>
                            <span className="text-xs text-slate-400">{post.timestamp.toLocaleTimeString()}</span>
                          </div>
                          <h4 className="text-lg font-medium text-emerald-400 mt-1">{post.title}</h4>
                        </div>
                        <p className="text-slate-300">{post.content}</p>
                        <div className="flex items-center space-x-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center space-x-4 pt-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleLike(post.id)}
                            className="flex items-center space-x-1 text-slate-400 hover:text-red-400 transition-smooth"
                          >
                            <Heart className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </motion.button>
                          <button className="flex items-center space-x-1 text-slate-400 hover:text-blue-400 transition-smooth">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.replies}</span>
                          </button>
                          <button className="flex items-center space-x-1 text-slate-400 hover:text-emerald-400 transition-smooth">
                            <Share2 className="h-4 w-4" />
                            <span>Share</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Contributors */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center">
                  <Trophy className="h-5 w-5 mr-2" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topContributors.map((contributor, index) => (
                    <div key={contributor.name} className="flex items-center space-x-3">
                      <div className="text-sm font-bold text-yellow-400">#{index + 1}</div>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={contributor.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{contributor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white">{contributor.name}</div>
                        <div className="text-xs text-slate-400">{contributor.contributions} contributions</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-cyan-400 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event) => {
                    const Icon = getEventIcon(event.type)
                    return (
                      <div key={event.id} className="p-3 bg-slate-700/50 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Icon className="h-5 w-5 text-emerald-400 mt-0.5" />
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-white">{event.title}</h4>
                            <p className="text-xs text-slate-400 mt-1">{event.date.toLocaleDateString()}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {event.type}
                              </Badge>
                              <span className="text-xs text-slate-400">{event.participants} participants</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="bg-slate-800/50 border-slate-700 glass-morphism">
              <CardHeader>
                <CardTitle className="text-emerald-400 flex items-center">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Quick Links
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    href="https://github.com/thoth-emerald"
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-700/50 transition-smooth"
                  >
                    <Github className="h-5 w-5 text-white" />
                    <div>
                      <div className="text-sm font-medium text-white">GitHub</div>
                      <div className="text-xs text-slate-400">Open source projects</div>
                    </div>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    href="/docs"
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-700/50 transition-smooth"
                  >
                    <BookOpen className="h-5 w-5 text-white" />
                    <div>
                      <div className="text-sm font-medium text-white">Documentation</div>
                      <div className="text-xs text-slate-400">Complete guides</div>
                    </div>
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    href="https://discord.gg/thoth-emerald"
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-700/50 transition-smooth"
                  >
                    <MessageSquare className="h-5 w-5 text-white" />
                    <div>
                      <div className="text-sm font-medium text-white">Discord</div>
                      <div className="text-xs text-slate-400">Live chat support</div>
                    </div>
                  </motion.a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
