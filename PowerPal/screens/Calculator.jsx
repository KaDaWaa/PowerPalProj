import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BarCalculation from "../components/barCalculation";
import Max from "../components/Max";
import Points from "../components/points";

const Tab = createMaterialTopTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Bar Calculation"
      screenOptions={{
        tabBarActiveTintColor: "#C74E53",
        tabBarIndicatorStyle: { backgroundColor: "#C74E53" },
        tabBarInactiveTintColor: "#ccc",
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: "#fff" },
      }}
    >
      <Tab.Screen name="Bar Weight" component={BarCalculation} />
      <Tab.Screen name="Max 1RM" component={Max} />
      <Tab.Screen name="Points" component={Points} />
    </Tab.Navigator>
  );
}
export default function Calculator() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerWidthLimit}>
        <MyTabs />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  containerWidthLimit: {
    maxWidth: "800px",
    alignSelf: "center",
    width: "100%",
    height: "100%",
  },
});
