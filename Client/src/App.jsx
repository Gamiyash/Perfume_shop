import React from "react"
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import HomePage from "./pages/Home";
import ProductPage from "./pages/Products_Details";
import axios from 'axios';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:productId" element={<ProductPage />} />

          <Route path="/" element={<Navigate to="/products" />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
