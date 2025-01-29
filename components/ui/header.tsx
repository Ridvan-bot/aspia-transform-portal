'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    window.location.reload();
  };

  const headerDescriptions = [
    { header: 'Anst.nr', description: 'Anställningsnummer' },
    { header: 'Löneart', description: 'Löneart' },
    { header: 'Konto', description: 'Konto' },
    { header: 'dim2', description: 'Dimension 2' },
    { header: 'dim3', description: 'Dimension 3' },
    { header: 'dim4', description: 'Dimension 4' },
    { header: 'dim5', description: 'Dimension 5' },
    { header: 'dim6', description: 'Dimension 6' },
    { header: 'dim7', description: 'Dimension 7' },
    { header: 'dim8', description: 'Dimension 8' },
    { header: 'dim9', description: 'Dimension 9' },
    { header: 'dim10', description: 'Dimension 10' },
    { header: 'antal', description: 'Antal' },
    { header: 'enhet', description: 'Enhet' },
    { header: 'ápris', description: 'Pris' },
    { header: 'belopp', description: 'Belopp' },
    { header: 'From datum', description: 'Från och med datum' },
    { header: 'Tom datum', description: 'Till och med datum' },
    { header: 'notering', description: 'Notering' },
    { header: 'Omfatting', description: 'Omfattning' },
    { header: 'Tomt', description: 'Tomt' },
  ];

  return (
    <header className="fixed top-0 w-full bg-customWhite h-30 flex items-center z-50">
      <div className="px-4 sm:px-6 flex items-center justify-between w-full">
        {/* Site branding */}
        <div className="flex items-center h-full">
          <Link href="/" legacyBehavior>
            <a className="h-full" onClick={handleLogoClick}>
              <img src="/images/Aspia_logo.png" alt="Aspia Logo" className="h-20" />
            </a>
          </Link>
        </div>
        {/* Information icon */}
        <div className="relative flex items-center h-full">
          <FontAwesomeIcon
            icon={faInfoCircle}
            size="2x"
            className="text-customButtonTextColor hover:text-customButtonHoverColor cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          {showTooltip && (
            <div className="absolute top-full right-0 mt-2 w-80 p-2 bg-white border border-gray-300 rounded shadow-lg z-50">
              <ul>
                {headerDescriptions.map((item, index) => (
                  <li key={index}>
                    <strong>{item.header}:</strong> {item.description}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;