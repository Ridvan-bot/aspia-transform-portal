export const extractKeys = (data: any[]) => {
    if (data.length === 0) return [];
    return Object.keys(data[0]);
  };

  export const formatDate = (date: Date | null): string => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };

  export const isValidDateFormat = (dateString: string): boolean => {
    return /^\d{8}$/.test(dateString);
  };

  export const isValidOmfattningFormat = (omfattningString: string | undefined): boolean => {
    // Check if the input is a string
    if (typeof omfattningString !== 'string') {
      return false;
    }
    // Check if the input ends with a percentage sign
    if (!omfattningString.endsWith('%')) {
      console.log('hit?')
      return false;
    }
    // Remove the percentage sign

    const cleanedString = omfattningString.slice(0, -1);
    // Replace comma with dot
    const normalizedString = cleanedString.replace(',', '.');
    const number = parseFloat(normalizedString);

    // Check if the number is a valid percentage
    if (isNaN(number) || number < 0 || number > 100) {
      return false;
    }
  
    // Check if the number has more than two decimal places
    const decimalRegex = /^\d+(\.\d{1,2})?$/;
    if (!decimalRegex.test(normalizedString)) {
      return false;
    }
  
    // Check if the number has leading zeros (except for values
    const leadingZeroRegex = /^0\d+(\.\d{1,2})?$/;
    if (leadingZeroRegex.test(normalizedString) && number >= 1) {
      return false;
    }
  
    return true;
  }
  
  export const formatPercentage = (percentageString: string | undefined): string => {
    if (typeof percentageString !== 'string') {
      return '';
    }
    const normalizedString = percentageString.replace(',', '.');
    let number = parseFloat(normalizedString);
    if (isNaN(number) || number < 0 || number > 100) {
      return '';
    }
    // Remove leading zeros (except for values less than 1)
    if (number >= 1) {
      number = parseFloat(number.toString().replace(/^0+/, ''));
    }
    // Replace dot with comma and add % if it's not already there
    let formattedString = number.toFixed(2).replace('.', ',');
    // Add % if it's not already there
    if (!formattedString.endsWith('%')) {
      formattedString += '%';
    }
    return formattedString;
  }

  export const mapKeys = (data: any[], keys: string[]) => {
    return data.map(item => {
      const newItem: any = {};
      Object.keys(item).forEach((key, index) => {
        newItem[keys[index]] = item[key];
      });
      return newItem;
    });
  };

 // convert date string to date object
export const convertToDate = (dateStr: string): Date => {
let [day, month, year] = dateStr.split(/[./]/); // Split by either '/' or '.'
return new Date(`${year}-${month}-${day}`);
};

export const mapValues = (editedContent: any[], headers: string[], selectedColumn: string | undefined, mappingContent: any) => {
  console.log('headers i mapvalues', headers);
  console.log('selectedColumn i mapvalues', selectedColumn);
  console.log('mappingContent i mapvalues', mappingContent);
  console.log('editedContent i mapvalues', editedContent);

  if (selectedColumn && mappingContent) {
    const columnIndex = headers.indexOf(selectedColumn);
    if (columnIndex !== -1) {
      console.log('Index of selectedColumn in headers:', columnIndex);

      const updatedContent = editedContent.map(row => {
        const newRow: any = {};

        // Iterate over headers and update the row based on the correct keys
        headers.forEach((header, index) => {
          const oldKey = Object.keys(row)[index];
          newRow[header] = row[oldKey];
          if (oldKey !== header) {
            delete row[oldKey];

          }
        });

        const value = newRow[selectedColumn];
        const matchIndex = mappingContent.firstColumn.indexOf(value);
        if (matchIndex !== -1) {
          const newValue = mappingContent.secondColumn[matchIndex];
          newRow[selectedColumn] = newValue;
        }
        console.log('Row after mapping:', newRow);
        return newRow;
      });

      return updatedContent;
    }
  }

  return editedContent;
};