import React from 'react';
import Modal from 'react-native-modal';
import colors from '../constants/Colors';
import Btn from './Btn'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';

export default class AlertModal extends React.Component {

    renderButtons () {
        let secondary = null
        if (this.props.secondaryText) {
            secondary = <Btn secondary onPress={this.props.onClose} title={this.props.secondaryText} width={120} >{ this.props.secondaryText }</Btn>
        }

        return (<View style={styles.buttons}>
            { secondary }
            <Btn
                onPress={this.props.onAccept}
                title={this.props.btnText}
                width={this.props.secondaryText ? 120 : 140}
            >
                { this.props.btnText }
            </Btn>
        </View>)
    }

    renderCloseBtn = () => {
        if (!this.props.allowClose) return null
        return (
            <TouchableOpacity activeOpacity={1} onPress={this.props.onCancel} style={styles.closeBtnContainer}>
                <Image style={styles.closeBtn} source={require('../assets/images/close_dark.png')}/>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <Modal
                animationIn="zoomIn"
                backdropColor={colors.graphite}
                isVisible={this.props.isVisible}
                animationInTiming={400}
                animationOutTiming={600}
                onBackdropPress={this.props.onCancel}
            >
                <View style={styles.container}>
                    <View style={styles.body}>
                        {this.renderCloseBtn()}

                        <Image source={this.props.image} style={styles.img}/>
                        <Text style={styles.title}>{ this.props.title }</Text>
                        <Text style={styles.text}>{ this.props.body }</Text>

                        { this.renderButtons() }
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        height: '100%',
        width: '100%',
        justifyContent: 'center'
    },
    body: {
        backgroundColor: 'white',
        borderRadius: 12,
        minHeight: 100,
        paddingHorizontal: 20,
        paddingVertical: 17,
        alignItems: 'center',
        position: 'relative'
    },
    img: {
        width: 95,
        height: 120,
        resizeMode: 'contain',
        marginTop: 25,
        marginBottom: 0
    },
    title: {
        fontSize: 24,
        fontFamily: 'QuicksandMedium',
        color: colors.graphite,
        textAlign: 'center',
        marginTop: 17
    },
    text: {
        fontSize: 13,
        fontFamily: 'QuicksandRegular',
        color: colors.graphite,
        textAlign: 'center',
        marginTop: 17,
        marginBottom: 37
    },
    buttons: {
        flexDirection: 'row',
        paddingHorizontal: 14
    },
    closeBtnContainer: {
        width: 50,
        height: 50,
        position: 'absolute',
        right: 0,
        top: 0,
        paddingVertical: 20,
        paddingHorizontal: 15
    },
    closeBtn: {
        width: 14,
        height: 14
    }
});
