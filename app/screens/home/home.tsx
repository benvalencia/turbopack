import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {CommonActions} from "@react-navigation/native";
import {useNavigation} from "@react-navigation/core";
import {scale} from 'react-native-size-matters';
import AntDesign from "@expo/vector-icons/AntDesign";

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
    <View style={{width: '100%', height: '100%', backgroundColor: 'white', paddingTop: top}}>
      {/*HEADER*/}
      <View style={styles.headerContainer}>

        <Pressable style={styles.inputTextContainer}
                     onPress={goToMap}
        >

          <Text style={styles.inputTextComponent}>
            <AntDesign name="search1" size={23} color="black" style={{}}/>
            Hacer un envio?
          </Text>
        </Pressable>


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
  // HEADER CONTAINER
  headerContainer: {
    padding: 15,
  },

  inputTextContainer: {
    backgroundColor: 'white',
    borderColor: '#fff',
    borderRadius: 5,
    borderWidth: 0.777,

    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: scale(-2),
    },
    shadowOpacity: 0.8,
    shadowRadius: scale(7.5),
    elevation: 10,
  },
  inputTextComponent: {
    color: 'black',
    fontSize: 21,
    height: 45,
    // TODO:  refactor este line height
    lineHeight: 35,
    verticalAlign: 'middle',
    padding: 5.777,

  }
});
