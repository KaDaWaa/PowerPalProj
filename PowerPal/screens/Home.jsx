import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import UserProfile from "../components/userProfile";
import Search from "./Search";

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>PowerPal</Text>
        <View style={styles.headerIconsView}>
          <Icon
            name="hearto"
            size={30}
            color="#C74E53"
            style={styles.headerIcon}
          />
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Icon
              name="search1"
              size={30}
              color="#C74E53"
              style={styles.headerIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.headerSeperator} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerSeperator: {
    height: 1,
    width: "100%",
    backgroundColor: "#ddd",
  },
  header: {
    backgroundColor: "#fff",
    height: 60,
    width: "100%",
    maxWidth: "800px",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#C74E53",
  },
  headerIconsView: {
    flexDirection: "row",
  },
  headerIcon: {
    marginLeft: 15,
  },
});
