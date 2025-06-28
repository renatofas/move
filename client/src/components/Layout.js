// src/components/Layout.js
import React from 'react';
import AppNavbar from './Navbar';
import Footer from './Footer'; 

function Layout({ children }) {
  return (
    <div className="page-container">
      <AppNavbar />
      <div className="page-content">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
