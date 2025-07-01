"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, PenTool, BookOpen, FileText, Star, User, LogOut, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()

  const navItems = [
    { href: "/", label: "Home", icon: Star },
    { href: "/poems", label: "Poems", icon: BookOpen },
    { href: "/notes", label: "Notes", icon: FileText },
    { href: "/create", label: "Create", icon: PenTool },
  ]

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center">
              <PenTool className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold font-playfair text-gradient">Geministics</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-1 text-gray-400 hover:text-purple-400 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              )
            })}

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="bg-purple-700 text-white">
                        {user.name ? getInitials(user.name) : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-900 border-gray-800 text-gray-300" align="end">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-sm text-white">{user.name}</p>
                      <p className="w-[200px] truncate text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800"
                    onClick={() => router.push("/profile")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-800 focus:bg-gray-800"
                    onClick={() => router.push("/settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem
                    className="cursor-pointer text-red-400 hover:bg-gray-800 focus:bg-gray-800 hover:text-red-300"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                    Sign in
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">Sign up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-gray-300">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-gray-900 border-gray-800 text-gray-300">
              {user && (
                <div className="flex items-center space-x-3 mb-8 mt-4 px-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="bg-purple-700 text-white">
                      {user.name ? getInitials(user.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-white">{user.name}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-3 text-gray-400 hover:text-purple-400 transition-colors p-2 rounded-lg hover:bg-gray-800"
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium text-lg">{item.label}</span>
                    </Link>
                  )
                })}

                {user ? (
                  <>
                    <Link
                      href="/profile"
                      className="flex items-center space-x-3 text-gray-400 hover:text-purple-400 transition-colors p-2 rounded-lg hover:bg-gray-800"
                      onClick={() => setIsOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      <span className="font-medium text-lg">Profile</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center space-x-3 text-gray-400 hover:text-purple-400 transition-colors p-2 rounded-lg hover:bg-gray-800"
                      onClick={() => setIsOpen(false)}
                    >
                      <Settings className="h-5 w-5" />
                      <span className="font-medium text-lg">Settings</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsOpen(false)
                      }}
                      className="flex items-center space-x-3 text-red-400 hover:text-red-300 transition-colors p-2 rounded-lg hover:bg-gray-800 w-full text-left"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="font-medium text-lg">Log out</span>
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-4 pt-4 border-t border-gray-800">
                    <Link
                      href="/login"
                      className="flex items-center justify-center text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="font-medium text-lg">Sign in</span>
                    </Link>
                    <Link
                      href="/signup"
                      className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white transition-colors p-2 rounded-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="font-medium text-lg">Sign up</span>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
