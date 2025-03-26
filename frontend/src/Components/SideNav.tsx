import { useEffect } from "react";
import { useMobile } from "../store/useMobile";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import useStore from "../store/useStore";

type SideNavProps = {
  imageSrc: string;
  pageName: string;
};





const SideNav: React.FC<SideNavProps> = ({ imageSrc, pageName }) => {
  const {
    categories,
    selectedCategory,
    selectedSubCategory,
    setSelectedCategory,
    setSelectedSubCategory,
    brands,
    selectedBrand,
    setSelectedBrand,
    priceRange,
    setPriceRange,
  } = useStore();

  const isMobile = useMobile(768);

  useEffect(() => {
  }, [selectedCategory, selectedSubCategory, selectedBrand, priceRange]);

  return (
    <div className={`flex w-full bg-background min-h-[100vh] ${isMobile ? "flex-col" : "flex-row"}`}>
      <nav className="flex bg-textPrm/30 justify-center w-1/4 min-h-[100vh] sticky left-0 top-0">
        <div className="flex flex-col gap-6">
          <img
            src={imageSrc}
            alt={pageName}
            className="w-full h-1/3 transition-all duration-500 ease-in-out"
          />
          <div className="border-t-2 h-auto max-w-[100vw] drop-shadow-xl p-4 text-l bg-textPrm">
            <Accordion type="multiple" className="w-full">
              <AccordionItem
                key="category"
                value="category"
                className="border-b"
              >
                <AccordionTrigger className="font-bold text-navBG">Category</AccordionTrigger>
                <AccordionContent>
                  <div className="mt-2 flex flex-col items-center">
                    {Object.keys(categories).map((category) => (
                      <div
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setSelectedSubCategory(null); // Reset subcategory on category change
                        }}
                        className={`cursor-pointer text-secondary text-l hover:text-navBG py-1 ${
                          selectedCategory === category ? "font-bold" : ""
                        }`}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Subcategories: Display based on selected category */}
              {selectedCategory && (
                <AccordionItem
                  key="subcategory"
                  value="subcategory"
                  className="border-b"
                >
                  <AccordionTrigger className="font-bold text-navBG">Subcategory</AccordionTrigger>
                  <AccordionContent>
                    <div className="mt-2 flex flex-col items-center">
                      {categories[selectedCategory]?.map((subcategory) => (
                        <div
                          key={subcategory}
                          onClick={() => setSelectedSubCategory(subcategory)}
                          className={`cursor-pointer text-secondary text-l hover:text-navBG py-1 ${
                            selectedSubCategory === subcategory ? "font-bold" : ""
                          }`}
                        >
                          {subcategory}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              <AccordionItem
                key="brand"
                value="brand"
                className="border-b"
              >
                <AccordionTrigger className="font-bold text-navBG">Brand</AccordionTrigger>
                <AccordionContent>
                  <div className="mt-2 flex flex-col items-center">
                    {brands.map((brand) => (
                      <div
                        key={brand}
                        onClick={() => setSelectedBrand(brand)}
                        className={`cursor-pointer text-secondary text-l hover:text-navBG py-1 ${
                          selectedBrand === brand ? "font-bold" : ""
                        }`}
                      >
                        {brand}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem
                key="price"
                value="price"
                className="border-b"
              >
                <AccordionTrigger className="font-bold text-navBG">Price Range</AccordionTrigger>
                <AccordionContent>
                  <div className="mt-2 flex flex-col items-center">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

            
            </Accordion>
            
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SideNav;
