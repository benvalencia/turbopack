import {Image, Pressable, StyleSheet, Text, View,} from 'react-native';
import React from "react";
import {useNavigation} from "@react-navigation/core";
import {CommonActions} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

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
    <View style={{paddingTop: top, backgroundColor: '#0c2b43'}}>
      <View style={styles.container}>
        {/*LOGO*/}
        <View style={{
          marginRight: 'auto',
          marginLeft: 'auto',
        }}>
          <Image source={require('../../../assets/images/branding/logo.jpeg')}
                 style={{
                   width: 130,
                   height: 130
                 }}
          ></Image>
        </View>
        {/* MESSAGE */}
        <View style={{paddingTop: 50, paddingBottom: 50}}>
          <Text style={{color: '#fff', fontSize: 17, paddingBottom: 7}}>
            Te hemos enviado un e-mail, valida tu cuenta a través de el link en el e-mail.
          </Text>
        </View>

        {/*BUTTON GO TO LOGIN */}
        <View style={{paddingBottom: 18}}>
          <Pressable style={styles.button} onPress={goToLogin}>
            <Text style={styles.text}>{'ir al Login'}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    height: '100%',
    backgroundColor: '#0c2b43',
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'light',
    letterSpacing: 0.25,
    color: 'black',
  },
});
