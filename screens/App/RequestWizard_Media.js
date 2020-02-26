import React from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import {
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import EmptyState from "../../components/EmptyState";
import Colors from "../../constants/Colors";
import FastImage from "react-native-fast-image-expo";

@observer
export default class RequestWizard_Media extends React.Component {
  renderImages = () => {
    const images = toJS(this.props.images);

    if (!images || !images.length) {
      return (
        <EmptyState
          image={require("../../assets/images/photo.png")}
          heading="Add media"
          body="Add images & videos to help agents know what you would like them to source."
          backgroundImage
          imageStyle={{ marginTop: 110 }}
        />
      );
    }

    return images.map(image => {
      if (image.forDeletion) return null;
      return (
        <TouchableOpacity
          key={image.id}
          style={styles.imgContainer}
          onPress={() => this.props.onClickMedia(image)}
          activeOpacity={1}
        >
          <View style={styles.imgBox}>
            <FastImage
              source={{ uri: image.attributes.file_uri }}
              style={styles.img}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <Text style={styles.description}>
            {image.attributes.description || "No comment added"}
          </Text>
          <TouchableOpacity
            style={styles.trash}
            activeOpacity={1}
            onPress={() => this.props.onDeleteMedia(image)}
          >
            <Image
              style={styles.trashImg}
              source={require("../../assets/images/trash_icon.png")}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      );
    });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {this.renderImages()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 15,
    paddingBottom: 80,
    overflow: "hidden",
    borderRadius: 4
  },
  imgContainer: {
    borderRadius: 4,
    width: "100%",
    marginBottom: 28,
    position: "relative",
    backgroundColor: "white",
    minHeight: 216,
    shadowColor: "#555064",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1
  },
  imgBox: {
    overflow: "hidden",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  img: {
    backgroundColor: "#eee",
    width: "100%",
    height: 180,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4
  },
  trash: {
    position: "absolute",
    top: 164,
    right: 8,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 7
  },
  trashImg: {
    width: 18,
    height: 18,
    resizeMode: "contain"
  },
  description: {
    fontFamily: "QuicksandRegular",
    fontSize: 13,
    color: Colors.graphite,
    paddingLeft: 12,
    paddingRight: 36,
    paddingTop: 12,
    paddingBottom: 15
  }
});
