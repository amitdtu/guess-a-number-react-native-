import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import StartGameScreens from "./screens/StartGameScreens";
import GameScreen from "./screens/GameScreen";
import GameOver from "./screens/GameOver";
import * as Font from "expo-font";
import { AppLoading } from "expo";

const fetchFonts = () => {
  Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [rounds, setRounds] = useState(0);
  const [dataLoaded, setDataloaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataloaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const startGameHandler = (selectedNum) => {
    setUserNumber(selectedNum);
  };

  const configureNewGame = () => {
    setRounds(0);
    setUserNumber(null);
  };

  const gameOverHandler = (numOfRounds) => {
    setRounds(numOfRounds);
  };

  let currentScreen = <StartGameScreens onGameStart={startGameHandler} />;

  if (userNumber && rounds <= 0) {
    currentScreen = (
      <GameScreen userChoice={userNumber} gameOver={gameOverHandler} />
    );
  } else if (rounds > 0) {
    currentScreen = (
      <GameOver
        rounds={rounds}
        number={userNumber}
        restartGame={configureNewGame}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {currentScreen}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
