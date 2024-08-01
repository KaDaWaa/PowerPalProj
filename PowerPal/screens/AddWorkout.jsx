import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Modal,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { useUserContext } from "../utils/userContext";
import { useAppContext } from "../utils/appContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default AddWorkoutForm = () => {
  const { user } = useUserContext();
  const { apiUrl, loading, setLoading } = useAppContext();
  const [postTitle, setPostTitle] = useState("");
  const [exercises, setExercises] = useState([
    { excTitle: "", sets: [{ reps: "", weight: "", rpe: "" }] },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("Post Created");
  const [modalMessage, setModalMessage] = useState(
    "The Post has been created successfully"
  );
  const [error, setError] = useState({});

  const handleExerciseChange = (index, field, value) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
    setExercises(newExercises);
  };

  const handleSetChange = (exerciseIndex, setIndex, field, value) => {
    const newExercises = [...exercises];
    if (field === "reps" || field === "weight") {
      value = value.replace(/[^0-9]/g, ""); // Filter out non-numeric characters
    }
    if (field === "rpe") {
      const numericValue = parseInt(value, 10);
      if (numericValue < 0 || numericValue > 10) {
        value = ""; // Ensure RPE is between 0 and 10
      }
    }
    newExercises[exerciseIndex].sets[setIndex][field] = value;
    setExercises(newExercises);
  };

  const addSet = (exerciseIndex) => {
    const newExercises = [...exercises];
    newExercises[exerciseIndex].sets.push({ reps: "", weight: "", rpe: "" });
    setExercises(newExercises);
  };

  const deleteSet = (exerciseIndex, setIndex) => {
    const newExercises = [...exercises];
    newExercises[exerciseIndex].sets.splice(setIndex, 1);
    setExercises(newExercises);
  };

  const addExercise = () => {
    setExercises([
      ...exercises,
      { excTitle: "", sets: [{ reps: "", weight: "", rpe: "" }] },
    ]);
  };

  const deleteExercise = (exerciseIndex) => {
    const newExercises = [...exercises];
    newExercises.splice(exerciseIndex, 1);
    setExercises(newExercises);
  };

  const validateInputs = () => {
    let valid = true;
    let newError = {};

    if (!postTitle) {
      newError.postTitle = true;
      valid = false;
    }

    exercises.forEach((exercise, exerciseIndex) => {
      if (!exercise.excTitle) {
        newError[`excTitle_${exerciseIndex}`] = true;
        valid = false;
      }
      exercise.sets.forEach((set, setIndex) => {
        if (!set.reps || !set.weight || !set.rpe) {
          newError[`set_${exerciseIndex}_${setIndex}`] = true;
          valid = false;
        }
      });
    });

    setError(newError);
    return valid;
  };

  const handleSubmit = async () => {
    try {
      if (validateInputs()) {
        setLoading(true);
        //console.log("Form submitted:", { postTitle, exercises });
        const response = await axios.post(`${apiUrl}/posts`, {
          title: postTitle,
          userId: user._id,
          content: exercises,
        });
        console.log(response);
        if (response.data) {
          console.log("Post created:", response.data);
          setModalTitle("Post Created");
          setModalMessage("The Post has been created successfully");
          setPostTitle("");
          setExercises([
            { excTitle: "", sets: [{ reps: "", weight: "", rpe: "" }] },
          ]);
          setModalVisible(true);
        } else {
          setModalMessage("Post creation failed");
          setModalTitle("Error");
        }
      }
    } catch (e) {
      setModalTitle("Error");
      setModalMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <SafeAreaView
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <ActivityIndicator
        size="large"
        color="#C74E53"
        style={{ alignSelf: "center" }}
      />
    </SafeAreaView>
  ) : (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.submitButtonText}>Hide Modal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <Text style={styles.title}>Add New Post</Text>
        <TextInput
          style={[styles.input, error.postTitle && styles.errorInput]}
          placeholder="Post Title"
          value={postTitle}
          onChangeText={(value) => setPostTitle(value)}
        />
      </View>
      <View style={styles.separator} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollViewContent}
          >
            {exercises.map((exercise, exerciseIndex) => (
              <View key={exerciseIndex}>
                <View style={styles.exerciseHeader}>
                  <TextInput
                    style={[
                      styles.input,
                      error[`excTitle_${exerciseIndex}`] && styles.errorInput,
                    ]}
                    placeholder="Exercise Title"
                    value={exercise.excTitle}
                    onChangeText={(value) =>
                      handleExerciseChange(exerciseIndex, "excTitle", value)
                    }
                  />
                  {exerciseIndex != 0 ? (
                    <TouchableOpacity
                      onPress={() => deleteExercise(exerciseIndex)}
                    >
                      <Icon name="xmark" size={20} color="#C74E53" />
                    </TouchableOpacity>
                  ) : null}
                </View>
                {exercise.sets.map((set, setIndex) => (
                  <View
                    key={setIndex}
                    style={{
                      marginVertical: 10,
                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TextInput
                      style={[
                        styles.input,
                        { flex: 1 },
                        error[`set_${exerciseIndex}_${setIndex}`] &&
                          !set.weight &&
                          styles.errorInput,
                      ]}
                      placeholder="Weight"
                      value={set.weight}
                      onChangeText={(value) =>
                        handleSetChange(
                          exerciseIndex,
                          setIndex,
                          "weight",
                          value
                        )
                      }
                      keyboardType="numeric"
                    />
                    <Text>X</Text>
                    <TextInput
                      style={[
                        styles.input,
                        { flex: 1 },
                        error[`set_${exerciseIndex}_${setIndex}`] &&
                          !set.reps &&
                          styles.errorInput,
                      ]}
                      placeholder="Reps"
                      value={set.reps}
                      onChangeText={(value) =>
                        handleSetChange(exerciseIndex, setIndex, "reps", value)
                      }
                      keyboardType="numeric"
                    />
                    <TextInput
                      style={[
                        styles.input,
                        { flex: 1 },
                        error[`set_${exerciseIndex}_${setIndex}`] &&
                          !set.rpe &&
                          styles.errorInput,
                      ]}
                      placeholder="RPE"
                      value={set.rpe}
                      onChangeText={(value) => {
                        const numericValue = parseInt(value, 10);
                        if (numericValue >= 0 && numericValue <= 10) {
                          handleSetChange(
                            exerciseIndex,
                            setIndex,
                            "rpe",
                            value
                          );
                        }
                      }}
                      keyboardType="numeric"
                    />
                    {setIndex != 0 ? (
                      <TouchableOpacity
                        onPress={() => deleteSet(exerciseIndex, setIndex)}
                      >
                        <Icon name="xmark" size={20} color="#C74E53" />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                ))}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => addSet(exerciseIndex)}
                >
                  <Text style={styles.buttonText}>ADD SET</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity style={styles.button} onPress={addExercise}>
              <Text style={styles.buttonText}>ADD EXERCISE</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View style={styles.separator} />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>SUBMIT POST</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 16,
    textAlign: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  header: {
    width: "95%",
    maxWidth: 400,
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  separator: {
    width: "85%",
    height: 1,
    backgroundColor: "#ccc",
  },
  scrollView: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
  },
  input: {
    alignSelf: "center",
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  errorInput: {
    borderColor: "#C74E53",
  },
  exerciseHeader: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#C74E53",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  footer: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
  },
  submitButton: {
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
  submitButtonText: {
    color: "#C74E53",
    fontSize: 16,
    fontStyle: "italic",
    fontWeight: "bold",
  },
});
