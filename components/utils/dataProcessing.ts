import { formatDate, isValidDateFormat, convertToDate, isValidOmfattningFormat, formatPercentage } from '@/components/utils/utils';

export const processDataObjects = async (
  dataObjects: any[],
  selectedDate: Date | null,
  field1Value: string,
  field2Value: string
): Promise<void> => {
  await Promise.resolve(); // Simulera en asynkron operation

  dataObjects.forEach(dataObject => {
    dataObject['Utbetalningsdatum'] = selectedDate ? formatDate(selectedDate) : null;
    dataObject['Första dagen i föregående månad'] = field1Value;
    dataObject['Sista dagen i föregående månad'] = field2Value;

    // Convert "Tom Datum" and "From Datum" to Date objects if not already in correct format
    if (dataObject['T.o.m. datum'] && !isValidDateFormat(dataObject['T.o.m. datum'])) {
      dataObject['T.o.m. datum'] = formatDate(convertToDate(dataObject['T.o.m. datum']));
    }
    if (dataObject['Fr.o.m. datum'] && !isValidDateFormat(dataObject['Fr.o.m. datum'])) {
      dataObject['Fr.o.m. datum'] = formatDate(convertToDate(dataObject['Fr.o.m. datum']));
    }
    if (dataObject['Omfattning %']) {
      const isValid = isValidOmfattningFormat(dataObject['Omfattning %']);
      if (!isValid) {
        dataObject['Omfattning %'] = formatPercentage(dataObject['Omfattning %']);
      }
    }
  });
};