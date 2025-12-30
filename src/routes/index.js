import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../Screens/LoginScreen";
import WelcomeScreen from "../Screens/welcome";
import SplashScreen from "../Screens/SplashScreen";
import RegisterScreen from "../Screens/regitar";
import homeScreen from "../Screens/HomeScreen";
import NotificationsScreen from "../Screens/NotificationsScreen";
import ProfileScreen from "../Screens/profileScreen";
import EditProfileScreen from "../Screens/EditProfileScreen";
import ChangePasswordScreen from "../Screens/ChangePasswordScreen";
import PartnersScreen from "../Screens/PartnersScreen";
import HealthScreen from "../Screens/HealthScreen";
import HistoryScreen from "../Screens/HistoryScreen";
import QRScannerScreen from "../Screens/QRScannerScreen";
import ClientDetailsScreen from "../Screens/ClientDetailsScreen";
import ClinicaHome from "../Screens/ClinicaHome";


export default function Routs() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>

            <Stack.Navigator>
                <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                
                <Stack.Screen name="ClinicaHome" component={ClinicaHome} options={{ headerShown: false }} />


                <Stack.Screen name="QRScannerScreen" component={QRScannerScreen} options={{ headerShown: false }} />


                <Stack.Screen name="homeScreen" component={homeScreen} options={{ headerShown: false }} />

                <Stack.Screen name="ClientDetailsScreen" component={ClientDetailsScreen} options={{ headerShown: false }} />

                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />

                <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />

                <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />


                <Stack.Screen name="NotificationsScreen" component={NotificationsScreen} options={{ headerShown: false }} />


                <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />

                <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />

                <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ headerShown: false }} />

                <Stack.Screen name="partnerScreen" component={PartnersScreen} options={{ headerShown: false }} />

                <Stack.Screen name="Health" component={HealthScreen} options={{ headerShown: false }} />

                <Stack.Screen name="History" component={HistoryScreen} options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}