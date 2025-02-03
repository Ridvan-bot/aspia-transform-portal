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