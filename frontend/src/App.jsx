import { useState } from 'react'
import './App.css'
import { StaffListPage } from './components/StaffListPage'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useCookies } from 'react-cookie';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import ProtectedRoute from './components/ProectedRoute';

function App() {
  const [cookies] = useCookies();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Weird Salads
          </Typography>
        </Toolbar>
      </AppBar>
      <Router>
      <Routes>
          <Route path="/" element={<StaffListPage />} />
          <Route path="/login" element={<StaffListPage />} />
          <Route path="/home" element={<ProtectedRoute><>Home</></ProtectedRoute>} />
          <Route path="*" element={<>Not found</>} />
        </Routes>
      </Router>
    </Box>
  )
}

export default App
