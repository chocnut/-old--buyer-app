import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import EewooInput from "../../../components/EewooInput";
import PickerModal from "react-native-picker-modal-view";
import { TouchableOpacity, View, Image, Text } from "react-native";

export default function Step1() {
  const { register, setValue } = useFormContext();

  useEffect(() => {
    register("targetPrice", { required: true, min: 1 });
    register("quantity", { required: true, min: 1 });
    register("metric", { required: true, min: 1 });
  }, [register]);

  return (
    <>
      <PickerModal
        renderSelectView={(disabled, selected, showModal) => {
          return (
            <EewooInput
              label="Metrics"
              placeholder="Select metric type"
              onChange={() => false}
              onFocus={showModal}
              disabled={disabled}
              value={selected.Name}
            />
          );
        }}
        onSelected={({ Value }) => setValue("metric", Value)}
        onClosed={() => console.log("close")}
        onBackButtonPressed={() => console.log("back")}
        items={[
          { Name: "Units", Value: "units" },
          { Name: "Meters", Value: "meters" },
          { Name: "Yards", Value: "yards" },
          { Name: "Centimeters", Value: "centimeters" },
          { Name: "Pounds", Value: "pounds" },
          { Name: "Kilograms", Value: "kilograms" },
          { Name: "Grams", Value: "grams" },
          { Name: "Boxes", Value: "boxes" }
        ]}
        sortingLanguage={"tr"}
        showToTopButton={true}
        backButtonDisabled
        selected={""}
        showAlphabeticalIndex={false}
        requireSelection={false}
        autoSort={false}
        renderSearch={({ onClose }) => {
          return (
            <View style={{ marginTop: 10, marginBottom: 26 }}>
              <Text
                style={{
                  position: "absolute",
                  alignSelf: "center",
                  fontSize: 24,
                  fontFamily: "Quicksand-Medium",
                  textAlign: "center"
                }}
              >
                Metrics
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Image
                  style={{
                    top: 2,
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
      />
      <EewooInput
        label="Quantity"
        placeholder="Enter product quantity"
        onChange={text => setValue("quantity", text)}
        error={null}
        keyboard="numeric"
      />
      <EewooInput
        icon="$"
        label="Target Price"
        placeholder="Indicate the desired price"
        onChange={text => setValue("targetPrice", text)}
        error={null}
        keyboard="numeric"
      />
    </>
  );
}
