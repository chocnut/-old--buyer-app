// import { createStackNavigator } from 'react-navigation';
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {
  fadeIn,
  fromTop,
  fromBottom,
  fromLeft,
  fromRight
} from "react-navigation-transitions";

import AuthHomeScreen from "../screens/Auth/AuthHomeScreen";
import LogInScreen from "../screens/Auth/LogInScreen";
// import LogInErrorScreen from "../screens/Auth/LogInErrorScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import ForgotPasswordScreen from "../screens/Auth/ForgotPasswordScreen";

const defaultNavigationOptions = {
  header: null,
  gesturesEnabled: false
};

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  if (prevScene && prevScene.route.routeName === "AuthHome") {
    return fromBottom(2000);
  }

  if (nextScene && nextScene.route.routeName === "Requests") {
    return fromRight(1000);
  }

  return fadeIn(400);
};

// export default createStackNavigator({
//         AuthHome,
//         // LogInScreen,
//         // LogInErrorScreen,
//         SignUp,
//         ForgotPassword
//     },
//     {
//         initialRouteName: 'AuthHome',
//         defaultNavigationOptions,
//         transitionConfig: (nav) => handleCustomTransition(nav)
//     }
// );

const Stack = createStackNavigator();

export default AuthStack = () => (
  <Stack.Navigator initialRouteName="AuthHome">
    <Stack.Screen name="AuthHome" component={AuthHomeScreen} />
    <Stack.Screen component={SignUpScreen} />
    <Stack.Screen component={ForgotPasswordScreen} />
    <Stack.Screen component={LogInScreen} />
    {/* <Stack.Screen component={LogInErrorScreen} /> */}
  </Stack.Navigator>
);
