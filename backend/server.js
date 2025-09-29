const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Konfigurasi penyimpanan file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Data dummy untuk simulasi
const pendudukData = require('./data/penduduk.json');
const layananData = require('./data/layanan.json');
const sejarahData = require('./data/sejarah.json');
const pemerintahData = require('./data/pemerintah.json');
const pengajuanData = [];

// Routes
// Data kependudukan
app.get('/api/penduduk', (req, res) => {
  res.json(pendudukData);
});

// Data layanan
app.get('/api/layanan', (req, res) => {
  res.json(layananData);
});

// Sejarah kelurahan
app.get('/api/sejarah', (req, res) => {
  res.json(sejarahData);
});

// Struktur pemerintahan
app.get('/api/pemerintah', (req, res) => {
  res.json(pemerintahData);
});

// Submit pengajuan layanan
app.post('/api/pengajuan', upload.single('file'), (req, res) => {
  const newPengajuan = {
    id: uuidv4(),
    tanggal: new Date().toISOString(),
    jenis: req.body.jenis,
    nama: req.body.nama,
    nik: req.body.nik,
    alamat: req.body.alamat,
    deskripsi: req.body.deskripsi,
    status: 'Diproses',
    file: req.file ? req.file.filename : null
  };
  
  pengajuanData.push(newPengajuan);
  res.json({ success: true, data: newPengajuan });
});

// Get semua pengajuan
app.get('/api/pengajuan', (req, res) => {
  res.json(pengajuanData);
});

// Get pengajuan by ID
app.get('/api/pengajuan/:id', (req, res) => {
  const pengajuan = pengajuanData.find(p => p.id === req.params.id);
  if (!pengajuan) {
    return res.status(404).json({ error: 'Pengajuan tidak ditemukan' });
  }
  res.json(pengajuan);
});

// Update status pengajuan
app.put('/api/pengajuan/:id', (req, res) => {
  const pengajuan = pengajuanData.find(p => p.id === req.params.id);
  if (!pengajuan) {
    return res.status(404).json({ error: 'Pengajuan tidak ditemukan' });
  }
  
  pengajuan.status = req.body.status;
  res.json({ success: true, data: pengajuan });
});

// Statistik
app.get('/api/statistik', (req, res) => {
  const stats = {
    totalPenduduk: pendudukData.length,
    totalPengajuan: pengajuanData.length,
    pengajuanDiproses: pengajuanData.filter(p => p.status === 'Diproses').length,
    pengajuanSelesai: pengajuanData.filter(p => p.status === 'Selesai').length
  };
  res.json(stats);
});

// Download file
app.get('/api/download/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ error: 'File tidak ditemukan' });
  }
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
