import { formatDate, isValidDateFormat, convertToDate, isValidOmfattningFormat, formatPercentage } from '@/components/utils/utils';


export const processDataObjects = async (
  dataObjects: any[],
  selectedDate: Date | null,
  field1Value: string,
  field2Value: string
): Promise<string[]> => {
  await Promise.resolve();

  const validUnits = ['tim', 'dgr', 'kdgr', '', 'mil', 'km', null];
  const ssnRegex = /^\d{6}-\d{4}$/;
  const errorMessages: string[] = [];
  const errorSet = new Set<string>(); // Set to keep track of unique error messages

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
          if (!isValidEmploymentNumber) {
            const errorMessage = 'Anställningsnummer får endast innehålla bokstäver och siffror och vara max 10 tecken långt.';
            if (!errorSet.has(errorMessage)) {
              errorMessages.push(errorMessage);
              errorSet.add(errorMessage);
            }
            dataObject[key] = employmentNumber.substring(0, 10);
          }
          break;

          case 'Löneartsnr':
            const payTypeNumber = dataObject[key];
            const isValidPayTypeNumber = /^\d{1,3}$/.test(payTypeNumber);
            if (!isValidPayTypeNumber) {
              const errorMessage = 'Löneartsnr får endast innehålla siffror och vara max 3 tecken långt.';
              if (!errorSet.has(errorMessage)) {
                errorMessages.push(errorMessage);
                errorSet.add(errorMessage);
              }
              dataObject[key] = payTypeNumber.substring(0, 3);
            }
            break;

            case 'Konteringsnivå 1':
              case 'Konteringsnivå 2':
                const accountCodingLevel = dataObject[key];
                const isValidAccountCodingLevel = /^[a-zA-Z0-9]*$/.test(accountCodingLevel);
                if (!isValidAccountCodingLevel) {
                  const errorMessage = 'Konteringsnivåer får endast innehålla bokstäver och siffror.';
                  if (!errorSet.has(errorMessage)) {
                    errorMessages.push(errorMessage);
                    errorSet.add(errorMessage);
                  }
                  dataObject[key] = accountCodingLevel.replace(/[^a-zA-Z0-9]/g, '');
                }
                break;

        case 'T.o.m. datum':
          if (!isValidDateFormat(dataObject[key])) {
            dataObject[key] = formatDate(convertToDate(dataObject[key]));
          }
          break;
        case 'Fr.o.m. datum':
          if (!isValidDateFormat(dataObject[key])) {
            dataObject[key] = formatDate(convertToDate(dataObject[key]));
          }
          break;

        case 'Omfattning %':
          const isValid = isValidOmfattningFormat(dataObject[key]);
          if (!isValid) {
            dataObject[key] = formatPercentage(dataObject[key]);
          }
          break;
        
        case 'Antal':
            const quantity = parseFloat(dataObject[key]);
            if (isNaN(quantity)) {
              errorMessages.push('Antal måste vara ett tal.');
              dataObject[key] = '0,00';
            } else {
              dataObject[key] = quantity.toFixed(2).replace('.', ',');
            }
            break;
    
        case 'Antal enhet':
            const unit = dataObject[key];
            if (!validUnits.includes(unit)) {
              errorMessages.push('Antal enhet måste vara "tim", "dgr", "kdgr", "km", "mil" eller tomt.');
                dataObject[key] = '';
            }
            break;

        case 'A-pris':
            const unitPrice = parseFloat(dataObject[key]);
            if (isNaN(unitPrice)) {
              dataObject[key] = '0,00';
              errorMessages.push('A-pris måste vara ett tal.');
            } else {
              dataObject[key] = unitPrice.toFixed(2).replace('.', ',');
            }
            break;
        
        case 'Belopp':
            const amount = parseFloat(dataObject[key]);
            if (isNaN(amount)) {
              dataObject[key] = '0,00';
              errorMessages.push('Belopp måste vara ett tal.');
            } else {
              dataObject[key] = amount.toFixed(2).replace('.', ',');
            }
            break;
        
        case 'Meddelande':
            const message = dataObject[key];
            if (message.length > 50) {
              errorMessages.push('Meddelande får vara max 50 tecken långt.');
              dataObject[key] = message.substring(0, 50);
            }
            break;
        
        case 'Lönekod':
            const salaryCode = dataObject[key];
            const isValidSalaryCode = /^[a-zA-Z0-9]{1,10}$/.test(salaryCode);
            if (!isValidSalaryCode) {
              errorMessages.push('Lönekod får endast innehålla bokstäver och siffror och vara max 10 tecken långt.');
              dataObject[key] = salaryCode.substring(0, 10);
            }
            break;

        case 'Semesterkvot':
            const semesterQuota = parseFloat(dataObject[key]);
            if (isNaN(semesterQuota) || semesterQuota < 0.6 || semesterQuota > 25) {
              errorMessages.push('Semesterkvot måste vara ett tal mellan 0.6 och 25.');
              dataObject[key] = '';
            }
            break;
        
        case 'Kalenderdagsfaktor':
            const calendarDayFactor = parseFloat(dataObject[key]);
            if (isNaN(calendarDayFactor)) {
              errorMessages.push('Kalenderdagsfaktor måste vara ett tal.');
              dataObject[key] = '';
            }
            break;
        
        case 'Barn':
            const childSSN = dataObject[key];
            if (!ssnRegex.test(childSSN)) {
              errorMessages.push('Barn måste vara i formatet "ÅÅMMDD-XXXX".');
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
              if (!isValidAccountCodingLevel) {
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