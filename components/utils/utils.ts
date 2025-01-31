export const extractKeys = (data: any[]) => {
    if (data.length === 0) return [];
    return Object.keys(data[0]);
  };