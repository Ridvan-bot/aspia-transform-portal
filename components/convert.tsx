import React, { useState } from 'react';
import Payment from './payment';

interface ConvertProps {
  fileContent: any[];
}

const Convert: React.FC<ConvertProps> = ({ fileContent }) => {
  const [editedContent, setEditedContent] = useState(fileContent);
  const [headers, setHeaders] = useState(Object.keys(fileContent[0]));

  const handleHeaderChange = (colIndex: number, value: string) => {
    const newHeaders = [...headers];
    newHeaders[colIndex] = value;
    setHeaders(newHeaders);
  };

  const options = [
    'Anst.nr', 
    'Löneart', 
    'Konto', 
    'dim3', 
    'dim4', 
    'dim5', 
    'dim6', 
    'dim7', 
    'dim8', 
    'dim9', 
    'dim10', 
    'antal', 
    'enhet', 
    'ápris', 
    'belopp', 
    'From datum', 
    'Tom datum', 
    'notering', 
    'Omfatting',
    '0-1=1-100%',
  ];

  // Filtrera bort tomma rader
  const filteredContent = editedContent.filter(row => Object.values(row).some(value => value !== ''));

  return (
    <div className="container-tabell">
      <div className="flex justify-center pt-4 w-full max-h-screen overflow-auto">
        <table className="table-auto border-collapse border border-gray-400 w-full">
          <thead className="sticky top-0 bg-white">
            <tr>
              {headers.map((header, colIndex) => (
                <th key={colIndex} className="border border-gray-300 px-2 py-2 text-ellipsis overflow-hidden whitespace-nowrap">
                  <select
                    value={header}
                    onChange={(e) => handleHeaderChange(colIndex, e.target.value)}
                    className="border border-gray-300 px-2 py-1 w-full"
                  >
                    <option value={header}>{header}</option>
                    {options.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredContent.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((value, colIndex) => (
                  <td key={colIndex} className="border border-gray-300 px-2 py-2 break-words">
                    {value as React.ReactNode}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Payment />
    </div>
  );
};

export default Convert;