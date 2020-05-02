import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions, Image } from "react-native";
import { format } from "date-fns";
import colors from "../../../constants/Colors";
import { fetchMedias } from "../../../services/request";

const width = Dimensions.get("window").width; //full width

function RequestDetails({ attributes, relationships }) {
  const [images, setImages] = useState([]);

  const {
    description,
    target_price,
    quantity,
    delivery_country,
    created_at
  } = attributes;

  const {
    media: {
      links: { related }
    }
  } = relationships;

  const fetchImages = async () => {
    const response = await fetchMedias(related, true);
    console.log(response);
    setImages(response);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
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
          <Text style={styles.unit}>$ {target_price.toFixed(2)}</Text>
        </View>

        <View style={{}}>
          <Text style={styles.label}>Units</Text>
          <Text style={styles.unit}>{quantity}</Text>
        </View>
      </View>
      <View style={styles.mediaContainer}>
        <Text style={styles.label}>Media</Text>
        <View style={styles.imageContainer}>
          {images.length > 0 &&
            images.map((image, i) => (
              <Image
                key={i}
                source={{ isStatic: true, uri: image.attributes.file_uri }}
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
          <Text style={styles.label}>Delivery Location</Text>
          <Text style={styles.unit}>{delivery_country}</Text>
        </View>
        <View
          style={{
            marginRight: 46
          }}
        >
          <Text style={styles.label}>Date Created</Text>
          <Text style={styles.unit}>
            {format(new Date(created_at), "dd MMMM Y")}
          </Text>
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

export default RequestDetails;
