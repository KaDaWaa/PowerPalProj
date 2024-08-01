import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import React from "react";
import Post from "./post";
import axios from "axios";
import { useState, useEffect } from "react";
import { useAppContext } from "../utils/appContext";

export default function PostsList({ userId, navigation }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const { apiUrl } = useAppContext();

  const fetchPosts = async () => {
    if (loading || isLastPage) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `${apiUrl}/users/followingPosts/${userId}/${page}`
      );
      if (response.data.length === 0) {
        setIsLastPage(true);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...response.data]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPosts([]); // Clear the posts when userId or isForProfile changes
    setPage(1); // Reset the page to 1 when userId or isForProfile changes
    setIsLastPage(false); // Reset the last page indicator
    fetchPosts();
  }, [userId]);

  useEffect(() => {
    if (page > 1) {
      fetchPosts();
    }
  }, [page]);

  const handleEndReached = () => {
    if (!loading && !isLastPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const renderFooter = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size="large"
          color="#C74E53"
          style={{ margin: 20 }}
        />
      );
    }
    if (isLastPage) {
      return <Text style={styles.footerText}>Reached last post</Text>;
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <Post postId={item._id} navigation={navigation} />
        )} // Assuming each post has a unique _id
        keyExtractor={(item) => item._id.toString()} // Ensure to use a unique identifier for each item
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5} // Fetch more posts when the list is scrolled 50% from the bottom
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignSelf: "center",
    width: "100%",
    maxWidth: "800px",
  },
  footerText: {
    textAlign: "center",
    padding: 10,
    fontSize: 16,
    color: "#555",
  },
});
