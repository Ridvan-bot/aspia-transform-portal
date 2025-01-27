import React, { useState } from 'react';
import Payment from './payment';

interface ConvertProps {
  fileContent: any[];
}

const Convert: React.FC<ConvertProps> = ({ fileContent }) => {
  const [editedContent, setEditedContent] = useState(fileContent);
  const [headers, setHeaders] = useState(Object.keys(fileContent[0]));
  const [dateSelected, setDateSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [field1Value, setField1Value] = useState<string>('');
  const [field2Value, setField2Value] = useState<string>('');

  const handleHeaderChange = (colIndex: number, value: string) => {
    const newHeaders = [...headers];
    newHeaders[colIndex] = value;
    setHeaders(newHeaders);
    console.log('Updated headers:', newHeaders);
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };

  const handleExport = (selectedDate: Date | null, field1Value: string, field2Value: string) => {
    if (editedContent.length > 0) {
      const row1 = editedContent[0];
      const dataObject = headers.reduce((acc, header, index) => {
        acc[header] = row1[Object.keys(row1)[index]];
        return acc;
      }, {} as Record<string, any>);

      // Format dates
      const formattedSelectedDate = formatDate(selectedDate);
      const formattedField1Value = field1Value.split('/').reverse().join('');
      const formattedField2Value = field2Value.split('/').reverse().join('');

      // Create a new array with only the values
      const exportData = [
        formattedSelectedDate,
        formattedField1Value,
        formattedField2Value,
      ];

      console.log('Export data:', exportData);

      // Create rows 3 and 4 based on options and dataObject
      const row3 = options.map(option => dataObject[option] || '').join('\t');
      const row4 = options.join('\t');
      console.log('Row 3:', row3);
      console.log('Row 4:', row4);

      // Create CSV content with tab-separated values
      const csvContent = [
        'Version: 1.3 Ursprung: Flex HRM Time', // Fixed first line
        exportData.join('\t'), // Data values separated by tabs
        row3, // Row 3 with values from dataObject or tabs
        row4 // Row 4 with options
      ].join('\n');

      console.log('CSV Content:', csvContent);

      // Create a blob and trigger download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'export.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      return exportData;
    } else {
      console.log('No data available in the table.');
    }
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
      <Payment
        onDateSelected={(date, field1, field2) => {
          setDateSelected(true);
          setSelectedDate(date);
          setField1Value(field1);
          setField2Value(field2);
        }}
        handleExport={handleExport}
        dateSelected={dateSelected}
      />
    </div>
  );
};

export default Convert;