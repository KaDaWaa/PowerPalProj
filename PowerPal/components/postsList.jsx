import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  RefreshControl,
} from "react-native";
import React from "react";
import Post from "./post";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { useAppContext } from "../utils/appContext";

export default function PostsList({ userId, navigation, setRefreshHome }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const { apiUrl } = useAppContext();
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = useCallback(
    async (reset = false) => {
      if (loading || (isLastPage && !reset)) {
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(
          `${apiUrl}/users/followingPosts/${userId}/${reset ? 1 : page}`
        );
        if (response.data.length < 5) {
          setPosts((prevPosts) =>
            reset ? response.data : [...prevPosts, ...response.data]
          );
          setIsLastPage(true);
        } else {
          setPosts((prevPosts) =>
            reset ? response.data : [...prevPosts, ...response.data]
          );
        }
        if (reset) {
          setPage(1);
          setIsLastPage(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [loading, isLastPage, page, apiUrl, userId]
  );

  useEffect(() => {
    fetchPosts(true);
  }, [userId]);

  useEffect(() => {
    if (page > 1) {
      fetchPosts();
    }
  }, [page]);

  const handleEndReached = () => {
    if (!loading && !isLastPage && !refreshing) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshHome(true);
    setPosts([]);
    fetchPosts(true).finally(() => {
      setRefreshing(false);
      setRefreshHome(false);
    });
  };

  const renderFooter = () => {
    if (loading && !refreshing) {
      return (
        <ActivityIndicator
          size="large"
          color="#C74E53"
          style={{ margin: 20 }}
        />
      );
    }
    if (isLastPage && !refreshing) {
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
        )}
        keyExtractor={(item) => item._id.toString()}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.05}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
