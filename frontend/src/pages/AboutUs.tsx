"use client"

import { Heart, Truck, ShieldCheck, Users } from "lucide-react"

const AboutUs = () => {

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">About PetBarn</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">Your one-stop shop for all your pet needs</p>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto">
        {/* Welcome section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">WELCOME TO PETBARN!</h2>
          <p className="mb-4">
            Being a pet owner is one of the best things in the world. And we understand because we're pet parents too.
            In fact, PetBarn was founded by people who love helping pets.
          </p>
          <p className="mb-4">
            We wanted to make the process of finding food, treats and all that good stuff easy to find--and deliver it
            straight to your doorstep.
          </p>
          <div className="aspect-video w-full overflow-hidden rounded-lg mb-6">
            <img
              src="/about-banner.jpg"
              alt="PetBarn Team"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg?height=400&width=800"
              }}
            />
          </div>
          <p>
            Headquartered in Amman, Jordan, our dedicated staff are committed to providing the kind of service that
            makes you go "wow." Our team can ship the freshest, highest quality products--and fast. Our customer service
            representatives are here day and night to help. Bottom line is, we're here to make pet happiness happen.
          </p>
        </div>

        {/* Our values */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center text-primary">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Passion for Pets</h3>
              <p className="text-muted-foreground">
                We're pet owners ourselves and understand the special bond between pets and their families.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality & Trust</h3>
              <p className="text-muted-foreground">
                We carefully select only the best products from trusted brands for your beloved pets.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Reliable Service</h3>
              <p className="text-muted-foreground">
                We offer same-day delivery in Amman and strive to make your shopping experience seamless.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Community</h3>
              <p className="text-muted-foreground">
                We're building a community of pet lovers who share our passion for animal welfare.
              </p>
            </div>
          </div>
        </div>

        {/* Our team */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-center text-primary">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img
                  src="/founder1.jpg"
                  alt="Co-founder"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=128&width=128"
                  }}
                />
              </div>
              <h3 className="font-semibold">John Doe</h3>
              <p className="text-sm text-muted-foreground">Co-founder</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img
                  src="/founder2.jpg"
                  alt="Co-founder"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=128&width=128"
                  }}
                />
              </div>
              <h3 className="font-semibold">Jane Smith</h3>
              <p className="text-sm text-muted-foreground">Co-founder</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img
                  src="/founder3.jpg"
                  alt="Operations Manager"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=128&width=128"
                  }}
                />
              </div>
              <h3 className="font-semibold">Alex Johnson</h3>
              <p className="text-sm text-muted-foreground">Operations Manager</p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-primary/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Join the PetBarn Family</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            We're more than just a pet store - we're a community of pet lovers dedicated to making pet ownership easier
            and more enjoyable.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/shop"
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Shop Now
            </a>
            <a
              href="/contactUs"
              className="bg-white border border-primary text-primary px-6 py-2 rounded-md hover:bg-primary/10 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs

