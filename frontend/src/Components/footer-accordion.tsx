import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

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

export function FooterAccordion() {
  return (
    <div className="border-t-2 h-auto max-w-[100vw] drop-shadow-xl p-4 text-l bg-textPrm">
      <Accordion type="multiple" className="w-full">
        {footerArr.map((section, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className={index !== footerArr.length - 1 ? "border-b" : ""}
          >
            <AccordionTrigger className="font-bold text-navBG">{section.title}</AccordionTrigger>
            <AccordionContent>
              <div className="mt-2 flex flex-col items-center">
                {section.links.map((link, idx) => (
                  <div key={idx} className="cursor-pointer text-secondary text-l hover:text-navBG py-1">
                    {link}
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <p className="text-center text-sm mt-4 text-secondary">
        Copyright © {new Date().getFullYear()} OMAR IBRAHIM. All rights reserved.
      </p>
    </div>
  )
}

