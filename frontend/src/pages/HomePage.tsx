import {
  Banner,
  Welcome,
  ShopByPet,
  ProductSection,
  Services,
  DeliveryBanner,
  ImageBanner,
} from "../Components/homeComponent"

// Pet categories
const pets = {
  Cats: "/pet_cats.jpg",
  Dogs: "/pet_dogs.jpg",
  "Small Pets": "/pet_smallp.jpg",
  Birds: "/pet_birds.jpg",
  Fishes: "/pet_fishes.jpg",
}

// Service categories
const SERVICES = {
  "GROOMING @ CLINIC": "/grooming 1.svg",
  TRAINING: "/training.svg",
  "DOG WALKING": "/walking.svg",
  "PET SITTING": "/seater.svg",
  "Pet Ride": "/ride.svg",
  "MOBILE GROOMING": "/mobile-care.svg",
  "health care": "/caring.svg",
  "HOME VETERINARY CARE": "/home-care.svg",
}

// Product data
const Brands = [
  { name: "Royal Canin", imgSrc: "/cat1.svg", price: "8.99", rate: 4 },
  { name: "Purina", imgSrc: "/cat2.svg", price: "8.99", rate: 4 },
  { name: "Hills Science Diet", imgSrc: "/cat5.svg", price: "5.99", rate: 5 },
  { name: "Blue Buffalo", imgSrc: "/cat1.svg", price: "4.99", rate: 2 },
  { name: "Orijen", imgSrc: "/cat2.svg", price: "6.79", rate: 4 },
  { name: "Royal Canin1", imgSrc: "/cat5.svg", price: "6.66", rate: 3 },
  { name: "Purina1", imgSrc: "/cat1.svg", price: "5.99", rate: 5 },
  { name: "Hills Science Diet1", imgSrc: "/cat2.svg", price: "4.99", rate: 2 },
  { name: "Blue Buffalo1", imgSrc: "/cat5.svg", price: "6.79", rate: 4 },
  { name: "Orijen1", imgSrc: "/cat1.svg", price: "6.66", rate: 3 },
  { name: "Royal Canin2", imgSrc: "/cat2.svg", price: "8.99", rate: 4 },
  { name: "Purina2", imgSrc: "/cat5.svg", price: "5.99", rate: 5 },
  { name: "Hills Science Diet2", imgSrc: "/cat1.svg", price: "4.99", rate: 2 },
  { name: "Blue Buffalo2", imgSrc: "/cat2.svg", price: "6.79", rate: 4 },
  { name: "Orijen2", imgSrc: "/cat5.svg", price: "6.66", rate: 3 },
]

const NewReleased = [
  { name: "Cat Food Premium", imgSrc: "/cat1.svg", price: "8.99", rate: 4 },
  { name: "Luxury Cat Treats", imgSrc: "/cat2.svg", price: "5.99", rate: 5 },
  { name: "Organic Cat Litter", imgSrc: "/cat3.svg", price: "4.99", rate: 2 },
  { name: "Interactive Cat Toy", imgSrc: "/cat4.svg", price: "6.79", rate: 4 },
  { name: "Comfortable Cat Bed", imgSrc: "/cat5.svg", price: "6.66", rate: 3 },
]

const Favorites = [
  { name: "Cat Food Premium", imgSrc: "/cat1.svg", price: "8.99", rate: 4 },
  { name: "Luxury Cat Treats", imgSrc: "/cat2.svg", price: "5.99", rate: 5 },
  { name: "Organic Cat Litter", imgSrc: "/cat3.svg", price: "4.99", rate: 2 },
  { name: "Interactive Cat Toy", imgSrc: "/cat4.svg", price: "6.79", rate: 4 },
  { name: "Comfortable Cat Bed", imgSrc: "/cat5.svg", price: "6.66", rate: 3 },
]

const HomePage = () => {
  // Banner images
  const images = ["/dogBan.gif", "/catBan.gif"]
  const mobileImages = ["/CatMobile.gif", "/Dogmobile.gif"]

  return (
    <div className="flex-1 min-h-[100vh] max-w-[100vw] h-full flex flex-col items-center justify-start font-raleway">
      {/* Banner Section */}
      <Banner images={images} mobileImages={mobileImages} />

      {/* Welcome Section */}
      <Welcome />

      {/* Shop By Pet Section */}
      <ShopByPet pets={pets} />

      {/* New Released Products Section */}
      <ProductSection title="New Released" products={NewReleased} hideOnMobile={true} category="Foods" />

      {/* Services Section */}
      <Services services={SERVICES} />

      {/* Delivery Banner */}
      <DeliveryBanner />

      {/* Brands Section */}
      <ProductSection title="Brands" products={Brands} category="Brands" />

      {/* Recently Viewed Section */}
      <ProductSection title="Recently viewed" products={NewReleased} showDivider={false} category="RecentlyViewed" />

      {/* Love Banner */}
      <ImageBanner src="/loveBanner.png" alt="love Banner" />

      {/* Favorites Section */}
      <ProductSection title="Favorites" products={Favorites} category="Favorites" />
    </div>
  )
}

export default HomePage

