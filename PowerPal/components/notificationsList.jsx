import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function NotificationsList({ notifications, navigation }) {
  const convertDate = (date) => {
    const currentDate = new Date();
    const seconds = Math.floor((currentDate - date) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (seconds < 60) {
      return `${seconds}s `;
    } else if (minutes < 60) {
      return `${minutes}m `;
    } else if (hours < 24) {
      return `${hours}h `;
    } else if (days < 30) {
      return `${days}d `;
    } else if (months < 12) {
      return `${months}m`;
    } else {
      return `${years}y`;
    }
  };
  const renderItem = ({ item }) => {
    return (
      <View style={styles.notificationContainer}>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => {
            navigation.navigate("UserProfile", {
              userId: item.sender._id,
              isMyProfile: false,
            });
          }}
        >
          <Text style={styles.userTitle}>
            {item.sender.name}
            {"  "}
          </Text>
          <Text style={styles.notifType}>
            {item.type == "follow"
              ? "started following you."
              : "liked your post."}
          </Text>
          <Text style={styles.date}>
            {convertDate(new Date(item.createdAt))}
          </Text>
        </TouchableOpacity>
        <View style={styles.seperator} />
      </View>
    );
  };
  const footer = () => {
    return (
      <Text style={{ textAlign: "center", color: "#777", padding: 30 }}>
        No more notifications.
      </Text>
    );
  };
  return (
    <FlatList
      data={notifications}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      style={styles.list}
      ListFooterComponent={footer}
    />
  );
}

const styles = StyleSheet.create({
  notificationContainer: {
    paddingHorizontal: 10,
    height: 60,
    alignContent: "center",
  },
  notificationButton: {
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
  },
  userTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  notifType: {
    fontSize: 16,
    color: "black",
  },
  date: {
    fontSize: 14,
    color: "#bbb",
    paddingLeft: 5,
  },
  list: {
    width: "100%",
    maxWidth: "800px",
    alignSelf: "center",
  },
  seperator: {
    height: 1,
    width: "100%",
    backgroundColor: "#ddd",
    alignSelf: "center",
  },
});
