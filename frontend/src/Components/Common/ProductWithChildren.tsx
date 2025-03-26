"use client"

import type React from "react"
import { useState } from "react"
import { Star, ShoppingCart, Check, Heart } from "lucide-react"
import { Button } from "../ui/Button"
import { useNavigate } from "react-router-dom"
import { toast } from "../ui/use-toast"

interface ProductProps {
  id?: string
  title: string
  brand: string
  category: string
  subcategory: string
  description: string
  price: number
  reviews: number
  rating: number
  imgSrc?: string
}

const ProductWithChildren: React.FC<ProductProps> = ({
  id = "1", // Default ID if not provided
  title,
  brand,
  category,
  subcategory,
  description,
  price,
  reviews,
  rating,
  imgSrc = "/placeholder.svg",
}) => {
  const navigate = useNavigate()
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleClick = () => {
    navigate(`/product/${id}`)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent navigation when clicking the button
    setIsAddedToCart(true)

    // Show toast notification
    toast({
      title: "Added to cart",
      description: `${title} has been added to your cart.`,
      duration: 3000,
    })

    // Reset button after 1.5 seconds for visual feedback
    setTimeout(() => {
      setIsAddedToCart(false)
    }, 1500)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent navigation
    setIsWishlisted(!isWishlisted)

    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${title} has been ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
      duration: 3000,
    })
  }

  return (
    <div
      className="group h-[420px] flex flex-col bg-navBG/45 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      {/* Product Image */}
      <div className="relative h-52 bg-muted/20 overflow-hidden">
        <img
          src={imgSrc || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-secondary text-text1 text-xs font-bold px-2 py-1 rounded">
          {category}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm hover:bg-white transition-colors"
        >
          <Heart size={18} className={isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"} />
        </button>
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col p-4">
        <div className="text-xs text-muted-foreground mb-1">
          {brand} • {subcategory}
        </div>

        <h3 className="font-semibold text-base mb-1 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground mb-2 line-clamp-2 flex-grow">{description}</p>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex mr-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t">
          <div className="font-bold text-lg">({price.toFixed(2)})JD</div>
          <Button
            size="sm"
            className={`text-xs transition-all ${isAddedToCart ? "bg-green-600 hover:bg-green-700" : "bg-secondary"}`}
            onClick={handleAddToCart}
            disabled={isAddedToCart}
          >
            {isAddedToCart ? (
              <>
                <Check size={16} className="mr-1" /> Added
              </>
            ) : (
              <>
                <ShoppingCart size={16} className="mr-1" /> Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProductWithChildren

