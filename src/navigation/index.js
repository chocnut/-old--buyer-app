import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import LogInScreen from "../screens/Auth/LogInScreen";
import ForgotPasswordScreen from "../screens/Auth/ForgotPasswordScreen";
import ChangePasswordScreen from "../screens/Auth/ChangePasswordScreen";
import InfoScreen from "../screens/App/InfoScreen";
import MainScreen from "../screens/Main";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import ChatScreen from "../screens/App/ChatScreen";

const Stack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={null}>
        <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="Login" component={LogInScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
