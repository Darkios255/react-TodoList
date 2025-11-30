import React, { useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { UsernameContext } from '../Context/Context'
import styles from '../styles'

export default function HomeScreen({ navigation }) {
    const [username] = useContext(UsernameContext)

    return (
      <View style={styles.container}>
        <View style={styles.border}>
            <Text style={styles.title}>Bienvenue, {username} </Text>
            <Text style={styles.subText}>
                Gérez vos tâches et listes
            </Text>
        </View>

        <TouchableOpacity 
            style={styles.button}
            // On navigue vers l'onglet "Navigation" qui contient tes TodoLists
            onPress={() => navigation.navigate('Navigation')} 
        >
            <Text style={styles.buttonText}>Voir mes TodoLists →</Text>
        </TouchableOpacity>
      </View>
    )
}