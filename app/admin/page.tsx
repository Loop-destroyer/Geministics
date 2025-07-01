"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PenTool, Plus, Edit, Trash2, Save, Eye, EyeOff, Upload, X, RefreshCw, Calendar } from "lucide-react"
import { contentStore, type ContentItem } from "@/lib/content-store"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [content, setContent] = useState<ContentItem[]>([])
  const [newContent, setNewContent] = useState({
    type: "",
    title: "",
    content: "",
    image: "",
  })
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  // Add tab state management
  const [activeTab, setActiveTab] = useState("create")

  useEffect(() => {
    const unsubscribe = contentStore.subscribe(() => {
      setContent(contentStore.getAll()) // This now returns sorted content (latest first)
    })
    setContent(contentStore.getAll())
    return unsubscribe
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "geministics2024") {
      setIsAuthenticated(true)
    } else {
      alert("Invalid password")
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        setNewContent({ ...newContent, image: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    setNewContent({ ...newContent, image: "" })
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (editingItem) {
      contentStore.update(editingItem.id, {
        title: newContent.title,
        content: newContent.content,
        type: newContent.type as ContentItem["type"],
        image: newContent.image || undefined,
      })
      setEditingItem(null)
    } else {
      contentStore.add({
        type: newContent.type as ContentItem["type"],
        title: newContent.title,
        content: newContent.content,
        date: new Date().toISOString(),
        published: true,
        image: newContent.image || undefined,
      })
    }

    setNewContent({ type: "", title: "", content: "", image: "" })
    setImagePreview(null)
    setIsSubmitting(false)

    // Show refresh notification
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 3000)
  }

  // Update the handleEdit function
  const handleEdit = (item: ContentItem) => {
    setEditingItem(item)
    setNewContent({
      type: item.type,
      title: item.title,
      content: item.content,
      image: item.image || "",
    })
    setImagePreview(item.image || null)
    // Switch to create tab when editing
    setActiveTab("create")
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      contentStore.delete(id)
      setIsRefreshing(true)
      setTimeout(() => setIsRefreshing(false), 3000)
    }
  }

  const togglePublished = (id: string, published: boolean) => {
    contentStore.update(id, { published: !published })
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 3000)
  }

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "poem":
        return "bg-purple-900/50 text-purple-300"
      case "thought":
        return "bg-blue-900/50 text-blue-300"
      case "page":
        return "bg-green-900/50 text-green-300"
      default:
        return "bg-gray-900/50 text-gray-300"
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 flex items-center justify-center px-4">
        <Card className="w-full max-w-md bg-black/40 backdrop-blur-lg border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-playfair text-white">Admin Access</CardTitle>
            <CardDescription className="text-white/70">Enter password to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                required
              />
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                Login
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Link href="/" className="text-white/60 hover:text-white/80 text-sm">
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900">
      {/* Refresh Notification */}
      {isRefreshing && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span>Site refreshing for all users...</span>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-playfair font-bold text-white">Admin Dashboard</h1>
            <p className="text-white/70">Manage your content with images • Latest additions appear first</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-white/70 hover:text-white transition-colors">
              View Site
            </Link>
            <Button
              onClick={() => setIsAuthenticated(false)}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Update the Tabs component to be controlled */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="bg-black/40 border border-white/20">
            <TabsTrigger value="create" className="data-[state=active]:bg-white/20">
              <Plus className="mr-2 h-4 w-4" />
              {editingItem ? "Edit Content" : "Create New"}
            </TabsTrigger>
            <TabsTrigger value="manage" className="data-[state=active]:bg-white/20">
              <Edit className="mr-2 h-4 w-4" />
              Manage Content
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <Card className="bg-black/40 backdrop-blur-lg border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <PenTool className="mr-2 h-5 w-5" />
                  {editingItem ? "Edit Content" : "Create New Content"}
                </CardTitle>
                <CardDescription className="text-white/70">
                  {editingItem ? "Update existing content" : "Add a new poem, thought, or page with optional image"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-white font-medium">Content Type</label>
                    <Select
                      value={newContent.type}
                      onValueChange={(value) => setNewContent({ ...newContent, type: value })}
                    >
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Select content type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-white/20 text-white">
                        <SelectItem value="poem" className="text-white hover:bg-white/10 focus:bg-white/10">
                          Poem
                        </SelectItem>
                        <SelectItem value="thought" className="text-white hover:bg-white/10 focus:bg-white/10">
                          Thought
                        </SelectItem>
                        <SelectItem value="page" className="text-white hover:bg-white/10 focus:bg-white/10">
                          Page
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white font-medium">Title</label>
                    <Input
                      placeholder="Enter title..."
                      value={newContent.title}
                      onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-white font-medium">Image (Optional)</label>
                    <div className="space-y-4">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                      </Button>

                      {imagePreview && (
                        <div className="relative inline-block">
                          <img
                            src={imagePreview || "/placeholder.svg"}
                            alt="Preview"
                            className="w-full max-w-md h-48 object-cover rounded-lg border border-white/20"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={removeImage}
                            className="absolute top-2 right-2 border-red-500/30 text-red-400 hover:bg-red-900/20"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-white font-medium">Content</label>
                    <Textarea
                      placeholder="Write your content here..."
                      value={newContent.content}
                      onChange={(e) => setNewContent({ ...newContent, content: e.target.value })}
                      className="min-h-[300px] bg-white/10 border-white/20 text-white placeholder:text-white/50 font-crimson"
                      required
                    />
                  </div>

                  <div className="flex space-x-4">
                    {editingItem && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setEditingItem(null)
                          setNewContent({ type: "", title: "", content: "", image: "" })
                          setImagePreview(null)
                          if (fileInputRef.current) {
                            fileInputRef.current.value = ""
                          }
                        }}
                        className="border-white/30 text-white hover:bg-white/10"
                      >
                        Cancel
                      </Button>
                    )}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      {isSubmitting ? "Saving..." : editingItem ? "Update Content" : "Save Content"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage">
            <div className="grid gap-6">
              <Card className="bg-black/40 backdrop-blur-lg border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    All Content ({content.length}) • Latest First
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Content sorted by date - newest additions appear at the top
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {content.length === 0 ? (
                      <p className="text-white/60 text-center py-8">No content found</p>
                    ) : (
                      content.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                        >
                          <div className="flex items-center space-x-4 flex-1">
                            {item.image && (
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                className="w-16 h-16 object-cover rounded-lg border border-white/20"
                              />
                            )}
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <Badge variant="secondary" className={getBadgeColor(item.type)}>
                                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                                </Badge>
                                <h3 className="text-white font-medium">{item.title}</h3>
                                {!item.published && (
                                  <Badge variant="outline" className="border-yellow-500/30 text-yellow-400">
                                    Draft
                                  </Badge>
                                )}
                              </div>
                              <p className="text-white/60 text-sm">
                                {new Date(item.date).toLocaleDateString()} • {item.content.length} characters
                                {item.image && " • Has image"}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => togglePublished(item.id, item.published)}
                              className="border-white/30 text-white hover:bg-white/10"
                            >
                              {item.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(item)}
                              className="border-white/30 text-white hover:bg-white/10"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(item.id)}
                              className="border-red-500/30 text-red-400 hover:bg-red-900/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
