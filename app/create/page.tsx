"use client"

import { useState, type FormEvent } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PenTool, Save, Eye, Hash, CheckCircle } from "lucide-react"

export default function CreatePage() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "",
    tags: "",
  })
  const [isPreview, setIsPreview] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after showing success
    setTimeout(() => {
      setFormData({ title: "", content: "", type: "", tags: "" })
      setIsSubmitted(false)
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const tagArray = formData.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag)

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <Navigation />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Work Published!</h1>
            <p className="text-gray-600 mb-6">Your creative work has been successfully shared with the community.</p>
            <Button onClick={() => setIsSubmitted(false)} className="bg-purple-600 hover:bg-purple-700 text-white">
              Create Another
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center">
              <PenTool className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-playfair font-bold text-gray-900">Create Your Work</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Share your creativity with the world. Write a poem, jot down thoughts, or share a creative snippet.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PenTool className="h-5 w-5 text-purple-600" />
                  <span>Compose</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                      Title
                    </Label>
                    <Input
                      id="title"
                      placeholder="Give your work a compelling title..."
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-sm font-medium text-gray-700">
                      Type
                    </Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)} required>
                      <SelectTrigger className="border-gray-200 focus:border-purple-500 focus:ring-purple-500">
                        <SelectValue placeholder="Select the type of work" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="poem">Poem</SelectItem>
                        <SelectItem value="note">Note</SelectItem>
                        <SelectItem value="snippet">Snippet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content" className="text-sm font-medium text-gray-700">
                      Content
                    </Label>
                    <Textarea
                      id="content"
                      placeholder="Pour your heart out here..."
                      value={formData.content}
                      onChange={(e) => handleInputChange("content", e.target.value)}
                      className="min-h-[300px] border-gray-200 focus:border-purple-500 focus:ring-purple-500 font-crimson text-base leading-relaxed"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags" className="text-sm font-medium text-gray-700 flex items-center space-x-1">
                      <Hash className="h-4 w-4" />
                      <span>Tags</span>
                    </Label>
                    <Input
                      id="tags"
                      placeholder="love, nature, inspiration (comma separated)"
                      value={formData.tags}
                      onChange={(e) => handleInputChange("tags", e.target.value)}
                      className="border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                    />
                    {tagArray.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tagArray.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-800">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsPreview(!isPreview)}
                      className="flex-1 border-purple-200 text-purple-700 hover:bg-purple-50"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      {isPreview ? "Edit" : "Preview"}
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      {isSubmitting ? "Publishing..." : "Publish"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5 text-purple-600" />
                  <span>Preview</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.title || formData.content || formData.type ? (
                  <div className="space-y-4">
                    {formData.type && (
                      <Badge className="bg-purple-100 text-purple-800">
                        {formData.type.charAt(0).toUpperCase() + formData.type.slice(1)}
                      </Badge>
                    )}
                    {formData.title && (
                      <h2 className="text-2xl font-playfair font-semibold text-gray-900">{formData.title}</h2>
                    )}
                    {formData.content && (
                      <div className="font-crimson text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {formData.content}
                      </div>
                    )}
                    {tagArray.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t">
                        {tagArray.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-purple-600 border-purple-200">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <PenTool className="mx-auto h-12 w-12 mb-4" />
                    <p>Start writing to see your preview...</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
