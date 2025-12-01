import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";

import styles from "../styles";
import { TokenContext, UsernameContext } from "../Context/Context";
import { signIn, signUp } from "../components/API/sign";

export default function SignInScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsernameState] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [_, setToken] = useContext(TokenContext);
  const [__, setGlobalUsername] = useContext(UsernameContext);

  const handleSubmit = async () => {
    if (username === "") return seterrorMsg("Le nom d'utilisateur est requis");
    if (password === "") return seterrorMsg("Le mot de passe est requis");

    setLoading(true);
    seterrorMsg("");

    try {
      const apiCall = isSignUp ? signUp : signIn;
      const token = await apiCall(username, password);
      setGlobalUsername(username);
      setToken(token);
    } catch (error) {
      seterrorMsg(error.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, styles.centeredContainer]}>
      <View style={styles.authCard}>
        <Text style={[styles.title, styles.textCenter, styles.mb20]}>
          {isSignUp ? "Créer un compte" : "Bienvenue"}
        </Text>

        <View style={styles.mb15}>
          <Text style={styles.inputLabel}>Nom d'utilisateur</Text>
          <TextInput
            style={styles.input}
            placeholder="Votre nom..."
            onChangeText={setUsernameState}
            value={username}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.mb20}>
          <Text style={styles.inputLabel}>Mot de passe</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
          />
        </View>

        {errorMsg ? (
          <Text style={[styles.ErrorText, styles.textCenter]}>{errorMsg}</Text>
        ) : null}

        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>
              {isSignUp ? "S'inscrire" : "Se connecter"}
            </Text>
          )}
        </Pressable>

        <View style={styles.switchAuthRow}>
          <Text style={styles.secondaryText}>
            {isSignUp ? "Déjà un compte ? " : "Pas encore de compte ? "}
          </Text>
          <Pressable
            onPress={() => {
              setIsSignUp(!isSignUp);
              seterrorMsg("");
            }}
          >
            <Text style={styles.linkText}>
              {isSignUp ? "Se connecter" : "S'inscrire"}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
