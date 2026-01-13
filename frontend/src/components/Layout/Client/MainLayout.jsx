import React from 'react';
import {Outlet} from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import "./Layout.css";
const MainLayout = () => {
    return (
      <div className="main-wrapper">
        <Header />
        <div className="main-content">
          <Outlet />
        </div>
        <Footer />
      </div>
    );
};

export default MainLayout;