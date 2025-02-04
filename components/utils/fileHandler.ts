import { convert } from './converter';
import { postTemplet } from '@/services/api';


export const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>, setUploadedFileName: (name: string) => void, setFileContent: (content: any[]) => void, setMessage: (message: string) => void) => {
  const file = event.target.files?.[0];
  if (file) {
    setUploadedFileName(file.name);

    try {
      const data = await convert(file);
      if (data) {
        setFileContent(data);
      }
    } catch (error) {
      console.error('Error converting file:', error);
      setMessage('Error converting file');
    }
  }
};


export const getHeadersFromLocalStorage = (): string[] => {
  const headers = localStorage.getItem('headers');
  return headers ? JSON.parse(headers) : [];
};

export const getDataFromLocalStorage = (): any[] => {
  const data = localStorage.getItem('data');
  return data ? JSON.parse(data) : [];
};

export const handleSaveTemplate = async (
  fileContent: any[],
  templateName: string,
  setMessage: (message: string) => void,
  setMessageColor: (color: string) => void
) => {
  if (fileContent.length === 0) {
    setMessage('Vänligen importera CSV-fil innan du skapar en mall');
    setMessageColor('text-red-500'); // Set the message color to red
    setTimeout(() => {
      setMessage(''); // Clear the message after 5 seconds
    }, 5000);
    return;
  }

  if (!templateName) {
    setMessage('Vänligen ange ett namn för mallen');
    setMessageColor('text-red-500'); // Set the message color to red
    setTimeout(() => {
      setMessage(''); // Clear the message after 5 seconds
    }, 5000);
    return;
  }

  const headers = getHeadersFromLocalStorage();
  const headerCount: Record<string, number> = {};

  const uniqueHeaders = headers.map((header, index) => {
    if (!header) {
      header = `header_${index}`;
    }
    if (headerCount[header] !== undefined) {
      headerCount[header]++;
      return `${header}_${headerCount[header]}`;
    } else {
      headerCount[header] = 0;
      return header;
    }
  });

  const dataObjects = fileContent.map(row => {
    return uniqueHeaders.reduce((acc, header, index) => {
      acc[header] = row[Object.keys(row)[index]];
      console.log('acc', acc);
      return acc;
    }, {} as Record<string, any>);
  });

  try {
    await postTemplet(dataObjects, templateName);
    setMessage('Mall sparad');
    setMessageColor('text-green-500'); // Set the message color to green
  } catch (error) {
    setMessage('Fel vid sparande av mall');
    setMessageColor('text-red-500'); // Set the message color to red
    setTimeout(() => {
      setMessage('');
    }, 5000);
  }
};