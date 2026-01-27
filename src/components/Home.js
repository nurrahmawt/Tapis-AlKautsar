import { Link } from "react-router-dom";
import "../styles/home.css";

function Home() {
  return (
    <div className="home">
      
      {/* NAVBAR */}
      <div className="top-nav">
        <div className="nav-left">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/kategori" className="nav-link">Produk</Link>
          <Link to="/tentang" className="nav-link">Tentang</Link>
        </div>

        <div className="nav-right">
          <Link to="/login" className="login-btn">Login</Link>
        </div>
      </div>

      {/* HERO / SLIDESHOW */}
      <div className="slideshow">
        <div className="slide active">
          <h1>UMKM Tapis Al-Kautsar</h1>
          <p>Kerajinan Tangan Khas Lampung</p>

          <Link to="/kategori" className="btn">
            Jelajahi Produk
          </Link>
        </div>
      </div>

    </div>
  );
}

export default Home;