import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { UsernameContext, TokenContext } from '../Context/Context'
import styles from '../styles'

export default function HomeScreen() {
    const [username, setUsername] = useContext(UsernameContext)
    const [_, setToken] = useContext(TokenContext)

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
                        // appel api pour supprimer le compte
                        setToken(null);
                        setUsername('');
                    }
                }
            ]
        );
    }

    return (
      <View style={styles.container}>
        {/* Carte de Bienvenue */}
        <View style={styles.card}>
            <Text style={styles.title}>Bonjour {username}</Text>
            <Text style={styles.subTitle}>
                Voici TodoApp.
            </Text>
            <Text style={{color: '#334155', lineHeight: 22}}>
                Une application simple pour gerer des listes de tâches.
            </Text>
        </View>

        {/* Bouton de suppression de compte */}
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