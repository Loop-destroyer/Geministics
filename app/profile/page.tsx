"use client"

import { useState, type FormEvent } from "react"
import { Navigation } from "@/components/navigation"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, AlertCircle, User, Settings, BookOpen, PenTool } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const [formData, setFormData] = useState({
    name: user?.name || "",
    bio: user?.bio || "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setIsSubmitting(true)

    try {
      const result = await updateProfile({
        name: formData.name,
        bio: formData.bio,
      })

      if (result.success) {
        setMessage({ type: "success", text: "Profile updated successfully" })
      } else {
        setMessage({ type: "error", text: result.message })
      }
    } catch (err) {
      setMessage({ type: "error", text: "An unexpected error occurred" })
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-950">
        <Navigation />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
              <Avatar className="h-24 w-24 border-4 border-purple-600">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || ""} />
                <AvatarFallback className="bg-purple-700 text-white text-2xl">
                  {user?.name ? getInitials(user.name) : "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-playfair font-bold text-white">{user?.name}</h1>
                <p className="text-gray-400">Member since {new Date(user?.joinedAt || "").toLocaleDateString()}</p>
                {user?.bio && <p className="mt-4 text-gray-300">{user.bio}</p>}
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="works" className="space-y-8">
              <TabsList className="bg-gray-900/50 border border-gray-800">
                <TabsTrigger value="works" className="data-[state=active]:bg-gray-800">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Works
                </TabsTrigger>
                <TabsTrigger value="profile" className="data-[state=active]:bg-gray-800">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-gray-800">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="works">
                <div className="text-center py-16">
                  <div className="mx-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6">
                    <PenTool className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No works yet</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">Start sharing your creativity with the world.</p>
                  <Link href="/create">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                      <PenTool className="mr-2 h-4 w-4" />
                      Create Your First Work
                    </Button>
                  </Link>
                </div>
              </TabsContent>

              <TabsContent value="profile">
                <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Edit Profile</CardTitle>
                    <CardDescription className="text-gray-400">
                      Update your profile information visible to other users
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {message && (
                        <Alert
                          variant={message.type === "error" ? "destructive" : "default"}
                          className={
                            message.type === "error"
                              ? "bg-red-900/30 border-red-800 text-red-200"
                              : "bg-green-900/30 border-green-800 text-green-200"
                          }
                        >
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>{message.text}</AlertDescription>
                        </Alert>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-300">
                          Display Name
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio" className="text-gray-300">
                          Bio
                        </Label>
                        <Textarea
                          id="bio"
                          value={formData.bio}
                          onChange={(e) => handleInputChange("bio", e.target.value)}
                          placeholder="Tell others about yourself..."
                          className="min-h-[120px] bg-gray-800 border-gray-700 text-white focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                        {isSubmitting ? "Saving..." : "Save Changes"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Account Settings</CardTitle>
                    <CardDescription className="text-gray-400">
                      Manage your account preferences and security settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={user?.email || ""}
                        disabled
                        className="bg-gray-800 border-gray-700 text-gray-400"
                      />
                      <p className="text-xs text-gray-500">To change your email, please contact support</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-300">
                        Password
                      </Label>
                      <div className="flex gap-4">
                        <Input
                          id="password"
                          type="password"
                          value="••••••••"
                          disabled
                          className="bg-gray-800 border-gray-700 text-gray-400"
                        />
                        <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                          Change
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-gray-800 flex justify-between">
                    <Button
                      variant="outline"
                      className="border-red-800 text-red-400 hover:bg-red-900/20 hover:text-red-300"
                    >
                      Delete Account
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">Save Settings</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
