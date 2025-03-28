import { Link } from "react-router-dom"
import { ProductSwiper } from "../ui/ProductSwiper"

interface Product {
  name: string
  imgSrc: string
  price: string
  rate: number
}

interface ProductSectionProps {
  title: string
  products: Product[]
  showDivider?: boolean
  hideOnMobile?: boolean
  category?: string // Optional category for navigation
}

export const ProductSection = ({
  title,
  products,
  showDivider = true,
  hideOnMobile = false,
  category = "",
}: ProductSectionProps) => {
  // Function to create the correct navigation path based on section title
  const getSectionNavigationPath = () => {
    // If a specific category is provided, use it
    if (category) {
      return `/shop?category=${category}`
    }

    // Otherwise, determine category based on title
    switch (title.toLowerCase()) {
      case "new released":
        return "/shop?sort=newest"
      case "brands":
        return "/shop"
      case "recently viewed":
        return "/shop?sort=recently-viewed"
      case "favorites":
        return "/shop?sort=favorites"
      default:
        return "/shop"
    }
  }

  return (
    <div className="flex flex-col gap-4 py-4 text-xl font-raleway items-center justify-center min-h-[38vh] max-w-[75vw]">
      <div className="flex items-center gap-3">
        <h2
          className={`${hideOnMobile ? "hidden md:flex" : "flex"} text-3xl font-extrabold text-primary drop-shadow-lg`}
        >
          {title}
        </h2>
        <Link to={getSectionNavigationPath()} className="text-sm text-primary hover:underline">
          View all
        </Link>
      </div>
      <br />
      <div className="flex flex-wrap text-2xl gap-12 items-center justify-center">
        <ProductSwiper Brands={products} />
      </div>
      {showDivider && <div className="w-[50vw] border-b-2 py-3 border-gray-400"></div>}
    </div>
  )
}

