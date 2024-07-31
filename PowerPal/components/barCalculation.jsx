import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function BarCalculation() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Load The Bar</Text>
        <View style={styles.barContainer}>
          <View style={styles.bar}></View>
          <View style={styles.barRing} />
          <View style={styles.platesContainer}>
            <View style={styles.plateLoadingBar} />
            {/* <View style={[styles.plate, styles.redPlate]}></View>
            <View style={[styles.plate, styles.redPlate]}></View>
            <View style={[styles.plate, styles.redPlate]}></View>
            <View style={[styles.plate, styles.redPlate]}></View>
            <View style={[styles.plate, styles.bluePlate]}></View>
            <View style={[styles.plate, styles.yellowPlate]}></View>
            <View style={[styles.plate, styles.greenPlate]}></View>
            <View style={[styles.plate, styles.whitePlate]}></View>

            <View style={[styles.plate, styles.blackPlate]}></View>
            <View style={[styles.plate, styles.greyPlate]}></View> */}
          </View>
        </View>
        <Text style={styles.weightText}>255 KG | 562.2 LB</Text>
        <Text style={styles.setText}>Set of Plates Needed</Text>
        <View style={styles.plateSummary}>
          <Text style={styles.plateSummaryText}>20 KG</Text>
          <Text style={styles.plateSummaryText}>4</Text>
          <Text style={styles.plateSummaryText}>25 KG</Text>
          <Text style={styles.plateSummaryText}>1</Text>
          <Text style={styles.plateSummaryText}>15 KG</Text>
          <Text style={styles.plateSummaryText}>1</Text>
          <Text style={styles.plateSummaryText}>2.5 KG</Text>
          <Text style={styles.plateSummaryText}>1</Text>
        </View>
        <Text style={styles.quickMaths}>
          Quick Maths: 20 + 200 + 30 + 5 ≈ 255 KG
        </Text>
      </View>
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
    //padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  barContainer: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  bar: {
    width: 100,
    height: 10,
    backgroundColor: "#ddd",
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
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginVertical: 10,
  },
  plateSummaryText: {
    fontSize: 16,
  },
  quickMaths: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 20,
  },
});
