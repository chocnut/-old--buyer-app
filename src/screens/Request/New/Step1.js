import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import EewooInput from "../../../components/EewooInput";
import PickerModal from "react-native-picker-modal-view";
import countries from "../../../utils/countries";

export default function Step1() {
  const { register, setValue, getValues } = useFormContext();

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
        const { country } = getValues();
        return country;
      } else {
        return value.Name;
      }
    }
    const { country } = getValues();
    return country;
  };

  useEffect(() => {
    register("productName", { required: true, min: 8 });
    register("description", { required: true, min: 8 });
    register("country", { required: true, min: 8 });
    register("countryCode");
  }, [register]);

  return (
    <>
      <EewooInput
        label="Product Name"
        placeholder="Enter your request name"
        onChange={text => setValue("productName", text)}
        error={null}
        autoCapitalize="words"
      />
      <EewooInput
        label="Description"
        multiline
        placeholder="Describe all necessary features you need"
        onChange={text => setValue("description", text)}
        error={null}
      />
      <PickerModal
        renderSelectView={(disabled, selected, showModal) => {
          let value = getSelected(selected);
          if (value && value.length === 2) {
            value = findCountryName(value);
          }

          return (
            <EewooInput
              label="Delivery Location"
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
        onSelected={({ Value }) => setValue("country", Value)}
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
                  source={require("../../../../assets/images/close_dark.png")}
                ></Image>
              </TouchableOpacity>
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

      {/* <View style={styles.countryPicker}>
        <CountryPicker
          withFlag={false}
          withFilter={false}
          withAlphaFilter={false}
          visible={showCountryPicker}
          onClose={() => setShowCountryPicker(false)}
          onSelect={({ name, cca2 }) => {
            setValue("country", name);
            setValue("countryCode", cca2);
          }}
          preferredCountries={["GB"]}
        />
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  countryPicker: {
    opacity: 0
  }
});
