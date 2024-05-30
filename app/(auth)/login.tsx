import React, { useState } from "react";
import { View, Text, Pressable, TextInput, Button, StyleSheet, ActivityIndicator } from "react-native";
import { useAuth } from "../context/AuthProvider";
import { Link } from "expo-router";
import Toast from 'react-native-root-toast';

export default function Login({ navigation }: { navigation: any }) {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      // Display an error message if email or password is missing
      showToast("Please enter both email and password.");
      return;
    }
  
    try {
      await login(email, password);
      showToast("Login successful!");
    } catch (error) {
      showToast("Login failed. Invalid email or password.");
    }
  };
  
  const showToast = (message: string) => {
    let toast = Toast.show(message, {
      duration: Toast.durations.LONG,
    });

    setTimeout(() => {
      Toast.hide(toast);
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <>
          <Button title="Login" onPress={handleLogin} />
          <Text style={styles.linkText}>
            Don't have an account?{" "}
            <Link style={styles.link} href={"/signup"}>Sign up</Link>
          </Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  linkText: {
    marginTop: 20,
    fontSize: 16,
  },
  link: {
    color: 'blue',
  },
});
