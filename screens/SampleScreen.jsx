import React, { Component } from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  StyleSheet,
  Animated

} from 'react-native';
import Svg, {
  Circle,
  Ellipse,
  G,
  Text as SVGText,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';

//animated elements
const duration = 200
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default class SampleScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // circle action
      cricleStroke: new Animated.Value(2.5),
      circleSize: new Animated.Value(50),
      circleColor: new Animated.Value(0),

      //
      rippleOpacity: new Animated.Value(0),
      rippleSize: new Animated.Value(0),

    };
  }

  _onClickCircle = () => {
    this._sizeAnimation()
    this._strokeAnimation()
    this._colorAnimation()
    this._rippleSizeAnimation()
    this._rippleOpacityAnimation()
  }

  _sizeAnimation = () => {
    Animated.timing(this.state.circleSize, {

      toValue: 100, //interpolate 
      duration: duration,
    }).start();
  }
  _strokeAnimation = () => {
    Animated.timing(this.state.cricleStroke, {
      toValue: 10,
      duration: duration,
    }).start();
  }
  _colorAnimation = () => {
    Animated.timing(this.state.circleColor, {
      toValue: 100,
      duration: duration,
    }).start();
  }
  _rippleSizeAnimation = () => {
    Animated.timing(this.state.rippleSize, {
      toValue: 200,
      duration: 200,
    }).start();
  }
  _rippleOpacityAnimation = () => {
    Animated.timing(this.state.rippleOpacity, {
      toValue: 100,
      duration:200,
    }).start();
  }
  /************************************
  * Render
  *************************************/
  render() {
    const { cricleStroke, circleSize, circleColor, rippleOpacity, rippleSize } = this.state

    // 色の変遷
    const _interPolateColor = this.state.circleColor.interpolate({
      inputRange: [0, 100],
      outputRange: ['#aa3333', '#3333aa'],
    });

    // サイズ
    const _interPolateSize = this.state.circleSize.interpolate({
      inputRange: [0, 90, 100],
      outputRange: [10, 70, 60],
    });

    // 波紋
    const _interPolateRippleColor = this.state.rippleOpacity.interpolate({
      inputRange: [0,  100],
      outputRange: [0.5, 0],
    });


    // 波紋を発生させたい
    // opacityy -0 から 80〜また0
    // sircle sizeを0から200まで
    // colorは一定でOk


    return (
      <SafeAreaView style={styles.container}>
        <View
          style={[
            StyleSheet.absoluteFill, // 画面のフルサイズに広げる
            { alignItems: 'center', justifyContent: 'center', backgroundColor: '#dddddd' },
          ]}
        >
          <Svg height="300" width="300" viewBox="0 0 300 300" style={{ backgroundColor: "#999" }}>
            <AnimatedCircle
              onPress={this._onClickCircle}
              cx="150"
              cy="150"
              r={_interPolateSize}
              stroke="blue"
              strokeWidth={cricleStroke}
              // fill="green"
              fill={_interPolateColor}
            />


            <AnimatedCircle
              onPress={this._onClickCircle}
              cx="150"
              cy="150"
              r={rippleSize}
              stroke="blue"
              strokeWidth={20}
              fill="blue"
              
              opacity={_interPolateRippleColor}

            />

          </Svg>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    height: 64,
    width: 200,
    marginTop: 16,
    padding: 16,
    borderColor: 'gray',
    borderWidth: 1,
  },
});
