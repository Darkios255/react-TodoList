import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import styles from "../styles";
import { TokenContext, UsernameContext } from "../Context/Context";
import { signIn, signUp } from "../components/API/sign";

export default function SignInScreen() {
  // État pour savoir si on est en mode "Inscription" ou "Connexion"
  const [isSignUp, setIsSignUp] = useState(false);

  const [username, setUsernameState] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Utilisation des Hooks pour le contexte (plus propre que Consumer)
  const [_, setToken] = useContext(TokenContext);
  const [__, setGlobalUsername] = useContext(UsernameContext);

  const handleSubmit = async () => {
    if (username === "") return seterrorMsg("Le nom d'utilisateur est requis");
    if (password === "") return seterrorMsg("Le mot de passe est requis");

    setLoading(true);
    seterrorMsg("");

    try {
      // On choisit la fonction à appeler selon le mode
      const apiCall = isSignUp ? signUp : signIn;
      const token = await apiCall(username, password);

      // Si succès, on met à jour le contexte (ce qui changera l'écran automatiquement)
      setGlobalUsername(username);
      setToken(token);
    } catch (error) {
      seterrorMsg(error.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { justifyContent: "center" }]}>
      <View style={styles.authCard}>
        {/* Titre dynamique */}
        <Text style={[styles.title, { textAlign: "center", marginBottom: 20 }]}>
          {isSignUp ? "Créer un compte" : "Bienvenue"}
        </Text>

        <View style={{ marginBottom: 15 }}>
          <Text
            style={{ marginBottom: 5, fontWeight: "500", color: "#0F172A" }}
          >
            Nom d'utilisateur
          </Text>
          <TextInput
            style={[styles.input, { marginBottom: 0 }]}
            placeholder="Votre nom..."
            onChangeText={setUsernameState}
            value={username}
            autoCapitalize="none"
          />
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text
            style={{ marginBottom: 5, fontWeight: "500", color: "#0F172A" }}
          >
            Mot de passe
          </Text>
          <TextInput
            style={[styles.input, { marginBottom: 0 }]}
            placeholder="••••••••"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
          />
        </View>

        {errorMsg ? (
          <Text style={[styles.ErrorText, { textAlign: "center" }]}>
            {errorMsg}
          </Text>
        ) : null}

        <TouchableOpacity
          style={styles.button}
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
        </TouchableOpacity>

        {/* Le lien pour basculer entre les modes */}
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#64748B" }}>
            {isSignUp ? "Déjà un compte ? " : "Pas encore de compte ? "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setIsSignUp(!isSignUp); // On inverse le mode
              seterrorMsg("");
            }}
          >
            <Text style={{ color: "#0F172A", fontWeight: "bold" }}>
              {isSignUp ? "Se connecter" : "S'inscrire"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
