"use client"

import { Button } from "../../Components/ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../Components/ui/card"
import { Input } from "../../Components/ui/input"
import { Label } from "../../Components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../Components/ui/tabs"

export default function LoginRegister() {
  return (
    <div className="flex-1 flex items-center justify-center  bg-textPrm/30 bg-cover drop-shadow-2xl min-h-[100vh] font-raleway pt-6 ">
      <Tabs defaultValue="login" className="w-[400px] ">
        <TabsList className="grid w-full grid-cols-2 bg-background">
          <TabsTrigger
            value="login"
            className="text-text1 font-extrabold hover:text-primary/80 hover:font-extrabold hover:scale-105 hover:border-b-[5px] transition duration-300"
          >
            Login
          </TabsTrigger>
          <TabsTrigger
            value="register"
            className="text-text1 font-extrabold hover:text-primary/80 hover:font-extrabold hover:scale-105 hover:border-b-[5px] transition duration-300"
          >
            Register
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card className="border-gray-400 bg-background">
            <CardHeader>
              <CardTitle className="text-3xl font-extrabold font-raleway text-primary drop-shadow-md">Login</CardTitle>
              <CardDescription className="text-textPrm">Enter your credentials to access your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="email" className="text-textPrm">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="your@email.com" className="border-gray-400" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-textPrm">
                    Password
                  </Label>
                  <a href="#" className="ml-auto text-sm text-textPrm hover:text-secondary transition-colors duration-500 hover:font-extrabold">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" className="border-gray-400" />
              </div>
            </CardContent>
            <CardFooter>
            <Button className="w-full bg-secondary text-lg font-bold hover:bg-secondary  hover:text-textPrm text-primary hover:scale-105 transition duration-300">
            Login
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card className="border-gray-400 font-raleway bg-background">
            <CardHeader>
              <CardTitle className="text-3xl font-extrabold font-raleway text-primary drop-shadow-md">Register</CardTitle>
              <CardDescription className="text-textPrm">Create a new account to join Pred&pets.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="first-name" className="text-textPrm">
                  First Name
                </Label>
                <Input id="first-name" placeholder="John" className="border-gray-400" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="last-name" className="text-textPrm">
                  Last Name
                </Label>
                <Input id="last-name" placeholder="Doe" className="border-gray-400" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="register-email" className="text-textPrm">
                  Email
                </Label>
                <Input id="register-email" type="email" placeholder="your@email.com" className="border-gray-400" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone-number" className="text-textPrm">
                  Phone Number
                </Label>
                <Input id="phone-number" type="tel" placeholder="+1 (555) 123-4567" className="border-gray-400" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="address" className="text-textPrm">
                  Address
                </Label>
                <Input id="address" type="text" placeholder="123 Main St, City" className="border-gray-400" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="register-password" className="text-textPrm">
                  Password
                </Label>
                <Input id="register-password" type="password" className="border-gray-400" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="confirm-password" className="text-textPrm">
                  Confirm Password
                </Label>
                <Input id="confirm-password" type="password" className="border-gray-400" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-secondary text-lg font-bold hover:bg-secondary  hover:text-textPrm text-primary hover:scale-105 transition duration-300">
                Create Account
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

