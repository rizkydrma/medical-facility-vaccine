import { Disclosure } from '@headlessui/react';
import { FC } from 'react';
import Icons from '../Icons';

export interface DisclosureProps {
  title: string;
  panel: any;
}

interface DisclosureComponentProps {
  title: string;
  panel: any;
}

const DisclosureComponent: FC<DisclosureComponentProps> = ({ title, panel }) => {
  return (
    <div className="w-full px-4 pt-3">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white dark:bg-stone-800">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between text-stone-800 dark:text-stone-200">
                <span className="capitalize text-sm">{title}</span>
                <Icons.ChevronUpIcon
                  className={`${open ? 'rotate-180 transform' : ''} text-stone-800 dark:text-stone-200`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="pb-2">{panel}</Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default DisclosureComponent;
