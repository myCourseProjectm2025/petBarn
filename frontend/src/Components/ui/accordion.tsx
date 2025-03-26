"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "../../lib/utils"

// Define context for accordion state
type AccordionContextType = {
  openItems: string[]
  toggleItem: (value: string) => void
  type: "single" | "multiple"
}

const AccordionContext = React.createContext<AccordionContextType | undefined>(undefined)

// Define context for individual accordion item state
type AccordionItemContextType = {
  isOpen: boolean
  value: string
}

const AccordionItemContext = React.createContext<AccordionItemContextType | undefined>(undefined)

// Hook to use accordion context
function useAccordion() {
  const context = React.useContext(AccordionContext)
  if (!context) {
    throw new Error("useAccordion must be used within an Accordion")
  }
  return context
}

// Hook to use accordion item context
function useAccordionItem() {
  const context = React.useContext(AccordionItemContext)
  if (!context) {
    throw new Error("useAccordionItem must be used within an AccordionItem")
  }
  return context
}

// Accordion component
interface AccordionProps {
  type: "single" | "multiple"
  className?: string
  children: React.ReactNode
}

export function Accordion({ type, className, children }: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<string[]>([])

  const toggleItem = React.useCallback(
    (value: string) => {
      if (type === "single") {
        setOpenItems(openItems.includes(value) ? [] : [value])
      } else {
        setOpenItems(openItems.includes(value) ? openItems.filter((item) => item !== value) : [...openItems, value])
      }
    },
    [openItems, type],
  )

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <div className={cn("w-full", className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

// AccordionItem component
interface AccordionItemProps {
  value: string
  className?: string
  children: React.ReactNode
}

export function AccordionItem({ value, className, children }: AccordionItemProps) {
  const { openItems } = useAccordion()
  const isOpen = openItems.includes(value)

  return (
    <AccordionItemContext.Provider value={{ isOpen, value }}>
      <div className={cn("border-b", className)} data-state={isOpen ? "open" : "closed"}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
}

// AccordionTrigger component
interface AccordionTriggerProps {
  className?: string
  children: React.ReactNode
}

export function AccordionTrigger({ className, children }: AccordionTriggerProps) {
  const { toggleItem } = useAccordion()
  const { value, isOpen } = useAccordionItem()

  return (
    <div className="flex">
      <button
        type="button"
        onClick={() => toggleItem(value)}
        className={cn(
          "flex flex-1 items-center justify-between py-4 text-center font-medium transition-all hover:text-navBG",
          className,
        )}
      >
        {children}
        <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform duration-200", isOpen && "rotate-180")} />
      </button>
    </div>
  )
}

// AccordionContent component
interface AccordionContentProps {
  className?: string
  children: React.ReactNode
}

export function AccordionContent({ className, children }: AccordionContentProps) {
  const { isOpen } = useAccordionItem()

  if (!isOpen) return null

  return (
    <div className={cn("overflow-hidden text-secondary", className)}>
      <div className="pb-4 pt-0">{children}</div>
    </div>
  )
}

