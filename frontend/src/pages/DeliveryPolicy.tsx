"use client"

import { Truck, Clock, MapPin, Phone } from "lucide-react"

const DeliveryPolicy = () => {

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Delivery Policy</h1>
          <p className="text-muted-foreground">Last updated: March 27, 2025</p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="mb-4">
            Please carefully review our delivery policy when purchasing our products. This policy will be applied to any
            order you place with us.
          </p>
        </div>

        {/* Delivery Options */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-primary">
            <Truck className="mr-2" /> Delivery Options
          </h2>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Inside Amman</h3>
                <p className="text-muted-foreground">Free delivery option available.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Outside Amman</h3>
                <p className="text-muted-foreground">
                  Delivery through a 3rd party vendor. Additional fee will be added (between 3 JOD - 6 JOD depending on
                  location).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* International Shipping */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-primary">International Shipping</h2>
          <p>We do not offer international shipping at this time.</p>
        </div>

        {/* Delivery Time */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-primary">
            <Clock className="mr-2" /> Expected Delivery Time
          </h2>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground">
                  We offer same day delivery for orders placed before 7:00 PM Amman time.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground">
                  Orders placed after 7:00 PM will be delivered the next day, except on Thursdays.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-3 mt-1">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-muted-foreground">
                  Orders placed after 7:00 PM on Thursdays and the ones placed anytime during Fridays will be delivered
                  on Saturday.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-primary">
            <Phone className="mr-2" /> Contact Us
          </h2>
          <p className="mb-4">
            If you have any further questions or comments about our delivery policy, you may contact us:
          </p>
          <div className="flex items-center">
            <Phone className="h-5 w-5 text-primary mr-2" />
            <a href="tel:+962785072625" className="text-primary hover:underline">
              +962 785 072 625
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeliveryPolicy

