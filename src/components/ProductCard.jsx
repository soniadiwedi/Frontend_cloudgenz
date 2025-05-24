import { Link } from "react-router-dom";
import StarRating from "./StarRating";

 const ProductCard = ({ product }) => {
  // Fallback for missing rating
  const rating = product.rating ? product.rating.rate : 0;
  const reviewCount = product.rating ? product.rating.count : 0;

  return (
    // Using <a> tag for simplicity if react-router-dom is not set up.
    // Replace with <Link to={`/product/${product.id}`}> if using react-router-dom
    <a
      href={`/product/${product.id}`} // Simple anchor link
      className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out"
    >
      <div className="aspect-w-1 aspect-h-1 bg-gray-50 sm:h-64 md:h-56 lg:h-60 xl:h-64"> {/* Consistent aspect ratio, responsive height */}
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain object-center p-4 transition-transform duration-300 group-hover:scale-105"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x400/E2E8F0/94A3B8?text=Image+Not+Found"; }}
        />
      </div>
      <div className="flex flex-1 flex-col p-4 space-y-2">
        <h3 className="text-sm font-medium text-gray-900 min-h-[2.5rem] line-clamp-2 group-hover:text-sky-600 transition-colors">
          {product.title}
        </h3>
        <p className="text-xs text-gray-500 capitalize">{product.category}</p>
        
        <div className="flex-grow"></div> {/* Pushes price and rating to bottom */}

        <div className="flex items-center justify-between mt-1">
            <p className="text-lg font-semibold text-gray-900">
            ${product.price.toFixed(2)}
            </p>
            {/* Optional: Discount Price
            <p className="text-sm text-gray-500 line-through ml-2">
                ${(product.price * 1.2).toFixed(2)}
            </p>
            */}
        </div>

        <StarRating rating={rating} count={reviewCount} />

        <button
          onClick={(e) => {
            e.preventDefault(); // Prevent navigation if it's an <a> tag
            console.log("Add to cart:", product.id);
            // Implement add to cart logic here
          }}
          className="mt-3 w-full bg-sky-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 transition-colors duration-200 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
        >
          Add to Cart
        </button>
      </div>
    </a>
  );
};
export default ProductCard
