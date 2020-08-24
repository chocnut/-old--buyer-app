import React, { useEffect } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";
import { format } from "date-fns";
import HeaderSecondary from "../../../components/HeaderSecondary";
import { useSelector, useDispatch } from "react-redux";
import colors from "../../../constants/Colors";
import Btn from "../../../components/Btn";
import { submitRequest } from "../../../redux/request/wizard/wizard.actions";

const width = Dimensions.get("window").width; //full width

export default function Details({ navigation }) {
  const { form, status } = useSelector(state => state.wizard);
  const dispatch = useDispatch();

  const result = format(new Date(), "dd MMM yyyy");

  const {
    productName,
    description,
    targetPrice,
    quantity,
    images,
    country
  } = form;

  useEffect(() => {
    if (status === "SUCCESS") {
      navigation.navigate("RequestDone");
    }
  }, [status]);

  const handleDraft = () => {
    dispatch(
      submitRequest({
        ...form,
        status: 0
      })
    );
    navigation.push("Main");
  };

  const handleSubmit = () => {
    dispatch(
      submitRequest({
        ...form,
        status: 1
      })
    );
  };

  return (
    <View style={styles.container}>
      <HeaderSecondary
        onPress={() => {
          navigation.navigate("NewRequest");
        }}
        title={productName}
      />
      <View style={styles.form}>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.description}>{description}</Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 30
          }}
        >
          <View
            style={{
              marginRight: 46
            }}
          >
            <Text style={styles.label}>Target Price</Text>
            <Text style={styles.unit}>${targetPrice}</Text>
          </View>

          <View style={{}}>
            <Text style={styles.label}>Units</Text>
            <Text style={styles.unit}>{quantity}</Text>
          </View>
        </View>
        <View style={styles.mediaContainer}>
          <Text style={styles.label}>Media</Text>
          <View style={styles.imageContainer}>
            {images.map((image, i) => (
              <Image
                key={i}
                source={{ isStatic: true, uri: image }}
                style={styles.image}
              />
            ))}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 30
          }}
        >
          <View
            style={{
              marginRight: 46
            }}
          >
            <Text style={styles.label}>Delivery</Text>
            <Text style={styles.unit}>{country}</Text>
          </View>
          <View style={{}}>
            <Text style={styles.label}>Created</Text>
            <Text style={styles.unit}>{result}</Text>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Btn
            secondaryWithBorder
            onPress={handleDraft}
            title="Save To Drafts"
            width={170}
          >
            Save To Drafts
          </Btn>
          <Btn onPress={handleSubmit} title="Submit" width={170}>
            Submit
          </Btn>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  form: {
    flex: 1,
    marginRight: 16,
    marginLeft: 16,
    marginTop: 25,
    marginBottom: 34
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  label: {
    color: colors.graphite,
    fontSize: 14,
    fontFamily: "Quicksand-Bold",
    textTransform: "uppercase"
  },
  description: {
    fontFamily: "Quicksand-Regular",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: 18,
    color: "#555064",
    marginTop: 14
  },
  unit: {
    marginTop: 12,
    fontSize: 13,
    fontFamily: "Quicksand-Regular"
  },
  mediaContainer: {
    marginTop: 30
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: width
  },
  image: {
    width: 105,
    height: 105,
    marginTop: 12,
    marginRight: 15,
    // shadowOffset: "2px 2px 6px",
    // shadowColor: "rgba(85, 80, 100, 0.2)",
    borderRadius: 4
  },
  btnContainer: {
    flexDirection: "row",
    alignSelf: "center",
    position: "absolute",
    bottom: 37
  }
});
