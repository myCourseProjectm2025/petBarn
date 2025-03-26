"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { useMobile } from "../store/useMobile"

const footerArr = [
  {
    title: "Information",
    links: [
      "SiteMap",
      "Contact Us",
      "Search",
      "Blog",
      "New Products",
      "Delivery policy",
      "Privacy notice",
      "Terms & Conditions",
      "About Us",
    ],
  },
  {
    title: "My Account",
    links: ["My Account", "Orders", "Addresses", "Recently Viewed", "Shopping Cart"],
  },
  {
    title: "Customer Service",
    links: ["Apply for Vendor Account"],
  },
  {
    title: "Follow Us",
    links: ["My LinkedIn", "My GitHub"],
  },
]

export default function Footer() {
  const isMobile = useMobile(768) 

  return (
    <div className="border-t-2 h-auto max-w-[100vw] text-l drop-shadow-2xl bg-textPrm">
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
                        <div
                          key={idx}
                          className="cursor-pointer text-secondary text-l hover:text-navBG py-1 text-center"
                        >
                          {link}
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
                    <div
                      key={idx}
                      className="cursor-pointer text-secondary text-l justify-center text-center hover:text-navBG"
                    >
                      {link}
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

