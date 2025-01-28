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
        <Header />
        <div className="container mx-auto mt-10">
        {children}
        </div>
      </body>
    </html>
  );
};

export default Layout;