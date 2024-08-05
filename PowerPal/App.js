import {
  AntDesign,
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import AddWorkout from "./screens/AddWorkout";
import Caclulator from "./screens/Calculator";
import Home from "./screens/Home";
import Login from "./screens/login";
import Profile from "./screens/Profile";
import AppProvider from "./utils/appContext";
import UserProvider from "./utils/userContext";
const Stack = createNativeStackNavigator();
const myTabs = createBottomTabNavigator();
const homeStack = createNativeStackNavigator();
import { StatusBar, statusBarStyle } from "react-native";
import Search from "./screens/Search";
import UserProfile from "./components/userProfile";
import NotificationsPage from "./screens/NotificationsPage";

function MyStack() {
  return (
    <homeStack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <homeStack.Screen name="Home" component={Home} />
      <homeStack.Screen name="Search" component={Search} />
      <homeStack.Screen name="UserProfile" component={UserProfile} />
      <homeStack.Screen name="Notifications" component={NotificationsPage} />
    </homeStack.Navigator>
  );
}
function MyTabs() {
  return (
    <myTabs.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#C74E53",
        //tabBarStyle: { backgroundColor: "#121212" },,
      }}
    >
      <myTabs.Screen
        name="HomeStack"
        component={MyStack}
        options={{
          title: "Feed",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <myTabs.Screen
        name="Add workout"
        component={AddWorkout}
        options={{
          title: "Add workout",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="plussquareo" size={size} color={color} />
          ),
        }}
      />
      <myTabs.Screen
        name="Calculate"
        component={Caclulator}
        options={{
          title: "Calculate",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="calculate" size={size} color={color} />
          ),
        }}
      />
      <myTabs.Screen
        name="myProfile"
        component={Profile}
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-sharp" size={size} color={color} />
          ),
        }}
      />
    </myTabs.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <UserProvider>
        <NavigationContainer>
          <StatusBar animated={true} barStyle={"dark-content"} />
          <Stack.Navigator
            initialRouteName="loginPage"
            screenOptions={{ headerShown: false, gestureEnabled: false }}
            gesture
          >
            <Stack.Screen name="loginPage" component={Login} />
            <Stack.Screen name="HomeScreen" component={MyTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
