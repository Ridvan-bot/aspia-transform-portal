'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faRedo } from '@fortawesome/free-solid-svg-icons';
import { headerDescriptions } from '@/data/staticData';
import style from './exportSystems.module.css';

const Header: React.FC<{ isFileImported: boolean }> = ({ isFileImported }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    window.location.reload();
  };

  const handleButtonClick = () => {
    window.location.reload();
  };

  const toggleTooltip = () => {
    setShowTooltip(prevState => !prevState);
  };

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
        {/* Reload button */}
        {isFileImported && (
          <div className="flex items-center h-full">
            <button
              onClick={handleButtonClick}
              className="bg-gradient-to-r from-turquoise to-custom-skeppsbron text-white px-6 py-3 rounded-full shadow-lg transform transition-transform duration-300 flex items-center"
            >
              <FontAwesomeIcon icon={faRedo} className="mr-2" />
              Börja om
            </button>
          </div>
        )}
        {/* Information icon */}
        <div className="relative flex items-center h-full">
          <FontAwesomeIcon
            icon={faInfoCircle}
            size="2x"
            className="text-customInformationColor hover:text-customButtonHoverColor cursor-pointer"
            onClick={toggleTooltip}
          />
          {showTooltip && (
            <div className="absolute top-full right-0 mt-2 w-96 max-h-96 p-4 bg-white border border-gray-300 rounded shadow-lg z-50 overflow-y-auto">
              <ul>
                {headerDescriptions.map((item, index) => (
                  <li key={index} className="mb-2">
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