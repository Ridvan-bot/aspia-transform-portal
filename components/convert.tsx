'use client';
import React, { useState, useEffect } from 'react';
import Payment from './payment';
import { ConvertProps } from '@/types/interfaces';
import { options } from '@/data/staticData';
import { formatDate, isValidDateFormat, convertToDate } from './utils/utils';


const Convert: React.FC<ConvertProps> = ({ fileContent, }) => {
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
       // Save new headers to localStorage
       localStorage.setItem('headers', JSON.stringify(newHeaders));
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
        if (dataObject['T.o.m. datum'] && !isValidDateFormat(dataObject['T.o.m. datum'])) {
          dataObject['T.o.m. datum'] = formatDate(convertToDate(dataObject['T.o.m. datum']));
        }
        if (dataObject['Fr.o.m. datum'] && !isValidDateFormat(dataObject['Fr.o.m. datum'])) {
          dataObject['Fr.o.m. datum'] = formatDate(convertToDate(dataObject['Fr.o.m. datum']));
        }
      });

      const field2Date = convertToDate(field2Value);
  
      // Format dates
      const formattedSelectedDate = formatDate(selectedDate);
      const formattedField1Value = formatDate(new Date(field1Value));
      const formattedField2Value = formatDate(new Date(field2Date));
  
      // Create a new array with only the values
      const exportData = [
        formattedSelectedDate,
        formattedField1Value,
        formattedField2Value,
      ];
  
      // Create rows 3 and 4 based on options and dataObject
      let row3 = dataObjects.map(dataObject => options.map(option => {
        const value = dataObject[option];
        return value !== undefined && value !== null ? value : '';
      }).join('\t')).join('\r\n');
  
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
      ].filter(line => line.trim() !== '').join('\r\n') + '\r\n'; // Filter out any empty lines
  
  
      // Create a blob and trigger download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'export.dta');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.log('No data available in the table.');
    }
  };

  const filteredContent = editedContent ? editedContent.filter(row => Object.values(row).some(value => value !== '' && value !== null && value !== undefined)) : [];
  return (
    <>
      <div className="container-tabel">
        <table className="table-auto border-collapse w-full">
          <thead className="sticky top-0 bg-white">
            <tr>
              {headers.map((header, colIndex) => {
                const isValidHeader = options.includes(header);
                return (
                  <th key={colIndex} className={`border border-gray-300 px-2 py-2 text-ellipsis overflow-hidden whitespace-nowrap ${isValidHeader ? '' : 'bg-red-100'}`}>
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
                );
              })}
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
        <div className="container-payment">
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
      )}
    </>
  );
};

export default Convert;