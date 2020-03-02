import React from "react";
import { observer } from "mobx-react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar
} from "react-native";
import CloudFooter from "../../components/CloudFooter";
import colors from "../../constants/Colors";
import Layout from "../../constants/Layout";
import Btn from "../../components/Btn";

const logoWidth = Layout.window.width;
const logoHeight = logoWidth * (545 / 1242);

const cloudWidth = Layout.window.width;
const cloudHeight = Math.round(cloudWidth * (837 / 1500));

@observer
export default class AuthHomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.logoTop = new Animated.Value(0);
    this.cloudOpacity = new Animated.Value(0);
    this.maskPosition = new Animated.Value(Layout.window.height - cloudHeight);
    this.maskOpacity = new Animated.Value(0);
  }

  componentDidMount = async () => {
    this.animateIn();
  };

  animateIn = () => {
    Animated.stagger(800, [
      Animated.timing(this.logoTop, {
        delay: 1000,
        toValue: -80,
        duration: 1400,
        useNativeDriver: true,
        easing: Easing.inOut(Easing.quad)
      }),
      Animated.timing(this.cloudOpacity, {
        delay: 1200,
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      })
    ]).start();
  };

  animateOut = destination => {
    Animated.sequence([
      Animated.timing(this.maskOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true
      }),
      Animated.timing(this.maskPosition, {
        toValue: -cloudHeight,
        duration: 1600,
        easing: Easing.out(Easing.poly(4)),
        useNativeDriver: true
      })
    ]).start();

    setTimeout(() => {
      this.props.navigation.navigate(destination);
    }, 250);
  };

  login = () => {
    this.animateOut("LogIn");
  };

  signup = () => {
    this.animateOut("SignUp");
  };

  render() {
    return (
      <View style={styles.container}>
        <Animated.Image
          imageStyle={{ resizeMode: "cover" }}
          source={require("../../assets/images/splash.png")}
          style={{ ...styles.logo, transform: [{ translateY: this.logoTop }] }}
        />

        <View style={styles.content}></View>

        <Animated.View style={{ opacity: this.cloudOpacity }}>
          <CloudFooter color="white" width={cloudWidth} height={cloudHeight}>
            <Btn onPress={this.signup} title="Get started" width={196}>
              Get started
            </Btn>
            <TouchableOpacity onPress={this.login} activeOpacity={0.8}>
              <Text style={styles.textLink}>
                Already have an account? <Text style={styles.hlink}>Login</Text>
              </Text>
            </TouchableOpacity>
          </CloudFooter>
        </Animated.View>

        {/* the following is a mask which is used for the exit animation */}
        <Animated.View
          style={{
            position: "absolute",
            height: Layout.window.height + cloudHeight,
            transform: [{ translateY: this.maskPosition }],
            opacity: this.maskOpacity,
            flex: 1
          }}
          pointerEvents="none"
        >
          <CloudFooter
            color="white"
            width={cloudWidth}
            height={cloudHeight}
          ></CloudFooter>
          <View
            style={{ backgroundColor: "white", height: Layout.window.height }}
          ></View>
        </Animated.View>
        <StatusBar barStyle="light-content" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: colors.red
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 33,
    paddingRight: 33
  },
  logo: {
    width: logoWidth,
    height: logoHeight,
    flex: 1,
    position: "absolute",
    marginTop: (Layout.window.height - logoHeight) / 2,
    left: 0,
    zIndex: -1
  },
  byline: {
    fontSize: 24,
    fontFamily: "QuicksandMedium",
    textAlign: "center",
    color: "white"
  },
  textLink: {
    fontSize: 13,
    fontFamily: "QuicksandRegular",
    color: colors.graphite,
    padding: 8
  },
  hlink: {
    textDecorationLine: "underline"
  }
});
