import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Color from "../constant/color";

export default function MyButton(props) {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    backgroundColor: Color.primary,
  },
  text: {
    fontFamily: "open-sans",
    color: "white",
  },
});
