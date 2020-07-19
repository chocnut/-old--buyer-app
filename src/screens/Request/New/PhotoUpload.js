import React, { useState } from "react";
import { Image, View, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Dimensions } from "react-native";
import { connectActionSheet } from "@expo/react-native-action-sheet";

import { saveFormData } from "../../../redux/request/wizard/wizard.actions";

const width = Dimensions.get("window").width; //full width

function PhotoUpload({ showActionSheetWithOptions }) {
  const { form } = useSelector(state => state.wizard);
  const [images, setImages] = useState(form.images || []);
  const [images64, setImages64] = useState(form.images64 || []);
  const dispatch = useDispatch();

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return Promise.reject();
      }
      return Promise.resolve;
    }
  };

  const openCameraPicker = async () => {
    try {
      await Permissions.askAsync(Permissions.CAMERA);
      const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        base64: true
      });

      if (!cancelled) {
        setImages(prevState => [uri, ...prevState]);
        setImages64(prevState => [base64, ...prevState]);
        dispatch(
          saveFormData({
            images: [uri, ...images],
            images64: [base64, ...images64]
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleRemove = index => {
    const newImages = images.splice(0, index);
    const newImages64 = images64.splice(0, index);
    setImages(newImages);
    setImages64(newImages64);
    dispatch(
      saveFormData({
        images,
        images64
      })
    );
  };

  const openImagePicker = async () => {
    try {
      await getPermissionAsync();
      const {
        uri,
        base64,
        cancelled
      } = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        allowsEditing: true,
        aspect: 1
      });

      if (!cancelled) {
        setImages(prevState => [uri, ...prevState]);
        setImages64(prevState => [base64, ...prevState]);
        dispatch(
          saveFormData({
            images: [uri, ...images],
            images64: [base64, ...images64]
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const pickImage = async () => {
    const options = ["Camera", "Photo & Video Library", "Cancel"];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex
      },
      buttonIndex => {
        if (buttonIndex === 1) {
          openImagePicker();
        } else if (buttonIndex == 0) {
          openCameraPicker();
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      {images &&
        images.map((image, i) => (
          <>
            <Image
              key={i}
              source={{ uri: image }}
              style={styles.imageContainer}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleRemove(i)}
            >
              <Image
                source={require("../../../../assets/images/remove.png")}
                style={{
                  backgroundColor: "#ffffff",
                  position: "absolute",
                  left: -35,
                  top: 30,
                  borderRadius: 72 / 2
                }}
              />
            </TouchableOpacity>
          </>
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

export default connectActionSheet(PhotoUpload);
