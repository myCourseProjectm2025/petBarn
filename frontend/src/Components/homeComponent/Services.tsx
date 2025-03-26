import { Link } from "react-router-dom"

interface ServiceCategory {
  [key: string]: string
}

interface ServicesProps {
  services: ServiceCategory
}

export const Services = ({ services }: ServicesProps) => {
  // Function to create the correct navigation path for each service
  const getServiceNavigationPath = (service: string) => {
    // Convert service name to lowercase and replace spaces with hyphens
    const formattedService = service.toLowerCase().replace(/\s+/g, "-")
    // Return the path to the shop page with appropriate filters
    return `/shop?category=Services&subcategory=${formattedService}`
  }

  return (
    <div className="flex flex-col gap-2 text-xl py-3 font-raleway items-center justify-center min-h-[38vh] max-w-[75vw]">
      <div className="flex items-center gap-3">
        <h2 className="text-3xl font-extrabold text-primary drop-shadow-lg">SERVICES</h2>
        <Link to="/shop?category=Services" className="text-sm text-primary hover:underline">
          View all
        </Link>
      </div>
      <br />
      <div className="flex flex-wrap text-2xl gap-12 items-center justify-center">
        {Object.entries(services).map(([service, imgSrc]) => (
          <Link
            key={service}
            to={getServiceNavigationPath(service)}
            className="flex flex-col items-center text-2xl font-bold justify-center border-b-[3px] border-primary py-2 text-textPrm hover:text-primary hover:font-extrabold transition-colors duration-300"
          >
            <img src={imgSrc || "/placeholder.svg"} alt={service} className="w-36 h-36 mb-2" />
            <span>{service}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

