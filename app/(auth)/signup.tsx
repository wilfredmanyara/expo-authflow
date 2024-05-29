// Signup.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { useAuth } from "../context/AuthProvider";
import { Link } from "expo-router";

export default function Signup() {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    // Perform validation if necessary
    signup(email, password);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Sign Up</Text>
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
      />
      <Pressable onPress={handleSignup}>
        <Text>Sign Up</Text>
      </Pressable>
      <Text>
        Already have an account?{" "}
          <Link style={{ color: "blue" }} href={"/login"}>Log in</Link>
      </Text>
    </View>
  );
}
