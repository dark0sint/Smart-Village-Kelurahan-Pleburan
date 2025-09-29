import { useState } from 'react'
import { UserCheck, Upload, FileText } from 'lucide-react'

const LayananDukcapil = () => {
  const [formData, setFormData] = useState({
    jenisLayanan: '',
    nama: '',
    nik: '',
    alamat: '',
    file: null
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simpan ke backend
    console.log('Form data:', formData)
    alert('Pengajuan berhasil dikirim!')
  }

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] })
  }

  const layananOptions = [
    'KTP Elektronik',
    'Kartu Keluarga',
    'Akta Kelahiran',
    'Perubahan Data Penduduk'
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
          <UserCheck className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Layanan Pendudukan (Dukcapil)</h1>
        <p className="text-gray-600">Ajukan permohonan dokumen kependudukan secara online</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jenis Layanan
            </label>
            <select
              value={formData.jenisLayanan}
              onChange={(e) => setFormData({ ...formData, jenisLayanan: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Pilih Jenis Layanan</option>
              {layananOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={formData.nama}
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              NIK
            </label>
            <input
              type="text"
              value={formData.nik}
              onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              pattern="[0-9]{16}"
              title="NIK harus 16 digit angka"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alamat Lengkap
            </label>
            <textarea
              value={formData.alamat}
              onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Dokumen Pendukung
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Klik untuk upload</span> atau drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, JPG, PNG (max. 5MB)
                  </p>
                </div>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </label>
            </div>
            {formData.file && (
              <div className="mt-2 flex items-center text-sm text-gray-600">
                <FileText className="w-4 h-4 mr-2" />
                {formData.file.name}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          >
            Ajukan Permohonan
          </button>
        </form>
      </div>

      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Informasi Penting</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Pastikan data yang diisi sesuai dengan dokumen asli</li>
          <li>• Proses pengajuan membutuhkan waktu 3-5 hari kerja</li>
          <li>• Status pengajuan dapat dicek melalui menu tracking</li>
          <li>• Dokumen akan diambil di kantor kelurahan setelah selesai</li>
        </ul>
      </div>
    </div>
  )
}

export default LayananDukcapil
