import { formatDate, isValidDateFormat, convertToDate, isValidOmfattningFormat, formatPercentage } from '@/components/utils/utils';

export const processDataObjects = async (
  dataObjects: any[],
  selectedDate: Date | null,
  field1Value: string,
  field2Value: string
): Promise<string[]> => {
  await Promise.resolve();

  const validUnits = ['tim', 'dgr', 'kdgr', ''];
  const ssnRegex = /^\d{6}-\d{4}$/;
  const errorMessages: string[] = [];
  const errorFlags: { [key: string]: boolean } = {};

  try {
    dataObjects.forEach(dataObject => {
      dataObject['Utbetalningsdatum'] = selectedDate ? formatDate(selectedDate) : null;
      dataObject['Första dagen i föregående månad'] = field1Value;
      dataObject['Sista dagen i föregående månad'] = field2Value;

      Object.keys(dataObject).forEach(key => {
        switch (key) {
          case 'Anställningsnummer':
            const employmentNumber = dataObject[key];
            const isValidEmploymentNumber = /^[a-zA-Z0-9]{1,10}$/.test(employmentNumber);
            if (!isValidEmploymentNumber && !errorFlags['Anställningsnummer']) {
              errorMessages.push('Anställningsnummer får endast innehålla bokstäver och siffror och vara max 10 tecken långt.');
              errorFlags['Anställningsnummer'] = true;
              dataObject[key] = employmentNumber.substring(0, 10);
            }
            break;

          case 'Löneartsnr':
            const payTypeNumber = dataObject[key];
            const isValidPayTypeNumber = /^\d{1,3}$/.test(payTypeNumber);
            if (!isValidPayTypeNumber && !errorFlags['Löneartsnr']) {
              errorMessages.push('Löneartsnr får endast innehålla siffror och vara max 3 tecken långt.');
              errorFlags['Löneartsnr'] = true;
              dataObject[key] = payTypeNumber.substring(0, 3);
            }
            break;

          case 'Konteringsnivå 1':
          case 'Konteringsnivå 2':
            const accountCodingLevel = dataObject[key];
            const isValidAccountCodingLevel = /^[a-zA-Z0-9]*$/.test(accountCodingLevel);
            if (!isValidAccountCodingLevel && !errorFlags[key]) {
              errorMessages.push('Konteringsnivåer får endast innehålla bokstäver och siffror.');
              errorFlags[key] = true;
              dataObject[key] = accountCodingLevel.replace(/[^a-zA-Z0-9]/g, '');
            }
            break;

          case 'T.o.m. datum':
          case 'Fr.o.m. datum':
            if (!isValidDateFormat(dataObject[key])) {
              dataObject[key] = formatDate(convertToDate(dataObject[key]));
            }
            break;

          case 'Omfattning %':
            const isValid = isValidOmfattningFormat(dataObject[key]);
            if (!isValid && !errorFlags['Omfattning %']) {
              errorMessages.push('Omfattning % måste vara ett giltigt format.');
              errorFlags['Omfattning %'] = true;
              dataObject[key] = formatPercentage(dataObject[key]);
            }
            break;

          case 'Antal':
            const quantity = parseFloat(dataObject[key]);
            if (isNaN(quantity) && !errorFlags['Antal']) {
              errorMessages.push('Antal måste vara ett tal.');
              errorFlags['Antal'] = true;
              dataObject[key] = '0.00';
            } else {
              dataObject[key] = quantity.toFixed(2);
            }
            break;

          case 'Antal enhet':
            const unit = dataObject[key];
            if (!validUnits.includes(unit) && !errorFlags['Antal enhet']) {
              errorMessages.push('Antal enhet måste vara "tim", "dgr", "kdgr" eller tomt.');
              errorFlags['Antal enhet'] = true;
              dataObject[key] = '';
            }
            break;

          case 'A-pris':
            const unitPrice = parseFloat(dataObject[key]);
            if (isNaN(unitPrice) && !errorFlags['A-pris']) {
              errorMessages.push('A-pris måste vara ett tal.');
              errorFlags['A-pris'] = true;
              dataObject[key] = '0.00';
            } else {
              dataObject[key] = unitPrice.toFixed(2);
            }
            break;

          case 'Belopp':
            const amount = parseFloat(dataObject[key]);
            if (isNaN(amount) && !errorFlags['Belopp']) {
              errorMessages.push('Belopp måste vara ett tal.');
              errorFlags['Belopp'] = true;
              dataObject[key] = '0.00';
            } else {
              dataObject[key] = amount.toFixed(2);
            }
            break;

          case 'Meddelande':
            const message = dataObject[key];
            if (message.length > 50 && !errorFlags['Meddelande']) {
              errorMessages.push('Meddelande får vara max 50 tecken långt.');
              errorFlags['Meddelande'] = true;
              dataObject[key] = message.substring(0, 50);
            }
            break;

          case 'Lönekod':
            const salaryCode = dataObject[key];
            const isValidSalaryCode = /^[a-zA-Z0-9]{1,10}$/.test(salaryCode);
            if (!isValidSalaryCode && !errorFlags['Lönekod']) {
              errorMessages.push('Lönekod får endast innehålla bokstäver och siffror och vara max 10 tecken långt.');
              errorFlags['Lönekod'] = true;
              dataObject[key] = salaryCode.substring(0, 10);
            }
            break;

          case 'Semesterkvot':
            const semesterQuota = parseFloat(dataObject[key]);
            if ((isNaN(semesterQuota) || semesterQuota < 0.6 || semesterQuota > 25) && !errorFlags['Semesterkvot']) {
              errorMessages.push('Semesterkvot måste vara ett tal mellan 0.6 och 25.');
              errorFlags['Semesterkvot'] = true;
              dataObject[key] = '';
            }
            break;

          case 'Kalenderdagsfaktor':
            const calendarDayFactor = parseFloat(dataObject[key]);
            if (isNaN(calendarDayFactor) && !errorFlags['Kalenderdagsfaktor']) {
              errorMessages.push('Kalenderdagsfaktor måste vara ett tal.');
              errorFlags['Kalenderdagsfaktor'] = true;
              dataObject[key] = '';
            }
            break;

          case 'Barn':
            const childSSN = dataObject[key];
            if (!ssnRegex.test(childSSN) && !errorFlags['Barn']) {
              errorMessages.push('Barn måste vara i formatet "ÅÅMMDD-XXXX".');
              errorFlags['Barn'] = true;
              dataObject[key] = '';
            }
            break;

          default:
            // Manage account coding levels 3-10
            if (key.startsWith('Konteringsnivå ')) {
              const level = parseInt(key.split(' ')[1], 10);
              if (level >= 3 && level <= 10) {
                const accountCodingLevel = dataObject[key];
                const isValidAccountCodingLevel = /^[a-zA-Z0-9]*$/.test(accountCodingLevel);
                if (!isValidAccountCodingLevel && !errorFlags[key]) {
                  errorMessages.push(`Konteringsnivå ${level} får endast innehålla bokstäver och siffror.`);
                  errorFlags[key] = true;
                  dataObject[key] = accountCodingLevel.replace(/[^a-zA-Z0-9]/g, '');
                }
              }
            }
            break;
        }
      });
    });
  } catch (error) {
    console.error('Error processing data objects:', error);
    errorMessages.push('Ett fel uppstod vid bearbetning av data.');
  }
  return errorMessages;
};