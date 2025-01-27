"use client";
import React, { useRef, useState } from 'react';
import { convert } from './utils/converter';
import Convert from './convert';

const Home: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<any[]>([]);

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('Selected file:', file.name);
      setUploadedFileName(file.name);

      try {
        const data = await convert(file);
        if (data) {
          setFileContent(data);
        }
      } catch (error) {
        console.error('Error converting file:', error);
      }
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
          onChange={handleFileChange}
        />
        <button className="button-custom px-4 py-2 bg-customButton text-customButtonTextColor rounded">
          Spara Mall
        </button>
        <button className="button-custom px-4 py-2 bg-customButton text-customButtonTextColor rounded">
          Mallar
        </button>
      </div>
      {uploadedFileName && (
        <div className="mt-4 text-green-600">
          Filen "{uploadedFileName}" har blivit importerad.
        </div>
      )}
      {fileContent.length > 0 && <Convert fileContent={fileContent} />}
    </div>
  );
};

export default Home;