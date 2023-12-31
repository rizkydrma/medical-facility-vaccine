'use client';
import useMapContext from '@/context/useMapContext';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { FC, useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface RoutingMapProps {
  start: IGeolocation;
}

const RoutingMap: FC<RoutingMapProps> = ({ start }) => {
  const { destination, setRouteDirection } = useMapContext();
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    if (!destination) return;

    const waypoints = [
      L.latLng(start.latitude, start.longitude),
      L.latLng(destination.latitude, destination.longitude),
    ];

    const plan = L.Routing.plan(waypoints, {
      createMarker: (_wayPointsIndex: number, wayPoints: L.Routing.Waypoint) => {
        let markerIcon = L.icon({
          iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
          iconAnchor: [20, 30],
          iconSize: [0, 0],
        });

        let marker = L.marker(wayPoints.latLng, {
          draggable: false,
          icon: markerIcon,
        });

        return marker;
      },
    });

    const routingControl = L.Routing.control({
      routeWhileDragging: false,
      waypoints,
      plan,
      show: false,
    }).addTo(map);

    routingControl.on('routeselected', (event) => {
      setRouteDirection(event?.route);
    });

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, destination]);

  return null;
};

export default RoutingMap;
