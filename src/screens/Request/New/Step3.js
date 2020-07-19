import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import EewooInput from "../../../components/EewooInput";
import PickerModal from "react-native-picker-modal-view";
import { TouchableOpacity, View, Image, Text } from "react-native";

export default function Step1() {
  const { register, setValue, getValues } = useFormContext();

  useEffect(() => {
    register("targetPrice", { required: true, min: 1 });
    register("quantity", { required: true, min: 1 });
    register("metric", { required: true, min: 1 });
  }, [register]);

  const getSelected = (value = null) => {
    if (value) {
      if (!Object.keys(value).length) {
        const { metric } = getValues();
        return metric;
      } else {
        return value.Name;
      }
    }
    const { metric } = getValues();
    return metric;
  };

  return (
    <>
      <PickerModal
        renderSelectView={(disabled, selected, showModal) => {
          const value = getSelected(selected);
          return (
            <EewooInput
              label="Metrics"
              placeholder="Select metric type"
              onChange={() => false}
              onFocus={showModal}
              disabled
              value={
                value ? value.charAt(0).toUpperCase() + value.slice(1) : ""
              }
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
                Metrics
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
