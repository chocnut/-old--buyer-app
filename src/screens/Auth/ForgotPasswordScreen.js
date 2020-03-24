import React from "react";
// import { observer } from "mobx-react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Linking,
  Platform
} from "react-native";
import Constants from "expo-constants";
import CloudFooter from "../../components/CloudFooter";
import Layout from "../../constants/Layout";
import colors from "../../constants/Colors";
import Btn from "../../components/Btn";
import EewooInput from "../../components/EewooInput";
import HeaderBtn from "../../components/HeaderBtn";

// @observer
export default class ForgotPasswordScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: ""
    };
  }

  componentDidMount = async () => {
    //this.showAlert = this.props.screenProps.showAlert;
    //this.closeAlert = this.props.screenProps.closeAlert;
    // this.handleError = this.props.screenProps.handleError;
    // this.store = this.props.screenProps.appStore;
  };

  emailIsValid = () => {
    // ensure email contains characters and at least two words
    if (!this.state.email) return false;
    const email = this.state.email.trim().toLowerCase();
    return email.length > 4 && email.includes("@") && email.includes(".");
  };

  validateForm = () => {
    let errors = "";

    const emailValid = this.emailIsValid();
    if (!emailValid) errors = "Please enter valid email address";

    this.setState({ errors });

    if (!errors) {
      this.sendResetPasswordRequest();
    }
  };

  openMail = () => {
    if (Platform.OS === "android") {
      alert("Coming soon");
      return;
    }
    Linking.openURL("message:0");
    return;
  };

  sendResetPasswordRequest = async () => {
    const email = this.state.email.trim().toLowerCase();

    // try {
    //   const res = await this.store.resetPassword(email);
    //   await
    this.props.navigation.navigate("Info", {
      title: "Check your email!",
      body:
        "We’ve sent an email to: " +
        email +
        " It has a magic link that’ll restore\n your password",
      icon: require("../../../assets/images/check.png"),
      btn: {
        title: "OPEN EMAIL APP",
        onPress: () => {
          this.openMail();
        }
      },
      btnLink: {
        title: "I didn’t receive my email",
        onPress: () => {
          this.props.navigation.goBack();
        }
      }
    });
    // } catch (e) {
    //   this.handleError(e);
    // }
  };

  login = () => {
    this.props.navigation.navigate("Login");
  };

  render() {
    const imgWidth = Layout.window.width;
    const imgHeight = Math.round(imgWidth * (837 / 1500));
    const btnDisabled = !this.state.email;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <HeaderBtn
            onPress={this.login}
            title="Back"
            image={require("../../../assets/images/arrow-left-grey-icon.png")}
            style={styles.btnBack}
          />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Forgot password?</Text>

          <EewooInput
            label="Email"
            placeholder="Email address"
            value={this.state.email}
            onChange={email => this.setState({ email })}
            keyboard="email-address"
            error={this.state.errors}
            textContentType="username"
          />
        </ScrollView>

        <CloudFooter color="red" width={imgWidth} height={imgHeight}>
          <Btn
            onPress={this.validateForm}
            title="Reset password"
            secondary
            disabled={btnDisabled}
            width={196}
          >
            Reset password
          </Btn>
        </CloudFooter>
        <StatusBar barStyle="dark-content" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "white"
  },
  header: {
    height: 44
  },
  content: {
    alignSelf: "center",
    paddingLeft: 8,
    paddingRight: 8,
    width: "100%",
    maxWidth: 356
  },
  title: {
    alignSelf: "center",
    fontSize: 24,
    fontFamily: "Quicksand-Medium",
    color: colors.graphite,
    textAlign: "center",
    marginTop:
      Layout.window.height > 667
        ? (Layout.window.height / 100) * 8 - 44
        : (Layout.window.height / 100) * 1,
    marginBottom:
      Layout.window.height > 667
        ? (Layout.window.height / 100) * 8
        : (Layout.window.height / 100) * 5
  }
});
