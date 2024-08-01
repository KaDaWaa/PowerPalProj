import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState } from "react";
import { useAppContext } from "../utils/appContext";
import axios from "axios";
import Post from "./post";
import { useEffect } from "react";

export default function ProfilePosts({ userId, navigation }) {
  const [posts, setPosts] = useState([]);
  const { apiUrl } = useAppContext();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${apiUrl}/posts/user/${userId}`);
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, [userId]);
  return (
    <View style={styles.container}>
      {posts.map((post) => (
        <Post key={post._id} postId={post._id} navigation={navigation} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    maxWidth: "800px",
    alignSelf: "center",
    width: "100%",
    marginBottom: 100,
    paddingHorizontal: 10, // Added padding for better spacing
  },
});
