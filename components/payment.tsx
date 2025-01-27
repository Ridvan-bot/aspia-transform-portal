import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Payment: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [field1Value, setField1Value] = useState<string>('');
  const [field2Value, setField2Value] = useState<string>('');

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setShowDatePicker(false);
    if (date) {
      const newDate1 = new Date(date);
      newDate1.setMonth(newDate1.getMonth() - 1);
      newDate1.setDate(1);
      setField1Value(newDate1.toLocaleDateString()); // Update field 1 value

      const newDate2 = new Date(date);
      newDate2.setMonth(newDate2.getMonth());
      newDate2.setDate(0); // set to last day of previous month
      setField2Value(newDate2.toLocaleDateString()); // update field 2 value
    }
  };

  const handleField1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setField1Value(event.target.value);
  };

  const handleField2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setField2Value(event.target.value);
  };

  return (
    <div className="payment-container">
      <div className="flex justify-start mt-4 space-x-4">
        <button
          className="button-custom px-4 py-2 bg-customButton text-customButtonTextColor rounded"
          onClick={() => setShowDatePicker(true)}
        >
          Utbetalningsdatum
        </button>
        <input
          type="text"
          className="input-custom px-4 py-2 border rounded"
          placeholder="Första dagen i föregående månad"
          value={field1Value}
          onChange={handleField1Change}
          style={{ fontSize: '1vw', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        />
        <input
          type="text"
          className="input-custom px-4 py-2 border rounded"
          placeholder="Sista dagen i föregående månad"
          value={field2Value}
          onChange={handleField2Change}
          style={{ fontSize: '1vw', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        />
      </div>
      {showDatePicker && (
        <div className="mt-4">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline
            popperModifiers={[
              {
                name: 'offset',
                options: {
                  offset: [0, 10],
                },
                fn: ({ x, y }) => ({ x, y }),
              },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default Payment;