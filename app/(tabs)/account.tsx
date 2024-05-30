// Account.tsx
import React from "react";
import { View, Text, Button } from "react-native";
import { useAuth } from "../context/AuthProvider";

export default function Account() {
  const { logout, user } = useAuth();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Account</Text>
      <Text>Welcome, {user?.name}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
