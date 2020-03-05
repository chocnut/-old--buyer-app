import React from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity
} from "react-native";
import EewooInput from "../../components/EewooInput";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

@observer
export default class RequestWizard_Title extends React.Component {
  render() {
    return (
      <KeyboardAvoidingView
        behavior="position"
        style={styles.container}
        keyboardVerticalOffset={-100}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={Keyboard.dismiss}
          style={styles.bg}
        >
          <Image
            source={require("../../assets/images/edit.png")}
            style={styles.img}
          />
          <Text style={styles.heading}>Create request</Text>
          <EewooInput
            value={this.props.request.title}
            onChange={val => this.props.onChange("title", val)}
            placeholder="What is the product called?"
            styleObject={{ width: "100%", marginTop: 0 }}
            autoCapitalize="words"
            placeholderError={this.props.showTitleError}
          />
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bg: {
    marginTop: 200,
    paddingBottom: 270,
    paddingHorizontal: 40,
    backgroundColor: "white",
    position: "relative",
    alignItems: "stretch",
    justifyContent: "center"
  },
  img: {
    width: 120,
    height: 120,
    alignSelf: "center",
    resizeMode: "contain",
    marginTop: -100
  },
  heading: {
    textAlign: "center",
    fontSize: 24,
    fontFamily: "Quicksand-Medium",
    color: colors.graphite,
    marginTop: 30,
    marginBottom: -40
  }
});
