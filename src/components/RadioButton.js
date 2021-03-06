import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../constants/Colors";

const RadioButton = ({ value, label, status, onPress, activeOpacity }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(value);
      }}
      style={styles.radio}
      activeOpacity={activeOpacity || 0.8}
    >
      <Text style={styles.label}>{label}</Text>
      <View style={styles.radioIndicatorHolder}>
        <View
          style={[
            styles.radioIndicator,
            status == "checked" ? styles.indicatorActive : null
          ]}
        ></View>
      </View>
    </TouchableOpacity>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  label: {
    fontFamily: "Quicksand-Bold",
    color: colors.secondary
  },
  radio: {
    paddingVertical: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  radioIndicatorHolder: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F4F4F4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  radioIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    opacity: 0
  },
  indicatorActive: {
    opacity: 1
  }
});
