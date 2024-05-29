import React from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { useAuth } from "../context/AuthProvider";
import { Link } from "expo-router";

export default function Login({ navigation }: { navigation: any }) {
  const { login } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    // Perform validation if necessary
    login(email, password);
  };

  

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login</Text>
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
      <Pressable onPress={handleLogin}>
        <Text>Login</Text>
      </Pressable>
      <Text>
        Don't have an account?{" "}
          <Link style={{ color: "blue" }} href={"/signup"}>Sign up</Link>
      </Text>
    </View>
  );
}
