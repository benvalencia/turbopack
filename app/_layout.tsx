import {DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider} from '@react-navigation/native';
import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import {ScreenStack} from "react-native-screens";
import {Pressable, Text, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {HelloWave} from "@/components/HelloWave";
import {ThemedView} from "@/components/ThemedView";
import LoginScreen from "@/app/screens/auth/login";

// Firebase configuration
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@firebase/auth";
import {initializeApp} from "@firebase/app";
import {firebaseConfig} from "@/app/firebase-config"
// import { Stack } from 'expo-router';


import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from "@/app/screens/home/home";
import RegisterScreen from "@/app/screens/auth/register";

import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import ValidateAccountScreen from '@/app/screens/not-found/validateAccount';



const Stack = createStackNavigator();


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName="screens/auth/login">
          <Stack.Screen name="screens/auth/login" options={{title: 'login', headerShown: false, gestureEnabled: false}} component={LoginScreen}/>
          <Stack.Screen name="screens/auth/register" options={{
            title: '',
            headerBackTitle: '',
            headerShadowVisible: false,
            headerStyle: { backgroundColor: '#0c2b43'},
            headerLeft: () => (
                <Pressable onPress={router.back}>
                  <AntDesign name="arrowleft" size={35} color="white" style={{ paddingLeft: 5}}/>
                </Pressable>
            ),
          }} component={RegisterScreen}/>
          <Stack.Screen name="screens/home/home" options={{title: 'home', headerShown: false, gestureEnabled: false}} component={HomeScreen}/>

          <Stack.Screen name="screens/not-found/validateAccount" options={{title: 'validate account', headerShown: false, gestureEnabled: false}} component={ValidateAccountScreen}/>
        </Stack.Navigator>
    </ThemeProvider>
  );
}
