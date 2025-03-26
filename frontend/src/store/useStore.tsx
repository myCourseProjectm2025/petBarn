import { create } from "zustand";

type Product = {
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  price: number;
};

type Store = {
  categories: Record<string, string[]>; // e.g., { "Supplies": ["Supplies for Dogs", ...] }
  selectedCategory: string | null;
  selectedSubCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  setSelectedSubCategory: (subcategory: string | null) => void;

  brands: string[];
  selectedBrand: string | null;
  setSelectedBrand: (brand: string | null) => void;

  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;

  products: Product[];
  filteredProducts: Product[];
  filterProducts: () => void;
};

const useStore = create<Store>((set, get) => ({
  categories: {
    Supplies: ["Supplies for Dogs", "Supplies for Cats"],
    Foods: ["Food for Dogs", "Food for Cats"],
  },
  selectedCategory: null,
  selectedSubCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedSubCategory: (subcategory) => set({ selectedSubCategory: subcategory }),

  brands: ["8in1", "Royal Canin", "Pedigree"],
  selectedBrand: null,
  setSelectedBrand: (brand) => set({ selectedBrand: brand }),

  priceRange: [0, 100],
  setPriceRange: (range) => set({ priceRange: range }),

  products: [
    { name: "8in1 ® Beef Delights Bones S", category: "Supplies", subcategory: "Supplies for Dogs", brand: "8in1", price: 25 },
    { name: "Royal Canin Dry Dog Food", category: "Foods", subcategory: "Food for Dogs", brand: "Royal Canin", price: 50 },
  ],
  filteredProducts: [],
  filterProducts: () => {
    const { products, selectedCategory, selectedSubCategory, selectedBrand, priceRange } = get();
    const [minPrice, maxPrice] = priceRange;

    const filtered = products.filter((product) => {
      return (
        (!selectedCategory || product.category === selectedCategory) &&
        (!selectedSubCategory || product.subcategory === selectedSubCategory) &&
        (!selectedBrand || product.brand === selectedBrand) &&
        product.price >= minPrice &&
        product.price <= maxPrice
      );
    });

    set({ filteredProducts: filtered });
  },
}));

export default useStore;
