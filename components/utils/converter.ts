import Papa from 'papaparse';

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

const expectedHeadersWithHeader = [
  'Anställningsnummer', 'Löneartsnr', 'Konteringsnivå 1', 'Konteringsnivå 2', 
  'Konteringsnivå 3', 'Konteringsnivå 4', 'Konteringsnivå 5', 'Konteringsnivå 6', 
  'Konteringsnivå 7', 'Konteringsnivå 8', 'Konteringsnivå 9', 'Konteringsnivå 10', 
  'Antal', 'Antal enhet', 'A-pris', 'Belopp', 'Fr.o.m. datum', 'T.o.m. datum', 
  'Meddelande', 'Omfattning %', 'Lönekod', 'Semesterkvot', 'Kalenderdagsfaktor', 
  'Barn', 'EmployeeCode', 'DepartmentCode', 'ProjectCode', 'ActivityCode', 'SalaryTypeCode',
  'Quantity', 'PeriodStart', 'PeriodEnd'
];

const readCsvFile = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      let csvData = event.target?.result as string;

      // Preprocess CSV data
      csvData = preprocessCsvData(csvData);

      // Check if the first line contains headers
      const firstLine = csvData.split('\n')[0];
      console.log(`First line of CSV: ${firstLine}`);
      const hasHeader = expectedHeadersWithHeader.some(header => firstLine.includes(header));
      console.log(`Has header: ${hasHeader}`);

      // Detect the delimiter
      const delimiter = detectDelimiter(firstLine);

      Papa.parse(csvData, {
        header: false, // Always parse without header
        delimiter: delimiter,
        skipEmptyLines: false,
        dynamicTyping: true,
        complete: (results) => {
          let parsedData = results.data;

          let headers: string[];
          if (hasHeader) {
            // Use headers from the first line
            headers = firstLine.split(delimiter).map(header => header.trim());
            // Remove the first line (header) from the data
            parsedData = parsedData.slice(1);
          } else {
            // Use Tomt + index as headers
            headers = firstLine.split(delimiter).map((header, index) => `Tomt${index + 1}`);
          }

          const formattedData = parsedData.map((row: any) => {
            const rowData: any = {};
            headers.forEach((header: string, index: number) => {
              rowData[header] = row[index] !== undefined ? row[index] : '';
            });
            return rowData;
          });

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

    reader.readAsText(file);
  });
};
export const convert = async (file: File) => {
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
};