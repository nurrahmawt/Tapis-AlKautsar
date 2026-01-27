import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";
import Category from "./components/Category";
import ProductList from "./components/ProductList";
import FullPageProducts from "./components/FullPageProducts";
import Tentang from "./components/Tentang";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/kategori" element={<Category />} />
        <Route path="/produk/:kategori" element={<ProductList />} />
        <Route path="/produk" element={<FullPageProducts />} />
        <Route path="/tentang" element={<Tentang />} />
      </Routes>
    </Router>
  );
}

export default App;