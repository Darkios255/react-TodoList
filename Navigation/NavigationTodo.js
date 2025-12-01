import React from "react";
import TodoListsScreen from "../Screen/TodoListsScreen";
import TodoListDetailsScreen from "../Screen/TodoListDetailsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function NavigationTodo() {
  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{
        headerStyle: { backgroundColor: "#F3F4F6" },
        headerTitleStyle: { fontWeight: "bold", color: "#0F172A" },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="List"
        component={TodoListsScreen}
        options={{ title: "Mes Listes" }}
      />
      <Stack.Screen
        name="Details"
        component={TodoListDetailsScreen}
        // On cache le header natif pour <- Retour"
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
