import React from "react";
import {
  StyleSheet,
  View,
  ViewPropTypes,
  Text,
  PanResponder,
  TouchableOpacity,
  Animated,
  Keyboard
} from "react-native";
import PropTypes from "prop-types";
import layout from "../constants/Layout";
const width = layout.window.width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent"
  },
  sliderContainer: {
    backgroundColor: "transparent",
    overflow: "hidden",
    position: "relative",
    flex: 1
  },
  controlsWrapperStyle: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "space-between",
    right: 0,
    bottom: 0,
    padding: 10
  },
  dotsWrapperStyle: {
    alignItems: "center",
    justifyContent: "center"
  },
  activeDotStyle: {
    backgroundColor: "#007aff",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  dotStyle: {
    backgroundColor: "rgba(0,0,0,.2)",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  prevButtonStyle: {
    color: "#777777"
  },
  nextButtonStyle: {
    color: "#007aff"
  }
});

export default class Swiper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
      activeIndex: props.index
    };

    this.pan = new Animated.ValueXY();
    this._animatedValueX = this.state.width * this.state.activeIndex * -1;
  }

  _animatedValue = new Animated.Value(0);

  _panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => this.props.enableSwipe,
    onPanResponderMove: (evt, gestureState) => {},
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
      if (this.props.enableSwipe) {
        if (Math.abs(gestureState.vy < 1)) {
          if (gestureState.vx >= 0.5) {
            if (this.state.activeIndex >= 1)
              this.moveUpDown(this.state.activeIndex - 1);
          } else if (gestureState.vx <= -0.5) {
            if (this.state.activeIndex <= 2)
              this.moveUpDown(this.state.activeIndex + 1);
          }
        }
      }
    },
    onPanResponderTerminate: (evt, gestureState) => {}
  });

  moveUpDown(index) {
    this._fixState();
    this.props.gotoView(index);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.index !== this.props.index) {
      this._fixState();
      this._changeIndex(newProps.index);
    }
  }

  _onLayout(event) {
    const { width, height } = event.nativeEvent.layout;
    this.setState({ width, height }, () => this._fixState());
  }

  _fixState() {
    this._animatedValueX = this.state.width * this.state.activeIndex * -1;
    this.pan.setValue({ x: this._animatedValueX, y: 0 });
  }

  _changeIndex(index) {
    if (!!this.props.onIndexChanged) this.props.onIndexChanged(index);
    this._animatedValueX = this.state.width * index * -1;
    const move = { x: this._animatedValueX, y: 0 };
    Animated.timing(this.pan, { toValue: move, duration: 400 }).start();
    this.setState({ activeIndex: index });
    Keyboard.dismiss();
  }

  renderControls() {
    const { activeIndex } = this.state;
    const {
      direction,
      controlsWrapperStyle,
      dotsWrapperStyle,
      dotElement,
      dotStyle,
      activeDotElement,
      activeDotStyle,
      prevButtonElement,
      prevButtonStyle,
      prevButtonText,
      nextButtonElement,
      nextButtonStyle,
      nextButtonText,
      children
    } = this.props;

    const is_last = activeIndex === this.count - 1;

    if (is_last) return null;

    return (
      <View
        style={[
          styles.controlsWrapperStyle,
          { flexDirection: direction },
          direction === "row" ? { left: 0 } : { top: 0 },
          ...controlsWrapperStyle
        ]}
      >
        <TouchableOpacity
          disabled={!activeIndex}
          style={{ opacity: !activeIndex ? 0 : 1 }}
          onPress={() => this.moveUpDown(this.state.activeIndex - 1)}
        >
          {prevButtonElement || (
            <Text style={[styles.prevButtonStyle, prevButtonStyle]}>
              {prevButtonText}
            </Text>
          )}
        </TouchableOpacity>

        <View
          style={[
            { flexDirection: direction },
            styles.dotsWrapperStyle,
            dotsWrapperStyle
          ]}
        >
          {children.map((el, i) => {
            {
              if (i === children.length - 1) return null;
            }
            return (
              <View key={i}>
                {i === activeIndex
                  ? activeDotElement || (
                      <View style={[styles.activeDotStyle, activeDotStyle]} />
                    )
                  : dotElement || <View style={[styles.dotStyle, dotStyle]} />}
              </View>
            );
          })}
        </View>

        <TouchableOpacity onPress={() => this.moveUpDown(activeIndex + 1)}>
          {nextButtonElement || (
            <Text style={[styles.nextButtonStyle, nextButtonStyle]}>
              {nextButtonText}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { width, height } = this.state;
    const pan = this.pan;
    const {
      direction,
      containerStyle,
      swipeAreaStyle,
      swipeWrapperStyle
    } = this.props;

    let { children } = this.props;
    if (!Array.isArray(children)) children = [children];

    this.count = children.length;

    return (
      <View
        style={[styles.container, containerStyle]}
        onLayout={this._onLayout.bind(this)}
      >
        <View
          style={[styles.sliderContainer, swipeAreaStyle]}
          {...this._panResponder.panHandlers}
        >
          <Animated.View
            style={[
              {
                position: "relative",
                top: 0,
                left: 0
              },
              swipeWrapperStyle,
              {
                flexDirection: direction,
                width: direction === "row" ? width * this.count : width,
                height: direction === "row" ? height : height * this.count
              },
              { transform: [{ translateX: pan.x }, { translateY: pan.y }] }
            ]}
          >
            {children.map((el, i) => (
              <View key={i} style={{ width, height }}>
                {el}
              </View>
            ))}
          </Animated.View>

          {this.renderControls()}
        </View>
      </View>
    );
  }
}

Swiper.propTypes = {
  direction: PropTypes.oneOf(["row", "column"]),
  index: PropTypes.number,
  onIndexChanged: PropTypes.func,
  actionMinWidth: PropTypes.number,
  children: PropTypes.node.isRequired,
  containerStyle: ViewPropTypes.style,
  swipeAreaStyle: ViewPropTypes.style,
  swipeWrapperStyle: ViewPropTypes.style,
  controlsWrapperStyle: ViewPropTypes.style,
  dotsWrapperStyle: ViewPropTypes.style,
  dotStyle: ViewPropTypes.style,
  dotElement: PropTypes.element,
  activeDotStyle: ViewPropTypes.style,
  activeDotElement: PropTypes.element,
  prevButtonStyle: Text.propTypes.style,
  prevButtonElement: PropTypes.element,
  prevButtonText: PropTypes.string,
  nextButtonStyle: Text.propTypes.style,
  nextButtonElement: PropTypes.element,
  nextButtonText: PropTypes.string,
  enableSwipe: PropTypes.bool
};

Swiper.defaultProps = {
  direction: "row",
  index: 0,
  actionMinWidth: 0.25,
  prevButtonText: "prev",
  nextButtonText: "next",
  enableSwipe: true
};
