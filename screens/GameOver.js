import React from "react";
import { View, Text, StyleSheet, Button, Image,Dimensions } from "react-native";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Color from "../constant/color";
import successImg from '../assets/success.png'

export default function GameOver(props) {
  const { rounds, number, restartGame } = props;
  return (
    <View style={styles.screen}>
      <TitleText>Game Over</TitleText>
      <View style={styles.imageContainer}>
        <Image
          source={successImg}
          // source={{ uri: "https://picsum.photos/300/300" }}  web images
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.resultContainer}>
        <BodyText style={styles.resultText}>
          Your phone needed <Text style={styles.highlight}> {rounds} </Text> to
          guess the number <Text style={styles.highlight}> {number}</Text>
        </BodyText>
      </View>

      <Button title="RESTART GAME" onPress={restartGame} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.7,
    height:  Dimensions.get('window').width * 0.7,
    borderRadius:  Dimensions.get('window').width * 0.7 / 2,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: Dimensions.get('window').height / 30,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  resultText: {
    fontFamily: "open-sans-bold",
    textAlign: "center",
  },
  highlight: {
    color: Color.secondary,
  },
  resultContainer: {
    marginVertical: 15,
    marginHorizontal:  Dimensions.get('window').width / 40,
  },
});
