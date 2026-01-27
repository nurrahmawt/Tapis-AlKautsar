import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";
import "../styles/admin.css";
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const navigate = useNavigate();

  const [produkList, setProdukList] = useState([]);

  const [nama, setNama] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState("");
  const [waktu, setWaktu] = useState("");
  const [kategori, setKategori] = useState("Dompet");
  const [foto, setFoto] = useState(null);

  const [editId, setEditId] = useState(null);

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = () => {
    navigate("/");
  };

  // =========================
  // AMBIL PRODUK
  // =========================
  const ambilProduk = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    const data = snapshot.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));
    setProdukList(data);
  };

  useEffect(() => {
    ambilProduk();
  }, []);

  // =========================
  // UPLOAD FOTO (Cloudinary)
  // =========================
  const uploadKeCloudinary = async () => {
    const formData = new FormData();
    formData.append("file", foto);
    formData.append("upload_preset", "tapis_upload");

    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData
      }
    );

    const data = await res.json();
    if (!data.secure_url) throw new Error("Upload gagal");
    return data.secure_url;
  };

  // =========================
  // TAMBAH PRODUK
  // =========================
  const tambahProduk = async () => {
    if (!foto) {
      alert("Pilih foto dulu");
      return;
    }

    if (deskripsi.length > 200) {
      alert("Deskripsi maksimal 200 karakter");
      return;
    }

    const fotoURL = await uploadKeCloudinary();

    await addDoc(collection(db, "products"), {
      nama,
      deskripsi,
      harga,
      waktu,
      kategori,
      foto: fotoURL,
      isActive: true
    });

    resetForm();
    ambilProduk();
  };

  // =========================
  // EDIT PRODUK
  // =========================
  const pilihEdit = (p) => {
    setEditId(p.id);
    setNama(p.nama);
    setDeskripsi(p.deskripsi || "");
    setHarga(p.harga);
    setWaktu(p.waktu);
    setKategori(p.kategori);
  };

  const simpanEdit = async () => {
    if (deskripsi.length > 200) {
      alert("Deskripsi maksimal 200 karakter");
      return;
    }

    await updateDoc(doc(db, "products", editId), {
      nama,
      deskripsi,
      harga,
      waktu,
      kategori
    });

    resetForm();
    ambilProduk();
  };

  // =========================
  // HIDE / SHOW PRODUK
  // =========================
  const toggleActive = async (id, current) => {
    await updateDoc(doc(db, "products", id), {
      isActive: !current
    });

    setProdukList(prev =>
      prev.map(p =>
        p.id === id ? { ...p, isActive: !current } : p
      )
    );
  };

  const resetForm = () => {
    setEditId(null);
    setNama("");
    setDeskripsi("");
    setHarga("");
    setWaktu("");
    setKategori("Dompet");
    setFoto(null);
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>

      <input
        placeholder="Nama Produk"
        value={nama}
        onChange={e => setNama(e.target.value)}
      />

      <textarea
        placeholder="Deskripsi Produk (maks 200 karakter)"
        value={deskripsi}
        maxLength={200}
        onChange={e => setDeskripsi(e.target.value)}
      />
      <small>{deskripsi.length}/200</small>

      <select
        value={kategori}
        onChange={e => setKategori(e.target.value)}
      >
        <option>Dompet</option>
        <option>Selendang</option>
        <option>Sarung</option>
        <option>Peci</option>
        <option>Lainnya</option>
      </select>

      <input
        placeholder="Harga"
        value={harga}
        onChange={e => setHarga(e.target.value)}
      />

      <input
        placeholder="Waktu pengerjaan (hari)"
        value={waktu}
        onChange={e => setWaktu(e.target.value)}
      />

      {!editId && (
        <input
          type="file"
          accept="image/*"
          onChange={e => setFoto(e.target.files[0])}
        />
      )}

      <button onClick={editId ? simpanEdit : tambahProduk}>
        {editId ? "Simpan Perubahan" : "Tambah Produk"}
      </button>

      <hr />

      <h3>Daftar Produk</h3>

      {produkList.map(p => (
        <div
          key={p.id}
          className={`admin-item ${p.isActive === false ? "inactive" : ""}`}
        >
          <span>
            {p.nama} — {p.kategori}
            {!p.isActive && " (Disembunyikan)"}
          </span>

          <div className="admin-actions">
            <button onClick={() => pilihEdit(p)}>Edit</button>
            <button
              className="hide-btn"
              onClick={() => toggleActive(p.id, p.isActive)}
            >
              {p.isActive ? "Hide" : "Show"}
            </button>
          </div>
        </div>
      ))}
      <hr />

      <div className="logout-section">
        <button className="logout-btn" onClick={handleLogout}>
          Logout Admin
        </button>
      </div>
    </div>
  );
}

export default AdminPanel;