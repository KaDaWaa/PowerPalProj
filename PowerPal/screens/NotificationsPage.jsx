import { Skeleton } from "@rneui/themed";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon6 from "react-native-vector-icons/Ionicons";
import NotificationsList from "../components/notificationsList";
import { useAppContext } from "../utils/appContext";
import { useUserContext } from "../utils/userContext";
import { Platform } from "react-native";

export default function NotificationsPage({ navigation }) {
  const { user } = useUserContext();
  const { apiUrl } = useAppContext();
  const [notifications, setNotifications] = useState([]);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const NotificationSkeleton = () => {
    return (
      <View style={styles.skeletonContainer}>
        <Skeleton
          width="80%"
          height={20}
          animation="wave"
          style={styles.skeletonLine}
        />

        <View style={styles.seperator} />
      </View>
    );
  };

  const FetchNotifications = async () => {
    try {
      setShowSkeleton(true);
      const response = await axios.get(`${apiUrl}/notifications/${user._id}`);
      setNotifications(response.data);
      await axios.put(`${apiUrl}/notifications/markAsRead/${user._id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setShowSkeleton(false);
    }
  };

  useEffect(() => {
    FetchNotifications();
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon6 name="chevron-back" size={30} color="#C74E53" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      {showSkeleton ? (
        <ScrollView style={styles.skeletonScrollView}>
          {Array.from({ length: 15 }).map((_, index) => (
            <NotificationSkeleton key={index} />
          ))}
        </ScrollView>
      ) : (
        <NotificationsList
          notifications={notifications}
          navigation={navigation}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 50,
    width: Platform.OS === "web" ? "80%" : "100%",
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: "800px",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#C74E53",
    textAlign: "center",
    flex: 1,
    paddingEnd: 20,
  },
  skeletonContainer: {
    maxWidth: "800px",
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: 10,
    height: 60,
  },
  skeletonLine: {
    marginTop: 20,
    marginBottom: 20,
  },
  seperator: {
    height: 1,
    width: "100%",
    backgroundColor: "#ddd",
  },
});
