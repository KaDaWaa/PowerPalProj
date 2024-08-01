import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useUserContext } from "../utils/userContext";
import axios from "axios";
import { useAppContext } from "../utils/appContext";
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/AntDesign";

export default function Post({ postId, navigation }) {
  const { user } = useUserContext();
  const { apiUrl } = useAppContext();
  const [post, setPost] = useState(null);

  const convertDate = (date) => {
    const currentDate = new Date();
    const seconds = Math.floor((currentDate - date) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    } else if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else if (days < 30) {
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    } else if (months < 12) {
      return `${months} month${months !== 1 ? "s" : ""} ago`;
    } else {
      return `${years} year${years !== 1 ? "s" : ""} ago`;
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${apiUrl}/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, [postId]);

  if (!post) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            user._id === post.userId._id
              ? null
              : navigation.navigate("UserProfile", {
                  userId: post.userId._id,
                  isMyProfile: false,
                })
          }
        >
          <Text style={styles.title}>{post.userId.username}</Text>
        </TouchableOpacity>
        {post.userId._id === user._id && (
          <TouchableOpacity>
            <Icon name="dots-three-horizontal" size={20} color="#777" />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.content}>
        {post.content.map((item, index) => (
          <View key={index} style={styles.exercise}>
            <Text style={styles.excTitle}>{item.excTitle}</Text>
            {item.sets.map((set, index) => (
              <View key={index} style={styles.set}>
                <Text>Reps: {set.reps}</Text>
                <Text>Weight: {set.weight} kg</Text>
                <Text>RPE: {set.rpe}</Text>
              </View>
            ))}
          </View>
        ))}
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.likeButton}>
          <Icon2 name={false ? "heart" : "hearto"} size={25} color="#C74E53" />
        </TouchableOpacity>
        <Text style={styles.likes}>{post.Likes.length} likes </Text>
        <Text style={styles.footerTitle}>
          <Text style={styles.footerUsername}>{post.userId.username} </Text>
          {post.title}
        </Text>
        <Text style={styles.createdAt}>
          {convertDate(new Date(post.createdAt))}
        </Text>
        <View style={styles.seperator} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    maxWidth: 800,
    padding: 10,
    marginVertical: 10, // Added margin for spacing between posts
    overflow: "hidden",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  exercise: {
    marginBottom: 10,
  },
  excTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  set: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  footer: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  likes: {
    paddingTop: 5,
    fontSize: 14,
    color: "black",
    fontWeight: "700",
  },
  createdAt: {
    paddingTop: 5,
    fontSize: 14,
    color: "#777",
  },
  footerTitle: {
    paddingTop: 5,
    fontSize: 14,
  },
  footerUsername: {
    fontWeight: "700",
  },
  likeButton: {
    width: 30,
    alignItems: "flex-start",
  },
  seperator: {
    height: 1,
    width: "100%",
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
});
