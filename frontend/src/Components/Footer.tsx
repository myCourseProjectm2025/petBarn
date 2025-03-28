"use client"

import { Link } from "react-router-dom"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { useMobile } from "../store/useMobile"
import { ExternalLink } from "lucide-react"

// Updated footer array with link paths
const footerArr = [
  {
    title: "Information",
    links: [
      { text: "SiteMap", path: "/sitemap" },
      { text: "Contact Us", path: "/contactUs" },
      { text: "Search", path: "/shop" },
      { text: "Blog", path: "/blog" },
      { text: "New Products", path: "/shop?sort=newest" },
      { text: "Delivery policy", path: "/delivery_policy" },
      { text: "Privacy notice", path: "/privacy" },
      { text: "Terms & Conditions", path: "/terms" },
      { text: "About Us", path: "/about" },
    ],
  },
  {
    title: "My Account",
    links: [
      { text: "My Account", path: "/my_account" },
      { text: "Orders", path: "/my_account/orders" },
      { text: "Addresses", path: "/my_account/addresses" },
      { text: "Recently Viewed", path: "/my_account/recently-viewed" },
      { text: "Shopping Cart", path: "/cart" },
    ],
  },
  {
    title: "Customer Service",
    links: [{ text: "Apply for Vendor Account", path: "/vendor-application" }],
  },
  {
    title: "Follow Us",
    links: [
      { text: "My LinkedIn", path: "https://linkedin.com/in/omarkibrahim", external: true },
      { text: "My GitHub", path: "https://github.com/omarkh94", external: true },
    ],
  },
]

export default function Footer() {
  const isMobile = useMobile(768)

  // Function to render links with proper navigation
  const renderLink = (link: { text: string; path: string; external?: boolean }, className: string) => {
    if (link.external) {
      return (
        <a
          href={link.path}
          target="_blank"
          rel="noopener noreferrer"
          className={`${className} flex items-center justify-center`}
        >
          {link.text}
          <ExternalLink size={14} className="ml-1" />
        </a>
      )
    }

    return (
      <Link to={link.path} className={className}>
        {link.text}
      </Link>
    )
  }

  return (
    <div className="border-t-2 h-auto max-w-[100vw] text-l shadow-inner shadow-2xl bg-textPrm">
      {isMobile ? (
        // Mobile Accordion Footer
        <div className="flex flex-col items-center py-4">
          <div className="w-[85vw]">
            <Accordion type="multiple" className="w-full">
              {footerArr.map((section, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b">
                  <AccordionTrigger className="font-bold text-navBG justify-center text-center">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-2 flex flex-col items-center">
                      {section.links.map((link, idx) => (
                        <div key={idx} className="py-1 text-center">
                          {renderLink(
                            link,
                            "cursor-pointer text-secondary text-l hover:text-navBG hover:underline transition-colors",
                          )}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <p className="text-center text-sm mt-4 text-secondary">
            Copyright © {new Date().getFullYear()} OMAR IBRAHIM. All rights reserved.
          </p>
        </div>
      ) : (
        // Original Desktop Footer
        <div className="pl-20 pt-4 pb-4">
          <div className="grid grid-flow-col text-l gap-6">
            {footerArr.map((section, index) => (
              <div key={index} className={`flex flex-col ${index !== footerArr.length - 1 ? "border-r-2 pr-2" : ""}`}>
                <span className="font-bold text-navBG justify-center text-center">{section.title}</span>
                <div className="mt-2">
                  {section.links.map((link, idx) => (
                    <div key={idx} className="justify-center text-center">
                      {renderLink(
                        link,
                        "cursor-pointer text-secondary text-l hover:text-navBG hover:underline transition-colors",
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm mt-1 text-secondary">
            Copyright © {new Date().getFullYear()} OMAR IBRAHIM. All rights reserved.
          </p>
        </div>
      )}
    </div>
  )
}

