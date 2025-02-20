import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import chardet from 'chardet';
import iconv from 'iconv-lite';
import { expectedHeadersWithHeader } from '@/data/staticData';

const preprocessCsvData = (csvData: string): string => {
  // Replace all " with an empty string
  let preprocessedData = csvData.replace(/"/g, '');

  return preprocessedData;
};

const detectDelimiter = (firstLine: string): string => {
  const delimiters = [',', ';', '\t', '|', ' ', '~'];
  const delimiterCounts = delimiters.map(delimiter => ({
    delimiter,
    count: (firstLine.match(new RegExp(`\\${delimiter}`, 'g')) || []).length
  }));

  const mostFrequentDelimiter = delimiterCounts.reduce((prev, current) => 
    (prev.count > current.count) ? prev : current
  ).delimiter;
  return mostFrequentDelimiter;
};

const readCsvFile = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      let arrayBuffer = event.target?.result as ArrayBuffer;
      let buffer = Buffer.from(arrayBuffer);
      let encoding = chardet.detect(buffer) || 'windows-1252'; 

      let csvData = '';
      if (encoding === 'UTF-8') {
        csvData = buffer.toString('utf-8');
      } else {
        console.log('Encoding:', encoding);
        console.log('Converting to UTF-8');
        csvData = iconv.decode(buffer, encoding); // Convert to UTF-8
      }

      // Preprocess CSV data
      csvData = preprocessCsvData(csvData);

      // Check if the first line contains headers
      const firstLine = csvData.split('\n')[0];
      const hasHeader = expectedHeadersWithHeader.some(header => firstLine.includes(header));

      console.log('hasHeader:', hasHeader);
      // Detect the delimiter
      const delimiter = detectDelimiter(firstLine);

      Papa.parse(csvData, {
        header: false, // Always parse without header
        delimiter: delimiter,
        skipEmptyLines: false,
        dynamicTyping: true,
        complete: (results) => {
          let parsedData = results.data;

          // Use headers from the first line
          const headers = firstLine.split(delimiter).map((header, index) => header.trim() || `Tomt_${index + 1}`);
          console.log('headers:', headers);
          // Remove the first line (header) from the data
          parsedData = parsedData.slice(1);

          const formattedData = parsedData.map((row: any) => {
            const rowData: any = {};
            headers.forEach((header: string, index: number) => {
              rowData[header] = row[index] !== undefined ? row[index] : '';
            });
            return rowData;
          });

          console.log('formattedData: ', formattedData);

          // Filter out rows where all values are empty strings, null, or undefined
          const filteredContent = formattedData.filter(row => Object.values(row).some(value => value !== '' && value !== null && value !== undefined));

          resolve(filteredContent);
        },
        error: (error: Error) => {
          console.error('Error parsing the file:', error);
          reject(error);
        },
      });
    };

    reader.onerror = (error) => {
      console.error('Error reading the file:', error);
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
};

const readExcelFiles = (file: File): Promise<{ firstColumn: any[], secondColumn: any[] }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];

      const rows = jsonData

      const firstColumn = rows.map(row => row[0]);
      const secondColumn = rows.map(row => row[1]);

      resolve({ firstColumn, secondColumn });
    };

    reader.onerror = (error) => {
      console.error('Error reading the file:', error);
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
};

const convert = async (file: File) => {
  const fileName = file.name;
  const fileExtension = fileName.split('.').pop()?.toLowerCase();

  if (fileExtension === 'csv') {
    try {
      const data = await readCsvFile(file);
      if (typeof data === 'object') {
        return data;
      } else {
        throw new Error('Data is not an object');
      }
    } catch (error) {
      console.error('Error reading the file:', error);
      throw error;
    }
  }
    else if (fileExtension === 'xls' || fileExtension === 'xlsx') {
      const { firstColumn, secondColumn } = await readExcelFiles(file);
      return { firstColumn, secondColumn };
    }
    else {
      throw new Error('Invalid file type');
    }
};

export const handleFileChange = async (
  event: React.ChangeEvent<HTMLInputElement>,
  setUploadedFileName: (name: string) => void,
  setFileContent: (content: any[]) => void,
  setMappingContent: (content: any) => void,
  setMessage: (message: string) => void,
  setMessageColor: (color: string) => void,
  allowedExtensions: string[],
  isMapping: boolean = false
) => {
  const file = event.target.files?.[0];
  if (file) {
    const fileName = file.name;
    const fileExtension = fileName.split('.').pop()?.toLowerCase();

    if (allowedExtensions.includes(fileExtension || '')) {
      setUploadedFileName(fileName);
      try {
        const data = await convert(file);
        if (data) {
          if (isMapping) {
            setMappingContent(data);
            setMessage('Importerat Mapping');
            setMessageColor('text-green-500');
            setTimeout(() => {
              setMessage('');
              setMessageColor('');
            }, 5000);
          } else {
            if (Array.isArray(data)) {
              setFileContent(data);
            } else {
              setFileContent([]);
              setMessage('Unexpected data format');
            }
          }
        }
      } catch (error) {
        console.error('Error converting file:', error);
        setMessage('Error converting file');
      }
    } else {
      setMessage(`Filen måste vara av typen: ${allowedExtensions.join(', ')}`);
      setMessageColor('text-red-500');
      setTimeout(() => {
        setMessage('');
        setMessageColor('');
      }, 5000);
    }
  } else {
    console.error('No file selected');
    setMessage('Ingen fil vald');
    setMessageColor('text-red-500');
    setTimeout(() => {
      setMessage('');
      setMessageColor('');
    }, 5000);
  }
};