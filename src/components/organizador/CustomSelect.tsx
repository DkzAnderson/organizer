import React, { useState } from 'react';
import { HiArrowsUpDown } from "react-icons/hi2";
import { fetchOrderProps } from '../../services/notesServices';


interface Option {
  value: fetchOrderProps;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  onChange: (value: fetchOrderProps) => void;
  placeholder?: string;
}


const CustomSelect: React.FC<CustomSelectProps> = ({ options, onChange, placeholder = 'Fecha, descendente' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-full h-10 z-20">
      <div className="bg-[var(--rd)] dark:bg-[var(--rd)] h-full flex items-center justify-between p-2 cursor-pointer" 
        onClick={() => setIsOpen(!isOpen)}>
        <h1 className='text-st font-bold text-sm text-[var(--txt)] dark:text-[var(--txt)]'>
            {selectedOption ? selectedOption.label : placeholder}
        </h1>
        <h1 className='text-xl text-card-bg text-[var(--txt)] dark:text-[var(--txt)]'>
            <HiArrowsUpDown />
        </h1>
      </div>
      {isOpen && (
        <ul className="absolute z-10 top-[102%] sm:top-[97%] w-full bg-[var(--rd)] rounded-b-lg overflow-hidden">
          {options.map((option,i) => (
            <li
              key={i}
              className="px-2 py-2 group hover:bg-interaction cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              <h3 className='group-hover:font-bold duration-300 text-sm text-[var(--txt)] dark:text-[var(--txt)]'>
                {option.label}
              </h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
