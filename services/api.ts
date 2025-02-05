export const getTemplates = async () => {
    try {
      const response = await fetch(`/api/templates`);
      if (!response.ok) {
        throw new Error('Failed to fetch template');
      }
      return response;
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
      return null;
    }
  
    const data = await response.json();
    return data;
  };