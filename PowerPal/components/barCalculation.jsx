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
  const [useCollars, setUseCollars] = useState(true);

  const [totalWeight, setTotalWeight] = useState(
    barWeight + useCollars ? 5 : 0
  );
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

  const plateLoadingBarWidth = 150 - (useCollars ? 15 : 0); // Width of the plate loading bar

  useEffect(() => {
    // Calculate the plates needed to load the bar
    const calculatePlates = () => {
      const weight = parseFloat(weightInput) || 0;
      const effectiveWeight = weight - barWeight - (useCollars ? 5 : 0);
      let remainingWeight = effectiveWeight;

      if (effectiveWeight <= 0) {
        setRedPlate(0);
        setBluePlate(0);
        setYellowPlate(0);
        setGreenPlate(0);
        setWhitePlate(0);
        setBlackPlate(0);
        setGreyPlate(0);
        setTotalWeight(barWeight + (useCollars ? 5 : 0));
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
        setTotalWeight(
          effectiveWeight - remainingWeight + barWeight + (useCollars ? 5 : 0)
        );
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
    useCollars,
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableWithoutFeedback
          onPress={Platform.OS != "web" ? Keyboard.dismiss : null}
        >
          <View style={styles.content}>
            <Text style={styles.title}>Load Your Plates</Text>
            <Text style={[styles.title, { fontSize: 16, fontWeight: "500" }]}>
              Choose your accessories
            </Text>
            <View style={styles.switchesContainer}>
              <View style={styles.switchContainer}>
                <Text style={styles.accessoriesText}>Red(25)</Text>
                <Switch
                  value={redSwitch}
                  onValueChange={() => setRedSwitch(!redSwitch)}
                  trackColor={{ false: "#ccc", true: "red" }}
                  activeThumbColor="white"
                  style={
                    Platform.OS != "web"
                      ? {
                          transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
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
                <Text style={styles.accessoriesText}>Blue(20)</Text>
                <Switch
                  value={blueSwitch}
                  onValueChange={() => setBlueSwitch(!blueSwitch)}
                  trackColor={{ false: "#ccc", true: "blue" }}
                  activeThumbColor="white"
                  style={
                    Platform.OS != "web"
                      ? {
                          transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
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
                <Text style={styles.accessoriesText}>Yellow(15)</Text>
                <Switch
                  value={yellowSwitch}
                  onValueChange={() => setYellowSwitch(!yellowSwitch)}
                  trackColor={{ false: "#ccc", true: "yellow" }}
                  activeThumbColor="white"
                  style={
                    Platform.OS != "web"
                      ? {
                          transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
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
                <Text style={styles.accessoriesText}>Green(10)</Text>
                <Switch
                  value={greenSwitch}
                  onValueChange={() => setGreenSwitch(!greenSwitch)}
                  trackColor={{ false: "#ccc", true: "green" }}
                  activeThumbColor="white"
                  style={
                    Platform.OS != "web"
                      ? {
                          transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
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
                <Text style={styles.accessoriesText}>White(5)</Text>
                <Switch
                  value={whiteSwitch}
                  onValueChange={() => setWhiteSwitch(!whiteSwitch)}
                  trackColor={{ false: "#ccc", true: "#eee" }}
                  thumbColor={whiteSwitch ? "#333" : "#fff"}
                  activeThumbColor="white"
                  style={
                    Platform.OS != "web"
                      ? {
                          transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
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
                <Text style={styles.accessoriesText}>Black(2.5)</Text>
                <Switch
                  value={blackSwitch}
                  onValueChange={() => setBlackSwitch(!blackSwitch)}
                  trackColor={{ false: "#ccc", true: "black" }}
                  activeThumbColor="white"
                  style={
                    Platform.OS != "web"
                      ? {
                          transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
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
                <Text style={styles.accessoriesText}>Grey(1.25)</Text>
                <Switch
                  value={greySwitch}
                  onValueChange={() => setGreySwitch(!greySwitch)}
                  trackColor={{ false: "#ccc", true: "#777" }}
                  activeThumbColor="white"
                  style={
                    Platform.OS != "web"
                      ? {
                          transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
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
              <View style={styles.switchContainer}>
                <Text style={styles.accessoriesText}>Collars (5 KG)</Text>
                <Switch
                  value={useCollars}
                  onValueChange={() => setUseCollars(!useCollars)}
                  trackColor={{ false: "#ccc", true: "#eee" }}
                  activeThumbColor="white"
                  style={
                    Platform.OS != "web"
                      ? {
                          transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
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
                {useCollars ? (
                  <View style={styles.collarContainer}>
                    <View style={styles.collarRing} />
                    <View style={styles.collarHandle} />
                  </View>
                ) : null}
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
              <View style={styles.summaryTextContainer}>
                <Text style={styles.summaryTitle}>Set of Plates Needed</Text>
              </View>
              <View style={styles.platesSummaryContainers}>
                <View style={styles.summaryBox}>
                  <View
                    style={[
                      styles.summaryBoxHighlight,
                      { backgroundColor: "#ccc" },
                    ]}
                  />
                  <Text style={styles.summaryBoxText}>
                    {useCollars ? 25 : 20}
                  </Text>
                  <Text style={styles.summaryBoxSubText}>KG</Text>
                  <View style={styles.summaryBoxSeperator} />
                  <Text style={styles.plateSummaryText}>Bar</Text>
                </View>

                {redPlate > 0 ? (
                  <View style={styles.summaryBox}>
                    <View
                      style={[
                        styles.summaryBoxHighlight,
                        { backgroundColor: "red" },
                      ]}
                    />
                    <Text style={styles.summaryBoxText}>25</Text>
                    <Text style={styles.summaryBoxSubText}>KG</Text>
                    <View style={styles.summaryBoxSeperator} />
                    <Text style={styles.plateSummaryText}>{redPlate}</Text>
                  </View>
                ) : null}

                {bluePlate > 0 ? (
                  <View style={styles.summaryBox}>
                    <View
                      style={[
                        styles.summaryBoxHighlight,
                        { backgroundColor: "blue" },
                      ]}
                    />
                    <Text style={styles.summaryBoxText}>20</Text>
                    <Text style={styles.summaryBoxSubText}>KG</Text>
                    <View style={styles.summaryBoxSeperator} />
                    <Text style={styles.plateSummaryText}>{bluePlate}</Text>
                  </View>
                ) : null}
                {yellowPlate > 0 ? (
                  <View style={styles.summaryBox}>
                    <View
                      style={[
                        styles.summaryBoxHighlight,
                        { backgroundColor: "yellow" },
                      ]}
                    />
                    <Text style={styles.summaryBoxText}>15</Text>
                    <Text style={styles.summaryBoxSubText}>KG</Text>
                    <View style={styles.summaryBoxSeperator} />
                    <Text style={styles.plateSummaryText}>{yellowPlate}</Text>
                  </View>
                ) : null}
                {greenPlate > 0 ? (
                  <View style={styles.summaryBox}>
                    <View
                      style={[
                        styles.summaryBoxHighlight,
                        { backgroundColor: "green" },
                      ]}
                    />
                    <Text style={styles.summaryBoxText}>10</Text>
                    <Text style={styles.summaryBoxSubText}>KG</Text>
                    <View style={styles.summaryBoxSeperator} />
                    <Text style={styles.plateSummaryText}>{greenPlate}</Text>
                  </View>
                ) : null}
                {whitePlate > 0 ? (
                  <View style={styles.summaryBox}>
                    <View
                      style={[
                        styles.summaryBoxHighlight,
                        { backgroundColor: "#eee" },
                      ]}
                    />
                    <Text style={styles.summaryBoxText}>5</Text>
                    <Text style={styles.summaryBoxSubText}>KG</Text>
                    <View style={styles.summaryBoxSeperator} />
                    <Text style={styles.plateSummaryText}>{whitePlate}</Text>
                  </View>
                ) : null}
                {blackPlate > 0 ? (
                  <View style={styles.summaryBox}>
                    <View
                      style={[
                        styles.summaryBoxHighlight,
                        { backgroundColor: "#222" },
                      ]}
                    />
                    <Text style={styles.summaryBoxText}>2.5</Text>
                    <Text style={styles.summaryBoxSubText}>KG</Text>
                    <View style={styles.summaryBoxSeperator} />
                    <Text style={styles.plateSummaryText}>{blackPlate}</Text>
                  </View>
                ) : null}
                {greyPlate > 0 ? (
                  <View style={styles.summaryBox}>
                    <View
                      style={[
                        styles.summaryBoxHighlight,
                        { backgroundColor: "grey" },
                      ]}
                    />
                    <Text style={styles.summaryBoxText}>1.25</Text>
                    <Text style={styles.summaryBoxSubText}>KG</Text>
                    <View style={styles.summaryBoxSeperator} />
                    <Text style={styles.plateSummaryText}>{greyPlate}</Text>
                  </View>
                ) : null}
              </View>

              <Text style={[styles.summaryBoxSubText, { bottom: -15 }]}>
                {useCollars ? "Bar+Collars=25" : ""}
              </Text>
            </View>

            <Text style={styles.quickMaths}>
              <Text style={[styles.quickMaths, { fontWeight: "bold" }]}>
                {" "}
                Quick Maths:
              </Text>{" "}
              {useCollars ? "25" : "20"}
              {redPlate > 0 ? "+" + parseFloat(redPlate) * 2 * 25 : ""}
              {bluePlate > 0 ? "+" + parseFloat(bluePlate) * 2 * 20 : ""}
              {yellowPlate > 0 ? "+" + parseFloat(yellowPlate) * 2 * 15 : ""}
              {greenPlate > 0 ? "+" + parseFloat(greenPlate) * 2 * 10 : ""}
              {whitePlate > 0 ? "+" + parseFloat(whitePlate) * 2 * 5 : ""}
              {blackPlate > 0 ? "+" + parseFloat(blackPlate) * 2 * 2.5 : ""}
              {greyPlate > 0
                ? "+" + parseFloat(greyPlate) * 2 * 1.25
                : ""} ≈ {totalWeight} KG
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
    width: "70%",
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
  plateSummary: {
    flexDirection: "column",
    alignItems: "center",
    width: "80%",
    backgroundColor: "#f8f8f8",
    padding: 10,
    height: 150,
    marginVertical: 10,
    borderRadius: 10,
    flexWrap: "wrap",
  },
  plateSummaryText: {
    fontSize: 18,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  summaryTextContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  platesSummaryContainers: {
    flexDirection: "row",
  },
  summaryBox: {
    alignItems: "center",
    flexDirection: "column",
    width: 40,
    height: 65,
  },
  summaryBoxHighlight: {
    width: "100%",
    height: 8,
  },
  summaryBoxText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  summaryBoxSubText: {
    fontSize: 10,
  },
  summaryBoxSeperator: {
    height: 1,
    width: "100%",
    backgroundColor: "#ccc",
  },

  collarContainer: {
    justifyContent: "center",
    height: 35,
  },
  collarRing: {
    height: 35,
    width: 15,
    //position: "relative",
    backgroundColor: "#eee",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 2,
    //zIndex: 0,
    top: 2.5,
  },
  collarHandle: {
    width: 35,
    height: 5,
    backgroundColor: "#eee",
    // position: "relative",
    // alignSelf: "center",
    transform: [{ rotate: "-45deg" }],
    top: -28,
    borderWidth: 1,
    borderColor: "#333",
    borderStartWidth: 0,
    borderTopEndRadius: 2,
    borderBottomEndRadius: 2,
    //zIndex: 1,
  },
  accessoriesText: {
    fontSize: 10,
  },
});
