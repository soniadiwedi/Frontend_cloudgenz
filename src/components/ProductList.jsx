import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import CategoryFilter from "./CategoryFilter";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(""); // For debouncing
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("relevance");

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms delay

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        setError("Failed to fetch products. Please check your connection or try again later.");
        console.error("Product fetch error:", e);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setAllCategories(data);
      } catch (e) {
        setError((prev) => prev || "Failed to fetch categories.");
        setAllCategories([]);
        console.error("Category fetch error:", e);
      }
    };

    setLoading(true);
    Promise.all([fetchProducts(), fetchCategories()]).finally(() => {
      setLoading(false);
    });
  }, []);

  const filteredAndSortedProducts = products
    .filter((product) => {
      const matchCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchSearch = product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase().trim());
      return matchCategory && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name-asc") return a.title.localeCompare(b.title);
      if (sortBy === "name-desc") return b.title.localeCompare(a.title);
      return 0;
    });

  const ProductSkeleton = () => (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white animate-pulse">
      <div className="aspect-w-1 aspect-h-1 bg-gray-200 sm:h-64 md:h-56 lg:h-60 xl:h-64"></div>
      <div className="flex flex-1 flex-col p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="flex-grow"></div>
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-10 bg-gray-300 rounded w-full mt-2"></div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categories={allCategories}
        onCategorySelect={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-2 sm:px-4 lg:px-6 py-6">
          <div className="flex flex-col md:flex-row md:gap-6 lg:gap-8">
            <aside className="md:w-1/4 lg:w-1/5 bg-white p-4 rounded-lg shadow-sm mb-6 md:mb-0 self-start md:sticky md:top-24 max-h-[calc(100vh-7rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Filters</h2>
              <CategoryFilter
                categories={allCategories}
                selected={selectedCategory}
                onSelect={setSelectedCategory}
              />
              <div className="mt-6 pt-4 border-t">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Price Range</h3>
                <div className="text-sm text-gray-400 italic">Slider coming soon...</div>
              </div>
            </aside>

            <main className="md:w-3/4 lg:w-4/5">
              <div className="bg-white p-3 rounded-lg shadow-sm mb-4 flex flex-col sm:flex-row justify-between items-center gap-2">
                <p className="text-sm text-gray-600">
                  {loading ? "Loading..." : (
                    <>
                      Showing <span className="font-semibold">{filteredAndSortedProducts.length}</span> of <span className="font-semibold">{products.length}</span> products
                      {selectedCategory !== "all" && allCategories.includes(selectedCategory) && (
                        <> in <span className="font-semibold capitalize">{selectedCategory}</span></>
                      )}
                    </>
                  )}
                </p>
                <div className="flex items-center gap-2">
                  <label htmlFor="sort-by" className="text-sm text-gray-600 whitespace-nowrap">Sort by:</label>
                  <select
                    id="sort-by"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border-gray-300 rounded-md shadow-sm focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50 py-1.5 px-2"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md" role="alert">
                  <p className="font-bold">Oops! Something went wrong.</p>
                  <p>{error}</p>
                </div>
              )}

              {!error && (loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
                </div>
              ) : filteredAndSortedProducts.length === 0 ? (
                <div className="text-center py-10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-gray-400 mb-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75 9.75 9.75" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-700">No products found.</h3>
                  <p className="text-gray-500 mt-1">Try adjusting your search or filters.</p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                      setSortBy("relevance");
                    }}
                    className="mt-4 px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors"
                  >
                    Clear Filters & Search
                  </button>
                </div>
              ) : (
                <div id="product-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {filteredAndSortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ))}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
