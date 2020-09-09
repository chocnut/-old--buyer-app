import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import Spinner from "react-native-loading-spinner-overlay";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  ScrollView,
  Platform
} from "react-native";
import Constants from "expo-constants";
import CloudFooter from "../../components/CloudFooter";
import Layout from "../../constants/Layout";
import colors from "../../constants/Colors";
import Btn from "../../components/Btn";
import EewooInput from "../../components/EewooInput";
import { loginUser } from "../../redux/auth/auth.actions";
import { storeUser } from "../../redux/user/user.actions";
import { getUser } from "../../services/user";

const titleTop = () => {
  return Layout.window.height > 667
    ? (Layout.window.height / 100) * 8
    : (Layout.window.height / 100) * 6;
};

const titleBottom = () => {
  return Layout.window.height > 667
    ? (Layout.window.height / 100) * 8
    : (Layout.window.height / 100) * 6;
};

const LogInScreen = ({ navigation, route }) => {
  const {
    params: { accountActivated }
  } = route;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });
  const [serverError, setServerError] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);
  const { user } = useSelector(state => state);

  const dispatch = useDispatch();

  const imgWidth = Layout.window.width;
  const imgHeight = Math.round(imgWidth * (837 / 1500));

  useEffect(() => {
    if (user.verified && user.id && user.email) {
      navigation.navigate("Main");
    }
  }, [user]);

  const emailIsValid = email => {
    if (!email) return false;

    const emailTrimmed = email.trim().toLowerCase();

    return (
      emailTrimmed.length > 4 &&
      emailTrimmed.includes("@") &&
      emailTrimmed.includes(".")
    );
  };

  const validateForm = ({ email, password }) => {
    const errors = { email: "", password: "" };
    const emailValid = emailIsValid(email);
    if (!emailValid) errors.email = "Please enter valid email address";

    if (!password || password.length < 6)
      errors.password = "Please enter a minimum of 6 characters";

    setErrors(errors);

    if (!errors.email && !errors.password) {
      handleLogin({ email, password });
    }
  };

  const handleLogin = async ({ email, password }) => {
    setShowSpinner(true);
    let emailTrimmed = email.trim().toLowerCase();
    let passwordTrimmed = password.trim();

    try {
      const loginResponse = await loginUser({
        email: emailTrimmed,
        password: passwordTrimmed,
        metadata: {
          pushNotificationTokens: [user.expoToken]
        }
      });

      if (loginResponse) {
        const { data } = await getUser();
        dispatch(storeUser(data));
        setShowSpinner(false);

        if (accountActivated) {
          navigation.push("Profile");
          navigation.reset({
            index: 0,
            routes: [{ name: "Main" }, { name: "Profile" }]
          });
        } else {
          navigation.push("Main");
        }
      }
    } catch (e) {
      setShowSpinner(false);
      console.log(e);
      setServerError("The user credentials were incorrect.");
    }
  };

  return (
    <>
      <Spinner
        visible={showSpinner}
        textContent={"Loading..."}
        textStyle={styles.spinnerTextStyle}
      />
      <Formik
        initialValues={{
          email,
          password,
          errors
        }}
        onSubmit={({ email, password }) => {
          setEmail(email);
          setPassword(password);
          validateForm({ email, password });
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <>
            <ScrollView
              contentContainerStyle={styles.content}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.title}>Login</Text>
              <Text style={styles.serverError}>{serverError}</Text>
              <EewooInput
                label="Email"
                placeholder="Email address"
                onChange={handleChange("email")}
                keyboard="email-address"
                error={errors.email}
                textContentType="username"
                returnKeyType="next"
              />

              <EewooInput
                label="Password"
                placeholder="Password"
                onChange={handleChange("password")}
                type="password"
                error={errors.password}
                textContentType="password"
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
              />

              <TouchableOpacity
                style={styles.forgot}
                onPress={() => navigation.navigate("ForgotPassword")}
                activeOpacity={0.9}
              >
                <Text style={styles.forgotText}>Forgotten password</Text>
              </TouchableOpacity>
            </ScrollView>

            <CloudFooter color="red" width={imgWidth} height={imgHeight}>
              <Btn onPress={handleSubmit} title="Login" secondary width={196}>
                Login
              </Btn>
              <TouchableOpacity
                onPress={() => navigation.navigate("Signup")}
                activeOpacity={0.8}
              >
                <Text style={styles.textLink}>
                  <Text>Don't have an account? </Text>
                  <Text style={styles.hlink}>Sign up</Text>
                </Text>
              </TouchableOpacity>
            </CloudFooter>
            <StatusBar barStyle="dark-content" />
          </>
        )}
      </Formik>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "white"
  },
  content: {
    alignSelf: "center",
    paddingLeft: 8,
    paddingRight: 8,
    width: "100%",
    maxWidth: 356
  },
  title: {
    fontSize: 24,
    fontFamily: "Quicksand-Medium",
    color: colors.graphite,
    textAlign: "center",
    marginTop: titleTop(),
    marginBottom: titleBottom()
  },
  textLink: {
    fontSize: 13,
    fontFamily: "Quicksand-Regular",
    color: "white",
    padding: 8
  },
  hlink: {
    textDecorationLine: "underline"
  },
  forgotText: {
    color: colors.primary,
    textAlign: "right",
    fontSize: 13,
    fontFamily: "Quicksand-Regular",
    paddingVertical: 10,
    textDecorationLine: "underline"
  },
  serverError: {
    fontSize: 12,
    color: colors.red,
    fontFamily: "Quicksand-Bold"
  },
  spinnerTextStyle: {
    color: "#FFF"
  }
});

export default LogInScreen;
