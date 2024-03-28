'use client';

import React from 'react';
import Select from 'react-select';
import useCountries from '@/hooks/use-country';
import { LocationType } from '../modals/rent-modal';

type Props = {
  value?: LocationType;
  onChange: (value: LocationType) => void;
};

const CountrySelect = ({ value, onChange }: Props) => {
  const { getAll } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as LocationType)}
        formatOptionLabel={(option: LocationType) => (
          <div className="flex items-center gap-3">
            <div className="dark:text-white">{option.flag}</div>
            <div className="dark:text-white">
              {option.label}
              <span className="ml-1 text-neutral-500 dark:text-zinc-400">
                {option.region}
              </span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'border-2 dark:bg-zinc-800',
          input: () => 'text-lg dark:text-zinc-400',
          option: () => 'text-lg dark:bg-zinc-800 dark:text-white',
          noOptionsMessage: () => 'text-lg dark:bg-zinc-800 dark:text-zinc-400',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: '#fd6063',
            primary25: '#ffe4e6',
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
