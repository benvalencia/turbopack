import React, {useState} from 'react';
import {KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import MapView from 'react-native-maps';
import {LocationService} from "@/app/services/location.service";
import {useMapScreen} from "@/app/services/locationChange.service";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Colors} from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import {useNavigation} from "@react-navigation/core";
import {CommonActions} from "@react-navigation/native";

export default function MapScreen() {
  const {top} = useSafeAreaInsets()

  const [routeA, setRouteA] = useState('');
  const [routeB, setRouteB] = useState('');

  const navigation = useNavigation()

  const goToHome = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'screens/home/home',
        params: {
          uid: 'test'
        }
      }));
  }

  const {models, operations} = useMapScreen();
  return (
    <KeyboardAvoidingView style={{flex: 1}}
                          behavior='padding' keyboardVerticalOffset={0}
    >
      <ScrollView keyboardShouldPersistTaps='handled'
                  contentContainerStyle={{flexGrow: 1}}>
        <View style={{
          backgroundColor: 'white',
          width: '100%',
          paddingTop: top,
          paddingLeft: 15,
          paddingRight: 15,
          paddingBottom: 15,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
          zIndex: 1,
          gap: 15,
        }}>
          <View>
            <Pressable onPress={goToHome} style={{flex: 1, display: 'flex'}}>
              <AntDesign name="arrowleft" size={35} color="black" style={{paddingLeft: 5}}/>
            </Pressable>
          </View>

          <View style={styles.formContainer}>
            {/*ROUTE A*/}
            <View style={styles.inputTextComponent}>
              <TextInput style={styles.inputTextInput}
                         placeholder="Punto de recogida"
                         placeholderTextColor={'grey'}
                         onChangeText={(text) => setRouteA(text)}></TextInput>
            </View>
            {/*ROUTE B*/}
            <View style={styles.inputTextComponent}>
              <TextInput style={styles.inputTextInput}
                         placeholder="Punto de entrega"
                         placeholderTextColor={'grey'}
                         onChangeText={(text) => setRouteB(text)}></TextInput>
            </View>
          </View>

          <View>
            <Pressable style={styles.buttonComponent} onPress={() => console.log('test button')}>
              <Text style={styles.buttonComponentText}>{'Hacer envío'}</Text>
            </Pressable>
          </View>

        </View>

      <MapView style={styles.map}
               ref={models.mapRef}
               showsUserLocation onUserLocationChange={operations.handleLocationChange}
               showsMyLocationButton={false}
               showsCompass={false}/>
      <LocationService></LocationService>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // FORM CONTAINER
  formContainer: {
    gap: 15,
  },
  inputTextComponent: {
    borderColor: Colors.light.text,
    borderRadius: 4,
    borderWidth: 0.777,
  },
  inputTextInput: {
    color: Colors.light.text,
    fontSize: 16,
    padding: 7.777,
  },

  // BUTTON CONTAINER
  buttonComponent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: Colors.tertiary,
  },
  buttonComponentText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'light',
    letterSpacing: 0.25,
    color: 'white',
  },


  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
    marginTop: -100,
    zIndex: 0,
  },
});
