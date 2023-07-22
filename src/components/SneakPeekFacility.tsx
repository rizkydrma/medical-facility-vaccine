import useMapContext from '@/context/useMapContext';
import Icons from './Icons';
import { Button } from './ui/Button';

const SneakPeekFacility = () => {
  const { facility, setDestination, setCollapse } = useMapContext();

  if (!facility) return null;

  const { nama, telp, alamat, latitude, longitude, status } = facility;

  return (
    <div className="container px-10 text-stone-800 dark:text-stone-200 mt-4 pb-4 border-b border-stone-600">
      <span className="text-sm font-medium">{nama}</span>
      <div className="flex gap-4 items-center pt-2 ">
        <div className="flex items-center gap-2 w-fit dark:text-green-500 text-green-600 text-ss">
          <Icons.BadgeCheckIcon size={15} className="dark:text-green-500 text-green-600" /> {status}
        </div>

        <div className="flex items-center gap-1 dark:text-stone-200 text-stone-800 text-ss">
          <Icons.PhoneIcon size={13} /> {telp || '-'}
        </div>
      </div>
      <span className="text-ss pt-2 block">{alamat}</span>

      <div className="flex gap-2 items-center">
        <Button
          size="sm"
          variant="ghost"
          className="text-xs border py-1 px-2 mt-3 hover:dark:bg-stone-900"
          onClick={() => setDestination({ latitude, longitude })}
        >
          <Icons.CompassIcon size={14} className="mr-2 text-blue-300" />
          Directions
        </Button>

        <Button
          size="sm"
          variant="ghost"
          className="text-xs border py-1 px-2 mt-3 hover:dark:bg-stone-900"
          onClick={() => setCollapse(true)}
        >
          <Icons.EyeIcon size={14} className="mr-2 text-blue-300" />
          Detail
        </Button>
      </div>
    </div>
  );
};

export default SneakPeekFacility;
