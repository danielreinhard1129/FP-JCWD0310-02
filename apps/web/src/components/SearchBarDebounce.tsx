import { Search } from 'lucide-react';
import { useDebouncedCallback, useThrottledCallback } from 'use-debounce';
import React, { useState } from 'react';

const SearchBarDebounce = ({
  onValueChange,
}: {
  onValueChange: (value: string) => void;
}) => {
  const [value, setValue] = useState<string>('');
  const debounce = useDebouncedCallback((value) => {
    onValueChange(value);
  }, 1000);
  const throttle = useThrottledCallback((value) => {
    onValueChange(value);
  }, 100);
  return (
    <>
      <div className="w-full flex justify-between items-center py-1 px-2 rounded-lg bg-transparent border-2 border-primary">
        <input
          id="search-input-debounce"
          defaultValue=""
          value={value}
          onChange={(e) => {
            setValue(e.currentTarget.value);
            debounce(e.currentTarget.value);
          }}
          className="w-full focus:outline-none bg-transparent"
        />
        <Search onClick={(e) => throttle(value)} height={15} />
      </div>
    </>
  );
};

export default SearchBarDebounce;
