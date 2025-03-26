"use client";
import { useState, useEffect } from "react";
import { Filter, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import ProductWithChildren from "../Components/Common/ProductWithChildren";
import { Slider } from "../Components/ui/slider";
import { Checkbox } from "../Components/ui/checkbox";
import { useMobile } from "../store/useMobile";
import { Button } from "../Components/ui/Button";
import { Label } from "../Components/ui/label";
import categories from "../Mocks/MockCategory";
import { useNavigate } from "react-router-dom";
import categoryImages from "../Mocks/CategoryImages";
import PRODUCTS from "../Mocks/Products";

// Get all unique brands with count
const getBrands = () => {
  const brandCounts: Record<string, number> = {};

  PRODUCTS.forEach((product) => {
    if (brandCounts[product.brand]) {
      brandCounts[product.brand]++;
    } else {
      brandCounts[product.brand] = 1;
    }
  });

  return Object.entries(brandCounts).map(([brand, count]) => ({
    name: brand,
    count,
  }));
};

const BRANDS = getBrands();

// Group products by category
const groupProductsByCategory = (products: typeof PRODUCTS) => {
  const grouped: Record<string, typeof PRODUCTS> = {};

  products.forEach((product) => {
    if (!grouped[product.category]) {
      grouped[product.category] = [];
    }
    grouped[product.category].push(product);
  });

  return grouped;
};

const Shop = () => {
  // Find min and max prices from products
  const minProductPrice = Math.floor(Math.min(...PRODUCTS.map((p) => p.price)));
  const maxProductPrice = Math.ceil(Math.max(...PRODUCTS.map((p) => p.price)));

  const [priceRange, setPriceRange] = useState<[number, number]>([
    minProductPrice,
    maxProductPrice,
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(
    []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [categoryVisibleCount, setCategoryVisibleCount] = useState<
    Record<string, number>
  >({});

  const isMobile = useMobile(768);
  const navigate = useNavigate();

  // Group products by category
  const groupedProducts = groupProductsByCategory(filteredProducts);

  // Get the appropriate banner image based on selected category
  const getSidebarBannerImage = () => {
    if (
      selectedCategory &&
      categoryImages.categories[
        selectedCategory as keyof typeof categoryImages.categories
      ]
    ) {
      return categoryImages.categories[
        selectedCategory as keyof typeof categoryImages.categories
      ];
    }
    return categoryImages.categories.default;
  };

  // Get the appropriate shop banner image based on selected category
  const getShopBannerImage = () => {
    if (
      selectedCategory &&
      categoryImages.shopBanners[
        selectedCategory as keyof typeof categoryImages.shopBanners
      ]
    ) {
      return categoryImages.shopBanners[
        selectedCategory as keyof typeof categoryImages.shopBanners
      ];
    }
    return categoryImages.shopBanners.default;
  };

  // Initialize visible counts for each category
  useEffect(() => {
    const initialCounts: Record<string, number> = {};
    Object.keys(groupedProducts).forEach((category) => {
      initialCounts[category] = 12;
    });
    setCategoryVisibleCount(initialCounts);
  }, []);

  // Apply filters
  useEffect(() => {
    const filtered = PRODUCTS.filter((product) => {
      // Price filter
      const priceMatch =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      // Category filter
      const categoryMatch = selectedCategory
        ? product.category === selectedCategory
        : true;

      // Subcategory filter
      const subcategoryMatch =
        selectedSubCategories.length > 0
          ? selectedSubCategories.includes(product.subcategory)
          : true;

      // Brand filter
      const brandMatch =
        selectedBrands.length > 0
          ? selectedBrands.includes(product.brand)
          : true;

      return priceMatch && categoryMatch && subcategoryMatch && brandMatch;
    });

    setFilteredProducts(filtered);

    // Reset visible counts when filters change
    const initialCounts: Record<string, number> = {};
    const grouped = groupProductsByCategory(filtered);
    Object.keys(grouped).forEach((category) => {
      initialCounts[category] = 12;
    });
    setCategoryVisibleCount(initialCounts);
  }, [priceRange, selectedCategory, selectedSubCategories, selectedBrands]);

  const toggleCategory = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
    setExpandedCategory((prev) => (prev === category ? null : category));
    setSelectedSubCategories([]);
  };

  const toggleSubCategory = (subCategory: string) => {
    setSelectedSubCategories((prev) =>
      prev.includes(subCategory)
        ? prev.filter((sc) => sc !== subCategory)
        : [...prev, subCategory]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // Handle product click to navigate to product detail
  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  // Handle "Show more" click
  const handleShowMore = (category: string) => {
    setCategoryVisibleCount((prev) => ({
      ...prev,
      [category]: (prev[category] || 12) + 12,
    }));
  };

  // Navigate to category page
  const navigateToCategory = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategories([]);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col md:flex-row w-full bg-textPrm/20 min-h-screen">
      {/* Mobile filter toggle button */}
      {isMobile && (
        <div className="sticky top-0 z-10 bg-background p-3 border-b shadow-sm">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <Filter size={18} />
            Filters
            {showMobileFilters ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </Button>
        </div>
      )}

      {/* Sidebar for filtration */}
      <aside
        className={`${
          isMobile
            ? `fixed inset-0 z-50 bg-background/95 backdrop-blur-sm transition-transform duration-300 ${
                showMobileFilters ? "translate-x-0" : "-translate-x-full"
              }`
            : "w-full md:w-1/4 md:max-w-xs sticky top-0 bg-textPrm/40 h-[100vh]"
        }`}
      >
        <div className="flex flex-col h-full p-4  overflow-y-auto">
          {/* Close button for mobile */}
          {isMobile && (
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Filters</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileFilters(false)}
              >
                Close
              </Button>
            </div>
          )}

          {/* Dynamic Banner image based on selected category */}
          <div className="mb-6 bg-background/20 ">
            <img
              src={getSidebarBannerImage() || "/serBird.gif"}
              alt={selectedCategory || "Shop by category"}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <h3 className="text-base font-semibold mb-3">Price Range</h3>
            <p className="mb-2 text-sm">
              ${priceRange[0]} - ${priceRange[1]}
            </p>
            <Slider
              defaultValue={priceRange}
              max={maxProductPrice}
              step={1}
              min={minProductPrice}
              onValueChange={(value) => setPriceRange([value[0], value[1]])}
              className="w-full"
            />
          </div>

          {/* Category Filters */}
          <div className="mb-6 ">
            <h3 className="text-base font-semibold mb-3">Categories</h3>
            <div className="space-y-2 ">
              {Object.keys(categories).map((category) => (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategory === category}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <Label
                        htmlFor={`category-${category}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category} (
                        {PRODUCTS.filter((p) => p.category === category).length}
                        )
                      </Label>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() =>
                        setExpandedCategory((prev) =>
                          prev === category ? null : category
                        )
                      }
                    >
                      {expandedCategory === category ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </Button>
                  </div>

                  {/* Subcategories */}
                  {expandedCategory === category && (
                    <div className="ml-6 space-y-1">
                      {categories[category as keyof typeof categories].map(
                        (subCategory) => {
                          const count = PRODUCTS.filter(
                            (p) => p.subcategory === subCategory
                          ).length;
                          return (
                            <div
                              key={subCategory}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`subcategory-${subCategory}`}
                                checked={selectedSubCategories.includes(
                                  subCategory
                                )}
                                onCheckedChange={() =>
                                  toggleSubCategory(subCategory)
                                }
                                disabled={count === 0}
                              />
                              <Label
                                htmlFor={`subcategory-${subCategory}`}
                                className={`text-sm leading-none peer-disabled:cursor-not-allowed ${
                                  count === 0 ? "text-gray-400" : ""
                                }`}
                              >
                                {subCategory} ({count})
                              </Label>
                            </div>
                          );
                        }
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Brand Filters */}
          <div className="mb-6 ">
            <h3 className="text-base font-semibold mb-3">Brands</h3>
            <div className="space-y-2">
              {BRANDS.map((brand) => (
                <div key={brand.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand.name}`}
                    checked={selectedBrands.includes(brand.name)}
                    onCheckedChange={() => toggleBrand(brand.name)}
                  />
                  <Label
                    htmlFor={`brand-${brand.name}`}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {brand.name} ({brand.count})
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Apply Filters Button (Mobile Only) */}
          {isMobile && (
            <Button
              className="mt-auto mb-4"
              onClick={() => setShowMobileFilters(false)}
            >
              Apply Filters
            </Button>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4">
        {/* Dynamic Banner image based on selected category */}
        <div className="mb-8">
          <img
            src={getShopBannerImage() || "/placeholder.svg"}
            alt={
              selectedCategory
                ? `${selectedCategory} Products`
                : "Shop All Products"
            }
            className="w-full h-48 md:h-64 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Filter summary */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">
            {selectedCategory || "All Products"}
            {selectedSubCategories.length > 0 &&
              ` › ${selectedSubCategories.join(", ")}`}
          </h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} items available
          </p>
        </div>

        {/* Products by category */}
        {Object.keys(groupedProducts).length > 0 ? (
          <div className="space-y-12">
            {Object.entries(groupedProducts).map(([category, products]) => (
              <div key={category} className="space-y-6">
                {/* Category header */}
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-primary">{category}</h2>
                  <div className="h-px flex-1 bg-muted"></div>
                </div>

                {/* Products grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {products
                    .slice(0, categoryVisibleCount[category] || 12)
                    .map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleProductClick(product.id)}
                      >
                        <ProductWithChildren
                          id={product.id}
                          title={product.title}
                          brand={product.brand}
                          category={product.category}
                          subcategory={product.subcategory}
                          description={product.description}
                          price={product.price}
                          reviews={product.reviews}
                          rating={product.rating}
                          imgSrc={product.imgSrc}
                        />
                      </div>
                    ))}
                </div>

                {/* Show more button */}
                {products.length > (categoryVisibleCount[category] || 12) && (
                  <div className="flex justify-center mt-6">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2"
                      onClick={() => handleShowMore(category)}
                    >
                      Show more from {category}
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                )}

                {/* Category navigation button */}
                <div className="flex justify-center mt-2">
                  <Button
                    variant="link"
                    className="text-primary"
                    onClick={() => navigateToCategory(category)}
                  >
                    Browse all {category} products
                  </Button>
                </div>

                {/* Separator */}
                <div className="h-px bg-muted/70 w-full mt-6"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-14">
            <p className="text-lg text-muted-foreground">
              No products match your filters.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setPriceRange([minProductPrice, maxProductPrice]);
                setSelectedCategory(null);
                setSelectedSubCategories([]);
                setSelectedBrands([]);
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </main>

      {/* Overlay for mobile filters */}
      {isMobile && showMobileFilters && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setShowMobileFilters(false)}
        />
      )}
    </div>
  );
};

export default Shop;
