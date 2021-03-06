import * as React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";

export default class ChatRequestBtn extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btn}
          onPress={this.props.onPress}
          activeOpacity={0.6}
        >
          <Image source={{ uri: this.props.data.img }} style={styles.img} />
          <View style={styles.body}>
            <Text style={styles.title} numberOfLines={1}>
              {this.props.data.title}
            </Text>
            <Text style={styles.date}>{this.props.data.date}</Text>
          </View>
          {!this.props.fromInbox && (
            <Image
              source={require("../../assets/images/chevrone-right-icon.png")}
              style={styles.icon}
            />
          )}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    //android
    elevation: 1
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  title: {
    color: "#555064",
    fontSize: 14,
    fontFamily: "Quicksand-Bold"
  },
  date: {
    marginTop: 4,
    fontSize: 14,
    color: "#9996A2",
    fontFamily: "Quicksand-Regular"
  },
  body: {
    flexShrink: 1,
    flexGrow: 1
  },
  img: {
    width: 44,
    height: 44,
    borderRadius: 3,
    marginRight: 12
  },
  icon: {
    width: 8,
    height: 12,
    marginHorizontal: 18
  }
});
