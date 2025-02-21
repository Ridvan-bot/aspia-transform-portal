import React from 'react';
import './css/style.css';
import Header from '../components/ui/header';

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Aspia Transform Portal",
  description: "A portal for Transforming data", 
};


const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="flex-grow container mx-auto mt-10 mb-100">
        {children}
        </div>
      </body>
    </html>
  );
};

export default Layout;