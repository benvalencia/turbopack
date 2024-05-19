import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import {LocationService} from "@/app/services/location.service";
import {useMapScreen} from "@/app/services/locationChange.service";

export default function MapScreen() {

  const {models, operations} = useMapScreen();
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
               ref={models.mapRef}
               showsUserLocation onUserLocationChange={operations.handleLocationChange}
               showsMyLocationButton={false}
               showsCompass={false}
      />
      <LocationService></LocationService>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
