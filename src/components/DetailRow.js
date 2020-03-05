import React from "react";
import { StyleSheet, Text, TouchableOpacity, Image, View } from "react-native";
import EewooInput from "./EewooInput";
import colors from "../constants/Colors";

export default class DetailRow extends React.Component {
  focus = () => {
    // this.refs.EewooInput.refs.TextInput.focus();
  };

  render() {
    return (
      <View style={styles.row}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={this.focus}
          style={styles.img}
        >
          <Image source={this.props.icon} style={styles.img} />
        </TouchableOpacity>

        <View style={styles.text}>
          <Text style={styles.label}>
            {this.props.label.toUpperCase()}
            {this.props.required && (
              <Text style={{ color: colors.red, marginLeft: 5 }}>*</Text>
            )}
          </Text>
          <EewooInput
            value={this.props.value}
            onChange={this.props.onChange}
            styleObject={styles.input}
            keyboard={this.props.keyboard || "default"}
            placeholder={this.props.placeholder}
            multiline={this.props.multiline || false}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            limitType={this.props.limitType}
            ref="EewooInput"
            returnKeyType={this.props.returnKeyType}
            inputAccessoryViewID={this.props.inputAccessoryViewID}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 15,
    paddingTop: 10,
    margin: 0
  },
  img: {
    width: 62,
    height: 62,
    resizeMode: "contain",
    marginRight: 25
  },
  text: {
    flex: 1
  },
  label: {
    fontSize: 14,
    fontFamily: "Quicksand-Bold",
    color: colors.graphite,
    paddingTop: 10
  },
  input: {
    marginTop: -58,
    marginBottom: 0,
    fontSize: 13,
    fontFamily: "Quicksand-Regular",
    borderColor: "#F1F1F1"
  }
});
