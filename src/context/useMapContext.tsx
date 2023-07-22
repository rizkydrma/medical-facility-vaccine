import { IFacilityVaccine } from '@/types/places';
import { RouteDirections } from '@/types/route';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

type FacilityState = {
  facility: IFacilityVaccine | null;
  setFacility(facility: IFacilityVaccine | null): void;
  collapse: boolean;
  setCollapse(collapse: boolean): void;
  destination: IGeolocation | null;
  setDestination(destination: IGeolocation): void;
  routeDirection: RouteDirections | null;
  setRouteDirection(routeDirection: RouteDirections): void;
  collapseRoute: boolean;
  setCollapseRoute(collapseRoute: boolean): void;
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
  const [routeDirection, setRouteDirection] = useState<RouteDirections | null>(null);
  const [collapseRoute, setCollapseRoute] = useState(false);

  return (
    <FacilityContext.Provider
      value={{
        facility,
        setFacility,
        collapse,
        setCollapse,
        destination,
        setDestination,
        routeDirection,
        setRouteDirection,
        collapseRoute,
        setCollapseRoute,
      }}
    >
      {props.children}
    </FacilityContext.Provider>
  );
};

export default useMapContext;
