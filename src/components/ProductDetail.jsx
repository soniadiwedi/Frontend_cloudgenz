import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import Navbar from "./Navbar";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then(setProduct)
      .catch(() => setError("Failed to fetch product detail"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <>
    <Navbar />
    <div className="p-4 max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600">&larr; Back to Products</button>
      <div className="flex flex-col md:flex-row gap-20  py-20">
        <img src={product.image} alt={product.title} className="w-full md:w-1/2 h-96 object-contain" />
        <div>
          <h2 className="text-2xl font-bold">{product.title}</h2>
          <p className="text-gray-700 text-xl my-2">₹{product.price}</p>
          <p className="text-sm text-gray-600 mb-2">{product.category}</p>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default ProductDetail
