import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { StyleSheet } from "react-native";
import Home from "../components/Home";
import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Index() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={"Home"}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
