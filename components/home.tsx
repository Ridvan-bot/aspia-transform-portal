import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="container-fluid flex justify-center pt-4">
      <div className="flex space-x-4">
        <button className="button-custom px-4 py-2 bg-customButton text-customButtonTextColor rounded">
          Importera CSV
        </button>
        <button className="button-custom px-4 py-2 bg-customButton text-customButtonTextColor rounded">
          Spara Mall
        </button>
        <button className="button-custom px-4 py-2 bg-customButton text-customButtonTextColor rounded">
          Mallar
        </button>
      </div>
    </div>
  );
};

export default Home;