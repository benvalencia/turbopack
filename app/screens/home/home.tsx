import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {CommonActions} from "@react-navigation/native";
import {useNavigation} from "@react-navigation/core";
import {scale} from 'react-native-size-matters';
import AntDesign from "@expo/vector-icons/AntDesign";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "@/app/firebase-config";

export default function HomeScreen({route}: any) {

  const {top} = useSafeAreaInsets()
  const navigation = useNavigation()
  const {uid} = route.params;

  const [userProfile, setUserProfile] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getProfile()
      setUserProfile(profile)
      setLoading(false);
    };

    fetchProfile();
  }, [])


  const getProfile = async () => {
    let profileResult;
    const q = query(collection(db, "user_profile"), where("uid", "==", uid));
    await getDocs(q).then((res) => {
      res.forEach((doc) => {
        profileResult = doc.data()
      });
    });

    return profileResult;
  }

  const goToMap = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'screens/map/map',
      }));
  }

  const goToProfile = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'screens/profile/profile',
      }));
  }


  if (loading) {
    return (
      <View style={{}}>
        <Text>test</Text>
      </View>
    )
  }
  if (!userProfile) {
    return (
      <View>
        <Text>profile</Text>
      </View>
    )
  }

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'white', paddingTop: top}}>
      {/*HEADER*/}
      <View style={styles.headerContainer}>

        <Pressable style={styles.inputTextContainer}
                     onPress={goToMap}
        >

          <Text style={styles.inputTextComponent}>
            <AntDesign name="search1" size={23} color="black" style={{}}/>
            Hacer un envio?
          </Text>
        </Pressable>


      </View>

      <View>
        <Text style={{color: '#000', fontSize: 20}}>Envíos anteriores</Text>
        <Text>Aquí los envíos anteriores</Text>
      </View>

      <View>
        <Text>email: {userProfile.email}</Text>
        <Text>isAdmin: {userProfile.isAdmin ? 'true' : 'false'}</Text>
        <Text>isDeliver: {userProfile.isDeliver ? 'true' : 'false'}</Text>
        <Text>lastName: {userProfile.lastname}</Text>
        <Text>name: {userProfile.name}</Text>
        <Text>uid: {userProfile.uid}</Text>
      </View>

      <View>
        {/*Menu*/}
        {/*botón home*/}
        {/*botón perfil*/}
        <View>
          <Text>home</Text>
          <Text onPress={goToProfile}>perfil</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // HEADER CONTAINER
  headerContainer: {
    padding: 15,
  },

  inputTextContainer: {
    backgroundColor: 'white',
    borderColor: '#fff',
    borderRadius: 5,
    borderWidth: 0.777,

    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: scale(-2),
    },
    shadowOpacity: 0.8,
    shadowRadius: scale(7.5),
    elevation: 10,
  },
  inputTextComponent: {
    color: 'black',
    fontSize: 21,
    height: 45,
    // TODO:  refactor este line height
    lineHeight: 35,
    verticalAlign: 'middle',
    padding: 5.777,

  }
});
