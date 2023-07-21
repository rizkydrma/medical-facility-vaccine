import useMapContext from '@/context/useMapContext';
import { cn } from '@/lib/utils';
import { nanoid } from 'nanoid';
import { FC, Fragment } from 'react';
import Icons from './Icons';
import PanelDetailFacility from './PanelDetailFacility';
import { buttonVariants } from './ui/Button';
import DisclosureComponent from './ui/Disclosure';

interface DetailFacilityProps {}

const DetailFacility: FC<DetailFacilityProps> = ({}) => {
  const { facility, collapse, setCollapse } = useMapContext();

  if (!facility) return null;

  const details = [
    {
      id: nanoid(),
      icon: <Icons.PhoneIcon size={18} className="text-stone-800 dark:text-stone-200" />,
      data: facility?.telp || '-',
    },
    {
      id: nanoid(),
      icon: <Icons.CheckCircle2Icon size={18} className="text-stone-800 dark:text-stone-200" />,
      data: facility?.status || '-',
    },
    {
      id: nanoid(),
      icon: <Icons.Building2Icon size={18} className="text-stone-800 dark:text-stone-200" />,
      data: facility?.kelas_rs || '-',
    },
    {
      id: nanoid(),
      icon: <Icons.ShieldAlert size={18} className="text-stone-800 dark:text-stone-200" />,
      data: facility?.jenis_faskes || '-',
    },
  ];

  return (
    <div
      className={cn(
        'fixed top-0 bottom-0 bg-white dark:bg-stone-800 z-20 transition',
        collapse ? 'translate-x-0' : '-translate-x-80 lg:-translate-x-[28rem]',
      )}
    >
      <div className={`z-20 h-full max-h-[100vh] w-80 lg:w-[28rem] overflow-y-scroll`}>
        <header className="container w-full mt-20 border-b dark:border-stone-600 border-stone-800 pb-4">
          <div className="flex justify-between items-start ">
            <h1 className={buttonVariants({ variant: 'link', className: 'text-sm' })}>{facility?.nama}</h1>
            <button onClick={() => setCollapse(false)}>
              <Icons.XIcon size={20} fontWeight={800} className="text-stone-800 dark:text-stone-200" />
            </button>
          </div>
          <p className={buttonVariants({ variant: 'link', className: 'text-ss' })}>{facility?.alamat}</p>
        </header>

        <div className="container w-full mt-4 border-b dark:border-stone-600 border-stone-800 pb-4">
          <div className="grid grid-cols-12 items-center px-4">
            {details?.map((detail) => (
              <Fragment key={detail?.id}>
                <div className="col-span-1">{detail?.icon}</div>
                <div className="col-span-11">
                  <p className={buttonVariants({ variant: 'link', className: 'text-xs' })}>{detail?.data}</p>
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        <div className="container w-full mt-4 border-b dark:border-stone-600 border-stone-800 pb-4">
          <h1 className={buttonVariants({ variant: 'link', className: 'text-lg' })}>Detail</h1>

          {facility?.detail?.map((detail) => (
            <DisclosureComponent
              key={detail?.batch}
              title={detail?.batch}
              panel={<PanelDetailFacility {...detail} />}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailFacility;
