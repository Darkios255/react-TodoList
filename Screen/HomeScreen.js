import React, { useContext } from "react";
import { View, Text, Pressable, Alert, Platform } from "react-native";
import { UsernameContext, TokenContext } from "../Context/Context";
import { deleteUser } from "../components/API/sign";
import styles from "../styles";

export default function HomeScreen() {
  const [username, setUsername] = useContext(UsernameContext);
  const [token, setToken] = useContext(TokenContext);

  const handleDeleteAccount = () => {
    const confirmDelete = () => {
      deleteUser(username, token)
        .then(() => {
          setToken(null);
          setUsername(null);
        })
        .catch((err) => {
          console.error(err);
          const errorMessage = err.message || JSON.stringify(err);
          if (Platform.OS === "web") {
            alert("Erreur: Impossible de supprimer le compte. " + errorMessage);
          } else {
            Alert.alert(
              "Erreur",
              "Impossible de supprimer le compte. " + errorMessage
            );
          }
        });
    };

    if (Platform.OS === "web") {
      if (
        window.confirm(
          "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
        )
      ) {
        confirmDelete();
      }
    } else {
      Alert.alert(
        "Supprimer le compte",
        "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.",
        [
          { text: "Annuler", style: "cancel" },
          { text: "Supprimer", style: "destructive", onPress: confirmDelete },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.authCard}>
        <Text style={styles.title}>Bonjour, {username}</Text>
        <Text style={styles.subText}>
          Simple application de gestion de tâches
        </Text>
        <Text style={styles.bodyText}>
          Ici, vous pouvez organiser et gérer vos listes de tâches.
        </Text>
      </View>

      <View style={styles.mt20}>
        <Pressable
          style={({ pressed }) => [
            styles.buttonDanger,
            pressed && styles.pressed,
          ]}
          onPress={handleDeleteAccount}
        >
          <Text style={styles.buttonText}>Supprimer mon compte</Text>
        </Pressable>
      </View>
    </View>
  );
}
