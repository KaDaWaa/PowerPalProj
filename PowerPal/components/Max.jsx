import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { useState } from "react";

export default function Max() {
  const [maxWeight, setMaxWeight] = useState(0);
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const calculateMax = () => {
    const weightInput = parseFloat(weight);
    const repsInput = parseInt(reps);

    if (isNaN(weightInput) || isNaN(repsInput)) {
      setMaxWeight(0);
    } else {
      const max = (100 * weightInput) / (102.78 - 2.78 * repsInput);
      setMaxWeight(max.toFixed(2));
    }
  };
  const openUrl = async () => {
    await Linking.openURL(
      "https://www.scielo.br/j/rbme/a/xQKDKh7yX7YbRjHxXLMnkxM/?format=pdf&lang=en"
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback
          onPress={() => (Platform.OS != "web" ? Keyboard.dismiss() : null)}
        >
          <View style={styles.content}>
            <Text style={styles.title}>What's My Max Weight?</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={weight}
                onChangeText={(text) => setWeight(text)}
                placeholder="Enter Weight"
                keyboardType="numeric"
                maxLength={6}
              />
              <Text style={styles.mul}>X</Text>
              <TextInput
                style={styles.input}
                value={reps}
                onChangeText={(text) => {
                  if (parseInt(text) > 10) text = "10";
                  else if (parseInt(text) == 0) text = "1";
                  setReps(text);
                }}
                placeholder="Reps"
                keyboardType="numeric"
                maxLength={2}
              />
            </View>
            <View>
              <TouchableOpacity style={styles.button} onPress={calculateMax}>
                <Text style={styles.buttonText}>Get Estimated Max</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.resultTextContainer}>
              <Text style={styles.resultText}>{maxWeight}</Text>
            </View>
            <View style={styles.description}>
              <Text style={styles.descriptionTitle}>Formula:</Text>
              <Text style={styles.link} onPress={() => openUrl()}>
                Brzycki Formula
              </Text>
              <Text style={styles.descriptionText}>
                Estimated max is useful to track progress without maxing out and
                it's the best tool for powerlifting.
              </Text>
              <View style={styles.descriptionSeperator} />
              <Text style={styles.descriptionTitle}>Disclaimer:</Text>
              <Text style={styles.descriptionText}>
                This is an estimation, not a guarantee. Always consult a
                professional for accurate results. The higher the reps, the less
                accurate the estimation.
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    //justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: "#C74E53",
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: Platform.OS=="web"?"center":null,
    alignItems: "center",
    width: "80%",
  },
  input: {
    borderRadius: 5,
    width: "auto",
    height: 40,
    marginHorizontal: 5,
    paddingHorizontal: 10,
    backgroundColor: "#eee",
    fontSize: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  mul: {
    fontSize: 20,
    color: "#C74E53",
  },
  button: {
    backgroundColor: "#C74E53",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },

  resultTextContainer: {
    marginTop: 20,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#eee",
    minWidth: 100,
  },
  resultText: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
  },
  description: {
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  descriptionTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: 14,
    textAlign: "center",
  },
  descriptionSeperator: {
    height: 1,
    minWidth: "100%",
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
  link: {
    color: "#C74E53",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
