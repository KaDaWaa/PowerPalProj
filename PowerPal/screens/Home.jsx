import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import UserProfile from "../components/userProfile";
import Search from "./Search";
import Post from "../components/post";
import { useState } from "react";
import PostsList from "../components/postsList";
import { useUserContext } from "../utils/userContext";

export default function Home({ navigation }) {
  const { user } = useUserContext();
  const [notifications, setNotifications] = useState([]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>PowerPal</Text>
        <View style={styles.headerIconsView}>
          <View>
            {notifications > 0 ? <View style={styles.hasNotif} /> : null}
            <Icon
              name="hearto"
              size={25}
              color="#C74E53"
              style={styles.headerIcon}
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Icon
              name="search1"
              size={25}
              color="#C74E53"
              style={styles.headerIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.headerSeperator} />
      <PostsList userId={user._id} navigation={navigation} />
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
    marginLeft: 25,
  },
  scrollViewContainer: {
    alignSelf: "center",
    width: "100%",
    maxWidth: "800px",
  },
  hasNotif: {
    position: "absolute",
    height: 13,
    width: 13,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#333",
    top: 0,
    right: -2,
    zIndex: 1,
  },
});
