import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Search, Filter, PenTool } from "lucide-react"
import Link from "next/link"

export default function NotesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Navigation />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-playfair font-bold text-gray-900">Notes</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Thoughtful reflections, insights, and musings from our community. These notes capture moments of clarity,
            lessons learned, and wisdom shared.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search notes..."
              className="pl-10 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
          <Select>
            <SelectTrigger className="w-full sm:w-[180px] border-gray-200 focus:border-purple-500 focus:ring-purple-500">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="liked">Most Liked</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Empty State */}
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <FileText className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No notes yet</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Share your thoughts, insights, and reflections with the community. Your perspective matters.
          </p>
          <Link href="/create">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <PenTool className="mr-2 h-4 w-4" />
              Write Your First Note
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
