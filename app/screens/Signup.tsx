import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, FIRESTORE_DB } from "@/FirebaseConfig";
import { RootStackParamList } from "../index"; // Adjust the path as necessary
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { collection, addDoc } from 'firebase/firestore';

type Props = NativeStackScreenProps<RootStackParamList, "Signup">;

export default function Signup({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const firestore = FIRESTORE_DB;

  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      const userRef = collection(firestore, 'users');
      await addDoc(userRef, {
        uid: response.user.uid,
        name: name,
        email: email,
      });
      alert("Check Your Emails!");
      navigation.navigate("Login");
    } catch (error: any) {
      console.log(error);
      alert("Registration Failed : " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
      <KeyboardAvoidingView behavior="padding">
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Signup</Text>
      </View>
      <View>
      <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.btnContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            <TouchableOpacity style={styles.login} onPress={handleSignup}>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signup}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonTextSignup}>
                Already Have Account ?
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    justifyContent:"center",
    flex:1,
    backgroundColor:"#6082B6",
  },
  card:{
    height:500,
    backgroundColor: "#ADD8E6",
    borderRadius:30,
    padding:20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.40,
    shadowRadius: 10,
    elevation: 5,
  },
  headingContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding:10,
  },
  heading: {
    fontSize: 50,
    fontWeight: "bold",
    color:"#6082B6",
  },
  inputContainer:{
    padding:10,
  },
  input: {
    margin: 10,
    height: 50,
    borderColor: "#6082B6",
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    borderRadius: 30,
    fontWeight:"700",
  },
  btnContainer: {
    flexDirection: "row",
    marginTop: 20,
    padding:10,
  },
  login: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width:100,
  },
  signup: {
    padding: 10,
    marginLeft:20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonTextSignup: {
    fontSize: 20,
    color: "#007BFF",
  },
});
