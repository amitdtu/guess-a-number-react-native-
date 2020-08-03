import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Color from "../constant/color";

const NumberContainer = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderColor: Color.secondary,
    borderWidth: 2,
    marginVertical: 10,
  },
  text: {
    fontSize: 22,
    color: Color.secondary,
  },
});

export default NumberContainer;
