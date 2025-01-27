import React from 'react';

interface ConvertProps {
  fileContent: any[];
}

const Convert: React.FC<ConvertProps> = ({ fileContent }) => {
  return (
    <div className="container-tabell">
      <div className="flex justify-center pt-4 w-full max-h-screen overflow-auto">
        <table className="table-auto border-collapse border border-gray-400 w-full">
          <thead className="sticky top-0 bg-white">
            <tr>
              {Object.keys(fileContent[0]).map((key) => (
                <th key={key} className="border border-gray-300 px-2 py-2">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fileContent.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((value, colIndex) => (
                  <td key={colIndex} className="border border-gray-300 px-2 py-2 break-words">{value as React.ReactNode}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Convert;