'use client';
import React, { useState } from 'react';
import './css/style.css';
import Header from '../components/ui/header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isFileImported, setIsFileImported] = useState(false);

  return (
    <html lang="en">
      <body>
        <Header isFileImported={isFileImported} />
        <div className="flex-grow container mx-auto mt-10 mb-100">
          {React.cloneElement(children as React.ReactElement<any>, { setIsFileImported })}
        </div>
      </body>
    </html>
  );
};

export default Layout;