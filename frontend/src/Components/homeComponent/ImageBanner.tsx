interface ImageBannerProps {
    src: string
    alt: string
  }
  
  export const ImageBanner = ({ src, alt }: ImageBannerProps) => {
    return (
      <div className="flex flex-col gap-2 text-xl font-raleway items-center justify-center min-h-[38vh] max-w-[75vw]">
        <div className="flex flex-wrap text-2xl py-6 items-center justify-center">
          <img src={src || "/placeholder.svg"} alt={alt} />
        </div>
      </div>
    )
  }
  

  