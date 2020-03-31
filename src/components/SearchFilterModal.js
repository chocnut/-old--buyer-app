import React from "react";
import {Modal} from "react-native";
import colors from "../constants/Colors";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";

const closeIcon = require("../../assets/images/close_dark.png");

export default class SearchFilterModal extends React.Component {
  state = {
    isVisible: false
  }

  componentDidMount() {
    this.setState({isVisible: this.props.isVisible});
  }

  renderCloseBtn = () => {
    if (!this.props.allowClose) return null;
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={()=>{this.onChangeVisibility(false)}}
        style={styles.closeBtn}
      >
        <Image
          style={styles.closeBtnIcon}
          source={closeIcon}
        />
      </TouchableOpacity>
    );
  };

  onChangeVisibility = isVisible => {
    this.props.onChangeVisibility(isVisible);
  };

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.isVisible}
      >
        <View style={styles.backdrop}></View>
        <View style={styles.container}>
          <View style={styles.body}>
            <View style={styles.titleWrap}>
              {this.renderCloseBtn()}
              <Text style={styles.title}>{this.props.title}</Text>
            </View>

            <View style={styles.content}>
              {this.props.children}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
    backgroundColor: colors.graphite,
  },
  body: {
    width: 310,
    backgroundColor: "white",
    borderRadius: 4,
    minHeight: 100,
    alignItems: "stretch",
    position: "relative"
  },
  img: {
    width: 95,
    height: 120,
    resizeMode: "contain",
    marginTop: 25,
    marginBottom: 0
  },
  titleWrap: {
    padding: 12,
    borderBottomColor: '#F4F4F4',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: "Quicksand-Bold",
    color: colors.graphite,
    textAlign: "center",
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text: {
    fontSize: 13,
    fontFamily: "Quicksand-Regular",
    color: colors.graphite,
    textAlign: "center",
  },
  closeBtn: {
    width: 48,
    height: 48,
    position: "absolute",
    right: 0,
    top: 0,
    padding: 10,
    zIndex: 10,
    alignItems: "center",
    justifyContent: 'center'

  },
  closeBtnIcon: {
    width: 12,
    height: 12
  }
});
