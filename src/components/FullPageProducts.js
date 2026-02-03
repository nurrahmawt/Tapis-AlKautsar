import { useEffect, useRef, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/fullpage.css";

const kategoriOrder = [
  { key: "Dompet", label: "Dompet Tapis" },
  { key: "Selendang", label: "Selendang Tapis" },
  { key: "Sarung", label: "Sarung Tapis" },
  { key: "Peci", label: "Peci Tapis" },
  { key: "Lainnya", label: "Produk Lainnya" }
];

function FullPageProduk() {
  const containerRef = useRef(null);
  const [groupedProduk, setGroupedProduk] = useState({});

  useEffect(() => {
    const ambilProduk = async () => {
      const q = query(
        collection(db, "products"),
        where("isActive", "==", true) // 🔥 PENTING
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const grouped = {};
      data.forEach(p => {
        if (!grouped[p.kategori]) grouped[p.kategori] = [];
        grouped[p.kategori].push(p);
      });

      setGroupedProduk(grouped);
    };

    ambilProduk();
  }, []);

  return (
    <div className="slider-container" ref={containerRef}>
      {kategoriOrder.map(k => (
        <section className="slide" key={k.key}>
          <div className="content">
            <h1>{k.label}</h1>

            <div className="product-grid">
              {(groupedProduk[k.key] || []).map(p => {
                // =========================
                // 🔥 PESAN WHATSAPP (FIX)
                // =========================
                const pesan = `
Halo,
Saya tertarik dengan produk berikut:

• Produk : ${p.kategori}
• Motif  : ${p.nama}
• Harga  : ${p.harga}
• Waktu  : ${p.waktu} hari

Mohon info lebih lanjut.
Terima kasih.
                `;

                const waLink = `https://wa.me/6281912479025?text=${encodeURIComponent(
                  pesan
                )}`;

                return (
                  <div className="product-card" key={p.id}>
                    <img src={p.foto} alt={p.nama} />
                    <h3>{p.nama}</h3>
                    <p>Harga: {p.harga}</p>
                    <p>Waktu: {p.waktu} hari</p>

                    <a
                      className="wa-btn"
                      href={waLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Pesan via WhatsApp
                    </a>
                  </div>
                );
              })}

              {(!groupedProduk[k.key] ||
                groupedProduk[k.key].length === 0) && (
                <p style={{ color: "white" }}>
                  Belum ada produk
                </p>
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

export default FullPageProduk;