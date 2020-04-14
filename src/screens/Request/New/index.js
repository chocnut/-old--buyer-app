import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import CountryPicker from "react-native-country-picker-modal";

import Layout from "../../../constants/Layout";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setNextStep } from "../../../redux/request/wizard/wizard.actions";
import EewooInput from "../../../components/EewooInput";
import Btn from "../../../components/Btn";

const titleTop = () => {
  return Layout.window.height > 667
    ? (Layout.window.height / 100) * 8
    : (Layout.window.height / 100) * 6;
};

const titleBottom = () => {
  return Layout.window.height > 667
    ? (Layout.window.height / 100) * 8
    : (Layout.window.height / 100) * 6;
};

const NewRequest = ({ navigation }) => {
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const { register, handleSubmit, setValue, getValues, errors } = useForm();
  const dispatch = useDispatch();
  const { country } = getValues();

  console.log(errors);
  useEffect(() => {
    register("productName", { required: true, min: 8 });
    register("description", { required: true, min: 8 });
    register("country", { required: true, min: 8 });
  }, [register]);

  const onSubmit = data => {
    console.log(data);
    dispatch(setNextStep(2));
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <EewooInput
          label="Product Name"
          placeholder="Enter your request name"
          onChange={text => setValue("productName", text)}
          error={null}
        />
        <EewooInput
          label="Description"
          placeholder="Describe all necessary features you need"
          onChange={text => setValue("description", text)}
          error={null}
        />
        <Text style={styles.title}>Delivery Location</Text>
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
            withFilter={false}
            visible={showCountryPicker}
            onClose={() => setShowCountryPicker(false)}
            onSelect={({ name }) => setValue("country", name)}
          />
        </View>
        <View style={styles.btnContainer}>
          <Btn onPress={handleSubmit(onSubmit)} title="Continue" width={192}>
            Continue
          </Btn>
        </View>

        <StatusBar barStyle="dark-content" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  btnContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignSelf: "center",
    marginBottom: 36
  },
  content: {
    flex: 1,
    alignSelf: "center",
    paddingLeft: 16,
    paddingRight: 16,
    width: "100%"
  },
  countryPicker: {
    opacity: 0
  }
});

export default NewRequest;
