import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import colors from '../constants/Colors';

export default class Tab extends React.Component {
  render() {
    return (
        <TouchableOpacity onPress={this.props.onPress} style={ styles.btn } activeOpacity={1}>
            <Text style={[ styles.text, this.props.selected && styles.selected ]}>{ this.props.children.toUpperCase() }</Text>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    btn: {
        flex: 1,
        height: 40,
        textAlign: 'center',
        position: 'relative'
    },
    text: {
        fontSize: 13,
        color: colors.graphiteOpacity,
        fontFamily: 'QuicksandMedium',
        height: 37,
        textAlign: 'center',
        paddingTop: 11
    },
    selected: {
        color: colors.graphite
    }
});
