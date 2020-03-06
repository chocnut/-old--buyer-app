import * as React from 'react';
import { TextInput, View, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import colors from "../constants/Colors";

export default class ChatMessageInput extends React.Component {
  state = {
    disabled: true,
  };
  onChanged = text => {
    const disabled = text.length ? false : true;
    this.setState({disabled: disabled});
  };
  render() {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.btn} onPress={this.props.onPressAttachment} title='Attachment' activeOpacity={0.6}>
                    <Image style={styles.btnIcon} source={require('../../assets/images/paperclip-icon.png')} />
                </TouchableOpacity>
                <TextInput
                    style={styles.messageInput}
                    placeholder="Message"
                    onChangeText={this.onChanged}
                    value={this.props.value}
                />
                <TouchableOpacity style={[styles.btn, this.state.disabled ? styles.btnSendDisabled : {}]} onPress={this.props.onPressSend} title='Send' activeOpacity={0.6} disabled={this.state.disabled}>
                    <Image style={styles.btnIcon} source={require('../../assets/images/send-icon.png')} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#F8F8F8',
    flexDirection: 'row',

  },
  btn: {
    height: 56,
    width: 56,
    padding: 16,
  },
  btnIcon: {
    width: 24,
    height: 24
  },
  btnSendDisabled: {
    opacity: 0
  },
  messageInput: {
    fontSize: 14,
    paddingVertical: 16,
    color: colors.secondary,
    flex: 1,
    fontFamily: "Quicksand-Bold",
  },
});
