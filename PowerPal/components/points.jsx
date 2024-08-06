import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import React, { useState } from "react";
import Icon from 'react-native-vector-icons/Entypo';
import { Linking } from "react-native";

export default function Points() {
  const [gender, setGender] = useState("male");
  const [rawOrEquipped, setRawOrEquipped] = useState("raw");
  const [sbdOrBenchOnly, setSbdOrBenchOnly] = useState("sbd");
  const [bodyWeight, setBodyWeight] = useState(0);
  const [total, setTotal] = useState(0);
  const [wilks, setWilks] = useState(0);
  const [GL, setGL] = useState(0);
  const [dots, setDots] = useState(0);
  const [wilks2020, setWilks2020] = useState(0);

  const calculateScores = () => {
    const bw = parseFloat(bodyWeight);
    const tot = parseFloat(total);

    if (isNaN(bw) || isNaN(tot)) {
      alert("Please enter valid numbers for bodyweight and total");
      return;
    }

    // Wilks coefficients for male and female
    const wilksCoefficients = {
      male: [ -216.0475144, 16.2606339, -0.002388645, -0.00113732, 7.01863e-06, -1.291e-08 ],
      female: [ 594.31747775582, -27.23842536447, 0.82112226871, -0.00930733913, 4.731582e-05, -9.054e-08 ]
    };

    // GL coefficients for male and female (use correct coefficients from the PDF)
    const glCoefficients = {
      male: [ 1199.72839, 1025.18162, -0.00921, 0.00061 ],
      female: [ 610.32796, 1045.59282, -0.03048, 0.00089 ]
    };

    // Wilks 2020 coefficients for male and female (these are the same as the original Wilks for demonstration)
    const wilks2020Coefficients = {
      male: [ -216.0475144, 16.2606339, -0.002388645, -0.00113732, 7.01863e-06, -1.291e-08 ],
      female: [ 594.31747775582, -27.23842536447, 0.82112226871, -0.00930733913, 4.731582e-05, -9.054e-08 ]
    };

    const wilksCoef = wilksCoefficients[gender];
    const glCoef = glCoefficients[gender];
    const wilks2020Coef = wilks2020Coefficients[gender];

    const wilksScore = (500 / (wilksCoef[0] + wilksCoef[1] * bw + wilksCoef[2] * Math.pow(bw, 2) + wilksCoef[3] * Math.pow(bw, 3) + wilksCoef[4] * Math.pow(bw, 4) + wilksCoef[5] * Math.pow(bw, 5))) * tot;
    const glScore = (tot * 100) / (glCoef[0] - glCoef[1] * Math.exp(glCoef[2] * bw) + glCoef[3] * Math.pow(bw, 2));
    const wilks2020Score = (500 / (wilks2020Coef[0] + wilks2020Coef[1] * bw + wilks2020Coef[2] * Math.pow(bw, 2) + wilks2020Coef[3] * Math.pow(bw, 3) + wilks2020Coef[4] * Math.pow(bw, 4) + wilks2020Coef[5] * Math.pow(bw, 5))) * tot;

    setWilks(wilksScore.toFixed(2));
    setGL(glScore.toFixed(2));
    setWilks2020(wilks2020Score.toFixed(2));
    
    // DOTS formula
    const dotsScore = (500 / (0.030720 + 0.0000317514 * bw + 0.0000000097927 * Math.pow(bw, 2) - 0.0000000016837 * Math.pow(bw, 3))) * tot;
    setDots(dotsScore.toFixed(2));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.switches}>
        <View style={styles.switch}>
          <TouchableOpacity style={gender == "male" ? styles.switchSelected : styles.switchUnselected} onPress={() => setGender("male")}>
            <Text style={styles.buttonText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity style={gender == "female" ? styles.switchSelected : styles.switchUnselected} onPress={() => setGender("female")}>
            <Text style={styles.buttonText}>Female</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.switch}>
          <TouchableOpacity style={rawOrEquipped == "raw" ? styles.switchSelected : styles.switchUnselected} onPress={() => setRawOrEquipped("raw")}>
            <Text style={styles.buttonText}>Raw</Text>
          </TouchableOpacity>
          <TouchableOpacity style={rawOrEquipped == "equipped" ? styles.switchSelected : styles.switchUnselected} onPress={() => setRawOrEquipped("equipped")}>
            <Text style={styles.buttonText}>Equipped</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.switch}>
          <TouchableOpacity style={sbdOrBenchOnly == "sbd" ? styles.switchSelected : styles.switchUnselected} onPress={() => setSbdOrBenchOnly("sbd")}>
            <Text style={styles.buttonText}>SBD</Text>
          </TouchableOpacity>
          <TouchableOpacity style={sbdOrBenchOnly == "benchOnly" ? styles.switchSelected : styles.switchUnselected} onPress={() => setSbdOrBenchOnly("benchOnly")}>
            <Text style={styles.buttonText}>Bench</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputs}>
        <View style={styles.inputCont}>
          <TextInput style={styles.input} placeholderTextColor={"#e8e8e8"} placeholder="Bodyweight" keyboardType="numeric" onChangeText={(text) => setBodyWeight(text)} />
          <Text style={styles.inputSideText}>KG</Text>
        </View>
        <View style={styles.inputCont}>
          <TextInput style={styles.input} placeholderTextColor={"#e8e8e8"} placeholder="Total" keyboardType="numeric" onChangeText={(text) => setTotal(text)} />
          <Text style={styles.inputSideText}>KG</Text>
        </View>
        <TouchableOpacity style={styles.Button} onPress={calculateScores}><Text style={styles.buttonText}>Calculate</Text></TouchableOpacity>
      </View>
      <View style={styles.resultsContainer}>
        <View style={styles.result}>
          <TouchableOpacity style={styles.resultButton} onPress={() => Linking.openURL("https://en.wikipedia.org/wiki/Wilks_coefficient")}><Icon name="link" size={30} color="red" /></TouchableOpacity>
          <View style={styles.resultsTexts}>
            <Text style={styles.resultText}>Wilks</Text>
            <Text style={[styles.resultScoreText, { color: "red" }]}>{wilks}</Text>
          </View>
        </View>
        <View style={styles.result}>
          <TouchableOpacity style={styles.resultButton} onPress={() => Linking.openURL("https://www.powerlifting.sport/fileadmin/ipf/data/ipf-formula/IPF_GL_Coefficients-2020.pdf")}><Icon name="link" size={30} color="blue" /></TouchableOpacity>
          <View style={styles.resultsTexts}>
            <Text style={styles.resultText}>GL</Text>
            <Text style={[styles.resultScoreText, { color: "blue" }]}>{GL}</Text>
          </View>
        </View>
        <View style={styles.result}>
          <TouchableOpacity style={styles.resultButton} onPress={() => Linking.openURL("https://drive.google.com/drive/mobile/folders/1-0rE_GbYWVum7U1UfpR0XWiFR9ZNbXWJ")}><Icon name="link" size={30} color="green" /></TouchableOpacity>
          <View style={styles.resultsTexts}>
            <Text style={styles.resultText}>DOTS</Text>
            <Text style={[styles.resultScoreText, { color: "green" }]}>{dots}</Text>
          </View>
        </View>
        <View style={styles.result}>
          <TouchableOpacity style={styles.resultButton} onPress={() => Linking.openURL("https://en.wikipedia.org/wiki/Wilks_coefficient#2020_version")}><Icon name="link" size={30} color="#ffd103" /></TouchableOpacity>
          <View style={styles.resultsTexts}>
            <Text style={styles.resultText}>Wilks 2020</Text>
            <Text style={[styles.resultScoreText, { color: "#ffd103" }]}>{wilks2020}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  switches: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  switch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#c8c8c8",
    borderRadius: 10,
    width: "50%",
    height: 40,
    paddingHorizontal: 5,
    paddingVertical: 3,
    margin: 10,
  },
  switchSelected: {
    backgroundColor: "#C74E53",
    borderRadius: 8,
    width: "50%",
    height: "100%",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  switchUnselected: {
    backgroundColor: "#c8c8c8",
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
  inputs: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    height: 40,
    width: "40%",
    backgroundColor: "#c8c8c8",
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 10,
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
  },
  inputCont: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputSideText: {
    color: "Black",
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 5,
  },
  Button: {
    backgroundColor: "#C74E53",
    borderRadius: 10,
    width: "40%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  resultsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 20,
  },
  result: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    borderRadius: 10,
    width: "40%",
    height: 60,
    paddingHorizontal: 5,
    paddingVertical: 3,
    margin: 10,
  },
  resultButton: {
    backgroundColor: "#ccc",
    borderRadius: 50,
    width: 40,
    height: 40,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  resultsTexts: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  resultText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
  },
  resultScoreText: {
    fontSize: 20,
    fontWeight: "500",
  }
});
