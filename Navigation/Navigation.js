import React, { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Nouvel import

import NavigationTodo from "./NavigationTodo";
import HomeScreen from "../Screen/HomeScreen";
import SignInScreen from "../Screen/SignInScreen";
// Note : On n'a plus besoin d'importer SignUpScreen ni SignOutScreen

import { TokenContext, UsernameContext } from "../Context/Context";

const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator(); // Nouvelle Stack pour l'auth

export default function Navigation() {
  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <UsernameContext.Consumer>
          {([username, setUsername]) => (
            <NavigationContainer>
              {token == null ? (
                // Si pas connecté : On affiche l'écran unique d'Auth sans header
                <AuthStack.Navigator screenOptions={{ headerShown: false }}>
                  <AuthStack.Screen name="Auth" component={SignInScreen} />
                </AuthStack.Navigator>
              ) : (
                // Si connecté : On affiche l'application normale (inchangée)
                <Tab.Navigator
                  screenOptions={{
                    headerStyle: {
                      backgroundColor: "#fff",
                      elevation: 0,
                      shadowOpacity: 0,
                      borderBottomWidth: 1,
                      borderBottomColor: "#E2E8F0",
                    },
                    headerTitleStyle: { fontWeight: "bold", color: "#0F172A" },
                    headerTitle: "TodoApp",
                    headerRight: () => (
                      <TouchableOpacity
                        style={{
                          marginRight: 15,
                          padding: 8,
                          borderRadius: 6,
                          backgroundColor: "#F1F5F9",
                        }}
                        onPress={() => {
                          setUsername(null);
                          setToken(null);
                        }}
                      >
                        <Text
                          style={{
                            color: "#0F172A",
                            fontSize: 12,
                            fontWeight: "600",
                          }}
                        >
                          Déconnexion
                        </Text>
                      </TouchableOpacity>
                    ),
                  }}
                >
                  <Tab.Screen name="Accueil" component={HomeScreen} />
                  <Tab.Screen
                    name="Mes Listes"
                    component={NavigationTodo}
                    options={{ unmountOnBlur: true }}
                  />
                </Tab.Navigator>
              )}
            </NavigationContainer>
          )}
        </UsernameContext.Consumer>
      )}
    </TokenContext.Consumer>
  );
}
