import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { ExportSystemsProps } from '@/types/interfaces';
import style from './exportSystems.module.css';

const ExportSystems: React.FC<ExportSystemsProps> = ({ }) => {
    const [selectedSystems, setSelectedSystems] = useState<string[]>([]);
  
    const handleCheckboxChange = (system: string) => {
      setSelectedSystems(prevSelectedSystems =>
        prevSelectedSystems.includes(system)
          ? prevSelectedSystems.filter(s => s !== system)
          : [...prevSelectedSystems, system]
      );
    };
  
    return (
      <div className="container-exportSystems"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '100%',
        maxHeight: '100vh',
        overflow: 'auto',
        padding: '20px',
        marginTop: '5%',
        border: '2px solid #A9A9A9', // Add border directly
        borderRadius: '12px', // Optional: Add border radius for rounded corners
        boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.1)', // Optional: Add shadow effect
        backgroundColor: '#FFFFFF', // Optional: Add background color
      }}
      >
        <div className="flex flex-col space-y-2">
          {['Flex', 'AGDA', 'Hogia', 'Nmbers'].map((system, index) => (
            <div key={system} className="flex items-center space-x-4">
              <div className="checkbox-wrapper-36 flex items-center">
                <input
                  id={`toggle-${index}`}
                  type="checkbox"
                  value={system}
                  checked={selectedSystems.includes(system)}
                  onChange={() => handleCheckboxChange(system)}
                  className="mr-2"
                />
                <label htmlFor={`toggle-${index}`} className="flex items-center">
                </label>
              </div>
              <div className="system-description">
                <span>Exportera till {system}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ExportSystems;