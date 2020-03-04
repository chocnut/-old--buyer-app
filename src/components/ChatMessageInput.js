import * as React from 'react';
import { TextInput, View, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import colors from "../constants/Colors";

export default class ChatMessageInput extends React.Component {
  render() {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <TouchableOpacity style={styles.btn} onPress={this.props.onPress} title='Attachment' activeOpacity={0.6}>
                    <Image style={styles.btnIcon} source={require('../../assets/images/paperclip-icon.png')} />
                </TouchableOpacity>
                <TextInput
                    style={styles.messageInput}
                    placeholder="Message"
                />
                <TouchableOpacity style={[styles.btn, styles.btnSendDisabled]} onPress={this.props.onPress} title='Send' activeOpacity={0.6} disabled={true}>
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
    color: colors.graphite,
    flex: 1,
  },
});
