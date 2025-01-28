import Papa from 'papaparse';

const expectedHeadersWithHeader = ['EmployeeCode', 'DepartmentCode', 'ProjectCode', 'SalaryTypeCode', 'Quantity', 'PeriodStart', 'PeriodEnd'];

const detectDelimiter = (firstLine: string): string => {
  const delimiters = [',', ';', '\t ', '|', '~', '" "'];
  let detectedDelimiter = ',';

  delimiters.forEach(delimiter => {
    if (firstLine.includes(delimiter)) {
      detectedDelimiter = delimiter;
    }
  });

  return detectedDelimiter;
};

const readCsvFile = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const csvData = event.target?.result as string;

      // Check if the first line contains headers
      const firstLine = csvData.split('\n')[0];
      const hasHeader = expectedHeadersWithHeader.every(header => firstLine.includes(header));

      // Detect the delimiter
      const delimiter = detectDelimiter(firstLine);

      Papa.parse(csvData, {
        header: hasHeader,
        delimiter: delimiter,
        complete: (results) => {
          if (!hasHeader) {
            const emptyHeaderArray = results.data.map((row: any) => {
              const rowData: any = {};
              row.forEach((column: string, index: number) => {
                rowData[`Tom${index + 1}`] = column;
              });
              return rowData;
            });
            resolve(emptyHeaderArray);
          } else {
            resolve(results.data);
          }
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
  }
};