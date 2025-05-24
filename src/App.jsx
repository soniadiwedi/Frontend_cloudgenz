import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList"
import ProductDetail from "./components/ProductDetail"

const App = () => {
  return (
    <>
    
    <Router>
     
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
     <footer className="bg-slate-800 text-gray-300 py-8 mt-auto ">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} CloudGenZ. All rights reserved.</p>
            <p className="mt-1">Inspired by modern e-commerce design.</p>
        </div>
      </footer>
    </>

  )
}

export default App