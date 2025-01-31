import { convert } from './converter';


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

export const saveDataAsJsonFile = async (data: any, filename: string) => {
  const response = await fetch('/api/template', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data, filename }),
  });

  if (!response.ok) {
    throw new Error('Failed to save file');
  }

  return response.json();
};

export const fetchDataFromServer = async (filename: string) => {
  const response = await fetch(`/api/template?filename=${filename}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch file');
  }

  return response.json();
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
    } else if (!templateName) {
      setMessage('Vänligen ange ett namn för mallen');
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
        await saveDataAsJsonFile(dataObjects, templateName);
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