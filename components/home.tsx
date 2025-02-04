"use client";
import React, { useRef, useState, useEffect } from 'react';
import Convert from './convert';
import { handleFileChange, handleSaveTemplate } from './utils/fileHandler';
import { getTemplate, getTemplates } from '@/services/api';
import { extractKeys, mapKeys } from './utils/utils';


const Home: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<any[]>([]);
  const [templateName, setTemplateName] = useState<string>(''); // State for template name
  const [message, setMessage] = useState<string>('');
  const [messageColor, setMessageColor] = useState<string>(''); // State for message color
  const [tableHeaders, setTableHeaders] = useState<string[]>([]); // State for table headers
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [allValues, setAllValues] = useState<any[]>([]);
  const [filteredValues, setFilteredValues] = useState<any[]>([]);
  const [showTemplateList, setShowTemplateList] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const templateListRef = useRef<HTMLUListElement>(null);

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node) &&
        templateListRef.current &&
        !templateListRef.current.contains(event.target as Node)
      ) {
        setShowTemplateList(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const fetchTemplate = async (filename: string) => {
    try {
      const data = await getTemplate(filename);
      const keys = extractKeys(data);
      setTableHeaders(keys);
      const updatedContent = mapKeys(fileContent, keys);
      setFileContent(updatedContent);
    } catch (error) {
      setMessage('Mallen finns inte eller kunde inte hämtas');
      setMessageColor('text-red-500');
      setTimeout(() => {
        setMessage('');
        setMessageColor('');
      }, 5000);
    }
  };

  const fetchTemplates = async () => {
    try {
      const response = await getTemplates();
      if (!response) {
        throw new Error('Failed to fetch templates');
      }
      const data = await response.json();
      console.log('Fetched templates:', data);
      const templates = data.templates; // Extrahera templates-arrayen
      setAllValues(templates);
      setFilteredValues(templates);
      setShowTemplateList(true);
    } catch (error) {
      console.error('Error fetching templates:', error);
      setMessage('Kunde inte hämta mallar');
      setMessageColor('text-red-500');
      setTimeout(() => {
        setMessage('');
        setMessageColor('');
      }, 5000);
    }
  };

  

  return (
    <div className="container-fluid flex flex-col items-center pt-4 ">
      <div className="flex space-x-4">
        <button
          className="button-custom px-4 py-2 bg-customButton text-customButtonTextColor rounded max-h-11 text-sm leading-tight"
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
          className="input-custom px-4 py-2 rounded max-h-11 text-sm leading-tight"
        />
        <button
          className="button-custom px-4 py-2 bg-customButton text-customButtonTextColor rounded max-h-11 text-sm leading-tight"
          onClick={() => handleSaveTemplate(fileContent, templateName, setMessage, setMessageColor)}
        >
          Spara Mall
        </button>
        <div className="relative">
          <button
            className="button-custom px-4 py-2 bg-customButton text-customButtonTextColor rounded max-h-11 text-sm leading-tight" 
            onClick={() => fetchTemplate(templateName)}
          >
            Använd Mall
          </button>
        </div>
        <input
        ref={searchInputRef}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={fetchTemplates}
        placeholder="Sök efter mallar"
        className="input-custom px-4 py-2 rounded w-full max-h-11 text-sm leading-tight"
      />
      {showTemplateList && filteredValues.length > 0 && (
        <ul ref={templateListRef} className="mt-2 border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto w-full">
          {filteredValues.map((value, index) => (
            <li
              key={index}
              className="border-b py-2 px-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => setTemplateName(value)} // Uppdatera templateName när en mall klickas
            >
              {value}
            </li>
          ))}
        </ul>
      )}
      </div>
      {message && <p className={messageColor}>{message}</p>}
      {fileContent.length > 0 && <Convert fileContent={fileContent}  />}
    </div>
  );
};

export default Home;