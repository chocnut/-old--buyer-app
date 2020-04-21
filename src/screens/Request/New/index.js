import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import { useForm, FormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setNextStep } from "../../../redux/request/wizard/wizard.actions";

import Btn from "../../../components/Btn";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const NewRequest = () => {
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
