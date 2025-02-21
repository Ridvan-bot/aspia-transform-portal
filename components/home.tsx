"use client";
import React, { useRef, useState, useEffect } from 'react';
import Convert from './convert';
import { handleFileChange } from './utils/converter';
import { handleSaveTemplate } from './utils/fileHandler';
import { getTemplate, getTemplates } from '@/services/api';
import { extractKeys, mapKeys } from './utils/utils';
import { options } from '@/data/staticData';
import styles from './home.module.css';

const Home: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileMappingInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<any[]>([]);
  const [mappingContent, setMappingContent] = useState<any>(null);
  const [templateName, setTemplateName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [messageColor, setMessageColor] = useState<string>('');
  const [tableHeaders, setTableHeaders] = useState<string[]>([]); 
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [allValues, setAllValues] = useState<any[]>([]);
  const [filteredValues, setFilteredValues] = useState<any[]>([]);
  const [showTemplateList, setShowTemplateList] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const templateListRef = useRef<HTMLUListElement>(null);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<string>(''); 
  const [firstRowHeader, setFirstRowHeader] = useState(true);
  const [persondata, setPersonData] = useState(false);
  const [transaktionsdata, setTransaktionsData] = useState(false);

  const handleImportClick = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.click();
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

  useEffect(() => {
    if (searchQuery) {
      const filtered = allValues.filter(value =>
        value.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredValues(filtered);
    } else {
      setFilteredValues(allValues);
    }
  }, [searchQuery, allValues]);
  
  const fetchTemplate = async (filename: string) => {
    try {
      const data = await getTemplate(filename);
      const keys = extractKeys(data);
      setTableHeaders(keys)
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
      const templates = data.templates;
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

  const handlePersonDataChange = (checked: boolean) => {
    setPersonData(checked);
    if (checked) {
      setTransaktionsData(false);
    }
  };
  const handleTranskationsDataChange = (checked: boolean) => {
    setTransaktionsData(checked);
    if (checked) {
      setPersonData(false);
    }
  };

  const handleColumnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedColumn(e.target.value);
  };

  const handleHeaderUpdate = (newHeaders: string[]) => {
    setTableHeaders(newHeaders);
  };

  const handleFirstRowHeaderChange = (checked: boolean) => {
    setFirstRowHeader(checked);
  };

  return (
    <div className="container-fluid flex flex-col items-center">
      <div className="flex space-x-4 mb-4">
        <div className="flex items-center">
          <div className="checkbox-wrapper-7">
            <input
              className="tgl tgl-ios"
              id="cb2-7"
              type="checkbox"
              checked={persondata}
              onChange={(e) => handlePersonDataChange(e.target.checked)}
            />
            <label className="tgl-btn" htmlFor="cb2-7"></label>
          </div>
          <div className="ml-2 text-sm font-medium text-custom-aspia">
            Persondata
          </div>
        </div>
        <div className="flex items-center">
          <div className="checkbox-wrapper-7">
            <input
              className="tgl tgl-ios"
              id="cb2-8"
              type="checkbox"
              checked={transaktionsdata}
              onChange={(e) => handleTranskationsDataChange(e.target.checked)}
            />
            <label className="tgl-btn" htmlFor="cb2-8"></label>
          </div>
          <div className="ml-2 text-sm font-medium text-custom-aspia">
            Transaktionsdata
          </div>
        </div>
      </div>
      <div className="flex space-x-4 p-4">
        <button
          title='Klicka för att importera Mappning'
          className="button-custom ml-0"
          onClick={() => {
            handleImportClick(fileMappingInputRef);
          }}
        >
          Importera Mappning
        </button>
        <input
          type="file"
          data-test="data-test-id-importera-mappning"
          ref={fileMappingInputRef}
          style={{ display: 'none' }}
          onChange={(event) => {
            handleFileChange(event, setUploadedFileName, setFileContent, setMappingContent, setMessage, setMessageColor, ['xls', 'xlsx'], setTableHeaders, true);
            setIsInputVisible(true);
          }}
        />
        <select
          title='Välj Kolumn för mappning'
          value={selectedColumn}
          onChange={handleColumnChange}
          className={`input-custom ${isInputVisible ? '' : 'invisible'}`}
        >
          <option value="">Välj Kolumn för mappning</option>
          {(tableHeaders.length > 0 ? tableHeaders : options).map((header, index) => (
            <option key={index} value={header}>{header}</option>
          ))}
        </select>
        <button
          title='Klicka för att importera en fil'
          className="button-custom"
          onClick={() => handleImportClick(fileInputRef)}
        >
          Importera Fil
        </button>
        <input
          type="file"
          data-test="data-test-id-importera-fil"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={(event) => {
            handleFileChange(event, setUploadedFileName, setFileContent, setMappingContent, setMessage, setMessageColor, ['csv'], setTableHeaders);
          }}
        />
        <input
          title='Om du vill skapa en ny mall, ange ett namn och klicka på knappen "Spara Mall".'
          type="text"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          placeholder="Ange mallens namn"
          className="input-custom"
        />
        <button
          title='Klicka för att spara mall'
          className="button-custom"
          onClick={() => handleSaveTemplate(fileContent, templateName, setMessage, setMessageColor)}
        >
          Spara Mall
        </button>
        {/* <div className="relative">
          <button
            title='Skriv in mallens namn i "Anger mallens namn" och klicka på "Använd Mall" för att använda en befintlig mall.'
            className="button-custom" 
            onClick={() => fetchTemplate(templateName)}
          >
            Använd Mall
          </button>
        </div> */}
        <input
          title='Skriv in mallens namn för att söka efter en befintlig mall. När du valt mall kommer den att användas direkt i tabellen.'
          ref={searchInputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={fetchTemplates}
          placeholder="Sök bland mallar"
          className="input-custom"
        />
        {showTemplateList && filteredValues.length > 0 && (
          <ul ref={templateListRef} className="border border-gray-300 rounded shadow-lg text-sm overflow-y-auto w-full leading-tight max-h-40">
            {filteredValues.map((value, index) => (
              <li
                key={index}
                className="border-b py-2 px-4 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setTemplateName(value);
                  fetchTemplate(value);
                  setShowTemplateList(false);
                  setSearchQuery('');
                }}
              >
                {value}
              </li>
            ))}
          </ul>
        )}
      </div>
      {message && <p className={messageColor}>{message}</p>}
      {fileContent.length > 0 && <Convert fileContent={fileContent} mappingContent={mappingContent} selectedColumn={selectedColumn} />}
    </div>
  );
};

export default Home;