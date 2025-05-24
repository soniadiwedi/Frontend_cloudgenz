 const CategoryFilter = ({ categories, selected, onSelect }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
        Shop by Category
      </h3>
      <button
        onClick={() => onSelect("all")}
        className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-150 ease-in-out
                    ${selected === "all" ? "bg-sky-600 text-white shadow-md hover:bg-sky-700" : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"}`}
      >
        All Products
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-150 ease-in-out capitalize
                      ${selected === category ? "bg-sky-600 text-white shadow-md hover:bg-sky-700" : "text-gray-700 hover:bg-gray-200 hover:text-gray-900"}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
export default CategoryFilter