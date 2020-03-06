import * as React from 'react';
import {Text, View, StyleSheet, Image } from 'react-native';

export default class ChatMessage extends React.Component {
  render() {
    const messageHolderStyle = [styles.messageHolder];
    if (this.props.item.userName == 'Me') {
      messageHolderStyle.push(styles.messageHolderSelf)
    }
    if (this.props.item.lastInGroup && this.props.item.userName != 'Me') {
      messageHolderStyle.push(styles.messageHolderLastInGroup)
    } else if (this.props.item.lastInGroup && this.props.item.userName == 'Me') {
      messageHolderStyle.push(styles.messageHolderSelfLastInGroup)
    }

    let attachment;

    if (this.props.item.attachment && this.props.item.attachment.type == 'pdf') {
      attachment = <Image style={styles.attachmentIcon} source={require('../../assets/images/pdf-icon.png')}/>;
    } else {
      attachment = false;
    }

    const containerStyle = [styles.container];
    if (this.props.item.userName == 'Me') {
      containerStyle.push(styles.containerSelf);
    }
    if (this.props.item.lastInGroup) {
      containerStyle.push(styles.containerLastInGroup);
    }

    return (
      <View style={containerStyle}>
        {this.props.item.userName !== 'Me' &&
        <View style={styles.logoHolder}>
          {this.props.item.lastInGroup &&
            <Image style={styles.logo} source={this.props.item.avatar} />
          }
        </View>}

        <View style={messageHolderStyle}>
          {this.props.item.userName !== 'Me' &&
            <Text style={styles.userName}>{this.props.item.userName}</Text>
          }
          <View style={styles.messageBody}>
            <Text style={styles.message}>
              {attachment}
              {this.props.item.message}
            </Text>
            <Text style={styles.time}>
              {this.props.item.time}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    marginVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: 'white',

  },
  containerSelf: {
    justifyContent: 'flex-end'
  },
  containerLastInGroup: {
    marginBottom: 8
  },
  logoHolder: {
    width: 44,
    marginHorizontal: 8,
  },
  messageHolder: {
    alignSelf: 'stretch',
    flex: 1,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#F4F4F4',
    padding: 16,
    borderRadius: 15,
    marginHorizontal: 8,
    maxWidth: 280
  },
  messageHolderLastInGroup: {
    borderBottomLeftRadius: 0,
  },
  messageHolderSelf: {
    backgroundColor: '#F4F4F4'
  },
  messageHolderSelfLastInGroup: {
    borderBottomRightRadius: 0
},
  messageBody: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  userName: {
    fontFamily: "Quicksand-Bold",
    marginBottom: 6,
    color: '#9996A2',
    fontSize: 14
  },
  message: {
    marginTop: 0,
    flex: 0,
    maxWidth: '100%',
    color: '#555064',
    fontSize: 16,
    flexGrow: 1,
    flexBasis: 'auto',
    fontFamily: "Quicksand-Regular",
  },
  logo: {
    height: 44,
    width: 44,
    borderRadius: 22,
  },
  time: {
    marginLeft: 'auto',
    color: '#9996A2',
    fontSize: 12,
    alignSelf: 'center',
    fontFamily: "Quicksand-Regular",
  },
  attachmentIcon: {
    width: 22,
    height: 29,
    marginRight: 10,
    marginBottom: -8
  }
});
