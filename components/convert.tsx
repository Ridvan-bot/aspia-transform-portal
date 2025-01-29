'use client';
import React, { useState, useEffect } from 'react';
import Payment from './payment';

interface ConvertProps {
  fileContent: any[];
}

const Convert: React.FC<ConvertProps> = ({ fileContent }) => {
  const [editedContent, setEditedContent] = useState(fileContent || []);
  const [headers, setHeaders] = useState<string[]>([]);
  const [dateSelected, setDateSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [field1Value, setField1Value] = useState<string>('');
  const [field2Value, setField2Value] = useState<string>('');

  useEffect(() => {
    if (fileContent && fileContent.length > 0) {
      setEditedContent(fileContent);
      setHeaders(Object.keys(fileContent[0]));
    }
  }, [fileContent]);

  const handleHeaderChange = (colIndex: number, value: string) => {
    const newHeaders = [...headers];
    newHeaders[colIndex] = value;
    setHeaders(newHeaders);
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };

  const isValidDateFormat = (dateString: string): boolean => {
    return /^\d{8}$/.test(dateString);
  };

  const handleExport = () => {
    if (editedContent.length > 0) {
      const dataObjects = editedContent.map(row => {
        return headers.reduce((acc, header, index) => {
          acc[header] = row[Object.keys(row)[index]];
          return acc;
        }, {} as Record<string, any>);
      });

      // Add date fields to each data object
      dataObjects.forEach(dataObject => {
        dataObject['Utbetalningsdatum'] = selectedDate ? formatDate(selectedDate) : null;
        dataObject['Första dagen i föregående månad'] = field1Value;
        dataObject['Sista dagen i föregående månad'] = field2Value;

        // Convert "Tom Datum" and "From Datum" to Date objects if not already in correct format
        if (dataObject['Tom datum'] && !isValidDateFormat(dataObject['Tom datum'])) {
          dataObject['Tom datum'] = formatDate(new Date(dataObject['Tom datum']));
        }
        if (dataObject['From datum'] && !isValidDateFormat(dataObject['From datum'])) {
          dataObject['From datum'] = formatDate(new Date(dataObject['From datum']));
        }
      });

      // Format dates
      const formattedSelectedDate = formatDate(selectedDate);
      const formattedField1Value = formatDate(new Date(field1Value));
      const formattedField2Value = formatDate(new Date(field2Value));

      // Create a new array with only the values
      const exportData = [
        formattedSelectedDate,
        formattedField1Value,
        formattedField2Value,
      ];

      // Create rows 3 and 4 based on options and dataObject
      let row3 = dataObjects.map(dataObject => options.map(option => dataObject[option] || '').join('\t')).join('\r\n');
      const optionRow = options.join('\t');

      // Remove the last row from row3 if it's empty
      const row3Lines = row3.split('\r\n');
      if (row3Lines[row3Lines.length - 1].trim() === '') {
        row3Lines.pop();
      }
      row3 = row3Lines.join('\r\n');

      // Create CSV content with tab-separated values
      const csvContent = [
        'Version: 1.3 Ursprung: Flex HRM Time', // Fixed first line
        exportData.join('\t'), // Data values separated by tabs
        row3, // Row 3 with values from dataObject or tabs
      ].filter(line => line.trim() !== '').join('\r\n')+ '\r\n'; // Filter out any empty lines

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
    } else {
      console.log('No data available in the table.');
    }
  };

  const options = [
    'Anst.nr', 
    'Löneart', 
    'Konto',
    'dim2',
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
    'Tomt'
  ];

  // Filtrera bort tomma rader
  const filteredContent = editedContent ? editedContent.filter(row => Object.values(row).some(value => value !== '')) : [];

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
      {fileContent.length > 0 && (
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
      )}
    </div>
  );
};

export default Convert;