"use client";
import React, { useRef, useState } from 'react';
import Convert from './convert';
import { handleFileChange } from './utils/fileHandler';
import { getHeadersFromLocalStorage, saveDataAsJsonFile, fetchDataFromServer } from './utils/blob';

const Home: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<any[]>([]);
  const [message, setMessage] = useState<string>('');
  const [messageColor, setMessageColor] = useState<string>(''); // State for message color

  const handleSaveTemplate = async (
    fileContent: any[],
    setMessage: (message: string) => void,
    setMessageColor: (color: string) => void
  ) => {
    if (fileContent.length === 0) {
      setMessage('Vänligen importera CSV-fil innan du skapar en mall');
      setMessageColor('text-red-500'); // Set the message color to red
      setTimeout(() => {
        setMessage(''); // Clear the message after 5 seconds
      }, 5000);
    } else {
      const headers = getHeadersFromLocalStorage();
      const dataObjects = fileContent.map(row => {
        return headers.reduce((acc, header, index) => {
          acc[header] = row[Object.keys(row)[index]];
          return acc;
        }, {} as Record<string, any>);
      });

      try {
        await saveDataAsJsonFile(dataObjects, 'template');
        setMessage('Mall sparad');
        setMessageColor('text-green-500'); // Set the message color to green
      } catch (error) {
        setMessage('Misslyckades med att spara mallen');
        setMessageColor('text-red-500'); // Set the message color to red
      }

      setTimeout(() => {
        setMessage(''); // Clear the message after 5 seconds
      }, 5000);
    }
  };

  const handleFetchTemplate = async () => {
    try {
      const data = await fetchDataFromServer('template');
      console.log('Fetched data:', data);
      // Do something with the fetched data
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="container-fluid flex flex-col items-center pt-4">
      <div className="flex space-x-4">
        <button
          className="button-custom px-4 py-2 bg-customButton text-customButtonTextColor rounded"
          onClick={handleImportClick}
        >
          Importera CSV
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(event) => handleFileChange(event, setUploadedFileName, setFileContent, setMessage)}
        />
        <button
          className="button-custom px-4 py-2 bg-customButton text-customButtonTextColor rounded"
          onClick={() => handleSaveTemplate(fileContent, setMessage, setMessageColor)}
        >
          Spara Mall
        </button>
        <button className="button-custom px-4 py-2 bg-customButton text-customButtonTextColor rounded"
        onClick={handleFetchTemplate}
        >
          Mallar
        </button>
      </div>
      {uploadedFileName && (
        <div className="">
          Filen {uploadedFileName} har blivit importerad
        </div>
      )}
      {message && <p className={messageColor}>{message}</p>}
      {fileContent.length > 0 && <Convert fileContent={fileContent} />}
    </div>
  );
};

export default Home;