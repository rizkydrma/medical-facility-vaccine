import { IFacilityVaccineDetail } from '@/types/places';
import { FC, Fragment } from 'react';
import { buttonVariants } from './ui/Button';

interface PanelDetailFacilityProps extends IFacilityVaccineDetail {}

const PanelDetailFacility: FC<PanelDetailFacilityProps> = ({ id, ...detail }) => {
  return (
    <div className="grid grid-cols-12">
      {Object.entries(detail).map(([key, value]) => (
        <Fragment key={key}>
          <div className="col-span-6">
            <p className={buttonVariants({ variant: 'link', className: 'text-xs capitalize py-1' })}>
              {key.replaceAll('_', ' ')}
            </p>
          </div>
          <div className="col-span-6">
            <p className={buttonVariants({ variant: 'link', className: 'text-xs capitalize py-1' })}>: {value}</p>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default PanelDetailFacility;
