import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

export default class TabBarIcon extends React.Component {
  render() {
    return (
        <View style={styles.container}>
          <Image style={styles.image} source={require('../assets/images/nextBtn.png')} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        width: 52,
        height: 52,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: -15,
        padding: 15
    },
    image: {
        width: 22,
        height: 22,
        resizeMode: 'contain'
    }
});
