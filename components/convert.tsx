'use client';
import React, { useState, useEffect } from 'react';
import Payment from './payment';
import { ConvertProps } from '@/types/interfaces';
import { options } from '@/data/staticData';
import { formatDate, convertToDate, mapValues } from './utils/utils';
import { processDataObjects } from '@/components/utils/dataProcessing';


const Convert: React.FC<ConvertProps> = ({ fileContent, mappingContent }) => {
  const [editedContent, setEditedContent] = useState(fileContent || []);
  const [headers, setHeaders] = useState<string[]>([]);
  const [dateSelected, setDateSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [field1Value, setField1Value] = useState<string>('');
  const [field2Value, setField2Value] = useState<string>('');
  const [processedData, setProcessedData] = useState<any[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [isMapping, setIsMapping] = useState<boolean>(false);
  const [columnOptions, setColumnOptions] = useState<string[]>([]);

  useEffect(() => {
    if (fileContent && fileContent.length > 0) {
      setEditedContent(fileContent);
      setHeaders(Object.keys(fileContent[0]));
      setColumnOptions(new Array(Object.keys(fileContent[0]).length).fill(''));
    }
  }, [fileContent]);

  const handleHeaderChange = (colIndex: number, value: string) => {
    const newHeaders = [...headers];
    newHeaders[colIndex] = value;
    setHeaders(newHeaders);
    // Save new headers to localStorage
    localStorage.setItem('headers', JSON.stringify(newHeaders));
  };

  const handleColumnOptionChange = (colIndex: number, value: string) => {
    const newColumnOptions = [...columnOptions];
    newColumnOptions[colIndex] = value;
    setColumnOptions(newColumnOptions);
  };

  const handleExport = async () => {
    const updatedContent = mapValues(editedContent, headers, columnOptions, mappingContent);
    setEditedContent(updatedContent); // Ensure values are mapped before exporting

    if (updatedContent.length > 0) {
      const dataObjects = updatedContent.map(row => {
        return headers.reduce((acc, header, index) => {
          acc[header] = row[Object.keys(row)[index]];
          return acc;
        }, {} as Record<string, any>);
      });

      // Add date fields to each data object
      const errors = await processDataObjects(dataObjects, selectedDate, field1Value, field2Value);
      setProcessedData(dataObjects);
      setErrorMessages(errors);

      if (errors.length === 0) {
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
        console.log('Errors found in data:', errors);
      }
    } else {
      console.log('No data available in the table.');
    }
  };

  const filteredContent = editedContent ? editedContent.filter(row => Object.values(row).some(value => value !== '' && value !== null && value !== undefined)) : [];
  return (
    <>
      <div className="container-tabel mt-4 overflow-x-scroll">
        <table className="table-auto border-collapse w-full">
          <thead className="sticky top-0 bg-white">
            {mappingContent && mappingContent.firstColumn && mappingContent.firstColumn.length > 0 && (
              <tr>
                {headers.map((header, colIndex) => (
                  <th key={colIndex} className="border border-gray-300 px-2 py-2">
                    <select
                      className="border border-gray-300 px-2 py-1 w-full"
                      defaultValue=""
                      onChange={(e) => handleColumnOptionChange(colIndex, e.target.value)}
                    >
                      <option value=""> </option>
                      <option value="To">Till</option>
                      <option value="From">Från</option>
                    </select>
                  </th>
                ))}
              </tr>
            )}
            <tr>
              {headers.map((header, colIndex) => {
                const selectedOption = header.toLowerCase().startsWith('tomt_') ? 'Tomt' : header;
                const isValidHeader = selectedOption === 'Tomt' || options.includes(header);
                return (
                  <th key={colIndex} className={`border border-gray-300 px-2 py-2 text-ellipsis overflow-hidden whitespace-nowrap ${isValidHeader ? '' : 'bg-red-100'}`}>
                    <select
                      value={selectedOption}
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
      {errorMessages.length > 0 && (
        <div className="error-messages">
          <ul>
            {errorMessages.map((message, index) => (
              <li key={index} className="text-red-500">{message}</li>
            ))}
          </ul>
        </div>
      )}
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