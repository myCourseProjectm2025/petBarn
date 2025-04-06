"use client"

import type React from "react"

import { useState } from "react"
import axios from "axios"
import { Button } from "../../Components/ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../Components/ui/card"
import { Input } from "../../Components/ui/input"
import { Label } from "../../Components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../Components/ui/tabs"
import { toast, Toaster } from "sonner"
import { MapPin } from "lucide-react"
import LeafletMapModal from "../../Components/ui/leaflet-map-modal"

const API_BASE_URL = import.meta.env.VITE_APP_API_URL 

export default function LoginRegister() {
  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  // Register form state
  const [registerData, setRegisterData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    password: "",
    confirmPassword: "",
    role: "user", // Default role
    location: {
      lat: 0,
      lng: 0,
    },
  })

  // Forgot password state
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [showVerifyCode, setShowVerifyCode] = useState(false)
  const [showResetPassword, setShowResetPassword] = useState(false)

  // Loading states
  const [isLoginLoading, setIsLoginLoading] = useState(false)
  const [isRegisterLoading, setIsRegisterLoading] = useState(false)
  const [isForgotPasswordLoading, setIsForgotPasswordLoading] = useState(false)

  // Map modal state
  const [isMapModalOpen, setIsMapModalOpen] = useState(false)

  // Handle login form input changes
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setLoginData({
      ...loginData,
      [id === "email" ? "email" : "password"]: value,
    })
  }

  // Handle register form input changes
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setRegisterData({
      ...registerData,
      [id === "first-name"
        ? "first_name"
        : id === "last-name"
          ? "last_name"
          : id === "register-email"
            ? "email"
            : id === "phone-number"
              ? "phone_number"
              : id === "address"
                ? "address"
                : id === "register-password"
                  ? "password"
                  : "confirmPassword"]: value,
    })
  }

  // Reset login form
  const resetLoginForm = () => {
    setLoginData({
      email: "",
      password: "",
    })
  }

  // Reset register form
  const resetRegisterForm = () => {
    setRegisterData({
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      address: "",
      password: "",
      confirmPassword: "",
      role: "user",
      location: {
        lat: 0,
        lng: 0,
      },
    })
  }

  // Handle location selection from map
  const handleLocationSelect = (address: string, lat: number, lng: number) => {
    setRegisterData({
      ...registerData,
      address,
      location: {
        lat,
        lng,
      },
    })
  }

  // Handle login form submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login Data:", loginData)

    if (!loginData.email || !loginData.password) {
      toast.error("Please fill in all fields", {
        position: "top-center",
        duration: 3000,
      })
      return
    }

    setIsLoginLoading(true)

    try {
      const response = await axios.post(`${API_BASE_URL}/account/login`, loginData)

      console.log("Login response:", response.data)

      // Store token in localStorage
      if (response.data.token) {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", JSON.stringify(response.data.user))
      }

      toast.success("Login successful! Welcome back.", {
        position: "top-center",
        duration: 3000,
      })

      resetLoginForm()

      // Redirect to home page or dashboard
      setTimeout(() => {
        window.location.href = "/"
      }, 1500)
    } catch (error) {
      console.error("Login error:", error)

      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Login failed. Please check your credentials.", {
          position: "top-center",
          duration: 3000,
        })
      } else {
        toast.error("Network error. Please try again later.", {
          position: "top-center",
          duration: 3000,
        })
      }
    } finally {
      setIsLoginLoading(false)
    }
  }

  // Handle register form submission
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Register Data:", registerData)

    // Validate form
    if (
      !registerData.first_name ||
      !registerData.last_name ||
      !registerData.email ||
      !registerData.phone_number ||
      !registerData.address ||
      !registerData.password ||
      !registerData.confirmPassword
    ) {
      toast.error("Please fill in all required fields", {
        position: "top-center",
        duration: 3000,
      })
      return
    }

    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-center",
        duration: 3000,
      })
      return
    }

    setIsRegisterLoading(true)

    try {
      // Prepare data for API
      const submitData = {
        first_name: registerData.first_name,
        last_name: registerData.last_name,
        email: registerData.email,
        phone_number: registerData.phone_number,
        address: registerData.address,
        password: registerData.password,
        role: registerData.role,
        location: registerData.location,
      }

      const response = await axios.post(`${API_BASE_URL}/account/register`, submitData)

      console.log("Registration response:", response.data)

      toast.success("Registration successful! Please log in.", {
        position: "top-center",
        duration: 3000,
      })

      resetRegisterForm()

      // Redirect to login tab after successful registration
      setTimeout(() => {
        const loginTrigger = document.querySelector('[value="login"]') as HTMLElement
        if (loginTrigger) loginTrigger.click()
      }, 1500)
    } catch (error) {
      console.error("Registration error:", error)

      if (axios.isAxiosError(error) && error.response) {
        const message = error.response.data.message || error.response.data.error

        if (message && message.includes("email already exists")) {
          toast.error("Email already in use", {
            position: "top-center",
            duration: 3000,
          })
        } else {
          toast.error(message || "Registration failed. Please try again.", {
            position: "top-center",
            duration: 3000,
          })
        }
      } else {
        toast.error("Network error. Please try again later.", {
          position: "top-center",
          duration: 3000,
        })
      }
    } finally {
      setIsRegisterLoading(false)
    }
  }

  // Handle send verification code
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!forgotPasswordEmail) {
      toast.error("Please enter your email", {
        position: "top-center",
        duration: 3000,
      })
      return
    }

    setIsForgotPasswordLoading(true)

    try {
      const response = await axios.post(`${API_BASE_URL}/account/send-code`, {
        email: forgotPasswordEmail,
      })

      console.log("Send code response:", response.data)

      toast.success("Verification code sent to your email", {
        position: "top-center",
        duration: 3000,
      })

      // Show verify code form
      setShowForgotPassword(false)
      setShowVerifyCode(true)
    } catch (error) {
      console.error("Send code error:", error)

      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Failed to send verification code", {
          position: "top-center",
          duration: 3000,
        })
      } else {
        toast.error("Network error. Please try again later.", {
          position: "top-center",
          duration: 3000,
        })
      }
    } finally {
      setIsForgotPasswordLoading(false)
    }
  }

  // Handle verify code
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!verificationCode) {
      toast.error("Please enter the verification code", {
        position: "top-center",
        duration: 3000,
      })
      return
    }

    setIsForgotPasswordLoading(true)

    try {
      const response = await axios.post(`${API_BASE_URL}/account/verify-code`, {
        email: forgotPasswordEmail,
        code: verificationCode,
      })

      console.log("Verify code response:", response.data)

      // Store token for password reset
      if (response.data.token) {
        localStorage.setItem("reset_token", response.data.token)
      }

      toast.success("Code verified successfully", {
        position: "top-center",
        duration: 3000,
      })

      // Show reset password form
      setShowVerifyCode(false)
      setShowResetPassword(true)
    } catch (error) {
      console.error("Verify code error:", error)

      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Invalid verification code", {
          position: "top-center",
          duration: 3000,
        })
      } else {
        toast.error("Network error. Please try again later.", {
          position: "top-center",
          duration: 3000,
        })
      }
    } finally {
      setIsForgotPasswordLoading(false)
    }
  }

  // Handle reset password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newPassword) {
      toast.error("Please enter a new password", {
        position: "top-center",
        duration: 3000,
      })
      return
    }

    setIsForgotPasswordLoading(true)

    try {
      const token = localStorage.getItem("reset_token")

      if (!token) {
        toast.error("Session expired. Please try again.", {
          position: "top-center",
          duration: 3000,
        })
        return
      }

      const response = await axios.post(
        `${API_BASE_URL}/account/reset-password`,
        { password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      console.log("Reset password response:", response.data)

      toast.success("Password reset successfully. Please log in with your new password.", {
        position: "top-center",
        duration: 3000,
      })

      // Clear reset token
      localStorage.removeItem("reset_token")

      // Reset states and show login form
      setForgotPasswordEmail("")
      setVerificationCode("")
      setNewPassword("")
      setShowResetPassword(false)

      // Switch to login tab
      const loginTrigger = document.querySelector('[value="login"]') as HTMLElement
      if (loginTrigger) loginTrigger.click()
    } catch (error) {
      console.error("Reset password error:", error)

      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Failed to reset password", {
          position: "top-center",
          duration: 3000,
        })
      } else {
        toast.error("Network error. Please try again later.", {
          position: "top-center",
          duration: 3000,
        })
      }
    } finally {
      setIsForgotPasswordLoading(false)
    }
  }

  // Cancel forgot password flow
  const handleCancelForgotPassword = () => {
    setForgotPasswordEmail("")
    setVerificationCode("")
    setNewPassword("")
    setShowForgotPassword(false)
    setShowVerifyCode(false)
    setShowResetPassword(false)
  }

  return (
    <div className="flex-1 flex items-center justify-center bg-textPrm/30 bg-cover drop-shadow-2xl min-h-[100vh] font-raleway pt-6">
      <Toaster richColors />
      <LeafletMapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        onSelectLocation={handleLocationSelect}
      />
      <Tabs defaultValue="login" className="w-[400px]">
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
          {showForgotPassword ? (
            <Card className="border-gray-400 bg-background">
              <form onSubmit={handleSendCode}>
                <CardHeader>
                  <CardTitle className="text-3xl font-extrabold font-raleway text-primary drop-shadow-md">
                    Forgot Password
                  </CardTitle>
                  <CardDescription className="text-textPrm">
                    Enter your email to receive a verification code.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="forgot-email" className="text-textPrm">
                      Email
                    </Label>
                    <Input
                      id="forgot-email"
                      type="email"
                      placeholder="your@email.com"
                      className="border-gray-400"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancelForgotPassword}
                    className="border-gray-400"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-secondary text-lg font-bold hover:bg-secondary hover:text-textPrm text-primary hover:scale-105 transition duration-300"
                    disabled={isForgotPasswordLoading}
                  >
                    {isForgotPasswordLoading ? "Sending..." : "Send Code"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          ) : showVerifyCode ? (
            <Card className="border-gray-400 bg-background">
              <form onSubmit={handleVerifyCode}>
                <CardHeader>
                  <CardTitle className="text-3xl font-extrabold font-raleway text-primary drop-shadow-md">
                    Verify Code
                  </CardTitle>
                  <CardDescription className="text-textPrm">
                    Enter the verification code sent to your email.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="verification-code" className="text-textPrm">
                      Verification Code
                    </Label>
                    <Input
                      id="verification-code"
                      type="text"
                      placeholder="Enter code"
                      className="border-gray-400"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancelForgotPassword}
                    className="border-gray-400"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-secondary text-lg font-bold hover:bg-secondary hover:text-textPrm text-primary hover:scale-105 transition duration-300"
                    disabled={isForgotPasswordLoading}
                  >
                    {isForgotPasswordLoading ? "Verifying..." : "Verify Code"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          ) : showResetPassword ? (
            <Card className="border-gray-400 bg-background">
              <form onSubmit={handleResetPassword}>
                <CardHeader>
                  <CardTitle className="text-3xl font-extrabold font-raleway text-primary drop-shadow-md">
                    Reset Password
                  </CardTitle>
                  <CardDescription className="text-textPrm">Enter your new password.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="new-password" className="text-textPrm">
                      New Password
                    </Label>
                    <Input
                      id="new-password"
                      type="password"
                      className="border-gray-400"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancelForgotPassword}
                    className="border-gray-400"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-secondary text-lg font-bold hover:bg-secondary hover:text-textPrm text-primary hover:scale-105 transition duration-300"
                    disabled={isForgotPasswordLoading}
                  >
                    {isForgotPasswordLoading ? "Resetting..." : "Reset Password"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          ) : (
            <Card className="border-gray-400 bg-background">
              <form onSubmit={handleLoginSubmit}>
                <CardHeader>
                  <CardTitle className="text-3xl font-extrabold font-raleway text-primary drop-shadow-md">
                    Login
                  </CardTitle>
                  <CardDescription className="text-textPrm">
                    Enter your credentials to access your account.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-textPrm">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="border-gray-400"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <Label htmlFor="password" className="text-textPrm">
                        Password
                      </Label>
                      <button
                        type="button"
                        onClick={() => setShowForgotPassword(true)}
                        className="ml-auto text-sm text-textPrm hover:text-secondary transition-colors duration-500 hover:font-extrabold"
                      >
                        Forgot your password?
                      </button>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      className="border-gray-400"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full bg-secondary text-lg font-bold hover:bg-secondary hover:text-textPrm text-primary hover:scale-105 transition duration-300"
                    disabled={isLoginLoading}
                  >
                    {isLoginLoading ? "Logging in..." : "Login"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="register">
          <Card className="border-gray-400 font-raleway bg-background">
            <form onSubmit={handleRegisterSubmit}>
              <CardHeader>
                <CardTitle className="text-3xl font-extrabold font-raleway text-primary drop-shadow-md">
                  Register
                </CardTitle>
                <CardDescription className="text-textPrm">Create a new account to join Pred&pets.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="first-name" className="text-textPrm">
                    First Name
                  </Label>
                  <Input
                    id="first-name"
                    placeholder="John"
                    className="border-gray-400"
                    value={registerData.first_name}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="last-name" className="text-textPrm">
                    Last Name
                  </Label>
                  <Input
                    id="last-name"
                    placeholder="Doe"
                    className="border-gray-400"
                    value={registerData.last_name}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="register-email" className="text-textPrm">
                    Email
                  </Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="your@email.com"
                    className="border-gray-400"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phone-number" className="text-textPrm">
                    Phone Number
                  </Label>
                  <Input
                    id="phone-number"
                    type="tel"
                    placeholder="00962-791234123"
                    className="border-gray-400"
                    value={registerData.phone_number}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="address" className="text-textPrm">
                    Address
                  </Label>
                  <div className="relative">
                    <Input
                      id="address"
                      type="text"
                      placeholder="Click to select location on map"
                      className="border-gray-400 pr-10"
                      value={registerData.address}
                      onChange={handleRegisterChange}
                      required
                      readOnly
                      onClick={() => setIsMapModalOpen(true)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 text-textPrm hover:text-primary"
                      onClick={() => setIsMapModalOpen(true)}
                    >
                      <MapPin className="h-5 w-5" />
                      <span className="sr-only">Select location on map</span>
                    </Button>
                  </div>
                  {registerData.location.lat !== 0 && (
                    <p className="text-xs text-textPrm mt-1">
                      Location selected: {registerData.location.lat.toFixed(4)}, {registerData.location.lng.toFixed(4)}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="register-password" className="text-textPrm">
                    Password
                  </Label>
                  <Input
                    id="register-password"
                    type="password"
                    className="border-gray-400"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="confirm-password" className="text-textPrm">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    className="border-gray-400"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-secondary text-lg font-bold hover:bg-secondary hover:text-textPrm text-primary hover:scale-105 transition duration-300"
                  disabled={isRegisterLoading}
                >
                  {isRegisterLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

