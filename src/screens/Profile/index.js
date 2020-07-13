import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Text
} from "react-native";
import { logout } from "../../services/auth";
import HeaderSecondary from "../../components/HeaderSecondary";
import CountryPicker from "react-native-country-picker-modal";
import EewooInput from "../../components/EewooInput";
import colors from "../../constants/Colors";

import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

const Profile = ({ navigation }) => {
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [images, setImages] = useState([]);
  const [images64, setImages64] = useState([]);

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

  const handleLogout = () => {
    logout();
    navigation.navigate("Welcome");
  };

  const handleUpload = async () => {
    try {
      await getPermissionAsync();
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        base64: true,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });
      if (!result.cancelled) {
        setImages(prevState => [result.uri, ...prevState]);
        setImages64(prevState => [result.base64, ...prevState]);
      }

      console.log(result);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderSecondary
        onPress={() => {
          navigation.goBack();
        }}
        title="Profile"
      />
      <View style={styles.uploadButtonContainer}>
        <TouchableOpacity activeOpacity={1} onPress={handleUpload}>
          <Image source={require("../../../assets/images/avatar-upload.png")} />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.form}
        keyboardShouldPersistTaps="handled"
      >
        <EewooInput
          label="Full Name"
          placeholder="Full Name"
          onChange={() => console.log("onChange")}
          error={null}
        />
        <EewooInput
          label="Email"
          placeholder="Email address"
          value={""}
          onChange={() => console.log("onChange")}
          keyboard="email-address"
          error={null}
          returnKeyType="next"
          textContentType="username"
        />
        <EewooInput
          label="Location"
          placeholder="Choose your country"
          onChange={() => false}
          onFocus={() => setShowCountryPicker(true)}
          error={null}
          value={""}
        />
        <EewooInput
          label="Bio"
          multiline
          placeholder="Bio"
          onChange={() => console.log("onChange")}
          error={null}
        />

        <View style={styles.countryPicker}>
          <CountryPicker
            withFlag={false}
            withFilter={true}
            withLa
            visible={showCountryPicker}
            onClose={() => setShowCountryPicker(false)}
            onSelect={({ name, cca2 }) => {
              setValue("country", name);
              setValue("countryCode", cca2);
            }}
          />
        </View>
        <View style={styles.logOut}>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.logOutText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  countryPicker: {
    opacity: 0
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    flex: 1,
    paddingHorizontal: 16
  },
  uploadButtonContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center"
  },
  logOut: {
    marginTop: 4,
    position: "relative",
    paddingTop: 12,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: colors.graphiteOpacityFeint
  },
  logOutText: {
    color: colors.graphite,
    fontSize: 14,
    fontFamily: "Quicksand-Bold"
  }
});

export default Profile;
