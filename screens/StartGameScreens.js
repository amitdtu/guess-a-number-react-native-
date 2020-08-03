import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions
} from "react-native";
import Card from "../components/Card";
import Color from "../constant/color";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import TitleText from "../components/TitleText";
import MyButton from "../components/MyButton";

export default function StartGameScreens(props) {
  const [enteredNum, setEnteredNum] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNum, setSelectedNum] = useState("");

  const inputChangeHandler = (textInput) => {
    console.log(textInput);
    setEnteredNum(textInput.replace(/[^0-9]/g, ""));
  };

  const resetHandler = () => {
    setEnteredNum("");
  };

  const confirmHandler = () => {
    let choosenNum = parseInt(enteredNum);
    if (isNaN(choosenNum) || choosenNum < 0 || choosenNum > 99) {
      Alert.alert("Invalid Number", "Number should be in between 1 and 100", [
        { text: "Okay", style: "destructive", onPress: resetHandler },
      ]);
      return;
    }
    setConfirmed(true);
    setEnteredNum("");
    setSelectedNum(choosenNum);
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.numberCard}>
        <Text>You selected</Text>
        <NumberContainer>{selectedNum}</NumberContainer>
        <MyButton onPress={() => props.onGameStart(selectedNum)}>
          START GAME
        </MyButton>
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <TitleText style={styles.title}>Start a new game </TitleText>
        <Card style={styles.inputContainer}>
          <Text>Select a Number </Text>
          <Input
            style={styles.input}
            keyboardType="number-pad"
            blurOnSubmit
            maxLength={2}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={inputChangeHandler}
            value={enteredNum}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={resetHandler}
                color={Color.secondary}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmHandler}
                color={Color.primary}
              />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: "80%",
    minWidth: 300,
    maxWidth: "95%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    width: Dimensions.get('window').width / 4,
  },
  input: {
    width: 50,
    textAlign: "center",
  },
  numberCard: {
    marginTop: 20,
    alignItems: "center",
  },
});
