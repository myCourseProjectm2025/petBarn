"use client"

import { useState, useEffect } from "react"
import { useMobile } from "../../store/useMobile"

interface BannerProps {
  images: string[]
  mobileImages: string[]
}

export const Banner = ({ images, mobileImages }: BannerProps) => {
const isMobile = useMobile(768)
  const [currentImage, setCurrentImage] = useState(0)

  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="relative w-full overflow-hidden">
      <img
        src={isMobile ? mobileImages[currentImage] : images[currentImage]}
        alt="Animated Banner"
        className="h-[2/3vh] w-full md:h-auto object-cover transition-all duration-500 ease-in-out"
      />
    </div>
  )
}

