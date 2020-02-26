import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  Keyboard
} from "react-native";
import colors from "../constants/Colors";
import countries from "../utils/countries";

export default class CountryPicker extends React.Component {
  constructor(props) {
    super(props);
    this.positionTop = new Animated.Value(0);
    this.dropdownOpacity = new Animated.Value(0);
  }

  state = {
    hasFocus: false,
    startingPoint: this.props.startingPoint
  };

  toggleFocus = async () => {
    Keyboard.dismiss();
    const animationArray = [];
    const hasFocus = !this.state.hasFocus;
    const duration = 300;
    const useNativeDriver = true;

    if (hasFocus) {
      await this.props.onActivate();
      this.positionTop.setValue(this.props.startingPoint);
      const target = 0;
      const dropdownOpacity = 1;
      animationArray.push(
        Animated.timing(this.positionTop, {
          toValue: target,
          duration,
          useNativeDriver
        })
      );
      animationArray.push(
        Animated.timing(this.dropdownOpacity, {
          toValue: dropdownOpacity,
          duration,
          useNativeDriver
        })
      );
      this.setState({ hasFocus });
      Animated.stagger(duration, animationArray).start();
    } else {
      const target = this.props.startingPoint;
      const dropdownOpacity = 0;
      animationArray.push(
        Animated.timing(this.dropdownOpacity, {
          toValue: dropdownOpacity,
          duration,
          useNativeDriver
        })
      );
      animationArray.push(
        Animated.timing(this.positionTop, {
          toValue: target,
          duration,
          useNativeDriver
        })
      );
      Animated.stagger(duration, animationArray).start(async () => {
        await this.positionTop.setValue(0);
        this.setState({ hasFocus });
        this.props.onDeActivate();
      });
    }
  };

  findCountryName = Code => {
    const country = countries.find(c => c.Code === Code);
    if (!country) return "";
    return country.Name;
  };

  selectItem = code => {
    this.props.onChange(code);
    this.toggleFocus();
  };

  renderList = () => {
    return countries.map((country, index) => {
      const divider = index === 2 ? <View style={styles.divider}></View> : null;
      const check =
        this.props.value === country.Code ? (
          <Image
            style={styles.check}
            source={require("../assets/images/check-icon.png")}
          />
        ) : null;

      return (
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.listItem, divider && styles.withDivider]}
          onPress={() => this.selectItem(country.Code)}
          key={`${country.Code}-${index}`}
        >
          <Text style={styles.listText}>{country.Name}</Text>
          {check}
          {divider}
        </TouchableOpacity>
      );
    });
  };

  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          this.state.hasFocus && styles.containerHasFocus,
          { transform: [{ translateY: this.positionTop }] }
        ]}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.row, !this.positionTop && styles.hasFocus]}
          onPress={this.toggleFocus}
        >
          <Image source={this.props.icon} style={styles.img} />
          <View style={styles.text}>
            <Text style={styles.label}>
              {this.props.label.toUpperCase()}
              {this.props.required && (
                <Text style={{ color: colors.red, marginLeft: 5 }}>*</Text>
              )}
            </Text>
            <Text
              style={[styles.input, !this.props.value && styles.placeholder]}
            >
              {this.props.value
                ? this.findCountryName(this.props.value)
                : "Where will this order be delivered?"}
            </Text>
          </View>
        </TouchableOpacity>

        <Animated.View
          style={[
            styles.dropdown,
            {
              left: this.state.hasFocus ? 0 : -99999,
              opacity: this.dropdownOpacity
            }
          ]}
        >
          <ScrollView contentContainerStyle={styles.dropdownScroll}>
            {this.renderList()}
          </ScrollView>
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: 500,
    left: 0,
    zIndex: 20,
    backgroundColor: "white"
  },
  containerHasFocus: {
    position: "absolute",
    height: "100%"
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 15,
    paddingTop: 10,
    margin: 0,
    backgroundColor: "white",
    maxHeight: 84
  },
  hasFocus: {
    shadowColor: "#555064",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
    zIndex: 1
  },
  img: {
    width: 62,
    height: 62,
    resizeMode: "contain",
    marginRight: 25
  },
  text: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#F1F1F1"
  },
  label: {
    fontSize: 14,
    fontFamily: "QuicksandBold",
    color: colors.graphite,
    paddingTop: 10
  },
  input: {
    paddingTop: 11,
    paddingBottom: 19,
    color: colors.graphite,
    width: "100%",
    letterSpacing: 0.3,
    marginTop: 0,
    marginBottom: 0,
    fontSize: 13,
    fontFamily: "QuicksandRegular"
  },
  placeholder: {
    color: colors.graphiteOpacity
  },
  dropdown: {
    backgroundColor: "#fff",
    width: "100%",
    flex: 1,
    position: "relative",
    top: 1,
    left: 0,
    padding: 0
  },
  dropdownScroll: {
    paddingTop: 20,
    paddingBottom: 50,
    width: "100%"
  },
  listItem: {
    height: 40,
    width: "100%",
    paddingLeft: 30,
    paddingRight: 30,
    paddingVertical: 10,
    marginTop: 1,
    marginBottom: 1,
    position: "relative"
  },
  withDivider: {
    height: 60
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: "#D8D8D8",
    height: 20
  },
  listText: {
    fontFamily: "QuicksandRegular",
    fontSize: 14,
    color: colors.graphite,
    width: "100%",
    position: "relative",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  check: {
    width: 12,
    height: 10,
    position: "absolute",
    right: 30,
    top: 15
  }
});
