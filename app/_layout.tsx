import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, {useEffect} from 'react';
import 'react-native-reanimated';

import {useColorScheme} from '@/hooks/useColorScheme';
import {Pressable} from "react-native";
import LoginScreen from "@/app/screens/auth/login";

import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from "@/app/screens/home/home";
import RegisterScreen from "@/app/screens/auth/register";

import AntDesign from '@expo/vector-icons/AntDesign';
import {useRouter} from 'expo-router';
import ValidateAccountScreen from '@/app/screens/site/validateAccount';
import NotFoundScreen from "@/app/screens/site/notFound";
import MapScreen from "@/app/screens/map/map";
import ProfileScreen from "@/app/screens/profile/profile";

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

        <Stack.Screen name="screens/auth/login" options={{title: 'Login', headerShown: false, gestureEnabled: false}}
                      component={LoginScreen}/>

        <Stack.Screen name="screens/auth/register" options={{
            title: '',
            headerBackTitle: '',
            headerShadowVisible: false,
          headerStyle: {backgroundColor: '#fff'},
            headerLeft: () => (
                <Pressable onPress={router.back}>
                  <AntDesign name="arrowleft" size={35} color="black" style={{paddingLeft: 5}}/>
                </Pressable>
            ),
          }} component={RegisterScreen}/>

        <Stack.Screen name="screens/home/home" options={{title: 'home', headerShown: false, gestureEnabled: false}}
                      component={HomeScreen}/>


        <Stack.Screen name="screens/site/validateAccount"
                        options={{title: 'validate account', headerShown: false, gestureEnabled: false}}
                        component={ValidateAccountScreen}/>

        <Stack.Screen name="screens/site/notFound"
                        options={{title: 'Not Found', headerShown: false, gestureEnabled: false}}
                        component={NotFoundScreen}/>

        <Stack.Screen name="screens/profile/profile"
                      options={{
                        title: '',
                        headerBackTitle: '',
                        headerShadowVisible: false,
                        headerStyle: {backgroundColor: '#0c2b43'},
                        headerLeft: () => (
                          <Pressable onPress={router.back}>
                            <AntDesign name="arrowleft" size={35} color="white" style={{paddingLeft: 5}}/>
                          </Pressable>
                        ),
                      }}
                      component={ProfileScreen}/>

        <Stack.Screen name="screens/map/map"
                      options={{
                        title: '',
                        headerBackTitle: '',
                        headerShadowVisible: false,
                        headerShown: false,
                      }}
                      component={MapScreen}/>
        </Stack.Navigator>
    </ThemeProvider>
  );
}
