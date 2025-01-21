import React from 'react';
import './css/style.css';
import Header from '../components/ui/header';


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
      <Header /> {/* Render the Header component */}
      {children}
      </body>
    </html>
  );
};

export default Layout;