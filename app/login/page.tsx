import { Navigation } from "@/components/navigation"
import { LoginForm } from "@/components/auth-forms"

export default function LoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-950">
      {/* Animated background shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 shape-blob opacity-30"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-800/20 shape-blob-2 opacity-30"></div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-gray-950 z-10"></div>

      <Navigation />

      <div className="relative z-20 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <LoginForm />
      </div>
    </div>
  )
}
