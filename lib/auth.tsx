"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Simplified types
export type User = {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  joinedAt: string
}

type AuthContextProps = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<any>
  signup: (name: string, email: string, password: string) => Promise<any>
  logout: () => void
  updateProfile: (data: any) => Promise<any>
}

// Empty users array for production
const USERS: User[] = []

// Create context with default values
const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoading: true,
  login: async () => ({ success: false }),
  signup: async () => ({ success: false }),
  logout: () => {},
  updateProfile: async () => ({ success: false }),
})

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for saved auth on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("geministics_user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch (error) {
      console.error("Failed to parse saved user", error)
      localStorage.removeItem("geministics_user")
    }
    setIsLoading(false)
  }, [])

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("geministics_user", JSON.stringify(user))
    }
  }, [user])

  // Auth methods
  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Find user
    const foundUser = USERS.find((u) => u.email === email)

    if (foundUser) {
      setUser(foundUser)
      return { success: true, message: "Login successful" }
    }

    return { success: false, message: "Invalid email or password" }
  }

  const signup = async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if user exists
    if (USERS.some((u) => u.email === email)) {
      return { success: false, message: "Email already in use" }
    }

    // Create new user
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      joinedAt: new Date().toISOString(),
    }

    USERS.push(newUser)
    setUser(newUser)

    return { success: true, message: "Account created successfully" }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("geministics_user")
  }

  const updateProfile = async (data: any) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (!user) {
      return { success: false, message: "Not authenticated" }
    }

    // Update user
    const updatedUser = { ...user, ...data }
    setUser(updatedUser)

    // Update in users array
    const userIndex = USERS.findIndex((u) => u.id === user.id)
    if (userIndex >= 0) {
      USERS[userIndex] = updatedUser
    }

    return { success: true, message: "Profile updated successfully" }
  }

  const value = {
    user,
    isLoading,
    login,
    signup,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook
export function useAuth() {
  return useContext(AuthContext)
}
