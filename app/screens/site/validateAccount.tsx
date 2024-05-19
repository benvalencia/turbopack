import {Image, Pressable, StyleSheet, Text, View,} from 'react-native';
import React from "react";
import {useNavigation} from "@react-navigation/core";
import {CommonActions} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from "@/constants/Colors";

export default function ValidateAccountScreen() {
  const {top} = useSafeAreaInsets()
  const navigation = useNavigation()


  const goToLogin = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'screens/auth/login',
      }));
  }

  return (
    <View style={[styles.validationContainer, {paddingTop: top}]}>
      {/*LOGO*/}
      <View style={styles.imageContainer}>
        <Image source={require('../../../assets/images/branding/TurboPack_logo.jpeg')}
               style={styles.imageComponent}
        ></Image>
      </View>

      {/* MESSAGE */}
      <View>
        <Text style={styles.textComponent}>
          Te hemos enviado un e-mail, valida tu cuenta a través de el link en el e-mail.
        </Text>
      </View>

      {/*BUTTON GO TO LOGIN */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.buttonComponent} onPress={goToLogin}>
          <Text style={styles.buttonComponentText}>{'Ir al Login'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // VALIDATION CONTAINER
  validationContainer: {
    backgroundColor: '#fff',
    flex: 1,
    gap: 35,
    paddingLeft: 15,
    paddingRight: 15,
  },

  // IMAGE CONTAINER
  imageContainer: {
    alignItems: 'center'
  },
  imageComponent: {
    width: 200,
    height: 200
  },

  // TEXT CONTAINER
  textComponent: {
    fontSize: 16,
  },

  // BUTTON CONTAINER
  buttonContainer: {
    paddingTop: 15,
    paddingBottom: 55,
  },
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
  }
});
