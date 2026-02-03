import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import "../styles/product.css";

function ProductList() {
  const { kategori } = useParams();
  const [produk, setProduk] = useState([]);

  useEffect(() => {
    const ambilProduk = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const data = snapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        .filter(p => p.isActive !== false)
        .filter(
          p => p.kategori?.toLowerCase() === kategori?.toLowerCase()
        );

      setProduk(data);
    };

    ambilProduk();
  }, [kategori]);

  const formatRupiah = (angka) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(angka);

  const buatPesanWA = (p) => {
    const pesan = `
Halo,
Saya tertarik dengan produk berikut:

• Produk : ${p.kategori}
• Motif  : ${p.nama}
• Harga  : ${formatRupiah(Number(p.harga.replace(/\./g, "")))}
• Waktu  : ${p.waktu}

Mohon info lebih lanjut.
Terima kasih.
    `;
    return encodeURIComponent(pesan);
  };

  return (
    <>
      {/* ===== BREADCRUMB ===== */}
      <div className="breadcrumb-bar">
        <nav className="breadcrumb">
          <Link to="/" className="crumb">Home</Link>
          <span className="separator">/</span>
          <Link to="/kategori" className="crumb">Kategori</Link>
          <span className="separator">/</span>
          <span className="current">{kategori}</span>
        </nav>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="container">
        <header className="page-header">
          <h2>
            Koleksi <span>{kategori}</span>
          </h2>
          <p>Produk UMKM tapis handmade berkualitas</p>
        </header>

        <div className="product-grid">
          {produk.length === 0 ? (
            <div className="empty-state">Produk belum tersedia</div>
          ) : (
            produk.map(p => (
              <div className="product-card horizontal" key={p.id}>
                <div className="image-container horizontal-img">
                  <img src={p.foto} alt={p.nama} />
                </div>

                <div className="horizontal-info">
                  <h3 className="product-title">{p.nama}</h3>

                  <p className="product-desc">
                    {p.deskripsi?.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>

                  <p className="price">
                    🏷️ {formatRupiah(Number(p.harga.replace(/\./g, "")))}
                  </p>

                  <p className="meta-info">
                    🕒 Estimasi Pengerjaan: {p.waktu}
                  </p>

                  <a
                    className="wa-btn"
                    href={`https://wa.me/6281912479025?text=${buatPesanWA(p)}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="wa-icon"
                      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                      alt="WhatsApp"
                    />
                    <span className="wa-text">Pesan via WhatsApp</span>
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default ProductList;