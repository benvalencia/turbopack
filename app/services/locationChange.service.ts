import MapView, {UserLocationChangeEvent} from "react-native-maps";
import {useEffect, useRef, useState} from "react";

const LATITUDE_DELTA = 0.0032;
const LONGITUDE_DELTA = 0.0032;

export const useMapScreen = () => {

  const [userLocation, setUserLocation] = useState<UserLocationChangeEvent['nativeEvent']['coordinate']>()

  useEffect(() => {
    if (userLocation) {
      mapRef.current?.animateToRegion({
        longitude: userLocation.longitude,
        latitude: userLocation.latitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      })
    }
  }, [userLocation])

  const mapRef = useRef<MapView>(null)
  const handleLocationChange = ({nativeEvent: {coordinate}}: UserLocationChangeEvent) => {
    setUserLocation(coordinate)
  }
  return {
    models: {
      mapRef
    },
    operations: {
      handleLocationChange
    },
  }
}