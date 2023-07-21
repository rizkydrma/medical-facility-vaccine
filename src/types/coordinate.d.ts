interface IGeolocation {
  latitude: number;
  longitude: number;
}
interface IGeoVal {
  id: string;
  value: string;
}
type ICoordinates = IGeolocation & IGeoVal;
