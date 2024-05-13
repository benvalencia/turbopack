import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors} from "@/constants/Colors";
import React from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {CommonActions} from "@react-navigation/native";
import {useNavigation} from "@react-navigation/core";

export default function HomeScreen() {

  const {top} = useSafeAreaInsets()
  const navigation = useNavigation()

  const goToMap = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'screens/map/map',
      }));
  }

  const goToProfile = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'screens/profile/profile',
      }));
  }

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: Colors.primary, paddingTop: top}}>
      {/*HEADER*/}
      <View>
        <View style={styles.input}>
          <TextInput style={{
            color: '#fff',
            fontSize: 18,
            padding: 5.777,
          }}
                     placeholder="Hacer un envio?"
                     onPress={goToMap}
          ></TextInput>
        </View>
      </View>

      <View>
        <Text style={{color: '#000', fontSize: 20}}>Envíos anteriores</Text>
        <Text>Aquí los envíos anteriores</Text>
      </View>

      <View>
        {/*Menu*/}
        {/*botón home*/}
        {/*botón perfil*/}
        <View>
          <Text>home</Text>
          <Text onPress={goToProfile}>perfil</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  input: {
    borderColor: '#fff',
    borderRadius: 4,
    borderWidth: 0.777,
  },

  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
