import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { useForm, FormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  setNextStep,
  saveFormData
} from "../../../redux/request/wizard/wizard.actions";

import Btn from "../../../components/Btn";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const loaderStyle = percent => {
  let step = 33.3;

  if (percent === 1) {
    step += 33.3;
  } else if (percent === 2) {
    step += 33.3;
  }

  return {
    height: 3,
    width: `${step}%`,
    backgroundColor: "#F03758",
    borderColor: "#F03758",
    transition: "width 0.2s ease-in"
  };
};

const NewRequest = ({ navigation }) => {
  const methods = useForm();
  const dispatch = useDispatch();

  const { currentStep } = useSelector(state => state.wizard);

  const onSubmit = data => {
    console.log(currentStep);
    console.log(data);

    dispatch(saveFormData(data));

    if (currentStep === 2) {
      navigation.navigate("RequestDetails");
    } else {
      dispatch(setNextStep(currentStep + 1));
    }
  };

  return (
    <View style={styles.container}>
      <View style={loaderStyle(currentStep)} />
      <View style={styles.content}>
        <FormContext {...methods}>
          {currentStep === 0 && <Step1 />}
          {currentStep === 1 && <Step2 />}
          {currentStep === 2 && <Step3 />}
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
