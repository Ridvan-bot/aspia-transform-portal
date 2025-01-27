import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

const csvFilePath = path.join(__dirname, '../../csvFiles/header.csv');
const expectedHeadersWithHeader = ['EmployeeCode', 'DepartmentCode', 'ProjectCode', 'SalaryTypeCode', 'Quantity', 'PeriodStart', 'PeriodEnd'];

const readCsvFile = (filePath: string): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    console.log(`Reading file: ${filePath}`);
    const fileStream = fs.createReadStream(filePath, 'utf8');

    let csvData = '';
    fileStream.on('data', (chunk) => {
      csvData += chunk;
    });

    fileStream.on('end', () => {
      // Check if the first line contains headers
      const firstLine = csvData.split('\n')[0];
      const hasHeader = expectedHeadersWithHeader.every(header => firstLine.includes(header));

      Papa.parse(csvData, {
        header: hasHeader,
        delimiter: ';',
        complete: (results) => {
          if (!hasHeader) {
            const emptyHeaderArray = results.data.map((row: any) => {
              const rowData: any = {};
              row.forEach((column: string, index: number) => {
                rowData[`${index + 1}`] = column;
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
    });

    fileStream.on('error', (error) => {
      console.error('Error reading the file:', error);
      reject(error);
    });
  });
};

export const convert = async () => {
  try {
    const data = await readCsvFile(csvFilePath);
    console.log('All data from the file:');
    console.log(data[0]);
  } catch (error) {
    console.error('Error reading the file:', error);
  }
};

