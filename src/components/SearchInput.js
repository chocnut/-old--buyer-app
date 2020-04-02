import React from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
import colors from "../constants/Colors";

const searchIcon = require("../../assets/images/search-grey-icon.png");
const clearIcon = require("../../assets/images/delete.png");

export default class SearchFilter extends React.Component {
  state = {
    clearDisabled: true,
    value: ""
  };
  onChanged = text => {
    const clearDisabled = text && text.length ? false : true;

    this.setState({ clearDisabled: clearDisabled, value: text });
    this.props.onChangeText ? this.props.onChangeText(text) : false;
  };

  onPressClear = () => {
    this.onChanged("");
  };

  componentDidMount = () => {
    this.onChanged(this.props.value);
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.searchIcon} source={searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#9996A2"
          onChangeText={this.onChanged}
          value={this.state.value}
        />
        <TouchableOpacity
          style={[
            styles.btnClear,
            this.state.clearDisabled ? styles.btnClearDisabled : null
          ]}
          onPress={this.onPressClear}
          title="Clear"
          activeOpacity={0.6}
          disabled={this.state.clearDisabled}
        >
          <Image style={styles.btnClearIcon} source={clearIcon} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#F4F4F4",
    justifyContent: "center"
  },
  searchInput: {
    paddingVertical: 14,
    flex: 1,
    paddingLeft: 28,
    paddingRight: 25,
    fontSize: 16,
    color: colors.secondary,
    fontFamily: "Quicksand-Medium"
  },
  searchIcon: {
    width: 20,
    height: 20,
    zIndex: -1,
    position: "absolute"
  },
  btnClear: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "flex-end",
    width: 30,
    height: 46,
    right: 0,
    top: 0,
    padding: 4
  },
  btnClearIcon: {
    width: 12,
    height: 12
  },
  btnClearDisabled: {
    opacity: 0
  }
});
