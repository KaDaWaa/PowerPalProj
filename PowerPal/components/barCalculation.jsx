import React, { useEffect, useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Switch,
  ScrollView,
} from "react-native";
import { Platform } from "react-native";
export default function BarCalculation() {
  const [weightInput, setWeightInput] = useState("");
  const [barWeight, setBarWeight] = useState(20);
  const [redPlate, setRedPlate] = useState(0);
  const [bluePlate, setBluePlate] = useState(0);
  const [yellowPlate, setYellowPlate] = useState(0);
  const [greenPlate, setGreenPlate] = useState(0);
  const [whitePlate, setWhitePlate] = useState(0);
  const [blackPlate, setBlackPlate] = useState(0);
  const [greyPlate, setGreyPlate] = useState(0);
  const [totalWeight, setTotalWeight] = useState(barWeight);
  const [redSwitch, setRedSwitch] = useState(true);
  const [blueSwitch, setBlueSwitch] = useState(true);
  const [yellowSwitch, setYellowSwitch] = useState(true);
  const [greenSwitch, setGreenSwitch] = useState(true);
  const [whiteSwitch, setWhiteSwitch] = useState(true);
  const [blackSwitch, setBlackSwitch] = useState(true);
  const [greySwitch, setGreySwitch] = useState(true);

  const plateWidths = {
    red: 7,
    blue: 7,
    yellow: 7,
    green: 7,
    white: 7,
    black: 7,
    grey: 5,
  };

  const plateLoadingBarWidth = 150; // Width of the plate loading bar

  useEffect(() => {
    // Calculate the plates needed to load the bar
    const calculatePlates = () => {
      const weight = parseFloat(weightInput) || 0;
      const effectiveWeight = weight - barWeight;
      let remainingWeight = effectiveWeight;

      if (effectiveWeight <= 0) {
        setRedPlate(0);
        setBluePlate(0);
        setYellowPlate(0);
        setGreenPlate(0);
        setWhitePlate(0);
        setBlackPlate(0);
        setGreyPlate(0);
        setTotalWeight(barWeight);
      } else {
        let totalPlateWidth = 0;
        let maxPlates = plateLoadingBarWidth / plateWidths.red;

        if (remainingWeight >= 50 && redSwitch) {
          let plates = Math.floor(remainingWeight / 50);
          totalPlateWidth += plates * plateWidths.red;
          if (totalPlateWidth > plateLoadingBarWidth) {
            plates = Math.floor(maxPlates);
            totalPlateWidth = plateLoadingBarWidth;
          }
          setRedPlate(plates);
          remainingWeight -= plates * 50;
        } else {
          setRedPlate(0);
        }
        maxPlates = (plateLoadingBarWidth - totalPlateWidth) / plateWidths.blue;

        if (remainingWeight >= 40 && blueSwitch) {
          let plates = Math.floor(remainingWeight / 40);
          totalPlateWidth += plates * plateWidths.blue;
          if (totalPlateWidth > plateLoadingBarWidth) {
            plates = Math.floor(maxPlates);
            totalPlateWidth = plateLoadingBarWidth;
          }
          setBluePlate(plates);
          remainingWeight -= plates * 40;
        } else {
          setBluePlate(0);
        }
        maxPlates =
          (plateLoadingBarWidth - totalPlateWidth) / plateWidths.yellow;

        if (remainingWeight >= 30 && yellowSwitch) {
          let plates = Math.floor(remainingWeight / 30);
          totalPlateWidth += plates * plateWidths.yellow;
          if (totalPlateWidth > plateLoadingBarWidth) {
            plates = Math.floor(maxPlates);
            totalPlateWidth = plateLoadingBarWidth;
          }
          setYellowPlate(plates);
          remainingWeight -= plates * 30;
        } else {
          setYellowPlate(0);
        }
        maxPlates =
          (plateLoadingBarWidth - totalPlateWidth) / plateWidths.green;

        if (remainingWeight >= 20 && greenSwitch) {
          let plates = Math.floor(remainingWeight / 20);
          totalPlateWidth += plates * plateWidths.green;
          if (totalPlateWidth > plateLoadingBarWidth) {
            plates = Math.floor(maxPlates);
            totalPlateWidth = plateLoadingBarWidth;
          }
          setGreenPlate(plates);
          remainingWeight -= plates * 20;
        } else {
          setGreenPlate(0);
        }
        maxPlates =
          (plateLoadingBarWidth - totalPlateWidth) / plateWidths.white;

        if (remainingWeight >= 10 && whiteSwitch) {
          let plates = Math.floor(remainingWeight / 10);
          totalPlateWidth += plates * plateWidths.white;
          if (totalPlateWidth > plateLoadingBarWidth) {
            plates = Math.floor(maxPlates);
            totalPlateWidth = plateLoadingBarWidth;
          }
          setWhitePlate(plates);
          remainingWeight -= plates * 10;
        } else {
          setWhitePlate(0);
        }
        maxPlates =
          (plateLoadingBarWidth - totalPlateWidth) / plateWidths.black;

        if (remainingWeight >= 5 && blackSwitch) {
          let plates = Math.floor(remainingWeight / 5);
          totalPlateWidth += plates * plateWidths.black;
          if (totalPlateWidth > plateLoadingBarWidth) {
            plates = Math.floor(maxPlates);
            totalPlateWidth = plateLoadingBarWidth;
          }
          setBlackPlate(plates);
          remainingWeight -= plates * 5;
        } else {
          setBlackPlate(0);
        }
        maxPlates = (plateLoadingBarWidth - totalPlateWidth) / plateWidths.grey;

        if (remainingWeight >= 2.5 && greySwitch) {
          let plates = Math.floor(remainingWeight / 2.5);
          totalPlateWidth += plates * plateWidths.grey;
          if (totalPlateWidth > plateLoadingBarWidth) {
            plates = Math.floor(maxPlates);
            totalPlateWidth = plateLoadingBarWidth;
          }
          setGreyPlate(plates);
          remainingWeight -= plates * 2.5;
        } else {
          setGreyPlate(0);
        }
        setTotalWeight(effectiveWeight - remainingWeight + barWeight);
      }
    };
    calculatePlates();
  }, [
    weightInput,
    redSwitch,
    blueSwitch,
    yellowSwitch,
    greenSwitch,
    whiteSwitch,
    blackSwitch,
    greySwitch,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableWithoutFeedback
          onPress={Platform.OS != "web" ? Keyboard.dismiss : null}
        >
          <View style={styles.content}>
            <Text style={styles.title}>Load The Bar</Text>
            <Text style={[styles.title, { fontSize: 16, fontWeight: "500" }]}>
              Choose Plates
            </Text>
            <View style={styles.switchesContainer}>
              <View style={styles.switchContainer}>
                <Text>Red</Text>
                <Switch
                  value={redSwitch}
                  onValueChange={() => setRedSwitch(!redSwitch)}
                  trackColor={{ false: "#fff", true: "red" }}
                  style={
                    Platform.OS != "web"
                      ? {
                          shadowColor: "red",
                          shadowOffset: { width: 0, height: 0 },
                          shadowOpacity: 0.8,
                          shadowRadius: 3,
                          elevation: 5,
                        }
                      : {}
                  }
                />
              </View>
              <View style={styles.switchContainer}>
                <Text>Blue</Text>
                <Switch
                  value={blueSwitch}
                  onValueChange={() => setBlueSwitch(!blueSwitch)}
                  trackColor={{ false: "#fff", true: "blue" }}
                  style={
                    Platform.OS != "web"
                      ? {
                          shadowColor: "blue",
                          shadowOffset: { width: 0, height: 0 },
                          shadowOpacity: 0.8,
                          shadowRadius: 3,
                          elevation: 5,
                        }
                      : {}
                  }
                />
              </View>
              <View style={styles.switchContainer}>
                <Text>Yellow</Text>
                <Switch
                  value={yellowSwitch}
                  onValueChange={() => setYellowSwitch(!yellowSwitch)}
                  trackColor={{ false: "#fff", true: "yellow" }}
                  style={
                    Platform.OS != "web"
                      ? {
                          shadowColor: "yellow",
                          shadowOffset: { width: 0, height: 0 },
                          shadowOpacity: 0.8,
                          shadowRadius: 3,
                          elevation: 5,
                        }
                      : {}
                  }
                />
              </View>
              <View style={styles.switchContainer}>
                <Text>Green</Text>
                <Switch
                  value={greenSwitch}
                  onValueChange={() => setGreenSwitch(!greenSwitch)}
                  trackColor={{ false: "#fff", true: "green" }}
                  style={
                    Platform.OS != "web"
                      ? {
                          shadowColor: "Green",
                          shadowOffset: { width: 0, height: 0 },
                          shadowOpacity: 0.8,
                          shadowRadius: 3,
                          elevation: 5,
                        }
                      : {}
                  }
                />
              </View>
              <View style={styles.switchContainer}>
                <Text>White</Text>
                <Switch
                  value={whiteSwitch}
                  onValueChange={() => setWhiteSwitch(!whiteSwitch)}
                  trackColor={{ false: "#fff", true: "#eee" }}
                  thumbColor={whiteSwitch ? "#333" : "#fff"}
                  style={
                    Platform.OS != "web"
                      ? {
                          shadowColor: "#eee",
                          shadowOffset: { width: 0, height: 0 },
                          shadowOpacity: 0.8,
                          shadowRadius: 3,
                          elevation: 5,
                        }
                      : {}
                  }
                />
              </View>
              <View style={styles.switchContainer}>
                <Text>Black</Text>
                <Switch
                  value={blackSwitch}
                  onValueChange={() => setBlackSwitch(!blackSwitch)}
                  trackColor={{ false: "#fff", true: "black" }}
                  style={
                    Platform.OS != "web"
                      ? {
                          shadowColor: "black",
                          shadowOffset: { width: 0, height: 0 },
                          shadowOpacity: 0.8,
                          shadowRadius: 3,
                          elevation: 5,
                        }
                      : {}
                  }
                />
              </View>
              <View style={styles.switchContainer}>
                <Text>Grey</Text>
                <Switch
                  value={greySwitch}
                  onValueChange={() => setGreySwitch(!greySwitch)}
                  trackColor={{ false: "#fff", true: "#777" }}
                  style={
                    Platform.OS != "web"
                      ? {
                          shadowColor: "grey",
                          shadowOffset: { width: 0, height: 0 },
                          shadowOpacity: 0.8,
                          shadowRadius: 3,
                          elevation: 5,
                        }
                      : {}
                  }
                />
              </View>
            </View>
            <View style={styles.barContainer}>
              <View style={styles.bar}></View>
              <View style={styles.barRing} />
              <View style={styles.platesContainer}>
                <View style={styles.plateLoadingBar} />
                {[...Array(redPlate)].map((_, index) => (
                  <View key={index} style={[styles.plate, styles.redPlate]} />
                ))}
                {[...Array(bluePlate)].map((_, index) => (
                  <View key={index} style={[styles.plate, styles.bluePlate]} />
                ))}
                {[...Array(yellowPlate)].map((_, index) => (
                  <View
                    key={index}
                    style={[styles.plate, styles.yellowPlate]}
                  />
                ))}
                {[...Array(greenPlate)].map((_, index) => (
                  <View key={index} style={[styles.plate, styles.greenPlate]} />
                ))}
                {[...Array(whitePlate)].map((_, index) => (
                  <View key={index} style={[styles.plate, styles.whitePlate]} />
                ))}
                {[...Array(blackPlate)].map((_, index) => (
                  <View key={index} style={[styles.plate, styles.blackPlate]} />
                ))}
                {[...Array(greyPlate)].map((_, index) => (
                  <View key={index} style={[styles.plate, styles.greyPlate]} />
                ))}
              </View>
            </View>
            <View style={styles.weightInputContainer}>
              <Text style={styles.setText}>Enter Weight</Text>
              <TextInput
                keyboardType="numeric"
                style={styles.weightInput}
                value={weightInput}
                onChangeText={(val) => setWeightInput(val)}
                onBlur={Keyboard.dismiss}
                maxLength={6}
              />
              <Text style={styles.setText}>KG</Text>
            </View>
            <Text style={styles.weightText}>
              {totalWeight} KG |{" "}
              {Math.floor(parseFloat(totalWeight) * 2.20462262)} LB
            </Text>

            <View style={styles.plateSummary}>
              <Text style={styles.summaryTitle}>Set of Plates Needed</Text>

              <Text style={styles.plateSummaryText}>Bar</Text>

              {redPlate > 0 ? (
                <Text style={styles.plateSummaryText}>Red: {redPlate}</Text>
              ) : null}

              {bluePlate > 0 ? (
                <Text style={styles.plateSummaryText}>Blue: {bluePlate}</Text>
              ) : null}
              {yellowPlate > 0 ? (
                <Text style={styles.plateSummaryText}>
                  Yellow: {yellowPlate}
                </Text>
              ) : null}
              {greenPlate > 0 ? (
                <Text style={styles.plateSummaryText}>Green: {greenPlate}</Text>
              ) : null}
              {whitePlate > 0 ? (
                <Text style={styles.plateSummaryText}>White: {whitePlate}</Text>
              ) : null}
              {blackPlate > 0 ? (
                <Text style={styles.plateSummaryText}>Black: {blackPlate}</Text>
              ) : null}
              {greyPlate > 0 ? (
                <Text style={styles.plateSummaryText}>Grey: {greyPlate}</Text>
              ) : null}
            </View>
            <Text style={styles.quickMaths}>
              <Text style={[styles.quickMaths, { fontWeight: "bold" }]}>
                {" "}
                Quick Maths:
              </Text>{" "}
              20{redPlate > 0 ? "+" + parseFloat(redPlate) * 2 + "x25" : ""}
              {bluePlate > 0 ? "+" + parseFloat(bluePlate) * 2 + "x20" : ""}
              {yellowPlate > 0 ? "+" + parseFloat(yellowPlate) * 2 + "x15" : ""}
              {greenPlate > 0 ? "+" + parseFloat(greenPlate) * 2 + "x10" : ""}
              {whitePlate > 0 ? "+" + parseFloat(whitePlate) * 2 + "x5" : ""}
              {blackPlate > 0 ? "+" + parseFloat(blackPlate) * 2 + "x2.5" : ""}
              {greyPlate > 0 ? "+" + parseFloat(greyPlate) * 2 + "x1.25" : ""} ≈
              {totalWeight} KG
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    paddingTop: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#C74E53",
  },
  barContainer: {
    height: 150,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  bar: {
    width: 100,
    height: 10,
    backgroundColor: "#eee",
    borderWidth: 1,
    borderEndWidth: 0,
    borderColor: "#333",
  },
  barRing: {
    height: 25,
    width: 8,
    backgroundColor: "#ccc",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 2,
  },
  platesContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  plateLoadingBar: {
    width: 150,
    height: 18,
    backgroundColor: "#ccc",
    borderWidth: 1,
    borderColor: "#333",
    borderEndEndRadius: 2,
    borderTopEndRadius: 2,
    position: "absolute",
    zIndex: -1,
    borderLeftWidth: 0,
  },
  plate: {
    borderWidth: 1,
    borderColor: "#333",
    width: 7,
    borderRadius: 2,
  },
  redPlate: {
    backgroundColor: "red",
    height: 130,
  },
  bluePlate: {
    backgroundColor: "blue",
    height: 130,
  },
  yellowPlate: {
    backgroundColor: "yellow",
    height: 115,
  },
  greenPlate: {
    backgroundColor: "green",
    height: 100,
  },
  whitePlate: {
    backgroundColor: "white",
    height: 70,
  },
  blackPlate: {
    backgroundColor: "#222",
    height: 55,
  },
  greyPlate: {
    backgroundColor: "grey",
    height: 40,
    width: 5,
  },
  weightText: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  setText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  plateSummary: {
    flexDirection: "column",
    justifyContent: "center",
    width: "80%",
    backgroundColor: "#efefef",
    padding: 10,
    height: 120,
    marginVertical: 10,
    maxHeight: 200,
    borderRadius: 10,
    flexWrap: "wrap",
  },
  plateSummaryText: {
    fontSize: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  quickMaths: {
    fontSize: 16,
    marginVertical: 20,
  },
  weightInput: {
    width: "30%",
    height: 40,
    backgroundColor: "#efefef",
    borderRadius: 5,
    paddingHorizontal: 20,
    marginVertical: 10,
    textAlign: "center",
    marginHorizontal: 10,
  },
  weightInputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  switchesContainer: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  switchContainer: {
    flexDirection: "column",
    alignItems: "center",
    margin: 10,
  },
});
