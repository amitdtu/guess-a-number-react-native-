import React from "react";
import { Text, StyleSheet } from "react-native";

export default function TitleText(props) {
  return (
    <Text style={{ ...styles.text, ...props.style }}>{props.children}</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
});
