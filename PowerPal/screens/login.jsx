import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useAppContext } from "../utils/appContext";
import { useUserContext } from "../utils/userContext";

export default function Login({ navigation }) {
  const { user, setUser } = useUserContext();
  const { apiUrl, loading, setLoading } = useAppContext();
  const [signUp, setSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [errorText, setErrorText] = useState("");

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const storeUser = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(true);

      setTimeout(() => {
        navigation.navigate("HomeScreen");
        setLoading(false);
      }, 2000);
    }
  }, [user]);

  const handleSubmission = async () => {
    try {
      setLoading(true);
      if (signUp) {
        if (
          formData.username &&
          formData.email &&
          formData.password &&
          formData.name
        ) {
          if (!emailCheck(formData.email)) {
            return;
          } else if (!passwordCheck(formData.password)) {
            return;
          }
          const response = await axios.post(`${apiUrl}/users/signup`, formData);
          if (response.data == "username already exist") {
            setErrorText("Username already exists");
          } else if (response.data == "email already exist") {
            setErrorText("Email already exists");
          } else {
            setErrorText("");
            storeUser(response.data);
            setUser(response.data);
          }
        } else {
          setErrorText("All fields are required");
        }
      } else {
        if (formData.email && formData.password) {
          if (!emailCheck(formData.email)) {
            return;
          }
          const response = await axios.post(`${apiUrl}/users/login`, formData);
          if (response.data == "email is incorrect") {
            setErrorText("Email is incorrect");
          } else if (response.data == "password is incorrect") {
            setErrorText("Password is incorrect");
          } else {
            setErrorText("");
            storeUser(response.data);
            setUser(response.data);
          }
        } else {
          setErrorText("All fields are required");
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const emailCheck = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (regex.test(email)) {
      return true;
    }
    setErrorText("Invalid email address");
    return false;
  };

  const passwordCheck = (password) => {
    if (password.length < 8) {
      setErrorText("Password must be at least 8 characters long");
      return false;
    } else if (password.search(/[a-z]/) == -1) {
      setErrorText("Password must contain at least one lowercase letter");
      return false;
    } else if (password.search(/[A-Z]/) == -1) {
      setErrorText("Password must contain at least one uppercase letter");
      return false;
    } else if (password.search(/[0-9]/) == -1) {
      setErrorText("Password must contain at least one number");
      return false;
    } else if (password.search(/[!@#$%^&*()_+]/) == -1) {
      setErrorText("Password must contain at least one special character");
      return false;
    }
    return true;
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
      <Image
        source={require("../assets/images/PowerPal.png")}
        style={
          Platform.OS === "web"
            ? [
                styles.logo,
                styles.pcLogoTopRight,
                { transform: [{ rotate: "-50deg" }] },
              ]
            : [
                styles.logo,
                styles.logoTopRight,
                { transform: [{ rotate: "-50deg" }] },
              ]
        }
      />
      <Text style={styles.title}>PowerPal</Text>
      {Platform.OS === "web" ? (
        <View style={styles.inputArea}>
          <Text style={styles.subtitle}>
            {signUp ? "Create an account" : "Login"}
          </Text>
          {signUp ? (
            <TextInput
              style={styles.input}
              name="username"
              onChangeText={(value) => handleChange("username", value)}
              value={formData.username}
              placeholder="username"
              keyboardType="default"
              required={true}
            />
          ) : null}
          {signUp ? (
            <TextInput
              style={styles.input}
              name="name"
              onChangeText={(value) => handleChange("name", value)}
              placeholder="name"
              keyboardType="default"
            />
          ) : null}
          <TextInput
            style={styles.input}
            name="email"
            onChangeText={(value) => handleChange("email", value)}
            value={formData.email}
            placeholder="email@domain.com"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            name="password"
            onChangeText={(value) => handleChange("password", value)}
            value={formData.password}
            placeholder="Enter Password"
            secureTextEntry={true}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmission}>
            <Text style={styles.buttonText}>
              {signUp ? "Sign Up" : "Sign In"}
            </Text>
          </TouchableOpacity>
          {errorText != "" ? (
            <Text style={{ color: "red", alignSelf: "left" }}>
              *{errorText}
            </Text>
          ) : null}
        </View>
      ) : (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inputArea}>
            <Text style={styles.subtitle}>
              {signUp ? "Create an account" : "Login"}
            </Text>
            {signUp ? (
              <TextInput
                style={styles.input}
                name="username"
                onChangeText={(value) => handleChange("username", value)}
                value={formData.username}
                placeholder="username"
                keyboardType="default"
                required={true}
              />
            ) : null}
            {signUp ? (
              <TextInput
                style={styles.input}
                name="name"
                onChangeText={(value) => handleChange("name", value)}
                placeholder="name"
                keyboardType="default"
              />
            ) : null}
            <TextInput
              style={styles.input}
              name="email"
              onChangeText={(value) => handleChange("email", value)}
              value={formData.email}
              placeholder="email@domain.com"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              name="password"
              onChangeText={(value) => handleChange("password", value)}
              value={formData.password}
              placeholder="Enter Password"
              secureTextEntry={true}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmission}>
              <Text style={styles.buttonText}>
                {signUp ? "Sign Up" : "Sign In"}
              </Text>
            </TouchableOpacity>
            {errorText != "" ? (
              <Text style={{ color: "red", alignSelf: "left" }}>
                *{errorText}
              </Text>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
      )}
      <TouchableOpacity onPress={() => setSignUp(!signUp)}>
        <Text style={styles.signInText}> {signUp ? "Sign In" : "Sign Up"}</Text>
      </TouchableOpacity>
      <Text style={styles.termsText}>
        By clicking continue, you agree to our{" "}
        <Text style={styles.linkText}>Terms of Service</Text> and{" "}
        <Text style={styles.linkText}>Privacy Policy</Text>
      </Text>
      <Image
        source={require("../assets/images/PowerPal.png")}
        style={
          Platform.OS === "web"
            ? [
                styles.logo,
                styles.pcLogoBottomLeft,
                { transform: [{ rotate: "-50deg" }] },
              ]
            : [
                styles.logo,
                styles.logoBottomLeft,
                { transform: [{ rotate: "-50deg" }] },
              ]
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  inputArea: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
    paddingVertical: 60,
  },
  logo: {
    position: "absolute",
    width: Platform.OS == "web" ? "15vw" : 180,
    height: Platform.OS == "web" ? "15vw" : 180,
    maxWidth: 180,
    maxHeight: 180,
  },
  logoTopRight: {
    top: "10%",
    right: "-20%",
  },
  logoBottomLeft: {
    bottom: "-6%",
    left: "-15%",
  },
  pcLogoBottomLeft: {
    position: "absolute",
    bottom: "5%",
    left: "15%",

    zIndex: -1,
  },
  pcLogoTopRight: {
    position: "absolute",
    top: "5%",
    right: "15%",
    zIndex: -1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#C74E53",
    marginBottom: 50,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#C74E53",
    margin: 30,
    alignSelf: "center",
  },
  input: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 400,
    height: 40,
    borderColor: "#ccc",
    backgroundColor: "#f8f8f8",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 400,
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
  signInText: {
    color: "#C74E53",
    marginBottom: 20,
  },
  termsText: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  linkText: {
    color: "#C74E53",
  },
});
