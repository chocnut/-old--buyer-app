import React from "react";
// import { observer } from "mobx-react";
import {
  StyleSheet,
  Text,
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

// @observer
export default class ChangePasswordScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    email: "",
    password: "",
    confirmPassword: "",
    errors: ""
  };


  passwordIsValid = (password) => {
    // ensure password contains characters
    if (!password) return false;
    password = password.trim();
    return password.length > 5;
  };

  validateForm = () => {
    const errors = { password: "", confirmPassword: "" };

    const passwordValid = this.passwordIsValid(this.state.password);
    if (!passwordValid)
      errors.password = "Password should be at least 6 characters";

    const confirmPasswordValid = this.passwordIsValid(this.state.confirmPassword);
    if (!confirmPasswordValid)
      errors.confirmPassword = "Password should be at least 6 characters";
    else if (this.state.password !== this.state.confirmPassword)
      errors.confirmPassword = "Repeat password once more";

    this.setState({ errors });

    if (!errors.password && !errors.confirmPassword) {
      // this.props.navigation.navigate("PasswordChanged");
    }
  };

  render() {
    const imgWidth = Layout.window.width;
    const imgHeight = Math.round(imgWidth * (837 / 1500));

    const btnDisabled =
      !this.state.password || !this.state.confirmPassword;

    return (
      <View style={styles.container}>

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Change password</Text>

          <EewooInput
            label="New password"
            placeholder="At least 6 characters"
            value={this.state.password}
            onChange={password => this.setState({ password })}
            type="password"
            error={this.state.errors.password}
            textContentType="password"
          />

          <EewooInput
            label="Confirm password"
            placeholder="Repeat password once more"
            value={this.state.confirmPassword}
            onChange={confirmPassword => this.setState({ confirmPassword })}
            type="password"
            error={this.state.errors.confirmPassword}
            textContentType="password"
          />
        </ScrollView>

        <CloudFooter color="red" width={imgWidth} height={imgHeight}>
          <Btn
            title="CHANGE PASSWORD"
            onPress={this.validateForm}
            secondary
            disabled={btnDisabled}
            width={196}
          >
            CHANGE PASSWORD
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
    backgroundColor: "white",
  },
  content: {
    alignSelf: 'center',
    paddingLeft: 8,
    paddingRight: 8,
    width: '100%',
    maxWidth: 356,
  },
  title: {
    alignSelf: 'center',
    fontSize: 24,
    fontFamily: "Quicksand-Medium",
    color: colors.graphite,
    textAlign: "center",
    marginTop: Layout.window.height > 667 ? Layout.window.height / 100 * 8 : Layout.window.height / 100 * 6,
    marginBottom: Layout.window.height > 667 ? Layout.window.height / 100 * 8 : Layout.window.height / 100 * 5,
  },
});
