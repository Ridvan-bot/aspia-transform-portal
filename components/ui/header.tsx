'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const Header: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    window.location.reload();
  };

  
  const toggleTooltip = () => {
    setShowTooltip(prevState => !prevState);
  };
  const headerDescriptions = [
    { header: 'Anställningsnummer', description: 'Anställningsnummer kopplat till posten. (Alfanumeriskt, max 10 tecken).' },
    { header: 'Löneartsnr', description: 'Löneartsnummer (Numeriskt, max 3 tecken).' },
    { header: 'Konteringsnivå 1', description: 'Konteringsnivå 1 i Flex Payroll (’Konto’) (Alfanumeriskt fält).' },
    { header: 'Konteringsnivå 2', description: 'Konteringsnivå 2 i Flex Payroll (vanligtvis ’K-ställe’) (Alfanumeriska fält).' },
    { header: 'Konteringsnivå 3', description: 'Konteringsnivå 3 i Flex Payroll (Alfanumeriska fält).' },
    { header: 'Konteringsnivå 4', description: '4 Konteringsnivå 4 i Flex Payroll (Alfanumeriska fält).' },
    { header: 'Konteringsnivå 5', description: '5 Konteringsnivå 5 i Flex Payroll (Alfanumeriska fält).' },
    { header: 'Konteringsnivå 6', description: '6 Konteringsnivå 6 i Flex Payroll (Alfanumeriska fält).' },
    { header: 'Konteringsnivå 7', description: '7 Konteringsnivå 7 i Flex Payroll (Alfanumeriska fält).' },
    { header: 'Konteringsnivå 8', description: '8 Konteringsnivå 8 i Flex Payroll (Alfanumeriska fält)' },
    { header: 'Konteringsnivå 9', description: '9 Konteringsnivå 9 i Flex Payroll (Alfanumeriska fält).' },
    { header: 'Konteringsnivå 10', description: '10 Konteringsnivå 10 i Flex Payroll (Alfanumeriska fält).' },
    { header: 'Antal', description: 'Kvantitet (decimaltal)' },
    { header: 'Antal enhet', description: `enheten för kvantitet, kan vara 'tim' (timmar), 'dgr' (dagar), ’kdgr’ (kalenderdagar), eller kan utelämnas om transaktionen inte innehåller frånvaro.` },
    { header: 'A-pris', description: 'Enhetspris (decimaltal)' },
    { header: 'Belopp', description: 'Belopp (decimaltal)' },
    { header: 'Fr.o.m. datum', description: 'datum Från datum för transaktionen, i formatet ÅÅÅÅMMDD.' },
    { header: 'T.o.m. datum', description: 'datum Till datum för transaktionen, i formatet ÅÅÅÅMMDD.' },
    { header: 'Meddelande', description: 'Meddelande, bestående av max 50 tecken.' },
    { header: 'Omfatting %', description: '% Omfattning i % (decimaltal) Exempel: 72,5 i filen motsvarar 72,5%' },
    { header: 'Lönekod', description: 'Lönekod för transaktionen. (Alfanumeriskt, max 10 tecken). Lönekod är valfri och används sällan.' },
    { header: 'Semesterkvot', description: 'Sätter semesterkvoten för datumintervallet för löneraden, om tillgänglig. Bör vara mellan 0,6 och 25.' },
    { header: 'Kalenderdagsfaktor', description: 'Kalenderdagsfaktor för transaktionen.' },
    { header: 'Barn', description: 'Identifierar barn/födelse i samband med föräldraledighet.' },
    { header: 'Tomt', description: 'Om värde ej ska vara en del av export' },
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