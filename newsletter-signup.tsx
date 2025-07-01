import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Mail, Facebook, Twitter, Github, Shield } from "lucide-react"

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pb-6">
            {/* Logo/Brand Mark */}
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>

            {/* Brand Name */}
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-gray-900">Nexus</h2>
              <div className="w-12 h-0.5 bg-purple-600 mx-auto rounded-full"></div>
            </div>

            {/* Headlines */}
            <div className="space-y-2">
              <CardTitle className="text-2xl font-semibold text-gray-900">Subscribe to Our Newsletter</CardTitle>
              <CardDescription className="text-gray-600 leading-relaxed">
                Get the latest insights, tips, and exclusive content delivered straight to your inbox every week.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Social Sign-up Options */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700 text-center">Sign up with</p>
              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" className="h-11 hover:bg-gray-50">
                  <Facebook className="w-5 h-5 text-blue-600" />
                </Button>
                <Button variant="outline" className="h-11 hover:bg-gray-50">
                  <Twitter className="w-5 h-5 text-sky-500" />
                </Button>
                <Button variant="outline" className="h-11 hover:bg-gray-50">
                  <Github className="w-5 h-5 text-gray-900" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-3 text-sm text-gray-500">or continue with email</span>
              </div>
            </div>

            {/* Email Form */}
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="h-11 border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                  required
                />
              </div>

              <Button type="submit" className="w-full h-11 bg-purple-600 hover:bg-purple-700 text-white font-medium">
                Subscribe Now
              </Button>
            </form>

            {/* Additional Links */}
            <div className="flex justify-center space-x-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">
                Help
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 pt-2">
              <Shield className="w-4 h-4" />
              <span>We respect your privacy and never share your data</span>
            </div>
          </CardContent>
        </Card>

        {/* Footer Trust Message */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Join 10,000+ subscribers who trust us with their inbox</p>
        </div>
      </div>
    </div>
  )
}
