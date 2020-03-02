import React from "react";
import { observer } from "mobx-react";
import {
  StyleSheet,
  View,
  Keyboard,
  Animated,
  Button,
  Platform,
  InputAccessoryView
} from "react-native";
import DetailRow from "../../components/DetailRow";
import CountryPicker from "../../components/CountryPicker";
import numeral from "numeral";

@observer
export default class RequestWizard_Details extends React.Component {
  constructor(props) {
    super(props);
    this.marginTop = new Animated.Value(0);
  }

  state = {
    request: this.props.request,
    editingPrice: false,
    editingQuantity: false,
    countryPickerPosition: 320,
    scrollViewFlex: 0
  };

  onFocus = (key, bool) => {
    this.setState({ [key]: bool });

    if (key === "editingQuantity") {
      const y = bool ? -150 : 0;
      Animated.timing(this.marginTop, { toValue: y, duration: 350 }).start();
    }

    this.props._enableSwipe(!bool);
  };

  formatPrice = val => {
    if (this.state.editingPrice) {
      if (!val || !val.length || val === "$") return "";
      return "$" + val.replace(/\$/g, "");
    }

    if (val && val !== "$") {
      val = Math.round(100 * val) / 100;
      const num = numeral(val);
      return num.format("$0,0[.]00");
    }
  };

  formatQuantity = val => {
    if (this.state.editingQuantity) {
      if (!val) return "";
      return String(val);
    }

    if (val) {
      val = Math.round(val);
      return numeral(val).format("0,0");
    }
  };

  _onLayout = event => {
    const y = event.nativeEvent.layout.y;
    this.setState({ countryPickerPosition: y });
  };

  toggleMode = countryPickerActive => {
    Keyboard.dismiss();
    this.props._enableSwipe(!countryPickerActive);

    return new Promise((resolve, reject) => {
      if (countryPickerActive) {
        // this.refs.scroller.scrollTo({x: 0, y: 0, animated: true})
      }
      setTimeout(() => {
        this.setState({ scrollViewFlex: countryPickerActive ? 1 : 0 });
        countryPickerActive
          ? this.props._keyboardDidShow()
          : this.props._keyboardDidHide();
        resolve();
      }, 300);
    });
  };

  renderAccessoryView = inputAccessoryViewID => {
    if (Platform.OS === "ios") {
      return (
        <InputAccessoryView nativeID={inputAccessoryViewID}>
          <View style={styles.keyboardHeader}>
            <Button onPress={Keyboard.dismiss} title="Done" />
          </View>
        </InputAccessoryView>
      );
    }

    return null;
  };

  render() {
    const request = this.props.request;
    const transform = [{ translateY: this.marginTop }];
    const inputAccessoryViewID = "uniqueID";

    return (
      <Animated.View
        style={[
          styles.container,
          { flex: this.state.scrollViewFlex, transform }
        ]}
      >
        <DetailRow
          label="Description"
          icon={require("../../assets/images/chat.png")}
          value={request.description}
          onChange={val => this.props.onChange("description", val)}
          placeholder="What is important to you about this product?"
          name="row1"
          multiline={true}
          inputAccessoryViewID={inputAccessoryViewID}
        />

        <DetailRow
          label="Target price"
          icon={require("../../assets/images/wallet.png")}
          value={this.formatPrice(request.target_price)}
          onChange={val => this.props.onChange("target_price", val)}
          keyboard="numeric"
          placeholder="What is the ideal cost per unit?"
          onFocus={() => this.onFocus("editingPrice", true)}
          onBlur={() => this.onFocus("editingPrice", false)}
          limitType="currency"
          name="row2"
          inputAccessoryViewID={inputAccessoryViewID}
        />

        <DetailRow
          label="Quantity"
          icon={require("../../assets/images/packaging.png")}
          value={this.formatQuantity(request.quantity)}
          onChange={val => this.props.onChange("quantity", val)}
          keyboard="number-pad"
          placeholder="How many units do you want to order?"
          onFocus={() => this.onFocus("editingQuantity", true)}
          onBlur={() => this.onFocus("editingQuantity", false)}
          limitType="integer"
          name="row3"
          inputAccessoryViewID={inputAccessoryViewID}
        />

        <View id="positionMarker" onLayout={this._onLayout}></View>

        <CountryPicker
          label="Delivery"
          icon={require("../../assets/images/tracking.png")}
          value={request.delivery_country}
          onChange={val => this.props.onChange("delivery_country", val)}
          placeholder="Where will this order be delivered?"
          positionY={this.height}
          startingPoint={this.state.countryPickerPosition}
          onActivate={() => this.toggleMode(true)}
          onDeActivate={() => this.toggleMode(false)}
        />

        {this.renderAccessoryView(inputAccessoryViewID)}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    justifyContent: "flex-start",
    position: "relative"
  },
  keyboardHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    backgroundColor: "#fafafa",
    borderTopWidth: 1,
    borderTopColor: "#FBFBFB"
  }
});
