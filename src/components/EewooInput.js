import React from 'react';
import { View, TextInput, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import PropTypes from 'prop-types';
import colors from '../constants/Colors';
const passwordIconVisible = require('../assets/images/eye.png');
const passwordIconInvisible = require('../assets/images/eye-cross.png');

export default class EewooInput extends React.Component {
    constructor(props) {
        super(props);

        this.labelPosition_On = 0
        this.labelPosition_Off = -28
        this.labelPosition = new Animated.Value(this.labelPosition_On)

        this.state = {
            passwordVisible: false,
            hasFocus: false
        }
    }

    togglePasswordVisibility = () => {
        this.setState({
            passwordVisible: !this.state.passwordVisible
        })
    }

    changeLabelPosition = (hasFocus) => {
        const toValue = hasFocus || this.props.value ? this.labelPosition_Off : this.labelPosition_On
        Animated.timing(this.labelPosition, { toValue, duration: 200, useNativeDriver: true }).start()
        this.setState({ hasFocus })

        if (hasFocus && this.props.onFocus) {
            this.props.onFocus()
        }
        else if (!hasFocus && this.props.onBlur) {
            this.props.onBlur()
        }
    }

    getReturnKeyType = () => {
        if (this.props.returnKeyType) return this.props.returnKeyType
        return this.props.multiline ? 'default' : 'done'
    }

    getLabelStyles = () => {
        const labelStyles = [styles.label]

        if (this.props.value || this.state.hasFocus) {
            labelStyles.push(styles.smallLabel)
        }

        if (this.props.error) {
            labelStyles.push(styles.errorLabel)
        }

        return labelStyles
    }

    getInputStyles = () => {
        const inputStyles = [styles.input]

        if (this.props.type && this.props.type === 'password') {
            inputStyles.push(styles.passwordInput)
        }

        if (this.props.styleObject) {
            inputStyles.push(this.props.styleObject)
        }

        if (this.state.hasFocus) {
            inputStyles.push(styles.hasFocus)
        }

        if (this.props.error || this.props.placeholderError) {
            inputStyles.push(styles.hasError)
        }

        return inputStyles
    }

    onChanged = (text) => {
        if (this.props.keyboard === 'numeric' || this.props.keyboard === 'number-pad') {
            let newText = '';
            let numbers = '0123456789';
            const limitType = this.props.limitType

            if (!limitType || limitType !== 'integer') {
                numbers += '.'
            }

            newText = Array.from(text).filter(char => numbers.includes(char)).join('')

            if (limitType && limitType === 'currency') {
                const decimalIndex = newText.lastIndexOf('.')
                if (decimalIndex >= 0) {
                    newText = newText.substr(0, decimalIndex + 3)
                }
            }

            text = newText
        }

        this.props.onChange(text)
    }

    renderPasswordButton = () => {
        if (!this.props.type || this.props.type !== 'password') {
            return null
        }

        const icon = this.state.passwordVisible ? passwordIconVisible : passwordIconInvisible;

        return (
            <TouchableOpacity onPress={this.togglePasswordVisibility} style={styles.toggleBtn} activeOpacity={1}>
                <Image source={icon} style={styles.toggleBtnImg}/>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.container} >
                <Animated.Text style={[...this.getLabelStyles(), { transform: [{ translateY: this.labelPosition }] }]}>
                    { this.props.error || this.props.label }
                </Animated.Text>
                <TextInput
                    style={this.getInputStyles()}
                    onChangeText={this.onChanged}
                    value={this.props.value}
                    autoCapitalize={this.props.autoCapitalize || 'none'}
                    placeholderTextColor={this.props.placeholderError ? colors.red : colors.graphiteOpacity}
                    placeholder={this.props.placeholder}
                    keyboardType={this.props.keyboard || 'default'}
                    secureTextEntry={this.props.type && this.props.type === 'password' && !this.state.passwordVisible}
                    onFocus={() => this.changeLabelPosition(true)}
                    onBlur={() => this.changeLabelPosition(false)}
                    onSubmitEditing={this.props.onSubmitEditing}
                    textAlignVertical="top"
                    multiline={this.props.multiline || false}
                    ref="TextInput"
                    returnKeyType={this.getReturnKeyType()}
                    inputAccessoryViewID={this.props.inputAccessoryViewID || null}
                    textContentType={this.props.textContentType || 'none'}
                />
                <Image />
                { this.renderPasswordButton() }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 60,
        position: 'relative'
    },
    label: {
      color: colors.graphite,
      fontSize: 14,
      fontFamily: 'QuicksandRegular',
      position: 'absolute',
      left: 0,
      top: 10,
      zIndex: -1
    },
    smallLabel: {
        textTransform: 'uppercase',
        fontFamily: 'QuicksandBold'
    },
    whiteLabel: {
        color: 'white'
    },
    errorLabel: {
        color: colors.red,
        textTransform: 'none',
        fontFamily: 'QuicksandBold'
    },
    input: {
      paddingTop: 11,
      paddingBottom: 19,
      borderBottomWidth: 1,
      borderColor: colors.graphiteOpacityFeint,
      color: colors.graphite,
      fontSize: 14,
      fontFamily: 'QuicksandRegular',
      width: '100%',
      letterSpacing: 0.3,
      maxHeight: 200
    },
    hasFocus: {
        borderColor: colors.graphite,
    },
    passwordInput: {
        paddingRight: 40
    },
    hasError: {
        borderColor: colors.red
    },
    hasPlaceholderError: {
        color: colors.red
    },
    toggleBtn: {
        width: 60,
        height: 60,
        position: 'absolute',
        zIndex: 1,
        bottom: -2,
        right: -15,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    toggleBtnImg: {
        width: 34,
        height: 34
    }
});

EewooInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    styleObject: PropTypes.object,
    keyboard: PropTypes.string,
    type: PropTypes.string,
    error: PropTypes.string,
    autoCapitalize: PropTypes.string,
    onSubmitEditing: PropTypes.func
}
