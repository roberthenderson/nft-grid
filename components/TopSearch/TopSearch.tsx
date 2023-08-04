'use client';

import { searchTermAtom } from '@/app/recoil/searchTermAtom';
import { debounce } from '@/utils/debounce/debounce';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ChangeEvent,
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  useState,
} from 'react';
import { useSetRecoilState } from 'recoil';

export const TopSearch = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const setSearchTerm = useSetRecoilState(searchTermAtom);

  const handleFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    setIsFocused(event.type === 'blur' ? false : true);
  };

  const handleSearch: ChangeEventHandler<HTMLInputElement> = debounce(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    250
  );

  const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key.toLowerCase() === 'escape') {
      setSearchTerm('');
    }
  };

  return (
    <div className="top-search w-full md:w-1/2">
      <div className="relative flex items-center">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search for an NFT"
          className="block w-full h-12 rounded-md border-0 py-1.5 pl-3 pr-14 text-gray-900 ring-inset placeholder:text-gray-400 focus:ring-2 focus-visible:outline-none focus:ring-meLightest focus:transition-ring ease-in-out duration-150 text-lg search-cancel-button:appearance-none"
          onFocus={handleFocus}
          onBlur={handleFocus}
          onChange={handleSearch}
          onKeyUp={handleKeyUp}
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
