import {Image, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
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

  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;

  return (
    <KeyboardAvoidingView style={{flex: 1}}
                          behavior='padding' keyboardVerticalOffset={0}
    >

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
          {/*LOGIN FORM*/}
          <View style={{paddingBottom: 18}}>
            <Text style={{color: '#fff', fontSize: 18, paddingBottom: 7}}>Email</Text>
            <View style={{
              borderColor: '#fff',
              borderRadius: '4px',
              borderWidth: '0.777px'
            }}>
              <TextInput style={{
                color: '#fff',
                fontSize: 18,
                padding: 5.777,
              }}
                         placeholder="Email"
                         onChangeText={(text) => setUsername(text)}
              ></TextInput>
            </View>

          </View>
          <View style={{paddingBottom: 18}}>
            <Text style={{color: '#fff', fontSize: 17, paddingBottom: 7}}>Password</Text>
            <View style={{
              borderColor: '#fff',
              borderRadius: '4px',
              borderWidth: '0.777px'
            }}>
              <TextInput style={{
                color: '#fff',
                fontSize: 18,
                padding: 5.777,
              }}
                         secureTextEntry={true}
                         placeholder="Password"
                         onChangeText={(text) => setPassword(text)}

              ></TextInput>
            </View>
          </View>


          {/*BUTTONS LOGIN AND REGISTER*/}
          <View style={{paddingBottom: 18}}>
            <Pressable style={styles.button} onPress={handleSingIn}>
              <Text style={styles.text}>{'Login'}</Text>
            </Pressable>
          </View>
          <View style={{paddingBottom: 18}}>
            <Pressable style={styles.button} onPress={goToRegister}>
              <Text style={styles.text}>{'Register'}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
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
