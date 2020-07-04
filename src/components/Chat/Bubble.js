import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  Linking,
  Button
} from "react-native";

import {
  MessageText,
  MessageImage,
  Time,
  utils
} from "react-native-gifted-chat";

import { Video, Audio } from "expo-av";
import PDFReader from "rn-pdf-reader-js";

import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const { isSameUser, isSameDay } = utils;

const Bubble = props => {
  const isSameThread =
    isSameUser(props.currentMessage, props.previousMessage) &&
    isSameDay(props.currentMessage, props.previousMessage);

  const onLongPress = () => {
    if (props.onLongPress) {
      //   props.onLongPress(context, props.currentMessage)
    } else {
      if (props.currentMessage.text) {
        const options = ["Copy Text", "Cancel"];
        const cancelButtonIndex = options.length - 1;
        //     context.actionSheet().showActionSheetWithOptions(
        //       {
        //         options,
        //         cancelButtonIndex,
        //       },
        //       buttonIndex => {
        //         switch (buttonIndex) {
        //           case 0:
        //             Clipboard.setString(this.props.currentMessage.text)
        //             break
        //         }
        //       },
        //     )
      }
    }
  };

  const renderMessageText = () => {
    if (props.currentMessage.text) {
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

  const renderMessageVideo = () => {
    const { currentMessage } = props;

    if (!currentMessage.video) return null;

    return (
      // <Video
      //   resizeMode="contain"
      //   useNativeControls
      //   shouldPlay={false}
      //   source={{ uri: currentMessage.video }}
      //   style={styles.video}
      // />
      <Video
        source={{
          uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
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

  const renderPDF = src => {
    return (
      <View style={styles.pdf}>
        <PDFReader
          source={{
            uri: src
          }}
        />
      </View>
    );
  };

  const renderFile = () => {
    const { currentMessage } = props;

    if (!currentMessage.file) return null;

    // return (
    //   <View style={styles.pdf}>
    //     <PDFReader
    //       style={styles.pdfReader}
    //       source={{
    //         uri: currentMessage.file
    //       }}
    //     />
    //   </View>
    // );

    return (
      <View style={styles.file}>
        <Button
          title="pdf"
          onPress={() => {
            // Linking.openURL(currentMessage.file);
            renderPDF(currentMessage.file);
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
      {renderTime()}
      {renderTicks()}
    </View>
  );

  return (
    <View style={[styles.container, props.containerStyle]}>
      <TouchableOpacity
        onLongPress={onLongPress}
        accessibilityTraits="text"
        {...props.touchableProps}
      >
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
            {renderMessageVideo()}
            {renderMessageImage()}
            {renderFile()}
            {renderMessageText()}
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
    // marginRight: 60,
    // minHeight: 20,
    // justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingTop: 16,
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderColor: "#F4F4F4",
    width: 281
    // height: 130
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
  pdf: {
    flex: 1,
    justifyContent: "center",
    flex: 1
  }
  // pdfReader: {
  //   width: Dimensions.get("window").width,
  //   height: Dimensions.get("window").height
  // }
});

export default Bubble;
