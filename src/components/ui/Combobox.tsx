import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react';
import { Combobox } from '@headlessui/react';
import { cn } from '@/lib/utils';
import Icons from '../Icons';
import { IProvince } from '@/types/places';

interface ComboboxComponentProps {
  label?: string;
  data: { id: string; name: string; [key: string]: string }[];
  selectedData: any;
  setSelectedData: Dispatch<SetStateAction<IProvince | null>>;
  className?: string;
  option: (data: any) => string;
  disabled?: boolean;
  placeholder?: string;
  display: (data: any) => string;
}

const ComboboxComponent: FC<ComboboxComponentProps> = ({
  label,
  data,
  selectedData,
  setSelectedData,
  className,
  option,
  disabled,
  placeholder,
  display,
}) => {
  const [query, setQuery] = useState('');
  console.log('combobox');

  const filteredProvince =
    query === '' ? data : data?.filter((item) => item?.value?.toLowerCase().includes(query?.toLowerCase()));

  return (
    <Combobox as="div" value={selectedData} onChange={setSelectedData} className={cn(className)} disabled={disabled}>
      {label && (
        <Combobox.Label className="block text-xs font-bold leading-6 dark:text-stone-400 text-stone-800">
          {label}
        </Combobox.Label>
      )}
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border-0 dark:bg-stone-700 bg-stone-100 py-1.5 pl-3 pr-10 dark:text-stone-200 text-stone-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
          placeholder={disabled ? 'Loading...' : placeholder}
          displayValue={display}
          autoComplete="off"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <Icons.ChevronsUpDownIcon size={16} className="text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        {filteredProvince.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md dark:bg-stone-700 bg-stone-100 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredProvince.map((person) => (
              <Combobox.Option
                key={person.id}
                value={person}
                className={({ active }) =>
                  cn(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-200 dark:bg-indigo-600 text-white' : 'text-white',
                  )
                }
              >
                <span className={cn('block truncate text-xs dark:text-stone-200 text-stone-800')}>
                  {option(person)}
                </span>
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
};

export default ComboboxComponent;
