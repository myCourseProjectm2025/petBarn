// import { Input } from "antd";
// const ContactUs: React.FC = () => {
//   const phoneNumber = "+962791329474";
//   const email = "omaribrahim.dev@Gmail.com";
//   return (
//     <div>
//       <br />
//       <h1>Contact Us</h1>
//       <br />
//       <h4>Get In Touch</h4>
//       <br />
//       <div>
//         <p>
//           You can email us at{" "}
//           <a href={`E-mail:${email}`} className="text-blue-500 underline">
//             {email}
//           </a>
//         </p>
//       </div>
//       <div>
//         <p>
//           Call us on{" "}
//           <a href={`tel:${phoneNumber}`} className="text-blue-500 underline">
//             {phoneNumber}
//           </a>
//         </p>
//         <br />
//         <p>
//           Business Hours:
//           <br />
//           <br />
//           Saturday - Thursday: 10:00am - 8:30pm Amman time.
//         </p>
//       </div>
//       <div className="flex flex-col gap-4 items-center justify-center p-6 md:p-8 w-full">
//         <div className="flex flex-col md:flex-row gap-4 w-full justify-between">
//           <span>
//             <h4>Your name:</h4>
//             <Input
//               name="name"
//               className="py-4 min-h-12 max-w-[100vw]"
//               placeholder="Your Name"
//               required
//             ></Input>
//             <h4>Your email:</h4>
//             <Input className="w-1/2 pl-6 " required></Input>
//           </span>
//           <span>
//             <h4>Enquiry:</h4>
//             <Input></Input>
//             <br />
//           </span>
//           <button>send your Report</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;


"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, MessageSquare, User, AtSign } from "lucide-react"
import { Button } from "../Components/ui/Button"
import { Input } from "../Components/ui/input"
import { Textarea } from "../Components/ui/textarea"
import { toast } from "../Components/ui/use-toast"

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon!",
        duration: 5000,
      })

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Contact Us</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We'd love to hear from you! Whether you have a question about our products, services, or anything else, our
          team is ready to answer all your questions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 text-primary">Contact Information</h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Our Location</h3>
                  <p className="text-muted-foreground mt-1">123 Pet Street, Amman, Jordan</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Phone Number</h3>
                  <p className="text-muted-foreground mt-1">+962 7 1234 5678</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Email Address</h3>
                  <p className="text-muted-foreground mt-1">info@predpets.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Working Hours</h3>
                  <p className="text-muted-foreground mt-1">
                    Mon - Fri: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-8 rounded-lg overflow-hidden border">
              <img src="/map-placeholder.jpg" alt="Store Location Map" className="w-full h-48 object-cover" />
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 text-primary flex items-center">
              <MessageSquare className="mr-2" /> Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium flex items-center">
                    <User className="h-4 w-4 mr-1" /> Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium flex items-center">
                    <AtSign className="h-4 w-4 mr-1" /> Your Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Write your message here..."
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 text-primary">Frequently Asked Questions</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Do you offer same-day delivery?</h3>
                <p className="text-muted-foreground mt-1">
                  Yes, we offer FREE same-day delivery in Amman for orders placed before 2 PM.
                </p>
              </div>

              <div>
                <h3 className="font-medium">What payment methods do you accept?</h3>
                <p className="text-muted-foreground mt-1">
                  We accept credit/debit cards, PayPal, and cash on delivery for all orders.
                </p>
              </div>

              <div>
                <h3 className="font-medium">How can I track my order?</h3>
                <p className="text-muted-foreground mt-1">
                  Once your order is shipped, you'll receive a tracking number via email that you can use to track your
                  package.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs

