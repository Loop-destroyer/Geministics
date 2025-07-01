"use client"

// Content store to manage all site content
export type ContentItem = {
  id: string
  type: "poem" | "thought" | "page"
  title: string
  content: string
  date: string
  published: boolean
  image?: string // Optional image URL
}

// Initialize with current content
const initialContent: ContentItem[] = [
  {
    id: "1",
    type: "poem",
    title: "The Silence",
    content: `We humans sometimes fail to understand the silence in chaos... Or the silence is so heavy that it turns all the noise into an empty room, and makes us feel hollow.

The silence after knowing that maybe... this moment is not going to come again.

The silence after realising that maybe... the place holds more memories than pictures.

The silence after knowing... there might be no phone calls asking "how are you?" from tomorrow.

The silence after sitting, thinking about all this for hours in the darkness... or maybe, the light is gone again.`,
    date: "2024-01-20",
    published: true,
  },
  {
    id: "2",
    type: "poem",
    title: "Rushed City",
    content: `I stand in the rushed city,
Watching shadows at sunset vanish into roads and sky
I stand in the hush between day and night,
Where every fading shadow whispers of new light.

People here stands in silence and speak so loud
They Walk so fast yet they feel so slow
They wander through crowds in endless flow,
Yet yearn for heights where quiet winds blow

Their eyes meet screens, but not each other's gaze,
Lost in pixels, they drift through the maze.
With every floor they climb, the world expands,
Yet dreams slip further through their hands`,
    date: "2024-01-18",
    published: true,
  },
  {
    id: "3",
    type: "thought",
    title: "Robotic Mindset",
    content: `Even after thinking positively, the transition shifts to negative sides, making me wonder how is this even working?
How is everyone diving into that area without even thinking? Or are they also victims of this shift towards negativity?

Let's say I like a particular kind of music and certain types of films. I have a strong interest in singing and making music.
But suddenly, someone close to me says, "Hey, try rap it's actually good." Then I consider giving it a try.

But that's not the exact problem.
The problem is the influence of a bunch of people slowly shifting us in a direction that was never even under consideration.

Either you feel like you're the only one being excluded from the group, so you join in just to fit.

Or, they reach out to you, make you feel seen, and introduce you to something you never imagined. They make it seem like it fits your ideology perfectly.

That's also a talent—to make anything seem like it fits your ideology.

They might say:
"Hey, you liked this particular thing, so check out this XYZ thing. It also fits your taste."

I might ask some questions: How?
But they manage to explain it so smoothly, and before I realize it, I start getting interested—with them.

So I'm not saying all these people are born robots. Our society has just managed to perfectly turn a walking human into a dead robot—someone who works on stupid commands and influences others to do the same.`,
    date: "2024-01-25",
    published: true,
  },
]

class ContentStore {
  private content: ContentItem[] = []
  private listeners: (() => void)[] = []

  constructor() {
    // Load from localStorage or use initial content
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("geministics_content")
      this.content = saved ? JSON.parse(saved) : initialContent
    } else {
      this.content = initialContent
    }
  }

  subscribe(listener: () => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener)
    }
  }

  private notify() {
    this.listeners.forEach((listener) => listener())
    if (typeof window !== "undefined") {
      localStorage.setItem("geministics_content", JSON.stringify(this.content))
    }
    // Trigger page refresh for all users
    this.triggerSiteRefresh()
  }

  private triggerSiteRefresh() {
    // Broadcast to all open tabs/windows
    if (typeof window !== "undefined") {
      localStorage.setItem("geministics_refresh", Date.now().toString())
      // Also trigger a custom event
      window.dispatchEvent(new CustomEvent("contentUpdated"))
    }
  }

  getAll(): ContentItem[] {
    // Sort all content by date in descending order (latest first)
    return [...this.content].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  getByType(type: ContentItem["type"]): ContentItem[] {
    // Filter by type and published status, then sort by date in descending order (latest first)
    return this.content
      .filter((item) => item.type === type && item.published)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }

  getById(id: string): ContentItem | undefined {
    return this.content.find((item) => item.id === id)
  }

  add(item: Omit<ContentItem, "id">): ContentItem {
    const newItem: ContentItem = {
      ...item,
      id: Math.random().toString(36).substring(2, 9),
    }
    this.content.push(newItem)
    this.notify()
    return newItem
  }

  update(id: string, updates: Partial<ContentItem>): ContentItem | null {
    const index = this.content.findIndex((item) => item.id === id)
    if (index === -1) return null

    this.content[index] = { ...this.content[index], ...updates }
    this.notify()
    return this.content[index]
  }

  delete(id: string): boolean {
    const index = this.content.findIndex((item) => item.id === id)
    if (index === -1) return false

    this.content.splice(index, 1)
    this.notify()
    return true
  }
}

export const contentStore = new ContentStore()

// Auto-refresh functionality
if (typeof window !== "undefined") {
  // Listen for storage changes (from other tabs)
  window.addEventListener("storage", (e) => {
    if (e.key === "geministics_refresh") {
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }
  })

  // Listen for content updates in the same tab
  window.addEventListener("contentUpdated", () => {
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  })
}
