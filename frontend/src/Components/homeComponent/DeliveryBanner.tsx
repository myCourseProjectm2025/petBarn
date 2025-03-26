"use client"

import { useMobile } from "../../store/useMobile"

export const DeliveryBanner = () => {
const isMobile = useMobile(768)
  

  return (
    <div className="flex flex-col gap-2 text-xl font-raleway items-center justify-center min-h-[38vh] w-full">
      <div className="flex flex-wrap text-2xl py-6 items-center justify-center">
        <img src={isMobile ? "/deliveryMobile.png" : "/deliveryDesktop.png"} alt="Delivery Post" />
      </div>
    </div>
  )
}

