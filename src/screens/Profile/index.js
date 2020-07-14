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
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/user/user.actions";

import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

const Profile = ({ navigation }) => {
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [images, setImages] = useState([]);
  const [images64, setImages64] = useState([]);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

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

  const handleChange = (name, value) => {
    dispatch(updateUser({ [name]: value }));
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
      <ScrollView
        contentContainerStyle={styles.form}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.uploadButtonContainer}>
          <TouchableOpacity activeOpacity={1} onPress={handleUpload}>
            {user.image_file ? (
              <Image
                style={styles.avatar}
                source={{
                  uri: `https://suppliers.eewoo.io/storage/media/App/User/${user.image_file}`
                }}
              />
            ) : (
              <Image
                source={require("../../../assets/images/avatar-upload.png")}
              />
            )}
          </TouchableOpacity>
          {user.image_path && (
            <TouchableOpacity
              style={styles.editIcon}
              activeOpacity={1}
              onPress={handleUpload}
            >
              <Image
                style={styles.editPencil}
                source={require("../../../assets/images/edit-icon.png")}
              />
            </TouchableOpacity>
          )}
        </View>
        <EewooInput
          label="Full Name"
          placeholder="Full Name"
          value={user.name}
          onChange={e => handleChange("name", e)}
          error={null}
        />
        <EewooInput
          label="Email"
          placeholder="Email address"
          value={user.email}
          onChange={e => handleChange("email", e)}
          keyboard="email-address"
          error={null}
          returnKeyType="next"
          textContentType="username"
        />
        <EewooInput
          label="Location"
          placeholder="Choose your country"
          onChange={e => handleChange("location", e)}
          onFocus={() => setShowCountryPicker(true)}
          error={null}
          value={user.location}
        />
        <EewooInput
          label="Bio"
          multiline
          placeholder="Bio"
          onChange={e => handleChange("bio", e)}
          value={user.bio}
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
              dispatch(updateUser({ location: name }));
              dispatch(updateUser({ countryCode: cca2 }));
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
  form: {
    flex: 1,
    paddingHorizontal: 16
  },
  uploadButtonContainer: {
    position: "relative",
    top: 30,
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
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: "hidden"
  },
  editIcon: {
    borderWidth: 1,
    borderColor: "#F03758",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    backgroundColor: "#F03758",
    borderRadius: 50,
    position: "relative",
    top: -50,
    right: -50
  },
  editPencil: {
    width: 26,
    height: 26
  }
});

export default Profile;
