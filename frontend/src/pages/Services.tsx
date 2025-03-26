"use client"


import { useState, useEffect } from "react"
import { Filter, ChevronDown, ChevronUp } from "lucide-react"
import ProductWithChildren from "../Components/Common/ProductWithChildren"
import { Slider } from "../Components/ui/slider"
import { Checkbox } from "../Components/ui/checkbox"
import { useMobile } from "../store/useMobile"
import { Button } from "../Components/ui/Button"
import { Label } from "../Components/ui/label"
import categories from "../Mocks/MockCategory"
import { useNavigate } from "react-router-dom"

// Sample product data
const PRODUCTS = [
  {
    id: "1",
    title: "Premium Fish Food",
    brand: "API",
    category: "Foods",
    subcategory: "Food for Fish",
    description: "High-quality nutrition for all types of fish",
    price: 12.99,
    reviews: 42,
    rating: 4.5,
    imgSrc: "/cat1.svg",
  },
  {
    id: "2",
    title: "Tropical Fish Flakes",
    brand: "Aqua One",
    category: "Foods",
    subcategory: "Food for Fish",
    description: "Specially formulated for tropical fish species",
    price: 8.99,
    reviews: 28,
    rating: 4.2,
    imgSrc: "/cat2.svg",
  },
  {
    id: "3",
    title: "Premium Dog Food",
    brand: "Royal Canin",
    category: "Foods",
    subcategory: "Food for Dogs",
    description: "Complete nutrition for adult dogs",
    price: 45.99,
    reviews: 156,
    rating: 4.8,
    imgSrc: "/cat3.svg",
  },
  {
    id: "4",
    title: "Cat Litter Box",
    brand: "PetSafe",
    category: "Supplies",
    subcategory: "Supplies for Cats",
    description: "Self-cleaning litter box for cats",
    price: 129.99,
    reviews: 87,
    rating: 4.3,
    imgSrc: "/cat4.svg",
  },
  {
    id: "5",
    title: "Dog Grooming Service",
    brand: "PetCare Pro",
    category: "Services",
    subcategory: "Grooming @Clinic",
    description: "Professional grooming for all dog breeds",
    price: 55.0,
    reviews: 112,
    rating: 4.7,
    imgSrc: "/cat5.svg",
  },
  {
    id: "6",
    title: "Bird Cage",
    brand: "Prevue Pet",
    category: "Supplies",
    subcategory: "Supplies for Birds",
    description: "Spacious cage for small to medium birds",
    price: 89.99,
    reviews: 34,
    rating: 4.1,
    imgSrc: "/cat1.svg",
  },
  {
    id: "7",
    title: "Aquarium Filter",
    brand: "Fluval",
    category: "Supplies",
    subcategory: "Supplies for Fish",
    description: "Advanced filtration system for aquariums",
    price: 64.99,
    reviews: 76,
    rating: 4.6,
    imgSrc: "/cat2.svg",
  },
  {
    id: "8",
    title: "Cat Dry Food",
    brand: "Purina",
    category: "Foods",
    subcategory: "Food for Cats",
    description: "Balanced nutrition for indoor cats",
    price: 32.99,
    reviews: 98,
    rating: 4.4,
    imgSrc: "/cat3.svg",
  },
  {
    id: "9",
    title: "Dog Training Service",
    brand: "TrainingMasters",
    category: "Services",
    subcategory: "Training",
    description: "Professional dog training sessions",
    price: 75.0,
    reviews: 65,
    rating: 4.9,
    imgSrc: "/cat4.svg",
  },
  {
    id: "10",
    title: "Small Pet Bedding",
    brand: "Kaytee",
    category: "Supplies",
    subcategory: "Supplies for Small Pets",
    description: "Soft bedding for hamsters and guinea pigs",
    price: 15.99,
    reviews: 42,
    rating: 4.2,
    imgSrc: "/cat5.svg",
  },
  {
    id: "11",
    title: "Vet Dog Dry Food",
    brand: "Hills Science",
    category: "VetsCorner",
    subcategory: "Vet Dog Dry Food",
    description: "Veterinary diet for dogs with special needs",
    price: 62.99,
    reviews: 54,
    rating: 4.8,
    imgSrc: "/cat1.svg",
  },
  {
    id: "12",
    title: "Pet Sitting Service",
    brand: "PetCare Pro",
    category: "Services",
    subcategory: "Pet Sitting",
    description: "In-home pet sitting services",
    price: 35.0,
    reviews: 28,
    rating: 4.5,
    imgSrc: "/cat2.svg",
  },
]

// Get all unique brands with count
const getBrands = () => {
  const brandCounts: Record<string, number> = {}

  PRODUCTS.forEach((product) => {
    if (brandCounts[product.brand]) {
      brandCounts[product.brand]++
    } else {
      brandCounts[product.brand] = 1
    }
  })

  return Object.entries(brandCounts).map(([brand, count]) => ({
    name: brand,
    count,
  }))
}

const BRANDS = getBrands()

