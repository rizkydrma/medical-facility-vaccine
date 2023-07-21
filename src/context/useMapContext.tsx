import { IFacilityVaccine } from '@/types/places';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

type FacilityState = {
  facility: IFacilityVaccine | null;
  setFacility(facility: IFacilityVaccine | null): void;
  collapse: boolean;
  setCollapse(collapse: boolean): void;
  destination: IGeolocation | null;
  setDestination(destination: IGeolocation): void;
};

const FacilityContext = createContext<FacilityState | null>(null);

const useMapContext = (): FacilityState => {
  const context = useContext(FacilityContext);

  if (!context) {
    throw new Error('Please use FacilityProvider in parent component');
  }

  return context;
};

export const FacilityProvider = (props: PropsWithChildren) => {
  const [facility, setFacility] = useState<IFacilityVaccine | null>(null);
  const [collapse, setCollapse] = useState(false);
  const [destination, setDestination] = useState<IGeolocation | null>(null);

  return (
    <FacilityContext.Provider value={{ facility, setFacility, collapse, setCollapse, destination, setDestination }}>
      {props.children}
    </FacilityContext.Provider>
  );
};

export default useMapContext;
