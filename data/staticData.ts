export const headerDescriptions = [
    { header: 'Anställningsnummer', description: 'Anställningsnummer kopplat till posten. (Alfanumeriskt, max 10 tecken).' },
    { header: 'Löneartsnr', description: 'Löneartsnummer (Numeriskt, max 3 tecken).' },
    { header: 'Konteringsnivå 1', description: 'Konteringsnivå 1 i Flex Payroll (’Konto’) (Alfanumeriskt fält).' },
    { header: 'Konteringsnivå 2', description: 'Konteringsnivå 2 i Flex Payroll (vanligtvis ’K-ställe’) (Alfanumeriska fält).' },
    { header: 'Konteringsnivå 3', description: 'Konteringsnivå 3 i Flex Payroll (Alfanumeriska fält).' },
    { header: 'Konteringsnivå 4', description: '4 Konteringsnivå 4 i Flex Payroll (Alfanumeriska fält).' },
    { header: 'Konteringsnivå 5', description: '5 Konteringsnivå 5 i Flex Payroll (Alfanumeriska fält).' },
    { header: 'Konteringsnivå 6', description: '6 Konteringsnivå 6 i Flex Payroll (Alfanumeriska fält).' },
    { header: 'Konteringsnivå 7', description: '7 Konteringsnivå 7 i Flex Payroll (Alfanumeriska fält).' },
    { header: 'Konteringsnivå 8', description: '8 Konteringsnivå 8 i Flex Payroll (Alfanumeriska fält)' },
    { header: 'Konteringsnivå 9', description: '9 Konteringsnivå 9 i Flex Payroll (Alfanumeriska fält).' },
    { header: 'Konteringsnivå 10', description: '10 Konteringsnivå 10 i Flex Payroll (Alfanumeriska fält).' },
    { header: 'Antal', description: 'Kvantitet (decimaltal)' },
    { header: 'Antal enhet', description: `enheten för kvantitet, kan vara 'tim' (timmar), 'dgr' (dagar), ’kdgr’ (kalenderdagar), eller kan utelämnas om transaktionen inte innehåller frånvaro.` },
    { header: 'A-pris', description: 'Enhetspris (decimaltal)' },
    { header: 'Belopp', description: 'Belopp (decimaltal)' },
    { header: 'Fr.o.m. datum', description: 'datum Från datum för transaktionen, i formatet ÅÅÅÅMMDD.' },
    { header: 'T.o.m. datum', description: 'datum Till datum för transaktionen, i formatet ÅÅÅÅMMDD.' },
    { header: 'Meddelande', description: 'Meddelande, bestående av max 50 tecken.' },
    { header: 'Omfatting %', description: '% Omfattning i % (decimaltal) Exempel: 72,5 i filen motsvarar 72,5%' },
    { header: 'Lönekod', description: 'Lönekod för transaktionen. (Alfanumeriskt, max 10 tecken). Lönekod är valfri och används sällan.' },
    { header: 'Semesterkvot', description: 'Sätter semesterkvoten för datumintervallet för löneraden, om tillgänglig. Bör vara mellan 0,6 och 25.' },
    { header: 'Kalenderdagsfaktor', description: 'Kalenderdagsfaktor för transaktionen.' },
    { header: 'Barn', description: 'Identifierar barn/födelse i samband med föräldraledighet.' },
    { header: 'Tomt', description: 'Om värde ej ska vara en del av export' },
  ];

  export const expectedHeadersWithHeader = [
    'Anställningsnummer', 'Löneartsnr', 'Konteringsnivå 1', 'Konteringsnivå 2', 
    'Konteringsnivå 3', 'Konteringsnivå 4', 'Konteringsnivå 5', 'Konteringsnivå 6', 
    'Konteringsnivå 7', 'Konteringsnivå 8', 'Konteringsnivå 9', 'Konteringsnivå 10', 
    'Antal', 'Antal enhet', 'A-pris', 'Belopp', 'Fr.o.m. datum', 'T.o.m. datum', 
    'Meddelande', 'Omfattning %', 'Lönekod', 'Semesterkvot', 'Kalenderdagsfaktor', 
    'Barn', 'EmployeeCode', 'DepartmentCode', 'ProjectCode', 'ActivityCode', 'SalaryTypeCode',
    'Quantity', 'PeriodStart', 'PeriodEnd'
  ];


 export const options = [
    'Anställningsnummer', 'Löneartsnr', 'Konteringsnivå 1', 'Konteringsnivå 2', 
    'Konteringsnivå 3', 'Konteringsnivå 4', 'Konteringsnivå 5', 'Konteringsnivå 6', 
    'Konteringsnivå 7', 'Konteringsnivå 8', 'Konteringsnivå 9', 'Konteringsnivå 10', 
    'Antal', 'Antal enhet', 'A-pris', 'Belopp', 'Fr.o.m. datum', 'T.o.m. datum', 
    'Meddelande', 'Omfattning %', 'Lönekod', 'Semesterkvot', 'Kalenderdagsfaktor', 'Barn', 'Tomt'
  ];

  export const validUnits = ['tim', 'dgr', 'kdgr', '', null];
  const ssnRegex = /^\d{6}-\d{4}$/;

  export const systems = ['Flex', 'AGDA', 'Hogia', 'Nmbers'];
