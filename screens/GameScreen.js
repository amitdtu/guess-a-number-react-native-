import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
  FlatList,
  Dimensions
} from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import { Ionicons } from "@expo/vector-icons";
import MyButton from "../components/MyButton";
import BodyText from "../components/BodyText";

const renderList = (pastGuessLen, itemData) => (
  <View style={styles.listItem}>
    <BodyText>#{pastGuessLen - itemData.index}</BodyText>
    <BodyText>{itemData.item}</BodyText>
  </View>
);

const generatRandomBetween = (min, max, exclude) => {
  const minNum = Math.ceil(min);
  const maxNum = Math.floor(max);

  const rndNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

  if (rndNum === exclude) {
    return generatRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

export default function GameScreen(props) {
  const { userChoice } = props;
  const initialGuess = generatRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);

  const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const nextGuessHndler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie", "You know this is worng", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }
    const nextNum = generatRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNum);
    setPastGuesses((current) => [nextNum.toString(), ...current]);
  };

  useEffect(() => {
    if (currentGuess === userChoice) {
      props.gameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice]);

  return (
    <View style={styles.screen}>
      <Text>Opponent's guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MyButton onPress={nextGuessHndler.bind(this, "lower")}>
          {/* <Ionicons name="md-remove" size={24} color="white" /> */}
          Lower
        </MyButton>
        <MyButton onPress={nextGuessHndler.bind(this, "greater")}>
          Greater
          {/* <Ionicons name="add" size="25" color="white" /> */}
        </MyButton>
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess, index) =>
            renderList(guess, pastGuesses.length - index)
          )}
        </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={pastGuesses}
          renderItem={renderList.bind(this, pastGuesses.length)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 300,
    maxWidth: "80%",
    marginTop: Dimensions.get('window').height > 600 ? 20 : 5
  },
  listContainer: {
    flex: 1,
    width: Dimensions.get('window').width > 300 ? '60%' : '80%' ,
    // paddingTop: 10,
  },
  list: {
    flexGrow: 1,
    // alignItems: "center",
    justifyContent: "flex-end",
  },
  listItem: {
    padding: 10,
    marginVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
