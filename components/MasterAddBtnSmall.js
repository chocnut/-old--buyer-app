import React from 'react';
import { TouchableOpacity, StyleSheet, Text, ImageBackground, View } from 'react-native';

export default class MasterAddBtnSmall extends React.Component {
    render() {
        return (
            <TouchableOpacity style={styles.btn} onPress={this.props.onPress} title={this.props.title} activeOpacity={1}>
                <Text style={styles.text}>{this.props.title}</Text>
                <ImageBackground style={styles.imageContainer} source={this.props.image} title={this.props.title} imageStyle={styles.image}/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    btn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 4,
        paddingVertical: 10,
        width: 160
    },
    text: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'QuicksandBold',
        textAlign: 'right',
        width: 100,
        marginRight: 15,
        marginTop: -3
    },
    imageContainer: {
        backgroundColor: 'white',
        borderRadius: 22,
        width: 44,
        height: 44,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 22,
        marginRight: 3
    },
    image: {
        resizeMode: 'contain',
        width: 22,
        height: 22,
        left: 11,
        top: 11
    }
});
