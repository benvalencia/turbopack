import { error } from "@/constants/errorCodes";
import { Alert } from "react-native";

export const errorHandler = (code: string) => {
    let title: string = '';
    let message: string = '';

    if (code === error['301']) {
        message = 'Un error ha ocurrido, confirma que el formulario está bien completado';
    }
    if (code === error['302']) {
        message = 'Un error ha ocurrido, confirma que el formulario está bien completado'
    }

    Alert.alert(title, message, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
}