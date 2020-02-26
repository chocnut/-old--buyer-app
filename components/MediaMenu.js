import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import colors from '../constants/Colors';

export default class MediaMenu extends React.Component {
  constructor (props) {
    super(props)
    this.needsLargeFooter = props.deviceIsIphoneX
  };

  render() {
    return (
        <Modal
            animationIn="slideInUp"
            backdropColor={colors.graphite}
            isVisible={this.props.visible}
            animationInTiming={400}
            animationOutTiming={200}
            onBackdropPress={this.props.onClose}
            style={{ padding: 0, margin: 0 }}
            >
                <View style={[ styles.container, this.needsLargeFooter && {paddingBottom: 30} ]}>
                    <View style={styles.header}>
                        <Text style={styles.heading} >Add from...</Text>
                        <TouchableOpacity activeOpacity={1} style={styles.closeContainer} onPress={this.props.onClose}>
                            <Image source={require('../assets/images/close_dark.png')} style={styles.close}/>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity activeOpacity={1} style={styles.btn} onPress={this.props.addMediaFromCamera}>
                        <Image source={require('../assets/images/camera_icon.png')} style={styles.icon} />
                        <Text style={styles.text} >Camera</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={1} style={styles.btn} onPress={this.props.addMediaFromLibrary}>
                        <Image source={require('../assets/images/image.png')} style={styles.icon} />
                        <Text style={styles.text} >Photo library</Text>
                    </TouchableOpacity>
                </View>
        </Modal>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignSelf: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%'
    },
    header: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    heading: {
        color: colors.graphite,
        fontSize: 18,
        fontFamily: 'QuicksandBold',
        paddingHorizontal: 10
    },
    closeContainer: {
        padding: 20,
        marginRight: -20
    },
    close: {
        width: 18,
        height: 18
    },
    btn: {
        paddingHorizontal: 6,
        paddingVertical: 25,
        borderTopWidth: 1,
        borderColor: '#F1F1F1',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    icon: {
        width: 21,
        height: 21,
        resizeMode: 'contain',
        marginRight: 22
    },
    text: {
        color: colors.graphiteOpacity,
        fontSize: 14,
        fontFamily: 'QuicksandBold'
    }
})
