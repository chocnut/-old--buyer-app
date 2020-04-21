import React, { useState } from "react";
import {
  Button,
  Image,
  View,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width; //full width

export default function() {
  const [images, setImages] = useState([]);

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL
      );
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return Promise.reject();
      }
      return Promise.resolve;
    }
  };

  const pickImage = async () => {
    try {
      await getPermissionAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });
      if (!result.cancelled) {
        setImages(prevState => [result.uri, ...prevState]);
      }

      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      {images &&
        images.map((image, i) => (
          <Image
            key={i}
            source={{ uri: image }}
            style={styles.imageContainer}
          />
        ))}
      <TouchableOpacity
        style={styles.btnUploadImage}
        onPress={pickImage}
        activeOpacity={0.8}
      >
        <Image
          source={require("../../../../assets/images/plus.png")}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: width
  },
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    marginRight: 12,
    width: 105,
    height: 105,
    backgroundColor: "#FDFDFD",
    borderWidth: 1,
    borderColor: "#F4F4F4",
    borderRadius: 9
  },
  btnUploadImage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    width: 105,
    height: 105,
    backgroundColor: "#FDFDFD",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#F4F4F4",
    borderRadius: 9
  },
  icon: {
    width: 24.38,
    height: 24.38
  }
});
