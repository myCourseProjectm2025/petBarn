"use client";

import {
  ListChecks,
  Search,
  ShoppingBasket,
  Store,
  UserRound,
} from "lucide-react";
import type React from "react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/Button";
import Footer from "./Footer";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { toast } from "./ui/use-toast";
import { Input } from "./ui/input";
import { NavMobile } from "./NavMobile";
import { useMobile } from "../store/useMobile";

const categories = {
  Pets: ["Dogs", "Fish", "Cats", "Birds", "Small Pets"],
  Foods: [
    "Food for Dogs",
    "Food for Cats",
    "Food for Fish",
    "Food for Birds",
    "Food for Small Pets",
  ],
  Supplies: [
    "Supplies for Dogs",
    "Supplies for Cats",
    "Supplies for Fish",
    "Supplies for Birds",
    "Supplies for Small Pets",
  ],
  Services: [
    "Grooming @Clinic",
    "Training",
    "Dog Walking",
    "Pet Sitting",
    "Pet Ride",
    "Mobile Grooming",
    "Home Veterinary Care",
  ],
  VetsCorner: [
    "Vet Dog Dry Food",
    "Vet Cat Dry Food",
    "Vet Dog Wet Food",
    "Vet Cat Wet Food",
  ],
};

const allSubcategories = Object.values(categories).flat();

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const isMobile = useMobile(768);

  const [commandOpen, setCommandOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);

    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      } else {
        setCommandOpen(true);
      }
    }, 100);

    toast({
      title: "Category Selected",
      description: `Now searching in "${category}"`,
      duration: 2000,
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      toast({
        title: "Empty Search",
        description: "Please enter a search term",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (selectedCategory) {
      console.log(
        `Searching for "${searchQuery}" in category "${selectedCategory}"`
      );
      toast({
        title: "Searching...",
        description: `Looking for "${searchQuery}" in ${selectedCategory}`,
        duration: 2000,
      });
    } else {
      console.log(`Searching for "${searchQuery}" across all categories`);
      toast({
        title: "Searching...",
        description: `Looking for "${searchQuery}" across all categories`,
        duration: 2000,
      });
    }

    setCommandOpen(false);
    //You would typically navigate to search results page or filter content
  };

  const handleSearchInputClick = () => {
    setCommandOpen(true);
  };

  // Get the appropriate items to display in search results
  const getSearchItems = () => {
    if (selectedCategory) {
      return categories[selectedCategory as keyof typeof categories] || [];
    }
    return allSubcategories;
  };

  return (
    <div className="flex flex-col drop-shadow-md max-w-[100vw] font-raleway">
      <header className="z-50 w-full border-b bg-background">
        <div className="mx-auto">
          <div className="flex h-14 bg-background drop-shadow-lg items-center justify-between gap-4 px-8">
            {/* LOGO section */}
            <div
              className={`flex items-center gap-8 ${
                isMobile ? "justify-center w-full" : "items-center"
              }`}
            >
              <a
                href="/"
                className="flex flex-row gap-2 font-bold text-xl text-primary font-caveat"
              >
                <span
                  className={`flex px-2 text-primary ${
                    isMobile ? "text-lg" : "text-3xl"
                  }`}
                >
                  <img src={"/PetsLovePetbarnLogo.svg"} alt="petBarn Logo" />
                </span>
              </a>

              {/* Mobile Navigation - positioned on the right for mobile */}
              {isMobile && (
                <div className="absolute right-4">
                  <NavMobile />
                </div>
              )}
            </div>

            {/* Search Section */}
{/* Todo: handle the search correctly */}
            {/* Search Input */}
            <div className="flex items-center text-xl gap-[10vw] drop-shadow-md md:gap-[12vw] lg:gap-[15vw] ">
              <div className="relative hidden md:flex w-75 md:w-70 lg:w-80 drop-shadow-lg flex-col">
                <div className="flex ">
                  <Button
                    className="ml-2 bg-primary hover:bg-primary/30 text-text1"
                    onClick={handleSearch}
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-[15%] justify-start text-text1 bg-secondary border border-gray-300 hover:bg-primary/10"
                    onClick={handleSearchInputClick}
                  >
                    <ListChecks className="mr-2 h-4 w-4" />
                    <span className="text-text1 truncate">
                      {searchQuery ||
                        `Search in ${selectedCategory || "All Categories"}`}
                    </span>
                  </Button>
                  <Input
                    type="text"
                    placeholder="Search Here"
                    className="flex-1 text-center border-none focus:ring-0 focus:outline-none"
                    value={searchQuery}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onChange={(e: any) => setSearchQuery(e.target.value)}
                  />
                </div>

                <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
                  <div className="flex items-center p-4 border-b">
                    <CommandInput
                      ref={searchInputRef}
                      placeholder={
                        selectedCategory
                          ? `Search in ${selectedCategory}...`
                          : "Search across all categories..."
                      }
                      value={searchQuery}
                      onValueChange={handleSearchChange}
                      className="flex-1"
                    />
                    <Button
                      className="ml-2 bg-primary hover:bg-primary/90 text-text1"
                      onClick={handleSearch}
                    >
                      Search
                    </Button>
                  </div>
                  <CommandList>
                    <CommandEmpty>
                      {searchQuery.trim() === ""
                        ? "Type something to search"
                        : "No results found."}
                    </CommandEmpty>

                    {!selectedCategory && (
                      <CommandGroup heading="Categories">
                        {Object.keys(categories).map((category) => (
                          <CommandItem
                            key={category}
                            onSelect={() => handleCategorySelect(category)}
                          >
                            {category}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}

                    <CommandGroup
                      heading={
                        selectedCategory
                          ? `Items in ${selectedCategory}`
                          : "Popular Items"
                      }
                    >
                      {getSearchItems()
                        .slice(0, 8)
                        .map((item) => (
                          <CommandItem
                            key={item}
                            onSelect={() => {
                              setSearchQuery(item);
                              handleSearch();
                            }}
                          >
                            {item}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </CommandDialog>
              </div>

              {/* Right section */}
              <div className="flex flex-row drop-shadow-md">
                <div
                  className={`${
                    isMobile ? "hidden" : "flex"
                  } items-center text-xl gap-3`}
                >
                  <Link
                    to="/cart"
                    className="flex flex-row items-center gap-2 rounded-sm py-1 px-1 md:px-3 text-text1 hover:text-primary font-semibold transition-all duration-500 drop-shadow-lg"
                  >
                    <ShoppingBasket
                      className="h-5 w-5 text-primary"
                      strokeWidth={3}
                    />
                    <span className="hidden px-1 lg:flex">Cart</span>
                  </Link>
                  <Link
                    to="/shop"
                    className="flex flex-row items-center gap-2 rounded-sm py-1 px-1 md:px-3 text-text1 hover:text-primary font-semibold drop-shadow-lg"
                  >
                    <Store
                      className="h-5 w-5 mr-0 lg:mr-2 text-primary"
                      strokeWidth={3}
                    />
                    <span className="hidden px-1 lg:flex">Shop</span>
                  </Link>
                  <Link
                    to="/user"
                    className="flex flex-row items-center gap-2 rounded-sm py-1 px-1 md:px-3 text-text1 hover:text-primary font-semibold drop-shadow-lg"
                  >
                    <UserRound
                      className="h-5 w-5 mr-0 lg:mr-2 text-primary"
                      strokeWidth={3}
                    />
                    <span className="hidden px-1 lg:flex ">User</span>
                  </Link>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 bg-background max-w-[100vw] min-h-[100vh] overflow-hidden">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
