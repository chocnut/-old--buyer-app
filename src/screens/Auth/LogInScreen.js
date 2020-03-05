import React from "react";
import { observer } from "mobx-react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  ScrollView
} from "react-native";
// import { Constants } from "expo-constants";
import CloudFooter from "../../components/CloudFooter";
import Layout from "../../constants/Layout";
import colors from "../../constants/Colors";
import Btn from "../../components/Btn";
import EewooInput from "../../components/EewooInput";

@observer
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

    if (!this.state.password)
      errors.password = "Please enter a minimum of 8 characters";

    this.setState({ errors });

    if (!errors.email && !errors.password) {
      this.login();
    }
  };

  login = async () => {
    const email = this.state.email.trim().toLowerCase();
    const password = this.state.password.trim();

    try {
      const auth_response = await this.store.login(email, password);
      this.store.saveAuthCredentials(auth_response);
      this.props.navigation.navigate("App", { forceRefresh: true });
    } catch (e) {
      console.log(e);
      this.props.navigation.navigate("LogInError");
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
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Welcome to</Text>

          <Image
            source={require("../../assets/images/logo-red.png")}
            style={styles.logo}
          />

          <EewooInput
            label="Email"
            value={this.state.email}
            onChange={email => this.setState({ email })}
            keyboard="email-address"
            error={this.state.errors.email}
            textContentType="username"
          />

          <EewooInput
            label="Password"
            value={this.state.password}
            onChange={password => this.setState({ password })}
            type="password"
            error={this.state.errors.password}
            textContentType="password"
          />

          {/*
          <TouchableOpacity style={styles.forgot} onPress={this.resetPassword} activeOpacity={0.9}>
            <Text style={styles.forgotText}>Forgotten password</Text>
          </TouchableOpacity>
          */}
        </ScrollView>

        <CloudFooter color="red" width={imgWidth} height={imgHeight}>
          <Btn
            onPress={this.validateForm}
            title="Login"
            secondary
            disabled={btnDisabled}
            width={196}
          >
            Login
          </Btn>
          <TouchableOpacity onPress={this.signup} activeOpacity={0.8}>
            <Text style={styles.textLink}>
              <Text style={styles.hlink}>Sign up</Text> for an account
            </Text>
          </TouchableOpacity>
        </CloudFooter>
        <StatusBar barStyle="dark-content" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "white",
    position: "relative"
  },
  content: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    paddingLeft: 33,
    paddingRight: 33
  },
  logo: {
    width: 165,
    height: 62,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    marginBottom: -20
  },
  title: {
    fontSize: 24,
    fontFamily: "Quicksand-Medium",
    color: colors.red,
    textAlign: "center",
    marginTop: -20
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
    color: "#D8D8D8",
    textAlign: "right",
    fontSize: 13,
    fontFamily: "Quicksand-Regular",
    paddingVertical: 10
  }
});
