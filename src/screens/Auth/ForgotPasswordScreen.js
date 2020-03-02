import React from "react";
import { observer } from "mobx-react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from "react-native";
import CloudFooter from "../../components/CloudFooter";
import Layout from "../../constants/Layout";
import colors from "../../constants/Colors";
import Btn from "../../components/Btn";
import EewooInput from "../../components/EewooInput";

@observer
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

  sendResetPasswordRequest = async () => {
    const email = this.state.email.trim().toLowerCase();

    try {
      const res = await this.store.resetPassword(email);
      await this.showAlert({
        visible: true,
        image: require("../../assets/images/check.png"),
        title: "Done",
        body:
          "Please check your email and follow the link to reset your password",
        btnText: "OK",
        onClose: this.closeAlert,
        onAccept: this.closeAlert,
        allowClose: false
      });
    } catch (e) {
      this.handleError(e);
    }
  };

  login = () => {
    this.props.navigation.navigate("LogIn");
  };

  render() {
    const imgWidth = Layout.window.width;
    const imgHeight = Math.round(imgWidth * (837 / 1500));
    const btnDisabled = !this.state.email;

    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Forgotten password</Text>

          <EewooInput
            label="Email"
            value={this.state.email}
            onChange={email => this.setState({ email })}
            keyboard="email-address"
            error={this.state.errors}
            textContentType="username"
          />

          <View id="placeholder" style={{ width: "100%", height: 200 }}></View>
        </ScrollView>

        <CloudFooter color="red" width={imgWidth} height={imgHeight}>
          <Btn
            onPress={this.validateForm}
            title="Login"
            secondary
            disabled={btnDisabled}
            width={196}
          >
            Reset password
          </Btn>
          <TouchableOpacity onPress={this.login} activeOpacity={0.8}>
            <Text style={styles.textLink}>Back to login</Text>
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
    fontFamily: "QuicksandMedium",
    color: colors.graphite,
    textAlign: "center",
    marginTop: -20
  },
  textLink: {
    fontSize: 13,
    fontFamily: "QuicksandRegular",
    color: "white",
    padding: 8
  },
  hlink: {
    textDecorationLine: "underline"
  }
});
