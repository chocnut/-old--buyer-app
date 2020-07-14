import React from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import colors from "../constants/Colors";
const passwordIconVisible = require("../../assets/images/eye.png");
const passwordIconInvisible = require("../../assets/images/eye-slash.png");

export default class EewooInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordVisible: false,
      hasFocus: false
    };
  }

  togglePasswordVisibility = () => {
    this.setState({
      passwordVisible: !this.state.passwordVisible
    });
  };

  changeLabelPosition = hasFocus => {
    this.setState({ hasFocus });

    if (hasFocus && this.props.onFocus) {
      this.props.onFocus();
    } else if (!hasFocus && this.props.onBlur) {
      this.props.onBlur();
    }
  };

  getReturnKeyType = () => {
    if (this.props.returnKeyType) return this.props.returnKeyType;
    return this.props.multiline ? "default" : "done";
  };

  getInputStyles = () => {
    const inputStyles = [styles.input];

    if (this.props.type && this.props.type === "password") {
      inputStyles.push(styles.passwordInput);
    }

    if (this.props.styleObject) {
      inputStyles.push(this.props.styleObject);
    }

    // if (this.state.hasFocus) {
    //   inputStyles.push(styles.hasFocus);
    // }

    if (this.props.error || this.props.placeholderError) {
      inputStyles.push(styles.hasError);
    }

    return inputStyles;
  };

  onChanged = text => {
    if (
      this.props.keyboard === "numeric" ||
      this.props.keyboard === "number-pad"
    ) {
      let newText = "";
      let numbers = "0123456789";
      const limitType = this.props.limitType;

      if (!limitType || limitType !== "integer") {
        numbers += ".";
      }

      newText = Array.from(text)
        .filter(char => numbers.includes(char))
        .join("");

      if (limitType && limitType === "currency") {
        const decimalIndex = newText.lastIndexOf(".");
        if (decimalIndex >= 0) {
          newText = newText.substr(0, decimalIndex + 3);
        }
      }

      text = newText;
    }

    this.props.onChange(text);
  };

  renderPasswordButton = () => {
    if (!this.props.type || this.props.type !== "password") {
      return null;
    }

    const icon = this.state.passwordVisible
      ? passwordIconInvisible
      : passwordIconVisible;

    return (
      <TouchableOpacity
        onPress={this.togglePasswordVisibility}
        style={styles.toggleBtn}
        activeOpacity={1}
      >
        <Image source={icon} style={styles.toggleBtnImg} />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{this.props.label}</Text>
        <View style={styles.inputContainer}>
          {this.props.icon && (
            <Text style={styles.inputIcon}>{this.props.icon}</Text>
          )}
          <TextInput
            style={this.getInputStyles()}
            onChangeText={this.onChanged}
            value={this.props.value}
            autoCapitalize={this.props.autoCapitalize || "none"}
            placeholderTextColor={
              this.props.placeholderError ? colors.red : colors.graphiteOpacity
            }
            placeholder={this.props.placeholder}
            keyboardType={this.props.keyboard || "default"}
            secureTextEntry={
              this.props.type &&
              this.props.type === "password" &&
              !this.state.passwordVisible
            }
            onFocus={() => this.changeLabelPosition(true)}
            onBlur={() => this.changeLabelPosition(false)}
            onSubmitEditing={this.props.onSubmitEditing}
            textAlignVertical="top"
            multiline={this.props.multiline || false}
            ref="TextInput"
            returnKeyType={this.getReturnKeyType()}
            inputAccessoryViewID={this.props.inputAccessoryViewID || null}
            textContentType={this.props.textContentType || "none"}
          />
        </View>

        <Image />
        {this.renderPasswordButton()}
        <Text style={styles.errorLabel}>{this.props.error}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    position: "relative"
  },
  label: {
    color: colors.graphite,
    fontSize: 14,
    fontFamily: "Quicksand-Bold",
    textTransform: "uppercase"
    // position: "absolute",
    // left: 0,
    // top: 10,
    // zIndex: -1
  },
  smallLabel: {
    textTransform: "uppercase",
    fontFamily: "Quicksand-Bold"
  },
  whiteLabel: {
    color: "white"
  },
  errorLabel: {
    marginTop: 4,
    fontSize: 10,
    lineHeight: 14,
    color: colors.red,
    textTransform: "none",
    fontFamily: "Quicksand-Bold"
  },
  input: {
    paddingTop: 12,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: colors.graphiteOpacityFeint,
    color: colors.graphite,
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "Quicksand-Regular",
    width: "100%",
    letterSpacing: 0.3,
    maxHeight: 200
  },
  // hasFocus: {
  //   borderColor: colors.graphite
  // },
  passwordInput: {
    paddingRight: 40
  },
  hasError: {
    borderColor: colors.red
  },
  hasPlaceholderError: {
    color: colors.red
  },
  toggleBtn: {
    width: 50,
    height: 50,
    position: "absolute",
    zIndex: 1,
    bottom: 15,
    right: -12,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  toggleBtnImg: {
    width: 20,
    height: 20
  },
  inputContainer: {
    justifyContent: "center"
  },
  inputIcon: {
    position: "absolute",
    left: -10,
    color: "#9996A2"
  }
});

EewooInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  styleObject: PropTypes.object,
  keyboard: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  autoCapitalize: PropTypes.string,
  onSubmitEditing: PropTypes.func
};
