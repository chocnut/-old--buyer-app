import React from 'react';
import { Image } from 'react-native';

export default class HeaderBackground extends React.Component {
  render() {
    return <Image
        source={require('../assets/images/cloud.png')}
        style={{ width: 102, height: 21, position: 'absolute', right: 0, bottom: -3 }}
    />
  }
}
