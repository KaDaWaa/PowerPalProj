import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import Icon2 from "react-native-vector-icons/AntDesign";
import Icon3 from "react-native-vector-icons/FontAwesome6";
import axios from "axios";
import { useAppContext } from "../utils/appContext";
import UsersList from "../components/usersList";

export default function Search({ navigation }) {
  const { apiUrl } = useAppContext();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  console.log(searchResults);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/users/searchByName/${searchText}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(() => {
      if (searchText) {
        handleSearch();
      } else setSearchResults([]);
    }, 1000);

    setDebounceTimeout(newTimeout);

    return () => clearTimeout(newTimeout);
  }, [searchText]);

  function clearSearch() {
    setSearchText("");
    setSearchResults([]);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back" size={30} color={"#C74E53"} />
        </TouchableOpacity>
        <View style={styles.searchInputView}>
          <Icon2 name="search1" size={15} color={"#777"} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            keyboardType="default"
            value={searchText}
            onChangeText={(t) => setSearchText(t)}
          />
          <TouchableOpacity
            onPress={searchText.length > 0 ? clearSearch : null}
            style={styles.clearButton}
          >
            <Icon3
              name="circle-xmark"
              size={15}
              color={searchText.length > 0 ? "#aaa" : "#efefef"}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.seperator} />
      <UsersList users={searchResults} navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchHeader: {
    backgroundColor: "#fff",
    height: 60,
    width: "100%",
    maxWidth: "800px",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  searchInputView: {
    width: "90%",
    height: 40,
    backgroundColor: "#efefef",
    borderRadius: 5,
    paddingHorizontal: 20,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  searchInput: {
    paddingLeft: 10,
    outlineStyle: "none",
    width: "100%",
    height: "100%",
    marginLeft: 8,
    fontSize: 18,
  },
  seperator: {
    height: 1,
    width: "100%",
    backgroundColor: "#ccc",
  },
  backButton: {
    paddingRight: 5,
  },
  clearButton: {
    justifyContent: "flex-end",
  },
});
