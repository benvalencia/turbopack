import {Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from "react";

// Firebase configuration
import {app} from "@/app/firebase-config"
import {getAuth, signInWithEmailAndPassword,} from "@firebase/auth";
import {useNavigation} from "@react-navigation/core";
import {CommonActions} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from "@/constants/Colors";


export default function LoginScreen() {

  const {top} = useSafeAreaInsets()

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation()

  const auth = getAuth(app);

  const goToRegister = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'screens/auth/register',
      }));
  }

  const handleSingIn = () => {
    signInWithEmailAndPassword(auth, username, password)
      .then((res) => {
        navigation.dispatch(
          CommonActions.navigate({
            name: 'screens/home/home',
            params: {
              uid: res.user.uid
            }
          }));
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}}
                          behavior='padding' keyboardVerticalOffset={0}
    >
      <ScrollView keyboardShouldPersistTaps='handled'
                  contentContainerStyle={{flexGrow: 1, gap: 20}}
                  style={[styles.scrollViewContainer, {paddingTop: top}]}>

        {/*LOGO*/}
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/images/branding/TurboPack_logo.jpeg')}
                 style={styles.imageComponent}
          ></Image>
        </View>

        {/*LOGIN FORM*/}
        <View style={styles.loginContainer}>
          {/*EMAIL INPUT*/}
          <View style={styles.inputTextContainer}>
            <Text style={styles.inputTextLabel}>E-mail</Text>
            <View style={styles.inputTextComponent}>
              <TextInput style={styles.inputTextInput}
                         placeholder="E-mail"
                         placeholderTextColor={'grey'}
                         onChangeText={(text) => setUsername(text)}></TextInput>
            </View>
          </View>
          {/*PASSWORD INPUT*/}
          <View style={styles.inputTextContainer}>
            <Text style={styles.inputTextLabel}>Contraseña</Text>
            <View style={styles.inputTextComponent}>
              <TextInput style={styles.inputTextInput}
                         secureTextEntry={true}
                         placeholder="Contraseña"
                         placeholderTextColor={'grey'}
                         onChangeText={(text) => setPassword(text)}></TextInput>
            </View>
          </View>
        </View>

        {/*BUTTONS LOGIN AND REGISTER*/}
        <Pressable style={styles.buttonContainer} onPress={handleSingIn}>
          <Text style={styles.buttonText}>{'Entrar'}</Text>
        </Pressable>
        <Pressable style={styles.buttonContainer} onPress={goToRegister}>
          <Text style={styles.buttonText}>{'Registrarse'}</Text>
        </Pressable>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // SCROLL VIEW CONTAINER
  scrollViewContainer: {
    backgroundColor: '#fff',
    height: '100%',
    padding: 15,
  },

  // IMAGE CONTAINER
  imageContainer: {
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  imageComponent: {
    width: 200,
    height: 200
  },

  // FORM CONTAINER INPUT TEXT
  loginContainer: {
    gap: 14,
  },
  inputTextContainer: {
    gap: 7,
  },
  inputTextLabel: {
    color: Colors.light.text,
    fontSize: 16
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
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: Colors.tertiary,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'light',
    letterSpacing: 0.25,
    color: 'white',
  },
});
