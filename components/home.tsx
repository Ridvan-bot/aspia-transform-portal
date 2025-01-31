"use client";
import React, { useRef, useState } from 'react';
import Convert from './convert';
import { handleFileChange, handleSaveTemplate } from './utils/fileHandler';
import { getTemplate } from '@/services/api';
import { extractKeys } from './utils/utils';

const Home: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<any[]>([]);
  const [templateName, setTemplateName] = useState<string>(''); // State for template name
  const [message, setMessage] = useState<string>('');
  const [messageColor, setMessageColor] = useState<string>(''); // State for message color
  const [tableHeaders, setTableHeaders] = useState<string[]>([]); // State for table headers

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const fetchTemplate = async (filename: string) => {
    try {
      const data = await getTemplate(filename);
      console.log('Fetched template:', data);
      const keys = extractKeys(data);
      console.log('Keys:', keys);
      updateTableHeaders(keys);
    } catch (error) {
      console.error('Failed to fetch template:', error);
    }
  };

  const updateTableHeaders = (keys: string[]) => {
    setTableHeaders(keys);
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
        <input
          type="text"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          placeholder="Ange mallens namn"
          className="input-custom px-4 py-2 rounded"
        />
        <button
          className="button-custom px-4 py-2 bg-customButton text-customButtonTextColor rounded"
          onClick={() => handleSaveTemplate(fileContent, templateName, setMessage, setMessageColor)}
        >
          Spara Mall
        </button>
        <div className="relative">
          <button
            className="button-custom px-4 py-2 bg-customButton text-customButtonTextColor rounded"
            onClick={() => fetchTemplate(templateName)}
          >
            Mallar
          </button>
        </div>
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