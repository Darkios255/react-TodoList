import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { UsernameContext, TokenContext } from '../Context/Context'
import { deleteUser } from '../components/API/sign' // <-- Import ajouté
import styles from '../styles'

export default function HomeScreen() {
    const [username, setUsername] = useContext(UsernameContext)
    const [token, setToken] = useContext(TokenContext) // <-- Récupération du token (plus de '_')

    const handleDeleteAccount = () => {
        Alert.alert(
            "Supprimer le compte",
            "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.",
            [
                { text: "Annuler", style: "cancel" },
                { 
                    text: "Supprimer", 
                    style: "destructive", 
                    onPress: () => {
                        // Appel de l'API
                        deleteUser(username, token)
                            .then(() => {
                                // Si succès, on déconnecte l'utilisateur localement
                                setToken(null);
                                setUsername(null);
                            })
                            .catch(err => {
                                console.error(err);
                                Alert.alert("Erreur", "Impossible de supprimer le compte. " + err.message);
                            });
                    }
                }
            ]
        );
    }

    return (
      <View style={styles.container}>
        <View style={styles.authCard}>
            <Text style={styles.title}>Bonjour, {username}</Text>
            <Text style={styles.subText}>
                Simple application de gestion de tâches
            </Text>
            <Text style={{color: '#334155', lineHeight: 22}}>
                Ici, vous pouvez organiser gerer vos listes de tâches.
            </Text>
        </View>

        <View style={{marginTop: 20}}>
             <TouchableOpacity 
                style={styles.buttonDanger}
                onPress={handleDeleteAccount} 
            >
                <Text style={styles.buttonText}>Supprimer mon compte</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
}