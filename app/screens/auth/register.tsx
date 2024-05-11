import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput, Button, TouchableOpacity, Image, Pressable
} from 'react-native';
import React, {useState} from "react";

// Firebase configuration
import {app} from "@/app/firebase-config"
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, } from "@firebase/auth";
import {useNavigation} from "@react-navigation/core";
import { CommonActions } from '@react-navigation/native';

export default function LoginScreen() {

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const validatePassword = (password: string) => {
    console.log(password)
  }

  const navigation = useNavigation()

  const auth = getAuth(app);

  const goToLogin = () => {
    navigation.dispatch(
        CommonActions.navigate({
          name: 'screens/auth/login',
        }));
  }

  const handleSingUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log('create user');
          const user = res.user;
          console.log(user);
          // navigation.dispatch(
          //     CommonActions.navigate({
          //       name: 'screens/home/home',
          //     }));
        })
        .catch(error => {
          console.log(error);
        })
  }

  return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{
          flex: 1,
          width: '100%',
          height: '100%',
          alignContent: 'center',
          justifyContent: 'center',
        }}>
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
            <View  style={{paddingBottom: 18}}>
              <Text style={{color: '#fff', fontSize: 18, paddingBottom: 7}}>Name</Text>
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
                           placeholder="Name"
                           onChangeText={(text) => setName(text)}
                ></TextInput>
              </View>

            </View>
            <View  style={{paddingBottom: 18}}>
              <Text style={{color: '#fff', fontSize: 18, paddingBottom: 7}}>Last name</Text>
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
                           placeholder="Last name"
                           onChangeText={(text) => setLastname(text)}
                ></TextInput>
              </View>

            </View>
            <View  style={{paddingBottom: 18}}>
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
                           onChangeText={(text) => setEmail(text)}
                ></TextInput>
              </View>

            </View>
            <View  style={{paddingBottom: 18}}>
              <Text style={{color: '#fff', fontSize: 18, paddingBottom: 7}}>Password</Text>
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
                           placeholder="Password"
                           onChangeText={(text) => setPassword(text)}
                ></TextInput>
              </View>

            </View>
            <View  style={{paddingBottom: 18}} >
              <Text style={{color: '#fff', fontSize: 17, paddingBottom: 7}}>Repeat password</Text>
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
                           placeholder="Repeat password"
                           onChangeText={(text) => validatePassword(text)}

                ></TextInput>
              </View>
            </View>

            {/*BUTTONS LOGIN AND REGISTER*/}
            <View style={{paddingBottom: 18}}>
              <Pressable style={styles.button} onPress={handleSingUp}>
                <Text style={styles.text}>{'Register'}</Text>
              </Pressable>
            </View>
            <View style={{paddingBottom: 18}}>
              <Pressable style={styles.button} onPress={goToLogin}>
                <Text style={styles.text}>{'Login'}</Text>
              </Pressable>
            </View>
          </View>



        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0c2b43'
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
