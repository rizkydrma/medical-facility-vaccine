import useMapContext from '@/context/useMapContext';
import { convertDistance, convertTime } from '@/lib/utils';
import { FC } from 'react';
import Icons from './Icons';
import { Button } from './ui/Button';

interface SneekPeekRouteProps {}

const SneekPeekRoute: FC<SneekPeekRouteProps> = ({}) => {
  const { routeDirection, setCollapseRoute } = useMapContext();

  if (!routeDirection) return null;

  return (
    <div className="py-4">
      <div className="border-l-4 border-l-blue-600 pl-3 flex gap-2 items-start container">
        <div className="w-fit">
          <Icons.CarIcon size={18} fontWeight={900} className="text-stone-800 dark:text-stone-200" />
        </div>
        <div className="w-9/12">
          <h1 className="text-stone-800 dark:text-stone-200 font-bold">Rute</h1>
          <h5 className="text-xs font-medium truncate text-stone-800 dark:text-stone-200">{routeDirection?.name}</h5>
          <p className="mt-2 text-xs text-stone-800 dark:text-stone-200">
            Rute tercepat untuk saat ini sesuai kondisi lalu lintas.
          </p>

          <Button
            size="sm"
            variant="ghost"
            className="text-xs border py-1 px-2 mt-3 hover:dark:bg-stone-900"
            onClick={() => setCollapseRoute(true)}
          >
            <Icons.MilestoneIcon size={14} className="mr-2 text-blue-300" />
            Detail
          </Button>
        </div>
        <div className="w-fit">
          <h5 className="text-xs font-bold text-orange-700">{convertTime(routeDirection?.summary?.totalTime)}</h5>
          <p className="text-xs font-medium text-stone-600 dark:text-stone-300 mt-3">
            {convertDistance({ distance: routeDirection?.summary?.totalDistance, type: 'km' })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SneekPeekRoute;
