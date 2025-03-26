import { Link } from "react-router-dom"

interface PetCategory {
  [key: string]: string
}

interface ShopByPetProps {
  pets: PetCategory
}

export const ShopByPet = ({ pets }: ShopByPetProps) => {
  // Function to create the correct navigation path for each pet
  const getPetNavigationPath = (pet: string) => {
    // Convert pet name to lowercase and replace spaces with hyphens
    const formattedPet = pet.toLowerCase().replace(/\s+/g, "-")
    // Return the path to the shop page with appropriate filters
    return `/shop?category=Pets&subcategory=${formattedPet}`
  }

  return (
    <div className="flex flex-col gap-2 text-xl font-raleway items-center justify-center min-h-[40vh] max-w-[85vw]">
      <h2 className="text-3xl font-extrabold text-primary drop-shadow-lg">Shop By Pet</h2>
      <br />
      <div className="flex flex-wrap text-2xl gap-12 items-center justify-center">
        {Object.entries(pets).map(([pet, imgSrc]) => (
          <Link
            key={pet}
            to={getPetNavigationPath(pet)}
            className="flex flex-col items-center text-2xl font-bold justify-center border-b-[3px] border-primary py-2 text-textPrm hover:text-primary hover:font-extrabold transition-colors duration-300"
          >
            <img src={imgSrc || "/placeholder.svg"} alt={pet} className="w-36 h-36 mb-2" />
            <span>{pet}</span>
          </Link>
        ))}
      </div>
      <div className="w-[50vw] border-b-2 py-3 border-gray-400"></div>
    </div>
  )
}

