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