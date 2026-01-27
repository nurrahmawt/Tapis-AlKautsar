import "../styles/tentang.css";
import IbuFoto from "../assets/images/ibu.png";

function Tentang() {
  return (
    <div className="tentang-container">
      <h2 className="tentang-title">Tentang UMKM</h2>

      <div className="tentang-card">
        <img src={IbuFoto} alt="Pemilik UMKM Tapis" />

        <div className="tentang-content">
          <h3>Ibu Zulita</h3>

          <p>
            UMKM Tapis Al-Kautsar merupakan usaha rumahan milik Ibu Zulita yang
            bergerak di bidang kerajinan kain tapis. Usaha ini telah dirintis
            sejak beliau masih duduk di bangku SMP. Awalnya, kegiatan menenun
            tapis hanya dilakukan untuk sekadar mencoba dan mengisi waktu luang.
            Namun, seiring berjalannya waktu, hasil karya tersebut mulai
            memberikan penghasilan dan menumbuhkan rasa senang serta kepuasan
            tersendiri. Hal inilah yang membuat usaha menenun tapis terus
            dijalankan hingga sekarang.
          </p>

          <p>
            Tapis Al-Kautsar menerapkan sistem produksi berdasarkan pesanan, di
            mana setiap produk dibuat setelah adanya permintaan dari pelanggan.
            Dengan sistem ini, setiap kain tapis dibuat secara lebih fokus dan
            sesuai kebutuhan pemesan. UMKM ini berlokasi di Desa Kuta Dalom,
            Kecamatan Way Lima, Kabupaten Pesawaran, dan terus berupaya
            melestarikan nilai budaya tapis melalui karya-karya yang dihasilkan.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Tentang;