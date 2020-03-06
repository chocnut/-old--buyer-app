import "@expo/browser-polyfill";
import * as ExpoPixi from "expo-pixi";
import React, { Component } from "react";
import { Platform, AppState, StyleSheet, View, Image } from "react-native";
import { takeSnapshotAsync } from "expo";
import layout from "../constants/Layout";
import api from "../api";

const isAndroid = Platform.OS === "android";
function uuidv4() {
  //https://stackoverflow.com/a/2117523/4047926
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default class Sketch extends Component {
  state = {
    strokeColor: 0x000000,
    strokeWidth: 12,
    appState: AppState.currentState,
    sketchReady: false,
    sketchWidth: 0,
    sketchHeight: 0
  };

  handleAppStateChangeAsync = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      if (isAndroid && this.sketch) {
        this.setState({
          appState: nextAppState,
          id: uuidv4(),
          lines: this.sketch.lines
        });
        return;
      }
    }
    this.setState({ appState: nextAppState });
  };

  componentDidMount() {
    AppState.addEventListener("change", this.handleAppStateChangeAsync);
    this.addWhenReady();
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChangeAsync);
  }

  componentWillReceiveProps = newProps => {
    if (newProps.resetTrigger !== this.props.resetTrigger) {
      if (this.sketch.stage.children.length > 1) {
        this.sketch.undo();
      }
    }
  };

  addWhenReady = () => {
    if (this.state.sketchReady && this.props.image) {
      this.add();
    }
  };

  async add() {
    try {
      const aspect_ratio = this.props.width / this.props.height;
      const sketchWidth = Math.min(
        layout.window.width,
        this.sketch.renderer.width
      );
      const sketchHeight = Math.round(sketchWidth / aspect_ratio);

      await this.setState({ sketchWidth, sketchHeight });
      await this.sketch.renderer._update();

      this.onChangeAsync();
    } catch (e) {
      console.error(e);
      api.postToSlack(JSON.stringify(e), "Error");
    }
  }

  onChangeAsync = async edited => {
    try {
      const options = {
        format: "jpg",
        quality: 0.8,
        result: "file",
        width: this.props.width,
        height: this.props.height
      };

      const snapshot = await takeSnapshotAsync(this.snapshotContainer, options);
      const layers = this.sketch.stage.children.length;
      this.props.setAnnotatedMedia(
        snapshot,
        edited,
        layers,
        this.props.width,
        this.props.height
      );
    } catch (e) {
      api.postToSlack(JSON.stringify(e), "Error");
    }
  };

  onReady = async () => {
    await this.setState({ sketchReady: true });
    this.addWhenReady();
  };

  render() {
    const screenWidth = layout.window.width;
    const aspect_ratio = this.props.width / this.props.height;
    const width = Math.min(this.props.width, screenWidth);
    const height = width / aspect_ratio;
    const color = "0x" + this.props.color;
    const marginTop = (-height - 10) / 2;
    const uri = this.props.image.uri.replace("file:/data", "file:///data");

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <View
            style={[styles.sketchContainer, { width, height }]}
            ref={ref => (this.snapshotContainer = ref)}
          >
            <ExpoPixi.Sketch
              ref={ref => (this.sketch = ref)}
              style={[styles.sketch, { width, height }]}
              strokeColor={color}
              strokeWidth={this.state.strokeWidth}
              strokeAlpha={1}
              onReady={this.onReady}
              onChange={() => this.onChangeAsync(true)}
              width={width}
              height={height}
            />

            <Image
              source={{ uri }}
              style={[styles.bg_image, { width, height }]}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  sketchContainer: {
    flex: 0,
    position: "relative"
  },
  sketch: {
    flex: 0,
    position: "absolute",
    zIndex: 1
  },
  bg_image: {
    resizeMode: "cover",
    position: "absolute",
    zIndex: 0
  },
  label: {
    width: "100%",
    padding: 5,
    alignItems: "center"
  },
  button: {
    position: "absolute",
    bottom: 8,
    left: 8,
    zIndex: 1,
    padding: 12,
    minWidth: 56,
    minHeight: 48
  }
});
