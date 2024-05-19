import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import React, {useState} from "react";

// Firebase configuration
import {app, db} from "@/app/firebase-config"
import {createUserWithEmailAndPassword, getAuth,} from "@firebase/auth";
import {useNavigation} from "@react-navigation/core";
import {CommonActions} from '@react-navigation/native';

import {errorHandler} from '@/utils/errorHandler';
import {addDoc, collection} from 'firebase/firestore';
import {Colors} from "@/constants/Colors";

export default function LoginScreen() {

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;
  const auth = getAuth(app);

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigation = useNavigation()

  const onCreateUserprofile = async (user: any) => {
    await addDoc(collection(db, 'user_profile'), {
      name,
      lastname,
      email,
      uid: user.uid,
      isAdmin: false,
      isDeliver: false,
    })
  }

  const isPasswordValidated = (): boolean => {
    return password === confirmPassword
  }

  const isFormValidated = (): boolean => {
    return name !== undefined && lastname !== undefined && email !== undefined;
  }

  const handleSingUp = () => {
    if (!isFormValidated()) return
    if (!isPasswordValidated()) return;

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        const user = res.user;
        onCreateUserprofile(user).then((res) => {
          goToValidateAccount()
        }).catch((error) => {
          errorHandler(error.code);
        });
      })
      .catch((error) => {
        errorHandler(error.code)
      })
  }

  const goToValidateAccount = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'screens/site/validateAccount',
      }));
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}}
                          behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset}>
      <ScrollView keyboardShouldPersistTaps='handled' style={styles.scrollViewContainer}>
        {/*LOGO*/}
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/images/branding/TurboPack_logo.jpeg')}
                 style={styles.imageComponent}
          ></Image>
        </View>
        {/*REGISTER FORM*/}
        <View style={styles.registerContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabelComponent}>Nombre</Text>
            <View style={styles.inputComponent}>
              <TextInput style={styles.inputComponentInput}
                         placeholder="Nombre"
                         placeholderTextColor={'grey'}
                         onChangeText={(text) => setName(text)}></TextInput>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabelComponent}>Apellido</Text>
            <View style={styles.inputComponent}>
              <TextInput style={styles.inputComponentInput}
                         placeholder="Apellido"
                         placeholderTextColor={'grey'}
                         onChangeText={(text) => setLastname(text)}></TextInput>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabelComponent}>E-mail</Text>
            <View style={styles.inputComponent}>
              <TextInput style={styles.inputComponentInput}
                         placeholder="E-mail"
                         placeholderTextColor={'grey'}
                         onChangeText={(text) => setEmail(text)}></TextInput>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabelComponent}>Contraseña</Text>
            <View style={styles.inputComponent}>
              <TextInput style={styles.inputComponentInput}
                         placeholder="Contraseña"
                         secureTextEntry={true}
                         placeholderTextColor={'grey'}
                         onChangeText={(text) => setPassword(text)}></TextInput>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabelComponent}>Confirmar contraseña</Text>
            <View style={styles.inputComponent}>
              <TextInput style={styles.inputComponentInput}
                         secureTextEntry={true}
                         placeholder="Confirmar contraseña"
                         placeholderTextColor={'grey'}
                         onChangeText={(text) => setConfirmPassword(text)}></TextInput>
            </View>
          </View>
        </View>
        {/*BUTTONS LOGIN AND REGISTER*/}
        <View style={styles.buttonContainer}>
          <Pressable style={styles.buttonComponent} onPress={handleSingUp}>
            <Text style={styles.buttonComponentText}>{'Registrarse'}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // SCROLL VIEW CONTAINER
  scrollViewContainer: {
    backgroundColor: 'white',
    padding: 15,
  },

  // IMAGE CONTAINER
  imageContainer: {
    flex: 1,
    alignItems: 'center'
  },
  imageComponent: {
    width: 200,
    height: 200,
  },

  // REGISTER CONTAINER
  registerContainer: {
    gap: 14,
  },

  // INPUT CONTAINER
  inputContainer: {
    gap: 7,
  },

  inputLabelComponent: {
    color: Colors.light.text,
    fontSize: 16
  },
  inputComponent: {
    borderColor: Colors.light.text,
    borderRadius: 4,
    borderWidth: 0.777,
  },
  inputComponentInput: {
    color: Colors.light.text,
    fontSize: 16,
    padding: 7.777,
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
  },
});
