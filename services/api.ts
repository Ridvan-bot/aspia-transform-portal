export const getTemplates = async (filename: string) => {
    try {
      const response = await fetch(`/api/template`);
      if (!response.ok) {
        throw new Error('Failed to fetch template');
      }
      const data = await response.json();
      console.log('Template:', data);
    } catch (error) {
      console.error('Failed to fetch template:', error);
    }
  };

  export const postTemplet = async (data: any, filename: string) => {
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
    console.log('Template saved successfully');
  
    return response.json();
  };
  
  export const getTemplate = async (filename: string) => {
    const response = await fetch(`/api/template?filename=${filename}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch file');
    }
  
    const data = await response.json();
    console.log('Template:', data);
    return data;
  };