import useMapContext from '@/context/useMapContext';
import { FC } from 'react';
import ContainerSide from './ui/ContainerSide';
import { convertDistance, convertTime } from '@/lib/utils';
import Icons from './Icons';
import Guide from './Guide';

interface DetailRouteProps {}

const DetailRoute: FC<DetailRouteProps> = ({}) => {
  const { routeDirection, facility, setCollapseRoute, collapseRoute } = useMapContext();

  if (!routeDirection) return null;

  return (
    <ContainerSide show={collapseRoute}>
      <div className="grid grid-cols-12 px-6 py-4 border-b mt-20 border-stone-600">
        <div className="col-span-11 ml-4 space-y-1">
          <div className="flex gap-2 truncate">
            <div className="w-6 flex-none">
              <p className="text-xs text-stone-800 dark:text-stone-200 font-light">dari</p>
            </div>
            <div className="grow truncate">
              <p className="text-xs text-stone-600 dark:text-stone-300 truncate">Lokasi Saya Saat Ini</p>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="w-6 flex-none">
              <p className="text-xs text-stone-800 dark:text-stone-200 font-light">ke</p>
            </div>
            <div className="grow truncate">
              <p className="text-xs text-stone-600 dark:text-stone-300 truncate">{facility?.nama}</p>
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <button type="button" onClick={() => setCollapseRoute(false)}>
            <Icons.XIcon size={22} className="text-stone-800 dark:text-stone-200" />
          </button>
        </div>
      </div>

      <div className="py-4 px-10 border-b border-stone-600">
        <p>
          <span className="text-orange-600 font-bold">{convertTime(routeDirection?.summary?.totalTime)}</span>
          <span className="ml-2 dark:text-stone-400 text-stone-600">
            ({convertDistance({ distance: routeDirection?.summary?.totalDistance, type: 'km' })})
          </span>
        </p>
        <div className="flex gap-2">
          <div className="w-10">
            <p className="text-stone-600 dark:text-stone-300 text-xs mt-2 truncate">melalui</p>
          </div>
          <p className="text-stone-800 dark:text-stone-100 text-xs mt-2 text-left">{routeDirection?.name}</p>
        </div>
        <p className="text-stone-600 dark:text-stone-300 text-xs mt-1">
          Rute tercepat saat ini sesuai kondisi lalu lintas
        </p>
      </div>

      <div className="py-4 px-10 border-b ">
        <div className="py-4 flex gap-2 items-center">
          <Icons.MapPin size={16} className="dark:text-stone-200 text-stone-800" />
          <h1 className="text-sm font-medium text-stone-800 dark:text-stone-200">Lokasi Saya Saat Ini</h1>
        </div>

        <div className="max-h-[24rem] overflow-y-scroll">
          <Guide instructions={routeDirection?.instructions} />
        </div>

        <div className="py-4 flex gap-2 items-center">
          <Icons.HomeIcon size={16} className="dark:text-stone-200 text-stone-800" />{' '}
          <h1 className="text-sm font-medium text-stone-800 dark:text-stone-200">{facility?.nama}</h1>
        </div>
      </div>
    </ContainerSide>
  );
};

export default DetailRoute;
