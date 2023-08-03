'use client';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FocusEventHandler, useState } from 'react';

export const TopSearch = () => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    setIsFocused(event.type === 'blur' ? false : true);
  };

  return (
    <div className="top-search w-full md:w-1/2">
      <div className="relative flex items-center">
        <input
          type="search"
          name="search"
          id="search"
          className="block w-full h-12 rounded-md border-0 py-1.5 pl-3 pr-14 text-gray-900 ring-inset placeholder:text-gray-400 focus:ring-2 focus-visible:outline-none focus:ring-meLightest focus:transition-ring ease-in-out duration-150 text-lg search-cancel-button:appearance-none"
          onFocus={handleFocus}
          onBlur={handleFocus}
        />
        <FontAwesomeIcon
          icon={faSearch}
          size={'lg'}
          className={`absolute my-auto inset-y-0 right-2 flex py-1.5 pr-1.5 self-center transition ease-in-out duration-150 ${
            isFocused ? 'text-meLightest' : 'text-gray-200'
          }`}
        />
      </div>
    </div>
  );
};
