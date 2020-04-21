import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { useForm, FormContext } from "react-hook-form";

import Layout from "../../../constants/Layout";

import { useDispatch, useSelector } from "react-redux";
import { setNextStep } from "../../../redux/request/wizard/wizard.actions";

import Btn from "../../../components/Btn";

import Step1 from "./Step1";
import PhotoUpload from "./PhotoUpload";

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
  const methods = useForm();
  const dispatch = useDispatch();

  const { currentStep } = useSelector(state => state.wizard);

  const onSubmit = data => {
    dispatch(setNextStep(currentStep + 1));
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FormContext {...methods}>
          {currentStep === 0 && <Step1 />}
          {currentStep === 1 && <PhotoUpload />}
          <View style={styles.btnContainer}>
            <Btn
              onPress={methods.handleSubmit(onSubmit)}
              title="Continue"
              width={192}
            >
              Continue
            </Btn>
          </View>
        </FormContext>
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
