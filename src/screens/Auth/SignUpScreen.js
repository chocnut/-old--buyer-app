import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ScrollView
} from "react-native";
import CloudFooter from "../../components/CloudFooter";
import Layout from "../../constants/Layout";
import colors from "../../constants/Colors";
import Btn from "../../components/Btn";
import EewooInput from "../../components/EewooInput";
import Constants from "expo-constants";
// import api from "../../api";

const titleTop = () => {
  return Layout.window.height >= 667 ? Layout.window.height / 100 * 8 :  Layout.window.height / 100 * 6;
}

const titleBottom = () => {
  return Layout.window.height >= 667 ? Layout.window.height / 100 * 3 :  0;
}

//@observer
export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      errors: { name: "", email: "", password: "" }
    };
  }

  componentDidMount = async () => {
    //this.store = this.props.screenProps.appStore;
  };

  nameIsValid = () => {
    // ensure name contains characters and at least two words
    if (!this.state.name) return false;
    const name = this.state.name.trim();
    return name && name.length > 2 && name.includes(" ");
  };

  emailIsValid = () => {
    // ensure email contains characters and at least two words
    if (!this.state.email) return false;
    const email = this.state.email.trim().toLowerCase();
    return email.length > 4 && email.includes("@") && email.includes(".");
  };

  passwordIsValid = () => {
    // ensure password contains characters
    if (!this.state.password) return false;
    const password = this.state.password.trim();
    return password.length > 7;
  };

  validateForm = () => {
    const errors = { name: "", email: "", password: "" };

    const nameValid = this.nameIsValid();
    if (!nameValid) errors.name = "Please provide your full name";

    const emailValid = this.emailIsValid();
    if (!emailValid) errors.email = "Please provide a valid email address";

    const passwordValid = this.passwordIsValid();
    if (!passwordValid)
      errors.password = "Password should be at least 8 characters";

    this.setState({ errors });

    if (!errors.name && !errors.email && !errors.password) {
      this.signUp();
    }
  };

  signUp = async () => {
    const trimmedName = this.state.name.replace(/  /g, " ").trim();
    const name = trimmedName;
    const email = this.state.email.trim().toLowerCase();
    const password = this.state.password.trim();

    try {
      //await this.store.createUser({ name, email, password });
      //await this.store.login(email, password);
      // api.postToSlack("A new eewoo user signed up to use the app!", "Signup", {
      //   name,
      //   email
      // });
      //this.props.navigation.navigate("Requests");
    } catch (e) {
      console.log(e);
    }
  };

  login = () => {
    //this.props.navigation.navigate("LogIn");
  };

  render() {
    const imgWidth = Layout.window.width;
    const imgHeight = Math.round(imgWidth * (833 / 1500));
    const btnDisabled =
      !this.state.name || !this.state.email || !this.state.password;

    //return <Text>asdasd</Text>;
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Get started!</Text>

          <EewooInput
            label="Name"
            placeholder="Full name"
            value={this.state.name}
            onChange={name => this.setState({ name })}
            error={this.state.errors.name}
            textContentType="name"
          />

          <EewooInput
            label="Email"
            placeholder="Email address"
            value={this.state.email}
            onChange={email => this.setState({ email })}
            keyboard="email-address"
            error={this.state.errors.email}
            textContentType="username"
          />

          <EewooInput
            label="Password"
            placeholder="At least 6 characters"
            value={this.state.password}
            onChange={password => this.setState({ password })}
            type="password"
            error={this.state.errors.password}
            textContentType="password"
          />
        </ScrollView>

        <CloudFooter color="red" width={imgWidth} height={imgHeight}>
          <Btn
            onPress={this.validateForm}
            title="Create account"
            secondary
            disabled={btnDisabled}
            width={196}
          >
            Create account
          </Btn>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
            activeOpacity={0.8}
          >
            <Text style={styles.textLink}>
              Already have an account? <Text style={styles.hlink}>Login</Text>
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
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "white",
    position: "relative",
  },
  content: {
    paddingLeft: 8,
    paddingRight: 8,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 356,
  },
  title: {
    fontSize: 24,
    fontFamily: "Quicksand-Medium",
    color: colors.secondary,
    textAlign: "center",
    marginTop: titleTop(),
    marginBottom: titleBottom(),
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
  errors: {
    position: "absolute",
    bottom: 0,
    paddingLeft: 33,
    paddingRight: 33
  },
  error: {
    color: colors.red,
    fontSize: 13,
    marginBottom: 8
  }
});
