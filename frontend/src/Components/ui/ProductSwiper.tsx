"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "./card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "./carousel"
import { Star, ShoppingCart, Check, Heart } from "lucide-react"
import { Button } from "./Button"
import { toast } from "./use-toast"
import { useNavigate } from "react-router-dom"

interface CarouselSizeProps {
  Brands: { name: string; imgSrc: string; price?: string; rate?: number }[]
}

export function ProductSwiper({ Brands }: CarouselSizeProps) {
  const [likedItems, setLikedItems] = useState<string[]>([])
  const [cartItems, setCartItems] = useState<string[]>([])
  const navigate = useNavigate()

  // For pagination
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  // Handle Like
  const handleLike = (e: React.MouseEvent, name: string) => {
    e.stopPropagation()
    setLikedItems((prev) => (prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]))

    toast({
      title: likedItems.includes(name) ? "Removed from wishlist" : "Added to wishlist",
      description: `${name} has been ${likedItems.includes(name) ? "removed from" : "added to"} your wishlist.`,
      duration: 3000,
    })
  }

  // Handle Add to Cart
  const handleAddToCart = (e: React.MouseEvent, name: string) => {
    e.stopPropagation()
    if (!cartItems.includes(name)) {
      setCartItems((prev) => [...prev, name])

      toast({
        title: "Added to cart",
        description: `${name} has been added to your cart.`,
        duration: 3000,
      })

      // Remove from cart items after 1.5 seconds for visual feedback
      setTimeout(() => {
        setCartItems((prev) => prev.filter((item) => item !== name))
      }, 1500)
    }
  }

  function onBrandClick(name: string): void {
    // Navigate to product detail page
    navigate(`/product/${name.replace(/\s+/g, "-").toLowerCase()}`)
  }

  // Handle dot click to navigate to a specific slide
  const handleDotClick = useCallback(
    (index: number) => {
      if (api) {
        api.scrollTo(index)
      }
    },
    [api],
  )

  return (
    <div className="w-full max-w-[90vw] md:max-w-[80vw] lg:max-w-[65vw]">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
        setApi={setApi}
      >
        <CarouselContent>
          {Brands.map((brand, index) => (
            <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <div className="p-1">
                <Card
                  className="shadow-left-bottom-md hover:shadow-left-bottom-xl transition-all cursor-pointer"
                  onClick={() => onBrandClick(brand.name)}
                >


                  
                  <CardContent className="flex flex-col gap-3 sm:gap-4 md:gap-6 bg-navBG/70 items-center justify-between p-3 sm:p-4 md:p-6 h-[420px] sm:h-[450px]">
                    {/* Product Image */}
                    <div className="relative w-full h-40 flex items-center justify-center">
                      <img
                        src={brand.imgSrc || "/placeholder.svg"}
                        alt={brand.name}
                        className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 object-contain transition-transform hover:scale-105"
                      />

                      {/* Wishlist button */}
                      <button
                        onClick={(e) => handleLike(e, brand.name)}
                        className="absolute top-0 right-0 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm hover:bg-white transition-colors"
                      >
                        <Heart
                          size={18}
                          className={likedItems.includes(brand.name) ? "fill-red-500 text-red-500" : "text-gray-500"}
                        />
                      </button>
                    </div>

                    <div className="flex flex-col items-center gap-2 flex-grow w-full">
                      <span className="text-lg sm:text-xl md:text-2xl font-semibold text-center line-clamp-2">
                        {brand.name}
                      </span>

                      <span className="text-base sm:text-lg md:text-xl font-semibold">price: {brand.price} JD</span>

                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ${
                              (brand.rate || 0) > i ? "text-yellow-400 fill-yellow-400" : "text-gray-500"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <Button
                      className={`w-full py-1 px-2 rounded-md text-sm sm:text-base md:text-lg drop-shadow-lg transition ${
                        cartItems.includes(brand.name) ? "bg-green-600 hover:bg-green-700" : ""
                      }`}
                      onClick={(e) => handleAddToCart(e, brand.name)}
                      disabled={cartItems.includes(brand.name)}
                    >
                      {cartItems.includes(brand.name) ? (
                        <>
                          <Check size={16} className="mr-1" /> Added
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={16} className="mr-1" /> Add to Cart
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation arrows - hidden on mobile */}
        <div className="hidden sm:block">
          <CarouselPrevious className="p-2 sm:p-3 md:p-4 rounded-full bg-primary text-white shadow-lg hover:bg-secondary-dark transition duration-300 ease-in-out transform hover:scale-110" />
          <CarouselNext className="p-2 sm:p-3 md:p-4 rounded-full bg-primary text-white shadow-lg hover:bg-secondary-dark transition duration-300 ease-in-out transform hover:scale-110" />
        </div>
      </Carousel>

      {/* Modern pagination indicator - visible on mobile */}
      <div className="flex justify-center items-center mt-3 sm:hidden">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-background/80 backdrop-blur-sm rounded-full shadow-sm">
          {Array.from({ length: Math.min(count, 7) }).map((_, index) => {
            // For long carousels, show first 3, current, and last 3
            let showDot = true
            let isActive = false

            if (count > 7) {
              if (current < 3) {
                // First 3 pages: show first 5 dots and last 2
                showDot = index < 5 || index > count - 3
                isActive = index === current
              } else if (current > count - 4) {
                // Last 3 pages: show first 2 and last 5 dots
                showDot = index < 2 || index > count - 6
                isActive = index === current
              } else {
                // Middle pages: show first 2, current and neighbors, last 2
                showDot = index < 2 || (index >= current - 1 && index <= current + 1) || index > count - 3
                isActive = index === current
              }

              // Show ellipsis instead of some dots
              if (!showDot) {
                return null
              }
            } else {
              isActive = index === current
            }

            return (
              <button
                key={index}
                className={`rounded-full transition-all ${
                  isActive ? "w-4 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            )
          })}

          {/* Page counter for additional context */}
          <span className="text-[10px] text-gray-500 ml-1.5 font-medium">
            {current + 1}/{count}
          </span>
        </div>
      </div>
    </div>
  )
}

