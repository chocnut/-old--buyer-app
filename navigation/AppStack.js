import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  fadeIn,
  fromTop,
  fromBottom,
  fromLeft,
  fromRight
} from "react-navigation-transitions";
import colors from "../constants/Colors";
import LogoTitle from "../components/LogoTitle";
import HeaderBackground from "../components/HeaderBackground";

import Requests from "../screens/App/RequestsScreen";
import RequestWizard from "../screens/App/RequestWizard";

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: colors.graphite,
    color: "white",
    height: 70,
    borderBottomWidth: 0,
    elevation: 0
  },
  gesturesEnabled: false,
  headerBackground: <HeaderBackground />,
  headerBackgroundTransitionPreset: "toggle",
  headerLeft: null,
  headerTitle: <LogoTitle title={this.title} />
};

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  if (nextScene && prevScene) {
    const last_route = prevScene.route.routeName;
    const route = nextScene.route.routeName;

    if (route === "RequestWizard") {
      return fromBottom(600);
    }
  }

  return fadeIn(400);
};

// export default createStackNavigator(
//   {
//     Requests,
//     RequestWizard
//   },
//   {
//     initialRouteName: 'Requests',
//     defaultNavigationOptions,
//     transitionConfig: (nav) => handleCustomTransition(nav)
//   }
// );

const Stack = createStackNavigator();

export default AppStack = () => (
  <Stack.Navigator initialRouteName="Requests">
    <Stack.Screen name="Requests" component={Requests} />
    <Stack.Screen name="RequestWizard" component={RequestWizard} />
  </Stack.Navigator>
);
