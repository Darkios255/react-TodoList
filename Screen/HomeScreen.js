import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Alert, Platform } from "react-native";
import { UsernameContext, TokenContext } from "../Context/Context";
import { deleteUser } from "../components/API/sign";
import styles from "../styles";

export default function HomeScreen() {
  const [username, setUsername] = useContext(UsernameContext);
  const [token, setToken] = useContext(TokenContext);

  const handleDeleteAccount = () => {
    if (Platform.OS === "web") {
      // Pour le web, utiliser confirm
      if (
        window.confirm(
          "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
        )
      ) {
        deleteUser(username, token)
          .then(() => {
            setToken(null);
            setUsername(null);
          })
          .catch((err) => {
            console.error(err);
            const errorMessage = err.message || JSON.stringify(err);
            if (Platform.OS === "web") {
              alert(
                "Erreur: Impossible de supprimer le compte. " + errorMessage
              );
            } else {
              Alert.alert(
                "Erreur",
                "Impossible de supprimer le compte. " + errorMessage
              );
            }
          });
      }
    } else {
      // Pour mobile (iOS/Android)
      Alert.alert(
        "Supprimer le compte",
        "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.",
        [
          { text: "Annuler", style: "cancel" },
          {
            text: "Supprimer",
            style: "destructive",
            onPress: () => {
              deleteUser(username, token)
                .then(() => {
                  setToken(null);
                  setUsername(null);
                })
                .catch((err) => {
                  console.error(err);
                  const errorMessage = err.message || JSON.stringify(err);
                  if (Platform.OS === "web") {
                    alert(
                      "Erreur: Impossible de supprimer le compte. " +
                        errorMessage
                    );
                  } else {
                    Alert.alert(
                      "Erreur",
                      "Impossible de supprimer le compte. " + errorMessage
                    );
                  }
                });
            },
          },
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
        <Text style={{ color: "#334155", lineHeight: 22 }}>
          Ici, vous pouvez organiser gerer vos listes de tâches.
        </Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          style={styles.buttonDanger}
          onPress={handleDeleteAccount}
        >
          <Text style={styles.buttonText}>Supprimer mon compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
