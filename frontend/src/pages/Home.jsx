import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Users, FileText, UserCheck, BookOpen, Building2, 
  ArrowRight, BarChart3, Clock, CheckCircle 
} from 'lucide-react'
import axios from 'axios'

const Home = () => {
  const [statistics, setStatistics] = useState({
    totalPenduduk: 0,
    totalPengajuan: 0,
    pengajuanDiproses: 0,
    pengajuanSelesai: 0
  })

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/statistik')
        setStatistics(response.data)
      } catch (error) {
        console.error('Error fetching statistics:', error)
      }
    }

    fetchStatistics()
  }, [])

  const features = [
    {
      name: 'Layanan Dukcapil',
      description: 'Pengajuan KTP, KK, Akta Kelahiran secara online',
      icon: UserCheck,
      href: '/dukcapil',
      color: 'bg-blue-500'
    },
    {
      name: 'Layanan Administrasi',
      description: 'Permohonan surat keterangan dan pengaduan warga',
      icon: FileText,
      href: '/administrasi',
      color: 'bg-green-500'
    },
    {
      name: 'Data Kependudukan',
      description: 'Statistik dan data penduduk terkini',
      icon: Users,
      href: '/data-kependudukan',
      color: 'bg-purple-500'
    },
    {
      name: 'About & Sejarah',
      description: 'Informasi sejarah dan profil Kelurahan Pleburan',
      icon: BookOpen,
      href: '/about',
      color: 'bg-orange-500'
    },
    {
      name: 'Sistematika Pemerintahan',
      description: 'Struktur organisasi dan tata kelola kelurahan',
      icon: Building2,
      href: '/pemerintahan',
      color: 'bg-red-500'
    }
  ]

  const stats = [
    { name: 'Total Penduduk', value: statistics.totalPenduduk, icon: Users },
    { name: 'Total Pengajuan', value: statistics.totalPengajuan, icon: FileText },
    { name: 'Sedang Diproses', value: statistics.pengajuanDiproses, icon: Clock },
    { name: 'Selesai', value: statistics.pengajuanSelesai, icon: CheckCircle }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Selamat Datang di Smart Village Kelurahan Pleburan
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Platform Digital untuk Pelayanan Masyarakat yang Cepat, Transparan, dan Inklusif di Kota Semarang
            </p>
            <Link
              to="/dukcapil"
              className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Mulai Layanan
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Statistik Kelurahan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-blue-50 rounded-lg p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-blue-100 p-3">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Fitur Utama</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Layanan digital untuk memudahkan masyarakat Kelurahan Pleburan dalam mengurus administrasi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Link
                  key={feature.name}
                  to={feature.href}
                  className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className={`inline-flex rounded-lg p-3 ${feature.color} mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                      {feature.name}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                    <div className="mt-4 flex items-center text-blue-600 group-hover:text-blue-700">
                      <span className="text-sm font-medium">Akses Layanan</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
