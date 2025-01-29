import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container mx-auto text-center w-full">
        <p>&copy; {new Date().getFullYear()} Aspia</p>
      </div>
    </footer>
  );
};

export default Footer;