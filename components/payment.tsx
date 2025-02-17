import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PaymentProps } from '@/types/interfaces';
import style from './payment.module.css';

const Payment: React.FC<PaymentProps> = ({ onDateSelected, handleExport, dateSelected }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [field1Value, setField1Value] = useState<string>('');
  const [field2Value, setField2Value] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);

    if (date) {
      const newDate1 = new Date(date);
      newDate1.setMonth(newDate1.getMonth() - 1);
      newDate1.setDate(1); // set to first day of previous month
      setField1Value(newDate1.toLocaleDateString()); // update field 1 value

      const newDate2 = new Date(date);
      newDate2.setMonth(newDate2.getMonth()); // set to the same month
      newDate2.setDate(0); // set to last day of previous month
      setField2Value(newDate2.toLocaleDateString()); // update field 2 value

      onDateSelected(date, newDate1.toLocaleDateString(), newDate2.toLocaleDateString()); // calling parent function
    }

    setShowDatePicker(false); // hide date picker after selecting a date
  };

  const handleField1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setField1Value(event.target.value);
    onDateSelected(selectedDate, event.target.value, field2Value); // update parent component
  };

  const handleField2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setField2Value(event.target.value);
    onDateSelected(selectedDate, field1Value, event.target.value); // update parent component
  };

  const handleExportClick = () => {
    handleExport(selectedDate, field1Value, field2Value);
  };

  return (
    
    <div className="payment-container">
{/* <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,#004b61,transparent)1] border-t-2 md:py-20"></div> */}
  <div className="flex justify-start space-x-4 items-center mb-10">
       <button
          className="button-custom"
          onClick={() => setShowDatePicker(true)}
          style={{ height: '2.5rem' }}
        >
          Utbetalningsdatum
        </button>
        <input
          type="text"
          className="input-custom"
          placeholder="Första dagen i föregående månad"
          value={field1Value}
          onChange={handleField1Change}
          style={{ height: '2.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          title="Första dagen i föregående månad"
        />
        <input
          type="text"
          className="input-custom"
          placeholder="Sista dagen i föregående månad"
          value={field2Value}
          onChange={handleField2Change}
          style={{ height: '2.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          title="Sista dagen i föregående månad"
        />
        <input
          type="text"
          className="input-custom"
          placeholder="Utbetalningsdatum"
          value={selectedDate ? selectedDate.toLocaleDateString() : ''}
          readOnly
          style={{ height: '2.5rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          title="Utbetalningsdatum"
        />
      </div>
      {showDatePicker && (
        <div className="mt-4 mb-20">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline
          />
        </div>
      )}
      {dateSelected && (
        <div className="mt-4 ml-4 flex items-center justify-center">
          <button
            className="button-custom"
            onClick={handleExportClick}
            style={{ height: '2.5rem', fontSize: '1rem' }}
          >
            Exportera
          </button>
        </div>
      )}
    </div>
  );
};

export default Payment;