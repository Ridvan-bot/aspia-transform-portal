export const fetchTemplate = async (filename: string) => {
    try {
      const response = await fetch(`/api/template?filename=${filename}`);
      if (!response.ok) {
        throw new Error('Failed to fetch template');
      }
      const data = await response.json();
      console.log('Template:', data);
    } catch (error) {
      console.error('Failed to fetch template:', error);
    }
  };