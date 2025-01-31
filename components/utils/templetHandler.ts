export const handleSaveTemplate = (
    fileContent: any[],
    setMessage: (message: string) => void,
    setMessageColor: (color: string) => void
  ) => {
    if (fileContent.length === 0) {
      setMessage('Vänligen importera CSV-fil innan du skapar en mall');
      setMessageColor('text-red-500'); // Set the message color to red
      setTimeout(() => {
        setMessage(''); // Clear the message after 5 seconds
      }, 5000);
    } else {
      // Logic to save the template
      setMessage('Mall sparad');
      setMessageColor('text-green-500'); // Set the message color to green
      setTimeout(() => {
        setMessage(''); // Clear the message after 5 seconds
      }, 5000);
    }
  };