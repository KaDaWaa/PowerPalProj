import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import {
  ActivityIndicator,
  Animated,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Icon2 from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/Entypo";
import Icon3 from "react-native-vector-icons/Octicons";
import Icon4 from "react-native-vector-icons/FontAwesome5";
import Icon5 from "react-native-vector-icons/MaterialIcons";
import Icon6 from "react-native-vector-icons/Ionicons";
import { useAppContext } from "../utils/appContext";
import { useUserContext } from "../utils/userContext";
import PostsList from "./postsList";
import ProfilePosts from "./profilePosts";
import Post from "./post";

export default function UserProfile({
  route,
  navigation,
  userId: propUserId,
  isMyProfile: propIsMyProfile,
}) {
  const { user, setUser } = useUserContext();
  const { apiUrl, loading, setLoading } = useAppContext();
  const { userId, isMyProfile } = route?.params || {
    userId: propUserId,
    isMyProfile: propIsMyProfile,
  };
  const [userProfile, setUserProfile] = useState(null); // This is the user profile that we are viewing
  const [showAchievements, setShowAchievements] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;
  const [follow, setFollow] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [squat, setSquat] = useState("");
  const [bench, setBench] = useState("");
  const [deadlift, setDeadlift] = useState("");
  const openEditModal = () => {
    setName(userProfile.name);
    setBio(userProfile.bio);
    setSquat(userProfile.achievements.Squat.toString());
    setBench(userProfile.achievements.Bench.toString());
    setDeadlift(userProfile.achievements.Deadlift.toString());
    setShowEditModal(true);
  };
  const handleSave = async () => {
    setShowEditModal(false);
    try {
      await axios
        .put(`${apiUrl}/users/${user._id}`, {
          name,
          bio,
          achievements: {
            Squat: squat,
            Bench: bench,
            Deadlift: deadlift,
            Total: parseInt(squat) + parseInt(bench) + parseInt(deadlift),
          },
        })
        .then((res) => {
          setShowEditModal(false);
          onRefresh();
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function getUserProfile() {
      try {
        if (userId) {
          setLoading(true);
          // If we have a user, we can get their profile
          await axios.get(`${apiUrl}/users/${userId}`).then((res) => {
            setUserProfile(res.data);
          });
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
    getUserProfile();
  }, [userId]);

  useEffect(() => {
    async function checkFollow() {
      try {
        if (userProfile) {
          const isFollowing = userProfile.followers.includes(user._id);
          setFollow(isFollowing);
        }
      } catch (e) {
        console.log(e);
      }
    }
    checkFollow();
  }, [userProfile]);

  const handleFollow = async () => {
    try {
      await axios
        .post(`${apiUrl}/users/follow`, {
          userId: user._id,
          followId: userId,
        })
        .then((res) => {
          setFollow(!follow);
          onRefresh();
        });
    } catch (e) {
      console.log(e);
    }
  };
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    async function getUserProfile() {
      try {
        if (userId) {
          await axios.get(`${apiUrl}/users/${userId}`).then((res) => {
            setUserProfile(res.data);
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
    setRefreshing(true);
    getUserProfile();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: showAchievements ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showAchievements]);

  const toggleAchievements = () => {
    setShowAchievements(!showAchievements);
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      navigation.navigate("loginPage");
    } catch (e) {
      console.log(e);
    } finally {
      setUser(null);
    }
  };

  const animatedHeight = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 60], // Adjust the height according to your content
  });

  return loading || !userProfile ? (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <ActivityIndicator size="large" color="#C74E53" />
    </View>
  ) : (
    <SafeAreaView style={styles.mainContainer}>
      <Modal animationType="fade" transparent={true} visible={showEditModal}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.centeredView}
        >
          <TouchableWithoutFeedback
            onPress={Platform.OS != "web" ? Keyboard.dismiss : null}
          >
            <View style={styles.editModalView}>
              <TouchableOpacity
                onPress={() => setShowEditModal(false)}
                style={styles.closeButton}
              >
                <Icon2 name="close" size={30} color="#ccc" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.modalSubTitle}>Name</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={name}
                  onChangeText={setName}
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.modalSubTitle}>Bio</Text>
                <TextInput
                  style={[styles.input, styles.bioInput]}
                  placeholder="Bio"
                  value={bio}
                  onChangeText={setBio}
                  multiline
                />
              </View>
              <Text style={styles.modalSubTitle}>Achievements</Text>
              <View style={styles.rowContainer}>
                <View style={styles.columnContainer}>
                  <Text style={styles.modalSubTitle}>Squat</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Squat"
                    value={squat}
                    onChangeText={setSquat}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.columnContainer}>
                  <Text style={styles.modalSubTitle}>Bench</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Bench"
                    value={bench}
                    onChangeText={setBench}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.columnContainer}>
                  <Text style={styles.modalSubTitle}>Deadlift</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Deadlift"
                    value={deadlift}
                    onChangeText={setDeadlift}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
      {isMyProfile ? null : (
        <View style={styles.headerSearchProfile}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon6 name="chevron-back" size={30} color="#C74E53" />
          </TouchableOpacity>
          <Text style={styles.headerTextSearchProfile}>
            {userProfile ? userProfile.username : null}
          </Text>
        </View>
      )}
      <ScrollView
        contentContainerStyle={styles.scrollviewContainer}
        refreshControl={
          <RefreshControl
            tintColor={"#C74E53"}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <SafeAreaView style={styles.container}>
          {isMyProfile ? (
            <View style={styles.header}>
              <Text style={styles.headerText}>
                {userProfile ? userProfile.username : null}
              </Text>
              <TouchableOpacity onPress={logout}>
                <Icon5 name="logout" size={25} color="#C74E53" />
              </TouchableOpacity>
            </View>
          ) : null}
          <View style={styles.bioContainer}>
            <View style={styles.bioStats}>
              <View style={styles.bioStat}>
                <Text style={styles.bioStatNumber}>
                  {userProfile ? userProfile.posts.length : "0"}
                </Text>
                <Text style={styles.bioStatText}>posts</Text>
              </View>
              <View style={styles.bioStatsSeperator}></View>
              <View style={styles.bioStat}>
                <Text style={styles.bioStatNumber}>
                  {userProfile ? userProfile.followers.length : "0"}
                </Text>
                <Text style={styles.bioStatText}>followers</Text>
              </View>
              <View style={styles.bioStatsSeperator}></View>
              <View style={styles.bioStat}>
                <Text style={styles.bioStatNumber}>
                  {userProfile ? userProfile.following.length : "0"}
                </Text>
                <Text style={styles.bioStatText}>following</Text>
              </View>
            </View>
            <Text style={styles.bioName}>
              {userProfile ? userProfile.name : null}
            </Text>
            <Text style={styles.bioText}>
              {userProfile ? userProfile.bio : null}
            </Text>
            {/* <View style={styles.seperator} /> */}

            <View style={styles.bioAchievements}>
              <TouchableOpacity
                onPress={toggleAchievements}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Icon4 name="award" size={30} color="#C74E53" />
                {showAchievements ? (
                  <Icon5 name="keyboard-arrow-up" size={30} color="#C74E53" />
                ) : (
                  <Icon5 name="keyboard-arrow-down" size={30} color="#C74E53" />
                )}
              </TouchableOpacity>
              <Animated.View
                style={{
                  height: animatedHeight,
                  overflow: "hidden",
                  width: "100%",
                }}
              >
                <View style={styles.bioStats}>
                  <View style={styles.bioStat}>
                    <Text style={styles.bioStatNumber}>
                      {userProfile ? userProfile.achievements.Squat : "0"}
                    </Text>
                    <Text style={styles.bioStatText}>SQUAT</Text>
                  </View>
                  <View style={styles.bioStatsSeperator}></View>
                  <View style={styles.bioStat}>
                    <Text style={styles.bioStatNumber}>
                      {userProfile ? userProfile.achievements.Bench : "0"}
                    </Text>
                    <Text style={styles.bioStatText}>BENCH</Text>
                  </View>
                  <View style={styles.bioStatsSeperator}></View>
                  <View style={styles.bioStat}>
                    <Text style={styles.bioStatNumber}>
                      {userProfile ? userProfile.achievements.Deadlift : "0"}
                    </Text>
                    <Text style={styles.bioStatText}>DEADLIFT</Text>
                  </View>
                  <View style={styles.bioStatsSeperator}></View>
                  <View style={styles.bioStat}>
                    <Text style={styles.bioStatNumber}>
                      {userProfile ? userProfile.achievements.Total : "0"}
                    </Text>
                    <Text style={styles.bioStatText}>TOTAL</Text>
                  </View>
                </View>
              </Animated.View>
            </View>
          </View>
          <View style={styles.buttonViews}>
            {user._id === userProfile._id ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => openEditModal()}
              >
                <Text style={styles.buttonText}>Edit Profile</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleFollow()}
              >
                <Text style={styles.buttonText}>
                  {follow ? "Following" : "Follow"}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.seperator} />
          <ProfilePosts
            userId={userProfile._id}
            navigation={navigation}
            reload={refreshing}
          />
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollviewContainer: {
    justifyContent: "flex-start",
    minHeight: "100%",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    maxWidth: "800px",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  header: {
    height: 50,
    width: Platform.OS === "web" ? "80%" : "100%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  headerSearchProfile: {
    height: 50,
    width: Platform.OS === "web" ? "80%" : "100%",
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#C74E53",
  },
  headerTextSearchProfile: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#C74E53",
    textAlign: "center",
    flex: 1,
    paddingEnd: 20,
  },
  headerIcons: {
    position: "absolute",
    right: 10,
    padding: 5,
    flexDirection: "row",
  },
  bioContainer: {
    marginTop: 10,
    padding: 10,
    width: "100%",
    alignItems: "center",
  },
  bioName: {
    alignSelf: "flex-start",
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  bioText: {
    fontSize: 16,
    color: "black",
    textAlign: "left",
    alignSelf: "flex-start",
    paddingTop: 5,
    paddingBottom: 10,
  },
  bioStatsSeperator: {
    width: 1,
    height: "100%",
    backgroundColor: "#ccc",
  },
  bioStats: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    padding: 10,
  },
  bioStat: {
    width: "25%",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  bioStatNumber: {
    fontSize: 20,
    fontWeight: "bold",
  },
  bioStatText: {
    fontSize: 16,
    fontWeight: "400",
  },
  bioAchievements: {
    width: "100%",
    paddingTop: 20,
    alignItems: "center",
  },
  seperator: {
    width: "100%",
    height: 1,
    backgroundColor: "#ccc",
  },
  button: {
    width: "100%",
    height: 40,
    padding: 10,
    borderColor: "#C74E53",
    borderWidth: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#C74E53",
    fontWeight: "bold",
  },
  buttonViews: {
    width: "100%",
    padding: 10,
  },
  editModalView: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#C74E53",
    marginBottom: 15,
  },
  modalSubTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  rowContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  columnContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "30%",
  },
  inputContainer: {
    width: "100%",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#f8f8f8",
  },
  bioInput: {
    height: 80,
    textAlignVertical: "top",
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: "#C74E53",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
});
