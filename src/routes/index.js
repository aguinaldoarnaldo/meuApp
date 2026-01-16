import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../Screens/Login";
import WelcomeScreen from "../Screens/Welcome";
import SplashScreen from "../Screens/Splash";
import RegisterScreen from "../Screens/Register";
import homeScreen from "../Screens/Home";
import NotificationsScreen from "../Screens/Notifications";
import ProfileScreen from "../Screens/Profile";
import EditProfileScreen from "../Screens/EditProfile";
import ChangePasswordScreen from "../Screens/ChangePassword";
import PartnersScreen from "../Screens/Partners";
import HealthScreen from "../Screens/Health";
import HistoryScreen from "../Screens/History";
import QRScannerScreen from "../Screens/QRScanner";
import ClientDetailsScreen from "../Screens/ClientDetails";
import ClinicaHome from "../Screens/ClinicaHome";
import InvoicesScreen from "../Screens/Invoices";


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
                
                <Stack.Screen name="Invoices" component={InvoicesScreen} options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}