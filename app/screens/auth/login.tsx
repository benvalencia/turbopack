import {Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from "react";

// Firebase configuration
import {app} from "@/app/firebase-config"
import {getAuth, signInWithEmailAndPassword,} from "@firebase/auth";
import {useNavigation} from "@react-navigation/core";
import {CommonActions} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';


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
        const user = res.user;
        // console.log(user);
        navigation.dispatch(
          CommonActions.navigate({
            name: 'screens/home/home',
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
                  contentContainerStyle={{flexGrow: 1, justifyContent: 'center', gap: 20}}
                  style={[styles.scrollViewContainer, {paddingTop: top}]}>

        {/*LOGO*/}
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/images/branding/logo.jpeg')}
                 style={styles.imageComponent}
          ></Image>
        </View>

        {/*LOGIN FORM*/}
        <View style={styles.loginContainer}>
          {/*EMAIL INPUT*/}
          <View style={styles.inputTextContainer}>
            <Text style={styles.inputTextLabel}>Email</Text>
            <View style={styles.inputTextComponent}>
              <TextInput style={styles.inputTextInput}
                         placeholder="Email"
                         onChangeText={(text) => setUsername(text)}></TextInput>
            </View>
          </View>
          {/*PASSWORD INPUT*/}
          <View style={styles.inputTextContainer}>
            <Text style={styles.inputTextLabel}>Password</Text>
            <View style={styles.inputTextComponent}>
              <TextInput style={styles.inputTextInput}
                         secureTextEntry={true}
                         placeholder="Password"
                         onChangeText={(text) => setPassword(text)}></TextInput>
            </View>
          </View>
        </View>

        {/*BUTTONS LOGIN AND REGISTER*/}
        <Pressable style={styles.buttonContainer} onPress={handleSingIn}>
          <Text style={styles.buttonText}>{'Login'}</Text>
        </Pressable>
        <Pressable style={styles.buttonContainer} onPress={goToRegister}>
          <Text style={styles.buttonText}>{'Register'}</Text>
        </Pressable>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  // SCROLL VIEW CONTAINER
  scrollViewContainer: {
    backgroundColor: '#0c2b43',
    height: '100%',
    padding: 15,
  },

  // IMAGE CONTAINER
  imageContainer: {
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  imageComponent: {
    width: 150,
    height: 150
  },

  // FORM CONTAINER INPUT TEXT
  loginContainer: {
    gap: 14,
  },
  inputTextContainer: {
    gap: 7,
  },
  inputTextLabel: {
    color: '#fff',
    fontSize: 18
  },
  inputTextComponent: {
    borderColor: '#fff',
    borderRadius: 4,
    borderWidth: 0.777,
  },
  inputTextInput: {
    color: '#fff',
    fontSize: 18,
    padding: 5.777,
  },

  // BUTTON CONTAINER
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'light',
    letterSpacing: 0.25,
    color: 'black',
  },
});
