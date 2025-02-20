import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { ExportSystemsProps } from '@/types/interfaces';
import { systems } from '@/data/staticData';
import style from './exportSystems.module.css';

const ExportSystems: React.FC<ExportSystemsProps> = ({ handleExport }) => {
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);

  const handleCheckboxChange = (system: string) => {
    setSelectedSystem(prevSelectedSystem => (prevSelectedSystem === system ? null : system));
  };

  useEffect(() => {
    // Any side effects based on selectedSystem can be handled here
  }, [selectedSystem]);

  return (
    <div className="container-exportSystems border">
      <button onClick={handleExport} className="button-custom mb-4">
        Exportera
      </button>
      <div className="flex flex-col space-y-2">
        {systems.map((system, index) => (
          <div key={system} className="flex items-center space-x-4">
            <div className="checkbox-wrapper-7">
              <input
                className="tgl tgl-ios"
                id={`toggle-${index}`}
                type="checkbox"
                value={system}
                checked={selectedSystem === system}
                onChange={() => handleCheckboxChange(system)}
              />
              <label className="tgl-btn" htmlFor={`toggle-${index}`}></label>
            </div>
            <div className="system-description">
              <span>Till {system}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExportSystems;