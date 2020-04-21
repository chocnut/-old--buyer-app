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
import ProfileScreen from "../screens/Profile";
import NewRequest from "../screens/Request/New";
import { useSelector, useDispatch } from "react-redux";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { setNextStep } from "../redux/request/wizard/wizard.actions";

const MainStack = createStackNavigator();
const RequestModalStack = createStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator headerMode={null}>
      <MainStack.Screen name="AuthLoading" component={AuthLoadingScreen} />
      <MainStack.Screen name="Welcome" component={WelcomeScreen} />
      <MainStack.Screen name="Main" component={MainScreen} />
      <MainStack.Screen name="Signup" component={SignUpScreen} />
      <MainStack.Screen name="Info" component={InfoScreen} />
      <MainStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
      <MainStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
      />
      <MainStack.Screen name="Login" component={LogInScreen} />
      <MainStack.Screen name="Chat" component={ChatScreen} />
      <MainStack.Screen name="Profile" component={ProfileScreen} />
    </MainStack.Navigator>
  );
}
const backIcon = require("../../assets/images/chevron-left.png");
const closeIcon = require("../../assets/images/close-grey.png");

export default () => {
  const { currentStep, prevStep } = useSelector(state => state.wizard);
  const dispatch = useDispatch();

  return (
    <>
      <NavigationContainer>
        <RequestModalStack.Navigator mode="modal">
          <RequestModalStack.Screen
            name="MainStack"
            component={MainStackScreen}
            options={{ headerShown: false }}
          />
          <RequestModalStack.Screen
            name="NewRequest"
            component={NewRequest}
            options={({ navigation }) => ({
              headerStyle: {
                borderBottomColor: "#F03758",
                borderLeftColor: "transparent",
                borderRightColor: "transparent",
                borderTopColor: "transparent",
                borderWidth: 1
              },
              headerTitle: "New Request",
              headerTitleStyle: {
                color: "#555064",
                fontFamily: "Quicksand-Regular",
                fontWeight: "500",
                fontSize: 16,
                lineHeight: 20
              },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    if (currentStep === 0) {
                      navigation.goBack();
                      dispatch(setNextStep(0));
                    } else {
                      dispatch(setNextStep(prevStep));
                    }
                  }}
                  title="Back"
                  style={styles.btn}
                >
                  <Image source={backIcon} />
                </TouchableOpacity>
              ),
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(setNextStep(0));
                    navigation.goBack();
                  }}
                  title="Close"
                  style={styles.closeBtn}
                >
                  <Image source={closeIcon} />
                </TouchableOpacity>
              )
            })}
          />
        </RequestModalStack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: "100%",
    left: 15
  },
  closeBtn: {
    width: "100%",
    right: 10
  }
});
