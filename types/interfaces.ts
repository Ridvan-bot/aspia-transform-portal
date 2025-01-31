export interface PaymentProps {
    onDateSelected: (date: Date | null, field1Value: string, field2Value: string) => void;
    handleExport: (selectedDate: Date | null, field1Value: string, field2Value: string) => void;
    dateSelected: boolean;
  }

  export interface ConvertProps {
    fileContent: any[];
  }

