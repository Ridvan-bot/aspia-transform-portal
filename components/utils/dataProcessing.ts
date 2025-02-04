import { formatDate, isValidDateFormat, convertToDate, isValidOmfattningFormat, formatPercentage } from '@/components/utils/utils';
export const processDataObjects = async (
  dataObjects: any[],
  selectedDate: Date | null,
  field1Value: string,
  field2Value: string
): Promise<void> => {
  await Promise.resolve();

  const validUnits = ['tim', 'dgr', 'kdgr', ''];
  const ssnRegex = /^\d{6}-\d{4}$/;

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
            dataObject[key] = employmentNumber.substring(0, 10);
          }
          break;

        case 'Löneartsnr':
          const payTypeNumber = dataObject[key];
          const isValidPayTypeNumber = /^\d{1,3}$/.test(payTypeNumber);
          if (!isValidPayTypeNumber) {
            dataObject[key] = payTypeNumber.substring(0, 3);
          }
          break;

        case 'Konteringsnivå 1':
        case 'Konteringsnivå 2':
          const accountCodingLevel = dataObject[key];
          const isValidAccountCodingLevel = /^[a-zA-Z0-9]*$/.test(accountCodingLevel);
          if (!isValidAccountCodingLevel) {
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
              dataObject[key] = '0.00';
            } else {
              dataObject[key] = quantity.toFixed(2);
            }
            break;
    
        case 'Antal enhet':
            const unit = dataObject[key];
            if (!validUnits.includes(unit)) {
                dataObject[key] = '';
            }
            break;

        case 'A-pris':
            const unitPrice = parseFloat(dataObject[key]);
            if (isNaN(unitPrice)) {
              dataObject[key] = '0.00';
            } else {
              dataObject[key] = unitPrice.toFixed(2);
            }
            break;
        
        case 'Belopp':
            const amount = parseFloat(dataObject[key]);
            if (isNaN(amount)) {
              dataObject[key] = '0.00';
            } else {
              dataObject[key] = amount.toFixed(2);
            }
            break;
        
        case 'Meddelande':
            const message = dataObject[key];
            if (message.length > 50) {
              dataObject[key] = message.substring(0, 50);
            }
            break;
        
        case 'Lönekod':
            const salaryCode = dataObject[key];
            const isValidSalaryCode = /^[a-zA-Z0-9]{1,10}$/.test(salaryCode);
            if (!isValidSalaryCode) {
              dataObject[key] = salaryCode.substring(0, 10);
            }
            break;

        case 'Semesterkvot':
            const semesterQuota = parseFloat(dataObject[key]);
            if (isNaN(semesterQuota) || semesterQuota < 0.6 || semesterQuota > 25) {
              dataObject[key] = '';
            }
            break;
        
        case 'Kalenderdagsfaktor':
            const calendarDayFactor = parseFloat(dataObject[key]);
            if (isNaN(calendarDayFactor)) {
              dataObject[key] = '';
            }
            break;
        
        case 'Barn':
            const childSSN = dataObject[key];
            if (!ssnRegex.test(childSSN)) {
                dataObject[key] = ''; // Eller annan standardvärde eller hantering
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
};