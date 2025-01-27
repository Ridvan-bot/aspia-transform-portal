import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Payment: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  return (
    <div className="payment-container">
      <div className="flex justify-start mt-4">
        <button
          className="button-custom px-4 py-2 bg-customButton text-customButtonTextColor rounded "
          onClick={() => setShowDatePicker(true)}
        >
          Utbetalningsdatum
        </button>
        {showDatePicker && (
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
        )}
      </div>
    </div>
  );
};

export default Payment;