const Services = () => {
  // Find min and max prices from products
  const minProductPrice = Math.floor(Math.min(...PRODUCTS.map((p) => p.price)))
  const maxProductPrice = Math.ceil(Math.max(...PRODUCTS.map((p) => p.price)))

  const [priceRange, setPriceRange] = useState<[number, number]>([minProductPrice, maxProductPrice])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const isMobile = useMobile(768)
  const navigate = useNavigate() // React Router navigation hook

  // Apply filters
  useEffect(() => {
    const filtered = PRODUCTS.filter((product) => {
      // Price filter
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]

      // Category filter
      const categoryMatch = selectedCategory ? product.category === selectedCategory : true

      // Subcategory filter
      const subcategoryMatch =
        selectedSubCategories.length > 0 ? selectedSubCategories.includes(product.subcategory) : true

      // Brand filter
      const brandMatch = selectedBrands.length > 0 ? selectedBrands.includes(product.brand) : true

      return priceMatch && categoryMatch && subcategoryMatch && brandMatch
    })

    setFilteredProducts(filtered)
  }, [priceRange, selectedCategory, selectedSubCategories, selectedBrands])

  const toggleCategory = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category))
    setExpandedCategory((prev) => (prev === category ? null : category))
    setSelectedSubCategories([])
  }

  const toggleSubCategory = (subCategory: string) => {
    setSelectedSubCategories((prev) =>
      prev.includes(subCategory) ? prev.filter((sc) => sc !== subCategory) : [...prev, subCategory],
    )
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  // Handle product click to navigate to product detail
  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`)
  }

  return (
    <div className="flex flex-col md:flex-row w-full bg-background min-h-screen">
      {/* Mobile filter toggle button */}
      {isMobile && (
        <div className="sticky top-0 z-10 bg-background p-3 border-b shadow-sm">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <Filter size={18} />
            Filters
            {showMobileFilters ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </Button>
        </div>
      )}

      {/* Sidebar for filtration */}
      <aside
        className={`${
          isMobile
            ? `fixed inset-0 z-50 bg-background/95 backdrop-blur-sm transition-transform duration-300 ${
                showMobileFilters ? "translate-x-0" : "-translate-x-full"
              }`
            : "w-full md:w-1/4 md:max-w-xs sticky top-0 h-screen"
        }`}
      >
        <div className="flex flex-col h-full p-4 bg-muted/30 overflow-y-auto">
          {/* Close button for mobile */}
          {isMobile && (
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowMobileFilters(false)}>
                Close
              </Button>
            </div>
          )}

          {/* Banner image */}
          <div className="mb-6">
            <img src="/serBird.gif" alt="service" className="w-full rounded-lg shadow-md" />
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <h3 className="text-base font-semibold mb-3">Price Range</h3>
            <p className="mb-2 text-sm">
              ${priceRange[0]} - ${priceRange[1]}
            </p>
            <Slider
              defaultValue={priceRange}
              max={maxProductPrice}
              step={1}
              min={minProductPrice}
              onValueChange={(value) => setPriceRange([value[0], value[1]])}
              className="w-full"
            />
          </div>

          {/* Category Filters */}
          <div className="mb-6">
            <h3 className="text-base font-semibold mb-3">Categories</h3>
            <div className="space-y-2">
              {Object.keys(categories).map((category) => (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategory === category}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <Label
                        htmlFor={`category-${category}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category} ({PRODUCTS.filter((p) => p.category === category).length})
                      </Label>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => setExpandedCategory((prev) => (prev === category ? null : category))}
                    >
                      {expandedCategory === category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </Button>
                  </div>

                  {/* Subcategories */}
                  {expandedCategory === category && (
                    <div className="ml-6 space-y-1">
                      {categories[category as keyof typeof categories].map((subCategory) => {
                        const count = PRODUCTS.filter((p) => p.subcategory === subCategory).length
                        return (
                          <div key={subCategory} className="flex items-center space-x-2">
                            <Checkbox
                              id={`subcategory-${subCategory}`}
                              checked={selectedSubCategories.includes(subCategory)}
                              onCheckedChange={() => toggleSubCategory(subCategory)}
                              disabled={count === 0}
                            />
                            <Label
                              htmlFor={`subcategory-${subCategory}`}
                              className={`text-sm leading-none peer-disabled:cursor-not-allowed ${count === 0 ? "text-gray-400" : ""}`}
                            >
                              {subCategory} ({count})
                            </Label>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Brand Filters */}
          <div className="mb-6">
            <h3 className="text-base font-semibold mb-3">Brands</h3>
            <div className="space-y-2">
              {BRANDS.map((brand) => (
                <div key={brand.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand.name}`}
                    checked={selectedBrands.includes(brand.name)}
                    onCheckedChange={() => toggleBrand(brand.name)}
                  />
                  <Label
                    htmlFor={`brand-${brand.name}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {brand.name} ({brand.count})
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Apply Filters Button (Mobile Only) */}
          {isMobile && (
            <Button className="mt-auto mb-4" onClick={() => setShowMobileFilters(false)}>
              Apply Filters
            </Button>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4">
        {/* Banner image */}
        <div className="mb-8">
          <img
            src="/services.jpg"
            alt="Services Banner"
            className="w-full h-48 md:h-64 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Filter summary */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">
            {selectedCategory || "All Products"}
            {selectedSubCategories.length > 0 && ` › ${selectedSubCategories.join(", ")}`}
          </h1>
          <p className="text-muted-foreground">{filteredProducts.length} items available</p>
        </div>

        {/* Products grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div key={product.id} onClick={() => handleProductClick(product.id)}>
                <ProductWithChildren
                  id={product.id}
                  title={product.title}
                  brand={product.brand}
                  category={product.category}
                  subcategory={product.subcategory}
                  description={product.description}
                  price={product.price}
                  reviews={product.reviews}
                  rating={product.rating}
                  imgSrc={product.imgSrc}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No products match your filters.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setPriceRange([minProductPrice, maxProductPrice])
                setSelectedCategory(null)
                setSelectedSubCategories([])
                setSelectedBrands([])
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </main>

      {/* Overlay for mobile filters */}
      {isMobile && showMobileFilters && (
        <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setShowMobileFilters(false)} />
      )}
    </div>
  )
}

export default Services

