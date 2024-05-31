import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../app/context/AuthProvider";
import { RootSiblingParent } from "react-native-root-siblings";

export default function RootLayout() {
  return (
    <RootSiblingParent>
      <AuthProvider>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          {/* <Stack.Screen
            name="other"
            options={{
              title: "",
              headerShown: true,
              headerTransparent: Platform.OS === "ios",
              headerBlurEffect: "regular",
            }}
          /> */}
        </Stack>
      </AuthProvider>
    </RootSiblingParent>
  );
}
