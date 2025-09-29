import { useState, useEffect } from 'react'
import { Users, Download, Search } from 'lucide-react'
import axios from 'axios'

const DataKependudukan = () => {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/penduduk')
        setData(response.data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredData = data.filter(penduduk =>
    penduduk.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    penduduk.nik.includes(searchTerm)
  )

  const exportToCSV = () => {
    const headers = ['NIK', 'Nama', 'Tempat Lahir', 'Tanggal Lahir', 'Jenis Kelamin', 'Alamat', 'Agama', 'Status', 'Pekerjaan']
    const csvContent = [
      headers.join(','),
      ...data.map(p => [
        p.nik,
        `"${p.nama}"`,
        `"${p.tempatLahir}"`,
        p.tanggalLahir,
        p.jenisKelamin,
        `"${p.alamat}"`,
        p.agama,
        p.statusPerkawinan,
        p.pekerjaan
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'data_kependudukan_pleburan.csv'
    link.click()
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-3 bg-purple-100 rounded-full mb-4">
          <Users className="h-8 w-8 text-purple-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Kependudukan</h1>
        <p className="text-gray-600">Statistik dan data penduduk Kelurahan Pleburan terkini</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Cari berdasarkan nama atau NIK..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <button
            onClick={exportToCSV}
            className="flex items-center bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
          >
            <Download className="h-5 w-5 mr-2" />
            Export CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NIK
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tempat/Tgl Lahir
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jenis Kelamin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alamat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((penduduk) => (
                <tr key={penduduk.nik} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {penduduk.nik}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {penduduk.nama}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {penduduk.tempatLahir}, {new Date(penduduk.tanggalLahir).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {penduduk.jenisKelamin}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {penduduk.alamat}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {penduduk.statusPerkawinan}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {searchTerm ? 'Tidak ditemukan data yang sesuai' : 'Belum ada data penduduk'}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-purple-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-2">Total Penduduk</h3>
          <p className="text-3xl font-bold text-purple-600">{data.length}</p>
          <p className="text-sm text-purple-700">Jiwa</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Laki-laki</h3>
          <p className="text-3xl font-bold text-blue-600">
            {data.filter(p => p.jenisKelamin === 'Laki-laki').length}
          </p>
          <p className="text-sm text-blue-700">Jiwa</p>
        </div>
        <div className="bg-pink-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-pink-900 mb-2">Perempuan</h3>
          <p className="text-3xl font-bold text-pink-600">
            {data.filter(p => p.jenisKelamin === 'Perempuan').length}
          </p>
          <p className="text-sm text-pink-700">Jiwa</p>
        </div>
      </div>
    </div>
  )
}

export default DataKependudukan
