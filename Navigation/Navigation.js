import React, { useContext } from "react";
import { Pressable, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NavigationTodo from "./NavigationTodo";
import HomeScreen from "../Screen/HomeScreen";
import SignInScreen from "../Screen/SignInScreen";

import { TokenContext, UsernameContext } from "../Context/Context";
import styles from "../styles";

const Tab = createBottomTabNavigator();
const AuthStack = createNativeStackNavigator();

function LogoutButton() {
  const [, setToken] = useContext(TokenContext);
  const [, setUsername] = useContext(UsernameContext);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.headerActionButton,
        pressed && styles.pressed,
      ]}
      onPress={() => {
        setUsername(null);
        setToken(null);
      }}
    >
      <Text style={styles.headerActionText}>Déconnexion</Text>
    </Pressable>
  );
}

export default function Navigation() {
  const [token] = useContext(TokenContext);

  return (
    <NavigationContainer>
      {token == null ? (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="Auth" component={SignInScreen} />
        </AuthStack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={{
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle,
            headerTitle: "TodoApp",
            headerRight: () => <LogoutButton />,
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
  );
}
