import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Sign_in from "../Screens/Sign_in/sign_in";


export default function Routs() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="sign_in" component={Sign_in} options={{ headerShown: false }} />
                <Stack.Screen name="sign_up" component={Sign_up} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}