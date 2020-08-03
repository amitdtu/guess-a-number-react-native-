import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Color from "../constant/color";
import TitleText from "../components/TitleText";
export default function Header(props) {
  return (
    <View style={[styles.header]}>
      <TitleText style={styles.headerText}>{props.title}</TitleText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.primary,
  },
  headerText: {
    fontSize: 22,
  },
});
