import { IFacilityVaccine } from '@/types/places';
import { RouteDirections } from '@/types/route';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

type MapState = {
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
  resetState: () => void;
};

const MapContext = createContext<MapState | null>(null);

const useMapContext = (): MapState => {
  const context = useContext(MapContext);

  if (!context) {
    throw new Error('Please use MapProvider in parent component');
  }

  return context;
};

export const MapProvider = (props: PropsWithChildren) => {
  const [facility, setFacility] = useState<IFacilityVaccine | null>(null);
  const [collapse, setCollapse] = useState(false);
  const [destination, setDestination] = useState<IGeolocation | null>(null);
  const [routeDirection, setRouteDirection] = useState<RouteDirections | null>(null);
  const [collapseRoute, setCollapseRoute] = useState(false);

  const resetState = () => {
    setFacility(null);
    setCollapseRoute(false);
    setCollapse(false);
    setDestination(null);
    setRouteDirection(null);
  };

  return (
    <MapContext.Provider
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
        resetState,
      }}
    >
      {props.children}
    </MapContext.Provider>
  );
};

export default useMapContext;
