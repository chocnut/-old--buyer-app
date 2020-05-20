import React, { useEffect, useState } from "react";
import CountryPicker from "react-native-country-picker-modal";
import { useFormContext } from "react-hook-form";
import { View, Text, StyleSheet } from "react-native";

import EewooInput from "../../../components/EewooInput";

export default function Step1() {
  const [showCountryPicker, setShowCountryPicker] = useState(false);

  const { register, setValue, getValues } = useFormContext();

  const { country } = getValues();

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
      />
      <EewooInput
        label="Description"
        multiline
        placeholder="Describe all necessary features you need"
        onChange={text => setValue("description", text)}
        error={null}
      />
      <Text>Delivery Location</Text>
      <EewooInput
        label="Choose your country"
        placeholder="Choose your country"
        onChange={() => false}
        onFocus={() => setShowCountryPicker(true)}
        error={null}
        value={country}
      />
      <View style={styles.countryPicker}>
        <CountryPicker
          withFlag={false}
          withFilter={true}
          visible={showCountryPicker}
          onClose={() => setShowCountryPicker(false)}
          onSelect={({ name, cca2 }) => {
            setValue("country", name);
            setValue("countryCode", cca2);
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  countryPicker: {
    opacity: 0
  }
});
