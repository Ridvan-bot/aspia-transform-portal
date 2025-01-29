import React from 'react';
import './css/style.css';
import Header from '../components/ui/header';

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Automation Portal",
  description: "A portal for automating tasks", 
};


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