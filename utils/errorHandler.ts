import { error } from "@/constants/errorCodes";
import { Alert } from "react-native";

export const errorHandler = (code: string) => {
    let title: string = '';
    let message: string = 'Ha ocurrido un error';

    if (code === error['301']) {
        message = 'El email ya está siendo usado';
    }
    if (code === error['302']) {
        message = 'El email es invalido'
    }

    Alert.alert(title, message, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
}