import React from 'react';

export default function Convert() {
  return (
    <div className="container-fluid flex justify-center pt-4">
      <div className="container-tabell">
        <div className="flex justify-center pt-4 w-full max-h-screen overflow-auto">
          <table className="table-auto border-collapse border border-gray-400 w-full">
            <thead className="sticky top-0 bg-white">
              <tr>
                {Array.from({ length: 15 }).map((_, colIndex) => (
                  <th key={colIndex} className="border border-gray-300 px-2 py-2">Column</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 2 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: 15 }).map((_, colIndex) => (
                    <td key={colIndex} className="border border-gray-300 px-2 py-2">Row {rowIndex + 1}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}