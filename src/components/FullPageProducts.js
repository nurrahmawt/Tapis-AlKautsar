import { useEffect, useRef, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/fullpage.css";

const kategoriOrder = [
  { key: "Dompet", label: "Dompet Tapis", warna: "color-1" },
  { key: "Selendang", label: "Selendang Tapis", warna: "color-2" },
  { key: "Sarung", label: "Sarung Tapis", warna: "color-3" },
  { key: "Peci", label: "Peci Tapis", warna: "color-1" },
  { key: "Lainnya", label: "Produk Lainnya", warna: "color-2" }
];

function FullPageProduk() {
  const containerRef = useRef(null);
  const isScrolling = useRef(false);
  const [index, setIndex] = useState(0);
  const [groupedProduk, setGroupedProduk] = useState({});

  useEffect(() => {
    const ambilProduk = async () => {
      const q = query(
        collection(db, "products"),
        where("isActive", "==", true)
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const grouped = {};
      data.forEach(p => {
        const key = p.kategori.toLowerCase();
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(p);
      });

      setGroupedProduk(grouped);
    };

    ambilProduk();
  }, []);

  useEffect(() => {
    const slides = containerRef.current?.children;
    if (!slides) return;

    slides[0]?.classList.add("active");

    const handleWheel = (e) => {
      if (isScrolling.current) return;
      isScrolling.current = true;

      if (e.deltaY > 0 && index < slides.length - 1) {
        setIndex(prev => prev + 1);
      } else if (e.deltaY < 0 && index > 0) {
        setIndex(prev => prev - 1);
      }

      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [index]);

  /* ===============================
     UPDATE TRANSFORM
     =============================== */
  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.style.transform =
      `translateY(-${index * 100}vh)`;

    [...containerRef.current.children].forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  }, [index]);

  /* ===============================
     RENDER
     =============================== */
  return (
    <div className="slider-container" ref={containerRef}>
      {kategoriOrder.map(k => (
        <section className={`slide ${k.warna}`} key={k.key}>
          <div className="content">
            <h1>{k.label}</h1>

            <div className="product-grid">
              {(groupedProduk[k.key] || []).map(p => (
                <div className="product-card" key={p.id}>
                  <img src={p.foto} alt={p.nama} />
                  <h3>{p.nama}</h3>
                  <p>Harga: {p.harga}</p>
                  <p>Waktu: {p.waktu}</p>

                  <a
                    className="wa-btn"
                    href={`https://wa.me/6281912479025?text=Halo, saya tertarik dengan ${p.nama}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Pesan via WhatsApp
                  </a>
                </div>
              ))}

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