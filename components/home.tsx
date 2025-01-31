"use client";
import React, { useRef, useState } from 'react';
import Convert from './convert';
import { handleFileChange } from './utils/fileHandler';
import { handleSaveTemplate } from './utils/templetHandler';

const Home: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<any[]>([]);
  const [message, setMessage] = useState<string>('');
  const [messageColor, setMessageColor] = useState<string>(''); // State for message color


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
        <button className="button-custom px-4 py-2 bg-customButton text-customButtonTextColor rounded">
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