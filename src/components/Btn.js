import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import colors from "../constants/Colors";

export default class Btn extends React.Component {
  constructor(props) {
    super(props);
  }

  handlePress = () => {
    if (!this.props.disabled) {
      this.props.onPress();
    }
  };

  render() {
    const applied_styles = [styles.btn, { width: this.props.width }];
    const text_styles = [styles.text];

    if (this.props.secondary) {
      applied_styles.push(styles.btnSecondary);
      text_styles.push(styles.textSecondary);
    }

    if (this.props.secondaryWithBorder) {
      applied_styles.push(styles.btnSecondaryWithBorder);
      text_styles.push(styles.textSecondary);
    }

    if (this.props.disabled) {
      text_styles.push(styles.disabled);
    }

    return (
      <TouchableOpacity
        style={applied_styles}
        onPress={this.handlePress}
        title={this.props.title}
        activeOpacity={0.8}
      >
        <Text style={text_styles}>{this.props.children.toUpperCase()}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    // borderColor: colors.primary,
    // borderWidth: 1,
    height: 42,
    textAlign: "center",
    margin: 6,
    marginBottom: 10,
    flex: 0,
    justifyContent: "center"
  },
  btnSecondary: {
    backgroundColor: "white"
  },
  btnSecondaryWithBorder: {
    backgroundColor: "white",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F4F4F4",
    borderRadius: 5
  },
  text: {
    color: "white",
    fontSize: 14,
    fontFamily: "Quicksand-Bold",
    textAlign: "center",
    padding: 0,
    margin: 0,
    marginTop: -1
  },
  textSecondary: {
    color: colors.primary
  },
  disabled: {
    color: "#D8D8D8"
  }
});
