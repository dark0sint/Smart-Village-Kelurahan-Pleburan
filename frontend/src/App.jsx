import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import LayananDukcapil from './pages/LayananDukcapil'
import LayananAdministrasi from './pages/LayananAdministrasi'
import DataKependudukan from './pages/DataKependudukan'
import About from './pages/About'
import Pemerintahan from './pages/Pemerintahan'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dukcapil" element={<LayananDukcapil />} />
          <Route path="/administrasi" element={<LayananAdministrasi />} />
          <Route path="/data-kependudukan" element={<DataKependudukan />} />
          <Route path="/about" element={<About />} />
          <Route path="/pemerintahan" element={<Pemerintahan />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
