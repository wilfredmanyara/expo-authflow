// Account.tsx
import React from "react";
import { View, Text, Pressable } from "react-native";
import { useAuth } from "../context/AuthProvider";

export default function Account() {
  const { user, logout } = useAuth();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Account</Text>
      <Text>{user && user.name}</Text>
      <Pressable onPress={logout}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
}
