import React from "react";
import { Formik } from "formik";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ScrollView
} from "react-native";
import Constants from "expo-constants";
import CloudFooter from "../../components/CloudFooter";
import Layout from "../../constants/Layout";
import colors from "../../constants/Colors";
import Btn from "../../components/Btn";
import EewooInput from "../../components/EewooInput";
import { loginUser } from "../../redux/auth/auth.actions";

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

export default class LogInScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: { email: "", password: "" }
    };
  }

  componentDidMount = async () => {
    //this.showAlert = this.props.screenProps.showAlert;
    //this.closeAlert = this.props.screenProps.closeAlert;
    // this.handleError = this.props.screenProps.handleError;
    // this.setLoading = this.props.screenProps.setLoading;
    // this.store = this.props.screenProps.appStore;
  };

  emailIsValid = () => {
    // ensure email contains characters and at least two words
    if (!this.state.email) return false;
    const email = this.state.email.trim().toLowerCase();
    return email.length > 4 && email.includes("@") && email.includes(".");
  };

  validateForm = () => {
    const errors = { email: "", password: "" };

    const emailValid = this.emailIsValid();
    if (!emailValid) errors.email = "Please enter valid email address";

    if (!this.state.password || this.state.password.length < 6)
      errors.password = "Please enter a minimum of 6 characters";

    this.setState({ errors });

    if (!errors.email && !errors.password) {
      this.login();
    }
  };

  login = async () => {
    const email = this.state.email.trim().toLowerCase();
    const password = this.state.password.trim();

    try {
      await loginUser({ email, password });
      this.props.navigation.navigate("Main");
    } catch (e) {
      console.log(e);
    }
  };

  signup = () => {
    this.props.navigation.navigate("SignUp");
  };

  resetPassword = () => {
    this.props.navigation.navigate("ForgotPassword");
  };

  render() {
    const imgWidth = Layout.window.width;
    const imgHeight = Math.round(imgWidth * (837 / 1500));
    const btnDisabled = !this.state.email || !this.state.password;

    return (
      <Formik
        initialValues={this.state}
        onSubmit={values => {
          this.setState(values);
          this.validateForm();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.container}>
            <ScrollView
              contentContainerStyle={styles.content}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.title}>Login</Text>
              <EewooInput
                label="Email"
                placeholder="Email address"
                onChange={handleChange("email")}
                keyboard="email-address"
                error={this.state.errors.email}
                textContentType="username"
              />

              <EewooInput
                label="Password"
                placeholder="Password"
                onChange={handleChange("password")}
                type="password"
                error={this.state.errors.password}
                textContentType="password"
              />

              <TouchableOpacity
                style={styles.forgot}
                onPress={this.resetPassword}
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
                onPress={() => this.props.navigation.navigate("Signup")}
                activeOpacity={0.8}
              >
                <Text style={styles.textLink}>
                  <Text>Don't have an account? </Text>
                  <Text style={styles.hlink}>Sign up</Text>
                </Text>
              </TouchableOpacity>
            </CloudFooter>
            <StatusBar barStyle="dark-content" />
          </View>
        )}
      </Formik>
    );
  }
}

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
  }
});
