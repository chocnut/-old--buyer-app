import React, { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  StatusBar
} from "react-native";
import { logout } from "../../services/auth";
import PickerModal from "react-native-picker-modal-view";
import countries from "../../utils/countries";
import HeaderSecondary from "../../components/HeaderSecondary";
import EewooInput from "../../components/EewooInput";
import colors from "../../constants/Colors";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, storeUser } from "../../redux/user/user.actions";
import { uploadAvatar, getUser } from "../../services/user";

import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

const Profile = ({ navigation }) => {
  const user = useSelector(state => state.user);
  const [showSpinner, setShowSpinner] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const dispatch = useDispatch();

  const findCountryName = code => {
    const country = countries.find(c => c.Code === code);
    if (!country) return "";
    return country.Name;
  };

  const getCountries = () => {
    return countries.map(({ Name, Code }) => ({
      Name,
      Value: Code
    }));
  };

  const getSelected = (value = null) => {
    if (value) {
      if (!Object.keys(value).length) {
        // const { country } = getValues();
        // return country;
        return user.location;
      } else {
        return value.Name;
      }
    }
    // const { country } = getValues();
    // return country;
    return user.location;
  };

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
        setShowSpinner(true);
        const { uri } = result;
        const nameParts = uri.split(".");
        const fileType = nameParts[nameParts.length - 1];

        const fileToUpload = {
          name: "avatar",
          uri,
          type: `application/${fileType}`
        };
        await uploadAvatar(fileToUpload);

        const { data } = await getUser();
        dispatch(storeUser(data));
        setShowSpinner(false);
      }
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
        <Spinner
          visible={showSpinner}
          textContent={"Loading..."}
          textStyle={styles.spinnerTextStyle}
        />
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
        <PickerModal
          renderSelectView={(disabled, selected, showModal) => {
            let value = getSelected(selected);
            if (value.length === 2) {
              value = findCountryName(value);
            }

            return (
              <EewooInput
                label="Location"
                placeholder="Choose your country"
                onChange={() => false}
                onFocus={showModal}
                disabled
                value={
                  value ? value.charAt(0).toUpperCase() + value.slice(1) : ""
                }
              />
            );
          }}
          onSelected={({ Value }) => setSelectedCountry("country", Value)}
          onClosed={() => console.log("close")}
          onBackButtonPressed={() => console.log("back")}
          items={getCountries()}
          sortingLanguage={"tr"}
          showToTopButton={true}
          backButtonDisabled
          selected={getSelected()}
          showAlphabeticalIndex={false}
          requireSelection
          autoSort={false}
          renderSearch={onClose => {
            return (
              <View style={{ marginTop: 10, marginBottom: 26 }}>
                <Text
                  style={{
                    position: "absolute",
                    top: 5,
                    alignSelf: "center",
                    fontSize: 16,
                    fontFamily: "Quicksand-Bold",
                    textAlign: "center"
                  }}
                >
                  Location
                </Text>
                <TouchableOpacity onPress={onClose}>
                  <Image
                    style={{
                      top: 10,
                      left: 20,
                      width: 14,
                      height: 14
                    }}
                    source={require("../../../assets/images/close_dark.png")}
                  ></Image>
                </TouchableOpacity>
                <StatusBar barStyle="dark-content" />
              </View>
            );
          }}
          renderListItem={(selected, item) => {
            const mm = getSelected();
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  padding: 16,
                  borderWidth: 1,
                  borderColor: "#F4F4F4"
                }}
              >
                <Text style={{ fontFamily: "Quicksand-Medium", fontSize: 14 }}>
                  {item.Name}
                </Text>
                <View
                  style={{
                    position: "absolute",
                    right: 10,
                    top: 12,
                    borderWidth: 1,
                    borderColor: "#F4F4F4",
                    width: 22,
                    height: 22,
                    borderRadius: 22 / 2
                  }}
                >
                  {mm && item.Value === mm && (
                    <View
                      style={{
                        position: "relative",
                        top: 3,
                        left: 3,
                        backgroundColor: "#F03758",
                        borderWidth: 1,
                        borderColor: "#F03758",
                        width: 14,
                        height: 14,
                        borderRadius: 16 / 2
                      }}
                    ></View>
                  )}
                </View>
              </View>
            );
          }}
        />

        <EewooInput
          label="Bio"
          multiline
          placeholder="Bio"
          // onChange={e => handleChange("bio", e)}
          onChange={() => null}
          value={user.bio}
          error={null}
        />

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
  },
  spinnerTextStyle: {
    color: "#FFF"
  }
});

export default Profile;
