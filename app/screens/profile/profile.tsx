import {StyleSheet, Text, View} from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'white'}}>
      {/*BODY*/}
      <Text style={{color: '#000', fontSize: 150}}>mapa de fondo</Text>
      {/*FOOTER*/}
      <Text style={{color: '#000', fontSize: 150}}>formulario para pedir envío</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
