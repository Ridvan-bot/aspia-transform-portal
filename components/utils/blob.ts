export const getHeadersFromLocalStorage = (): string[] => {
  const headers = localStorage.getItem('headers');
  return headers ? JSON.parse(headers) : [];
};

export const getDataFromLocalStorage = (): any[] => {
  const data = localStorage.getItem('data');
  return data ? JSON.parse(data) : [];
};

export const saveDataAsJsonFile = async (data: any, filename: string) => {
  console.log('data', data);
  console.log('filename', filename);
  const response = await fetch('/api/templet', {
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
  const response = await fetch(`/api/templet?filename=${filename}`, {
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