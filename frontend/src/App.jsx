import './App.css'
import { StaffListPage } from './components/StaffListPage'
import { MenuPage } from './components/MenuPage'
import Box from '@mui/material/Box';
import { useCookies } from 'react-cookie';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import ProtectedRoute from './components/ProectedRoute';
import ResponsiveAppBar from './components/ResponsiveAppNav';
import Home from './components/Home'

function App() {
  const [cookies] = useCookies();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ResponsiveAppBar />
      <Router>
      <Routes>
          <Route path="/" element={<StaffListPage />} />
          <Route path="/login" element={<StaffListPage />} />
          <Route path="/menu"  element={<ProtectedRoute><MenuPage /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="*" element={<>Not found</>} />
        </Routes>
      </Router>
    </Box>
  )
}

export default App
