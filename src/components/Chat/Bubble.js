import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Platform,
  Button
} from "react-native";

import * as WebBrowser from "expo-web-browser";

import {
  MessageText,
  MessageImage,
  Time,
  utils
} from "react-native-gifted-chat";

import { Video, Audio } from "expo-av";
import { Dimensions } from "react-native";

const { isSameUser, isSameDay } = utils;

const Bubble = props => {
  const handleOpenFile = async src => {
    let result = await WebBrowser.openBrowserAsync(src);
    setResult(result);
  };

  const isSameThread =
    isSameUser(props.currentMessage, props.previousMessage) &&
    isSameDay(props.currentMessage, props.previousMessage);

  const renderMessageText = () => {
    if (!props.currentMessage.file && props.currentMessage.text) {
      const {
        containerStyle,
        wrapperStyle,
        messageTextStyle,
        ...messageTextProps
      } = props;
      if (props.renderMessageText) {
        return props.renderMessageText(messageTextProps);
      }
      return (
        <MessageText
          {...messageTextProps}
          textStyle={{
            left: [
              styles.standardFont,
              styles.slackMessageText,
              messageTextProps.textStyle,
              messageTextStyle
            ]
          }}
        />
      );
    }
    return null;
  };

  const renderAudio = () => {
    const { currentMessage } = props;

    if (!currentMessage.audio) return null;

    const soundObject = new Audio.Sound();

    const loadAudio = async () => {
      try {
        await soundObject.loadAsync({
          uri: `https://suppliers.eewoo.io/storage/media/App//Models//RequestThreadAttachment/10/${encodeURI(
            currentMessage.audio
          )}`
        });
      } catch (e) {
        console.log("ERROR Loading Audio", e);
      }
    };

    const play = async () => {
      console.log("Playing Messages!");
      const status = await soundObject.playAsync();
      console.log(status);
    };

    const stop = () => {
      console.log("Messages stopped!");
      soundObject.pauseAsync();
    };

    if (currentMessage.audio) {
      loadAudio();
    }

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "blue",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => {
              play();
            }}
          >
            <Text>Play</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              stop();
            }}
          >
            <Text>Stop</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderMessageVideo = () => {
    const { currentMessage } = props;

    if (!currentMessage.video) return null;

    return (
      <Video
        source={{
          uri: `https://suppliers.eewoo.io/storage/media/App//Models//RequestThreadAttachment/10/${encodeURI(
            currentMessage.video
          )}`
        }}
        useNativeControls
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay={false}
        isLooping
        style={{ width: 100, height: 100 }}
      />
    );
  };

  const renderFile = () => {
    const { currentMessage } = props;

    if (!currentMessage.file) return null;
    const {
      containerStyle,
      wrapperStyle,
      messageTextStyle,
      ...messageTextProps
    } = props;

    return (
      <View style={styles.file}>
        <TouchableOpacity>
          <Image source={require("../../../assets/images/pdf-file.png")} />
        </TouchableOpacity>
        <MessageText
          {...messageTextProps}
          textStyle={{
            left: [
              styles.standardFont,
              styles.slackMessageText,
              messageTextProps.textStyle,
              messageTextStyle
            ]
          }}
        />
      </View>
    );
  };

  const renderMessageImage = () => {
    if (props.currentMessage.image) {
      const { containerStyle, wrapperStyle, ...messageImageProps } = props;
      if (props.renderMessageImage) {
        return props.renderMessageImage(messageImageProps);
      }
      return (
        <MessageImage
          {...messageImageProps}
          imageStyle={[styles.slackImage, messageImageProps.imageStyle]}
        />
      );
    }
    return null;
  };

  const renderTicks = () => {
    const { currentMessage } = props;
    if (props.renderTicks) {
      return props.renderTicks(currentMessage);
    }
    if (currentMessage.user._id !== props.user._id) {
      return null;
    }
    if (currentMessage.sent || currentMessage.received) {
      return (
        <View style={[styles.headerItem, styles.tickView]}>
          {currentMessage.sent && (
            <Text style={[styles.standardFont, styles.tick, props.tickStyle]}>
              ✓
            </Text>
          )}
          {currentMessage.received && (
            <Text style={[styles.standardFont, styles.tick, props.tickStyle]}>
              ✓
            </Text>
          )}
        </View>
      );
    }
    return null;
  };

  const renderUsername = () => {
    const username = props.currentMessage.user.name;
    if (username) {
      const { containerStyle, wrapperStyle, ...usernameProps } = props;
      if (props.renderUsername) {
        return props.renderUsername(usernameProps);
      }
      return (
        <Text
          style={[
            styles.standardFont,
            styles.headerItem,
            styles.username,
            props.usernameStyle
          ]}
        >
          {username}
        </Text>
      );
    }
    return null;
  };

  const renderTime = () => {
    if (props.currentMessage.createdAt) {
      const { containerStyle, wrapperStyle, ...timeProps } = props;
      if (props.renderTime) {
        return props.renderTime(timeProps);
      }
      return (
        <Time
          {...timeProps}
          containerStyle={{ left: [styles.timeContainer] }}
          textStyle={{
            left: [
              styles.standardFont,
              styles.headerItem,
              styles.time,
              timeProps.textStyle
            ]
          }}
        />
      );
    }
    return null;
  };

  const renderCustomView = () => {
    if (props.renderCustomView) {
      return props.renderCustomView(props);
    }
    return null;
  };

  const messageHeader = isSameThread ? null : (
    <View style={styles.headerView}>
      {renderUsername()}
      {renderTicks()}
    </View>
  );

  return (
    <View style={[styles.container, props.containerStyle]}>
      <TouchableOpacity accessibilityTraits="text" {...props.touchableProps}>
        <View
          style={[
            styles.wrapper,
            props.wrapperStyle,
            {
              marginLeft: props.currentMessage.user.isCurrentUser ? 78 : 10,
              backgroundColor: props.currentMessage.user.isCurrentUser
                ? "#F4F4F4"
                : "#FFFFFF",
              borderBottomRightRadius: props.currentMessage.user.isCurrentUser
                ? 0
                : 15
            }
          ]}
        >
          <View>
            {renderCustomView()}
            {messageHeader}
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              {renderAudio()}
              {renderMessageVideo()}
              {renderMessageImage()}
              {renderFile()}
              {renderMessageText()}
            </View>
            <View
              style={{
                flex: 1,
                paddingVertical: 5
              }}
            >
              {renderTime()}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  standardFont: {
    fontFamily: "Quicksand-Regular"
  },
  slackMessageText: {
    fontSize: 16,
    lineHeight: 20
  },
  container: {
    flex: 1,
    alignItems: "flex-start"
  },
  wrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderColor: "#F4F4F4",
    width: 315
  },
  username: {
    fontWeight: "bold"
  },
  time: {
    textAlign: "left",
    fontSize: 12
  },
  timeContainer: {
    justifyContent: "flex-end",
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0
  },
  headerItem: {
    marginRight: 10
  },
  headerView: {
    // Try to align it better with the avatar on Android.
    marginTop: Platform.OS === "android" ? -2 : 0,
    flexDirection: "row",
    alignItems: "baseline"
  },
  /* eslint-disable react-native/no-color-literals */
  tick: {
    backgroundColor: "transparent",
    color: "white"
  },
  /* eslint-enable react-native/no-color-literals */
  tickView: {
    flexDirection: "row"
  },
  slackImage: {
    borderRadius: 3,
    marginLeft: 0,
    marginRight: 0
  },
  video: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  buttons: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    flex: 1
  },
  file: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10
  }
});

export default Bubble;
