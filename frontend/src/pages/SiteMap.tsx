"use client"

import { Link } from "react-router-dom"
import { ChevronRight, Home, Search, MessageCircle, User, Truck, BookOpen, PawPrint } from "lucide-react"
import { Card, CardContent } from "../Components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../Components/ui/carousel"

// Sample blog posts for the slider
const recentPosts = [
  {
    id: "1",
    title: "How to Choose the Right Food for Your Pet",
    excerpt: "Learn about the nutritional needs of different pets and how to select the best food for them.",
    image: "/blog-post-1.jpg",
    date: "March 15, 2023",
  },
  {
    id: "2",
    title: "Top 10 Toys for Active Dogs",
    excerpt: "Discover the best toys to keep your energetic dog entertained and healthy.",
    image: "/blog-post-2.jpg",
    date: "February 28, 2023",
  },
  {
    id: "3",
    title: "Cat Grooming Tips for New Owners",
    excerpt: "Essential grooming advice for first-time cat owners to keep your feline friend happy and healthy.",
    image: "/blog-post-3.jpg",
    date: "January 20, 2023",
  },
]

// Sample categories for the slider
const categories = [
  { name: "Dogs", icon: "/pet_dogs.jpg", path: "/shop?category=Pets&subcategory=dogs" },
  { name: "Cats", icon: "/pet_cats.jpg", path: "/shop?category=Pets&subcategory=cats" },
  { name: "Fish", icon: "/pet_fishes.jpg", path: "/shop?category=Pets&subcategory=fish" },
  { name: "Birds", icon: "/pet_birds.jpg", path: "/shop?category=Pets&subcategory=birds" },
  { name: "Small Pets", icon: "/pet_smallp.jpg", path: "/shop?category=Pets&subcategory=small-pets" },
  { name: "Food", icon: "/cat1.svg", path: "/shop?category=Foods" },
  { name: "Supplies", icon: "/cat2.svg", path: "/shop?category=Supplies" },
  { name: "Services", icon: "/cat3.svg", path: "/shop?category=Services" },
]

const SiteMap = () => {

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Site Map</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Find everything you need to navigate our website. Explore our categories, services, and resources.
        </p>
      </div>

      {/* General Links Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
          <Home className="mr-2" /> General
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          <Link
            to="/"
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <Home className="h-6 w-6 text-primary mb-2" />
            <span className="text-sm">HomePage</span>
          </Link>
          <Link
            to="/shop"
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <Search className="h-6 w-6 text-primary mb-2" />
            <span className="text-sm">Search</span>
          </Link>
          <Link
            to="/blog"
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <BookOpen className="h-6 w-6 text-primary mb-2" />
            <span className="text-sm">Blog</span>
          </Link>
          <Link
            to="/contactUs"
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <MessageCircle className="h-6 w-6 text-primary mb-2" />
            <span className="text-sm">ContactUs</span>
          </Link>
          <Link
            to="/my_account"
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <User className="h-6 w-6 text-primary mb-2" />
            <span className="text-sm">My Account</span>
          </Link>
          <Link
            to="/delivery_policy"
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <Truck className="h-6 w-6 text-primary mb-2" />
            <span className="text-sm">Delivery Policy</span>
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4 flex items-center text-primary">
          <PawPrint className="mr-2" /> Categories
        </h2>
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {categories.map((category, index) => (
                <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
                  <Link to={category.path}>
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="flex flex-col items-center justify-center p-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
                          <img
                            src={category.icon || "/placeholder.svg"}
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium">{category.name}</span>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </div>

      {/* Blog Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold flex items-center text-primary">
            <BookOpen className="mr-2" /> Blog
          </h2>
          <Link to="/blog" className="text-primary hover:underline flex items-center">
            More Posts <ChevronRight size={16} />
          </Link>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {recentPosts.map((post, index) => (
                <CarouselItem key={index} className="basis-full sm:basis-1/2 md:basis-1/3">
                  <Link to={`/blog/${post.id}`}>
                    <Card className="hover:shadow-md transition-shadow h-full">
                      <CardContent className="p-0">
                        <div className="aspect-video w-full overflow-hidden">
                          <img
                            src={post.image || "/placeholder.svg?height=200&width=400"}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <div className="text-xs text-muted-foreground mb-2">{post.date}</div>
                          <h3 className="font-semibold mb-2 line-clamp-2">{post.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default SiteMap

