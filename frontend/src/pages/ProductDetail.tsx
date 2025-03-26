"use client"

import type React from "react"

import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ChevronRight, Star, Plus, Minus, Heart, Share2, ZoomIn, ZoomOut, Home } from "lucide-react"
import { Button } from "../Components/ui/Button"
import { useMobile } from "../store/useMobile"

// Sample product data - in a real app, you would fetch this from an API
const PRODUCTS = [
  {
    id: "1",
    title: "Premium Fish Food",
    brand: "API",
    category: "Foods",
    subcategory: "Food for Fish",
    description:
      "High-quality nutrition for all types of fish. Our premium fish food is specially formulated to provide complete nutrition for all freshwater and saltwater fish. Contains essential vitamins and minerals to promote healthy growth and vibrant colors. Suitable for daily feeding and will not cloud water when used as directed.",
    price: 12.99,
    reviews: 42,
    rating: 4.5,
    tags: ["Fish Food", "Premium", "Nutrition"],
    images: ["/cat1.svg", "/cat2.svg", "/cat3.svg"],
    stock: 15,
  },
  {
    id: "2",
    title: "Tropical Fish Flakes",
    brand: "Aqua One",
    category: "Foods",
    subcategory: "Food for Fish",
    description:
      "Specially formulated for tropical fish species. These flakes are designed to float longer, allowing surface-feeding fish to eat at their leisure. Contains a balanced blend of proteins, fats, and carbohydrates to support healthy growth and vibrant colors.",
    price: 8.99,
    reviews: 28,
    rating: 4.2,
    tags: ["Tropical Fish", "Flakes", "Daily Feeding"],
    images: ["/cat2.svg", "/cat3.svg", "/cat4.svg"],
    stock: 23,
  },
  // Add more products as needed
]

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const isMobile = useMobile(768)

  // Find the product by ID
  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0] // Fallback to first product if not found

  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })

  // Handle quantity changes
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1)
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  // Handle image zoom
  const handleImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomPosition({ x, y })
  }

  // Generate breadcrumb path
  const breadcrumbPath = [
    { name: "Home", path: "/" },
    { name: product.category, path: `/${product.category.toLowerCase()}` },
    {
      name: product.subcategory,
      path: `/${product.category.toLowerCase()}/${product.subcategory.toLowerCase().replace(/\s+/g, "-")}`,
    },
    { name: product.title, path: "#" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb navigation */}
      <nav className="mb-6 text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center">
          {breadcrumbPath.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && <ChevronRight className="mx-2 h-4 w-4" />}
              {index === breadcrumbPath.length - 1 ? (
                <span className="font-medium text-foreground">{item.name}</span>
              ) : (
                <Link to={item.path} className="hover:text-primary transition-colors">
                  {index === 0 ? <Home className="h-4 w-4" /> : item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Product detail layout */}
      <div className={`grid gap-8 ${isMobile ? "grid-cols-1" : "grid-cols-4"}`}>
        {/* Left column - Product images */}
        <div className={`${isMobile ? "order-1" : "col-span-1"}`}>
          <div className="sticky top-4">
            {/* Main image with zoom */}
            <div
              className="relative overflow-hidden bg-white rounded-lg border mb-4 aspect-square"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleImageMouseMove}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.title}
                className={`w-full h-full object-contain transition-transform duration-200 ${isZoomed ? "scale-150" : "scale-100"}`}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`,
                      }
                    : undefined
                }
              />

              <button
                className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm text-gray-700 hover:bg-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsZoomed(!isZoomed)
                }}
              >
                {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
              </button>
            </div>

            {/* Thumbnail gallery */}
            {product.images.length > 1 && (
              <div className="flex gap-2 mt-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`relative border rounded-md overflow-hidden w-16 h-16 transition-all ${
                      selectedImage === index
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.title} - view ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Middle column - Product information */}
        <div className={`${isMobile ? "order-2" : "col-span-2"}`}>
          {/* Title and rating */}
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.title}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Brand */}
          <div className="mb-4">
            <span className="text-sm font-medium">Brand: </span>
            <Link to={`/brand/${product.brand.toLowerCase()}`} className="text-sm text-primary hover:underline">
              {product.brand}
            </Link>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {/* Reviews summary */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Customer Reviews</h2>
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex items-center gap-4 mb-2">
                <div className="text-3xl font-bold">{product.rating}</div>
                <div className="flex-1">
                  <div className="flex mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">Based on {product.reviews} reviews</div>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Read all reviews
              </Button>
            </div>
          </div>

          {/* Tags */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Product Tags</h2>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, index) => (
                <Link
                  key={index}
                  to={`/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                  className="bg-muted px-3 py-1 rounded-full text-sm hover:bg-primary/10 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - Purchase information */}
        <div className={`${isMobile ? "order-3" : "col-span-1"}`}>
          <div className="sticky top-4 bg-white rounded-lg border p-4 shadow-sm">
            {/* Price */}
            <div className="mb-4">
              <div className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">
                {product.stock > 0 ? (
                  <span className="text-green-600">In Stock ({product.stock} available)</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </div>
            </div>

            {/* Quantity selector */}
            <div className="mb-4">
              <label className="text-sm font-medium mb-1 block">Quantity</label>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-r-none"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </Button>
                <div className="h-10 px-4 flex items-center justify-center border-y border-input bg-background min-w-[40px]">
                  {quantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 rounded-l-none"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                >
                  <Plus size={16} />
                </Button>
              </div>
            </div>

            {/* Add to cart button */}
            <Button className="w-full mb-3">Add to Cart - ${(product.price * quantity).toFixed(2)}</Button>

            {/* Wishlist and share buttons */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Heart size={16} className="mr-2" />
                Wishlist
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Share2 size={16} className="mr-2" />
                Share
              </Button>
            </div>

            {/* Shipping information */}
            <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
              <p className="flex items-center mb-1">
                <span className="font-medium mr-2">Delivery:</span> Free shipping on orders over $50
              </p>
              <p className="flex items-center">
                <span className="font-medium mr-2">Returns:</span> 30 day return policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

