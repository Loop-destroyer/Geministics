"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProtectedRoute } from "@/components/protected-route"
import { useAuth } from "@/lib/auth"
import { PenTool, BookOpen, TrendingUp, Plus } from "lucide-react"
import Link from "next/link"

const stats = [
  { icon: PenTool, label: "Your Works", value: "0" },
  { icon: BookOpen, label: "Total Reads", value: "0" },
  { icon: TrendingUp, label: "Engagement", value: "0%" },
]

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-950">
        <Navigation />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-3xl font-playfair font-bold text-white mb-2">Welcome back, {user?.name}</h1>
            <p className="text-gray-400">Your creative journey starts here. What will you create today?</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="bg-gray-900/50 border-gray-800 backdrop-blur-sm">
                  <CardContent className="flex items-center p-6">
                    <div className="h-12 w-12 rounded-full bg-purple-900/30 flex items-center justify-center mr-4">
                      <Icon className="h-6 w-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-sm text-gray-400">{stat.label}</p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Create New Work Card */}
          <Card className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 border-gray-800 mb-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-playfair font-bold text-white mb-2">Ready to create?</h2>
                <p className="text-gray-300 max-w-md">
                  Share your poems, notes, or creative snippets with the world. Your voice matters.
                </p>
              </div>
              <Link href="/create">
                <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100">
                  <Plus className="mr-2 h-5 w-5" />
                  Create New Work
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Content Tabs */}
          <Tabs defaultValue="your-works" className="space-y-8">
            <TabsList className="bg-gray-900/50 border border-gray-800">
              <TabsTrigger value="your-works" className="data-[state=active]:bg-gray-800">
                Your Works
              </TabsTrigger>
              <TabsTrigger value="saved" className="data-[state=active]:bg-gray-800">
                Saved
              </TabsTrigger>
            </TabsList>

            <TabsContent value="your-works">
              <div className="text-center py-16">
                <div className="mx-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6">
                  <PenTool className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No works yet</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  Start your creative journey by writing your first piece.
                </p>
                <Link href="/create">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <PenTool className="mr-2 h-4 w-4" />
                    Create Your First Work
                  </Button>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="saved">
              <div className="text-center py-16">
                <div className="mx-auto w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6">
                  <BookOpen className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No saved works yet</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  Explore the community and save works that inspire you.
                </p>
                <Link href="/poems">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Explore Works
                  </Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  )
}
