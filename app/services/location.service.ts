import {useEffect} from "react";
import * as Location from 'expo-location';

export const LocationService = () => {

  useEffect(() => {
    (async () => {
      const {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      // let location = await Location.getCurrentPositionAsync({});
      // setLocation(location);
    })();
  }, []);

  return null;
}
