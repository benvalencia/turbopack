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
        name: 'screens/not-found/validateAccount',
      }));
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}}
                          behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset}
    >

      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='handled'>
          <View style={{
            margin: 25,
          }}>
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

            {/*LOGIN FORM*/}
            <View style={{paddingBottom: 18}}>
              <Text style={{color: '#fff', fontSize: 18, paddingBottom: 7}}>Nombre</Text>
              <View style={styles.input}>
                <TextInput style={{
                  color: '#fff',
                  fontSize: 18,
                  padding: 5.777,
                }}
                           placeholder="Nombre"
                           onChangeText={(text) => setName(text)}
                ></TextInput>
              </View>

            </View>
            <View style={{paddingBottom: 18}}>
              <Text style={{color: '#fff', fontSize: 18, paddingBottom: 7}}>Apellido</Text>
              <View style={styles.input}>
                <TextInput style={{
                  color: '#fff',
                  fontSize: 18,
                  padding: 5.777,
                }}
                           placeholder="Apellido"
                           onChangeText={(text) => setLastname(text)}
                ></TextInput>
              </View>

            </View>
            <View style={{paddingBottom: 18}}>
              <Text style={{color: '#fff', fontSize: 18, paddingBottom: 7}}>Email</Text>
              <View style={styles.input}>
                <TextInput style={{
                  color: '#fff',
                  fontSize: 18,
                  padding: 5.777,
                }}
                           placeholder="Email"
                           onChangeText={(text) => setEmail(text)}
                ></TextInput>
              </View>

            </View>
            <View style={{paddingBottom: 18}}>
              <Text style={{color: '#fff', fontSize: 18, paddingBottom: 7}}>Contraseña</Text>
              <View style={styles.input}>
                <TextInput style={{
                  color: '#fff',
                  fontSize: 18,
                  padding: 5.777,
                }}
                           placeholder="Contraseña"
                           onChangeText={(text) => setPassword(text)}
                ></TextInput>
              </View>

            </View>
            <View style={{paddingBottom: 18}}>
              <Text style={{color: '#fff', fontSize: 17, paddingBottom: 7}}>Confirmar contraseña</Text>
              <View style={styles.input}>
                <TextInput style={{
                  color: '#fff',
                  fontSize: 18,
                  padding: 5.777,
                }}
                           secureTextEntry={true}
                           placeholder="Confirmar contraseña"
                           onChangeText={(text) => setConfirmPassword(text)}

                ></TextInput>
              </View>
            </View>

            {/*BUTTONS LOGIN AND REGISTER*/}
            <View style={{paddingBottom: 18}}>
              <Pressable style={styles.button} onPress={handleSingUp}>
                <Text style={styles.text}>{'Registrar'}</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#0c2b43'
  },

  input: {
    borderColor: '#fff',
    borderRadius: 4,
    borderWidth: 0.777,
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

  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
