import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
} from "react-native";


export default class DashedCloud extends React.Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <ImageBackground
          source={require('../../assets/images/dashed-cloud.png')}
          style={styles.cloud}
        >
          {this.props.children}
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1
  },
  cloud: {
    width: 300,
    height: 191,
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  }
});
