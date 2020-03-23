import React from "react"
import {View, Text, TouchableOpacity, StyleSheet} from "react-native"
import colors from "../constants/Colors";

const Checkbox = (props) => {
  return (
    <TouchableOpacity
      onPress={()=>{props.onPress(props.value)}}
      style={styles.radioHolder}
      activeOpacity={props.activeOpacity || 0.8}>
      <Text style={styles.radioLabel}>{props.label}</Text>
      <View style={styles.checkboxIndicatorHolder}>
        <View style={[styles.checkboxIndicator,  props.status == 'checked'  ? styles.indicatorActive : null]}></View>
      </View>
    </TouchableOpacity>
  )
}

export default Checkbox;

const styles = StyleSheet.create({
  radioLabel: {
    fontFamily: "Quicksand-Bold",
    color: colors.secondary,
  },
  radioHolder: {
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  checkboxIndicatorHolder: {
    width: 16,
    height: 16,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#F4F4F4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  checkboxIndicator: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: colors.primary,
    opacity: 0
  },
  indicatorActive: {
    opacity: 1
  }
})