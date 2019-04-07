import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Animated } from "react-native";

export default class AnimatedField extends Component {
  state = {
    customer_name: null,
    customer_email: null,
    customer_phone_num: null,
    total_cost: null,
    products: [],
    placeholderT: this.props.placeholder
  };
  componentWillMount() {
    this.animation = new Animated.Value(0);
  }

  animateOnFocus = () => {
    Animated.spring(this.animation, {
      toValue: 1,
      tension: 40
    }).start();
    this.setState({ placeholderT: "" });
  };

  render() {
    const animatedOpacity = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: "clamp"
    });
    const animatedTextWidth = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "40%"],
      extrapolate: "clamp"
    });
    const animatedWidth = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["90%", "60%"],
      extrapolate: "clamp"
    });
    return (
      <View style={styles.view1}>
        <Animated.View
          style={{
            width: animatedTextWidth,
            opacity: animatedOpacity,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ color: "black" }}>{this.props.text} :</Text>
        </Animated.View>
        <Animated.View style={{ width: animatedWidth, marginRight: 10 }}>
          <TextInput
            style={styles.Text_Input}
            onChangeText={this.props.onChangeText}
            placeholder={this.state.placeholderT}
            placeholderTextColor={this.props.placeholderC}
            onFocus={this.animateOnFocus}
            keyboardType={this.props.keyboardType}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view1: {
    height: 40,
    flexDirection: "row",
    width: "100%",
    margin: 10,
    justifyContent: "center"
  },
  Text_Input: {
    height: 40,
    width: "100%",
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 1,
    padding: 8,
    backgroundColor: "rgb(238,238,238)"
  }
});
