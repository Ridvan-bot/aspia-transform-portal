'use client';

// filepath: /Users/admin/Documents/aspia/az-auto-protal/components/convert.tsx
import React, { useState, useEffect } from 'react';
import Payment from './payment';
import ExportSystems from './exportSystems';
import { ConvertProps } from '@/types/interfaces';
import { options } from '@/data/staticData';
import { formatDate, convertToDate, mapValues, mapKeys } from './utils/utils';
import { processDataObjects } from '@/components/utils/dataProcessing';

const Convert: React.FC<ConvertProps> = ({ fileContent, mappingContent, selectedColumn }) => {
  const [editedContent, setEditedContent] = useState(fileContent || []);
  const [headers, setHeaders] = useState<string[]>([]);
  const [dateSelected, setDateSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [field1Value, setField1Value] = useState<string>('');
  const [field2Value, setField2Value] = useState<string>('');
  const [processedData, setProcessedData] = useState<any[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [hasHeader, setHasHeader] = useState(true);
  const [firstRowHeader, setFirstRowHeader] = useState(true);

  useEffect(() => {
    if (fileContent && fileContent.length > 0) {
      const newHeaders = Object.keys(fileContent[0]);
      setHeaders(newHeaders);
      if (firstRowHeader) {
        setEditedContent(fileContent);
      } else {
        const headerRow = newHeaders.reduce((acc, header, index) => {
          acc[header] = header;
          return acc;
        }, {} as Record<string, any>);
        setEditedContent([headerRow, ...fileContent]);
      }
    }
  }, [fileContent, firstRowHeader]);

  const handleHeaderChange = (colIndex: number, value: string) => {
    const newHeaders = [...headers];
    newHeaders[colIndex] = value;
    console.log('newHeaders:', newHeaders);
  
    // Ensure headers are unique
    const headerCounts: { [key: string]: number } = {};
    const uniqueHeaders = newHeaders.map(header => {
      const baseHeader = header.split('_')[0];
      if (!headerCounts[baseHeader]) {
        headerCounts[baseHeader] = 1;
      } else {
        headerCounts[baseHeader]++;
      }
      return headerCounts[baseHeader] === 1 ? baseHeader : `${baseHeader}_${headerCounts[baseHeader]}`;
    });
  
    setHeaders(uniqueHeaders);
    localStorage.setItem('headers', JSON.stringify(uniqueHeaders));
  
    // Check if headers match editedContent keys
    const editedContentKeys = Object.keys(editedContent[0] || {});
    const headersMatch = uniqueHeaders.every((header, index) => header === editedContentKeys[index]);
  
    if (!headersMatch) {
      // Update editedContent with uniqueHeaders using mapKeys
      const updatedContent = mapKeys(editedContent, uniqueHeaders);
      setEditedContent(updatedContent);
    }
  };

  const handleExport = async () => {
    const updatedContent = mapValues(editedContent, headers, selectedColumn, mappingContent);

    setEditedContent(updatedContent);

    if (updatedContent.length > 0) {
      const dataObjects = updatedContent.map(row => {
        return headers.reduce((acc, header, index) => {
          acc[header] = row[Object.keys(row)[index]];
          return acc;
        }, {} as Record<string, any>);
      });

      const errors = await processDataObjects(dataObjects, selectedDate, field1Value, field2Value);
      setProcessedData(dataObjects);
      setErrorMessages(errors);

      if (errors.length === 0) {
        const field2Date = convertToDate(field2Value);

        const formattedSelectedDate = formatDate(selectedDate);
        const formattedField1Value = formatDate(new Date(field1Value));
        const formattedField2Value = formatDate(new Date(field2Date));

        const exportData = [
          formattedSelectedDate,
          formattedField1Value,
          formattedField2Value,
        ];

        let row3 = dataObjects.map(dataObject => options.map(option => {
          const value = dataObject[option];
          return value !== undefined && value !== null ? value : '';
        }).join('\t')).join('\r\n');

        const row3Lines = row3.split('\r\n');
        if (row3Lines[row3Lines.length - 1].trim() === '') {
          row3Lines.pop();
        }
        row3 = row3Lines.join('\r\n');

        const csvContent = [
          'Version: 1.3 Ursprung: Flex HRM Time',
          exportData.join('\t'),
          row3,
        ].filter(line => line.trim() !== '').join('\r\n') + '\r\n';

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

  const handleHasHeaderChange = (checked: boolean) => {
    setHasHeader(checked);
  };

  const handleFirstRowHeaderChange = (checked: boolean) => {
    setFirstRowHeader(checked);
  };

  const filteredContent = editedContent ? editedContent.filter(row => Object.values(row).some(value => value !== '' && value !== null && value !== undefined)) : [];

  return (
    <>
      {fileContent.length > 0 && (
        <>
          <div className="checkbox-container flex items-center justify-start">
            <div className="checkbox-wrapper-7 mt-10">
              <input
                className="tgl tgl-ios"
                id="cb2-7"
                type="checkbox"
                checked={firstRowHeader}
                onChange={(e) => handleFirstRowHeaderChange(e.target.checked)}
              />
              <label className="tgl-btn" htmlFor="cb2-7"></label>
            </div>
            <div className="ml-2 text-sm font-medium text-gray-700 mt-10">
              Första raden är header
            </div>
          </div>

          <div className="container-tabel overflow-x-scroll mt-2 relative">
            <table className="table-auto border-collapse w-full mt-1">
              <thead className="sticky top-0">
                <tr>
                  {headers.map((header, colIndex) => {
                    const selectedOption = header.toLowerCase().startsWith('tomt_') ? 'Tomt' : header;
                    const isValidHeader = selectedOption === 'Tomt' || options.includes(header);
                    return (
                      <th key={colIndex} className={`text-ellipsis overflow-hidden whitespace-nowrap ${isValidHeader ? '' : 'bg-red-300'}`}>
                        <select
                          value={selectedOption}
                          onChange={(e) => handleHeaderChange(colIndex, e.target.value)}
                          className=" px-2 py-1 w-full"
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
            <ExportSystems handleExport={handleExport} />
          </div>
        </>
      )}
    </>
  );
};

export default Convert;