import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function UsersList({ users, navigation }) {
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.userButton}
        onPress={() => {
          console.log("Navigating to user profile with ID:", item._id);
          navigation.navigate("UserProfile", {
            userId: item._id,
            isMyProfile: false,
          });
        }}
      >
        <Text style={styles.userTitle}>{item.username}</Text>
        <Text style={styles.userSubTitle}>{item.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  userButton: {
    padding: 10,
    flexDirection: "column",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  userTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userSubTitle: {
    fontSize: 14,
    color: "#777",
  },
  list: {
    width: "100%",
    maxWidth: "800px",
    alignSelf: "center",
  },
});
