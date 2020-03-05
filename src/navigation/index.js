import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import LogInScreen from "../screens/Auth/LogInScreen";

const Stack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={null}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LogInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
