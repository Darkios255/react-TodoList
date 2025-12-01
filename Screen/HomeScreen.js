import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { UsernameContext, TokenContext } from '../Context/Context'
import { deleteUser } from '../components/API/sign'
import styles from '../styles'

export default function HomeScreen() {
    const [username, setUsername] = useContext(UsernameContext)
    const [token, setToken] = useContext(TokenContext)

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
                        deleteUser(username, token)
                            .then(() => {
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
        <View style={{marginBottom: 30}}>
            <Text style={styles.title}>Bonjour, {username}</Text>
            <Text style={styles.subText}>
                Simple application de gestion de tâches
            </Text>
            <Text style={{color: '#334155', lineHeight: 22, marginTop: 10}}>
                Ici, vous pouvez organiser et gérer vos listes de tâches.
            </Text>
        </View>

        <TouchableOpacity 
            style={styles.buttonDanger}
            onPress={handleDeleteAccount} 
        >
            <Text style={styles.buttonText}>Supprimer mon compte</Text>
        </TouchableOpacity>
      </View>
    )
}