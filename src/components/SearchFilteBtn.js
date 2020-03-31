import React from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import colors from "../constants/Colors";

const searchFilterIcon = require("../../assets/images/filter-grey-icon.png")
const searchFilterActiveIcon = require("../../assets/images/filter-red-icon.png")

function SearchFilteBtn(props) {
  return (
    <TouchableOpacity
        style={styles.btnFilter}
        onPress={props.onPress}
        title="Search Filter"
        activeOpacity={0.6}
      >
        <Image
          style={styles.btnFilterIcon}
          source={props.active ? searchFilterActiveIcon : searchFilterIcon}
        />
    </TouchableOpacity>
  )
}

export default SearchFilteBtn;

const styles = StyleSheet.create({
  btnFilter: {
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: 48,
    marginRight: -16
  },
  btnFilterIcon: {
    width: 20,
    height: 20
  }
});
