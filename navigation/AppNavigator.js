import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AuthLoadingScreen from "../screens/AuthLoadingScreen";

import AuthHomeScreen from "../screens/Auth/AuthHomeScreen";
import LogInScreen from "../screens/Auth/LogInScreen";
// import LogInErrorScreen from "../screens/Auth/LogInErrorScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import ForgotPasswordScreen from "../screens/Auth/ForgotPasswordScreen";

import Requests from "../screens/App/RequestsScreen";
import RequestWizard from "../screens/App/RequestWizard";

// export default createSwitchNavigator(
//   {
//     AuthLoading,
//     Auth: AuthStack,
//     App: AppStack
//   },
//   {
//     initialRouteName: 'AuthLoading'
//   }
// );

const Stack = createStackNavigator();

export default AppNavigator = () => (
  <Stack.Navigator>
    {/* <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
    <Stack.Screen name="AuthHome" component={AuthHomeScreen} /> */}
    {/* <Stack.Screen component={SignUpScreen} /> */}
    {/* <Stack.Screen component={ForgotPasswordScreen} /> */}
    <Stack.Screen name="LoginScreen" component={LogInScreen} />
    {/* <Stack.Screen name="Requests" component={Requests} />
    <Stack.Screen name="RequestWizard" component={RequestWizard} /> */}
  </Stack.Navigator>
);
