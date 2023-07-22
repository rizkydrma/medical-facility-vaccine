import useMapContext from '@/context/useMapContext';
import { cn } from '@/lib/utils';
import { nanoid } from 'nanoid';
import { FC, Fragment } from 'react';
import Icons from './Icons';
import PanelDetailFacility from './PanelDetailFacility';
import { Button, buttonVariants } from './ui/Button';
import DisclosureComponent from './ui/Disclosure';
import ContainerSide from './ui/ContainerSide';

interface DetailFacilityProps {}

const DetailFacility: FC<DetailFacilityProps> = ({}) => {
  const { facility, collapse, setCollapse, setDestination } = useMapContext();

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
    <ContainerSide show={collapse}>
      <header className="container w-full mt-20 border-b dark:border-stone-600 border-stone-800 pb-4">
        <div className="flex justify-between items-start ">
          <h1 className={buttonVariants({ variant: 'link', className: 'text-sm' })}>{facility?.nama}</h1>
          <button onClick={() => setCollapse(false)} className="pr-2">
            <Icons.XIcon size={20} fontWeight={800} className="text-stone-800 dark:text-stone-200" />
          </button>
        </div>
        <p className={buttonVariants({ variant: 'link', className: 'text-ss' })}>{facility?.alamat}</p>

        <Button
          size="sm"
          variant="ghost"
          className="text-xs border py-1 px-2 mt-6 hover:dark:bg-stone-900 ml-4"
          onClick={() => setDestination({ latitude: facility?.latitude, longitude: facility?.longitude })}
        >
          <Icons.CompassIcon size={14} className="mr-2 text-blue-300" />
          Directions
        </Button>
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
          <DisclosureComponent key={detail?.batch} title={detail?.batch} panel={<PanelDetailFacility {...detail} />} />
        ))}
      </div>
    </ContainerSide>
  );
};

export default DetailFacility;
