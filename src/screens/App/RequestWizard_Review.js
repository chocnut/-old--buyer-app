import React from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import colors from "../../constants/Colors";
import MediaThumbnail from "../../components/MediaThumbnail";
import Btn from "../../components/Btn";
import moment from "moment";
import utils from "../../utils";

@observer
export default class RequestWizard_Review extends React.Component {
  onSave = async () => {
    try {
      await this.props.onSave();
    } catch (e) {
      console.log(e);
    }
  };

  onSend = async () => {
    try {
      await this.props.onSend();
    } catch (e) {
      console.log(e);
    }
  };

  viewSection = index => {
    if (!this.props.request.sent_at) {
      this.props.changeView(index);
    }
  };

  renderMedia = () => {
    if (!this.props.request_media || !this.props.request_media.length) {
      return (
        <Text style={[styles.value, styles.placeholder]}>Not provided</Text>
      );
    }

    return (
      <View style={styles.media}>
        {this.props.request_media.map(media => {
          if (media.forDeletion) return null;
          return (
            <MediaThumbnail key={media.id} image={media.attributes.file_uri} />
          );
        })}
      </View>
    );
  };

  renderFooter = request => {
    let footerContent;

    if (request.sent_at) {
      footerContent = (
        <Text style={styles.footerText}>
          SENT ON{" "}
          {moment(request.sent_at)
            .format("DD MMM YYYY")
            .toUpperCase()}
        </Text>
      );
    } else {
      footerContent = (
        <View style={styles.alignCenter}>
          <Btn width={"50%"} onPress={this.onSave} secondary>
            Save as draft
          </Btn>
          <Btn width={"50%"} onPress={this.onSend}>
            Send to agent
          </Btn>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.footer,
          this.props.deviceIsIphoneX && styles.largeFooter
        ]}
      >
        {footerContent}
      </View>
    );
  };

  render() {
    const request = this.props.request;
    const sent = this.props.request.sent_at;
    const placeholders = {
      title: sent ? "Not provided" : "What is the product called?",
      description: sent
        ? "Not provided"
        : "What is important to you about this product?",
      price: sent ? "Not provided" : "What is the ideal cost per unit?",
      quantity: sent ? "Not provided" : "How many units do you want to order?",
      delivery: sent ? "Not provided" : "Where will this order be delivered?"
    };

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <TouchableOpacity
            style={styles.row}
            activeOpacity={1}
            onPress={() => this.viewSection(0)}
          >
            <Text style={styles.label}>
              REQUEST NAME
              <Text style={styles.required}>*</Text>
            </Text>
            <Text style={[styles.value, !request.title && styles.placeholder]}>
              {request.title || placeholders.title}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            activeOpacity={1}
            onPress={() => this.viewSection(1)}
          >
            <Text style={styles.label}>MEDIA</Text>
            {this.renderMedia()}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            activeOpacity={1}
            onPress={() => this.viewSection(2)}
          >
            <Text style={styles.label}>DESCRIPTION</Text>
            <Text
              style={[styles.value, !request.description && styles.placeholder]}
            >
              {request.description || placeholders.description}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            activeOpacity={1}
            onPress={() => this.viewSection(2)}
          >
            <Text style={styles.label}>TARGET PRICE</Text>
            <Text
              style={[
                styles.value,
                !request.target_price && styles.placeholder
              ]}
            >
              {utils.getCurrency(request, placeholders.price)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            activeOpacity={1}
            onPress={() => this.viewSection(2)}
          >
            <Text style={styles.label}>QUANTITY</Text>
            <Text
              style={[styles.value, !request.quantity && styles.placeholder]}
            >
              {utils.getQuantity(request, placeholders.quantity)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.row}
            activeOpacity={1}
            onPress={() => this.viewSection(2)}
          >
            <Text style={styles.label}>DELIVERY</Text>
            <Text
              style={[
                styles.value,
                !request.delivery_country && styles.placeholder
              ]}
            >
              {utils.getCountryCode(request, placeholders.delivery)}
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {this.renderFooter(request)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  scroll: {
    padding: 22,
    paddingRight: 20
  },
  footer: {
    minHeight: 50,
    backgroundColor: "white",
    shadowColor: "#555064",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    justifyContent: "center",
    paddingTop: 4,
    paddingBottom: 0
  },
  largeFooter: {
    minHeight: 65,
    paddingBottom: 15
  },
  row: {
    flexDirection: "row",
    marginBottom: 25
  },
  alignCenter: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
    flexDirection: "row"
  },
  label: {
    fontSize: 13,
    fontFamily: "Quicksand-Bold",
    width: 105,
    marginRight: 20,
    color: colors.graphite
  },
  required: {
    color: colors.red
  },
  value: {
    fontSize: 14,
    fontFamily: "Quicksand-Regular",
    color: colors.graphite,
    flex: 1,
    lineHeight: 20,
    marginTop: -2
  },
  placeholder: {
    color: colors.graphiteOpacity,
    fontFamily: "Quicksand-Regular"
  },
  media: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 0,
    marginRight: -20,
    flex: 1
  },
  footerText: {
    textAlign: "center",
    fontSize: 14,
    color: colors.graphite,
    fontFamily: "Quicksand-Bold",
    paddingBottom: 4
  }
});
