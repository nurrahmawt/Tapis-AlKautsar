import { Link } from "react-router-dom";
import "../styles/category.css";

import DompetIcon from "../assets/icons/dompet.png";
import SelendangIcon from "../assets/icons/selendang.png";
import SarungIcon from "../assets/icons/sarung.png";
import PeciIcon from "../assets/icons/peci.png";
import LainnyaIcon from "../assets/icons/lainnya.png";

const kategori = [
  { nama: "Dompet", path: "Dompet", icon: DompetIcon },
  { nama: "Selendang", path: "Selendang", icon: SelendangIcon },
  { nama: "Sarung", path: "Sarung", icon: SarungIcon },
  { nama: "Peci", path: "Peci", icon: PeciIcon },
  { nama: "Lainnya", path: "Lainnya", icon: LainnyaIcon },
];

function Category() {
  return (
    <div className="category-container">

      {/* ===== Top Nav / Breadcrumb ===== */}
      <nav className="top-nav breadcrumb">
        <Link to="/" className="crumb">Home</Link>
        <span className="separator">/</span>
        <span className="current">Kategori</span>
      </nav>

      {/* ===== Header ===== */}
      <div className="category-header">
        <h2 className="category-title">Pilih Jenis Produk</h2>
        <p className="category-subtitle">
          Pilih kategori untuk melihat produk yang tersedia
        </p>
      </div>

      {/* ===== Grid ===== */}
      <div className="category-grid">
        {kategori.map((k, i) => (
          <Link
            key={k.path}
            to={`/produk/${k.path}`}
            className="category-card"
            style={{ animationDelay: `${i * 0.12}s` }}
          >
            <div className="icon">
              <img src={k.icon} alt={k.nama} />
            </div>

            <div className="content">
              <span className="title">{k.nama}</span>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}

export default Category;