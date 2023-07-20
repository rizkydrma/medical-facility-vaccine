'use client';
import { FC, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

interface RoutingMapProps {
  start: Omit<Coordinates, 'id' | 'value'>;
  destination: Omit<Coordinates, 'id' | 'value'> | null;
}

const RoutingMap: FC<RoutingMapProps> = ({ start, destination }) => {
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

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, destination]);

  return null;
};

export default RoutingMap;
