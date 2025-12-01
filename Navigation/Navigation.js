import React, { useContext } from 'react'
import { TouchableOpacity, Text, View } from 'react-native' // Ajout imports
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// ... imports des écrans ...
import NavigationTodo from './NavigationTodo'
import HomeScreen from '../Screen/HomeScreen'
import SignInScreen from '../Screen/SignInScreen'
import SignUpScreen from '../Screen/SignUpScreen'

import { TokenContext, UsernameContext } from '../Context/Context'
import styles from '../styles' // Pour le style du bouton logout

const Tab = createBottomTabNavigator()

export default function Navigation () {
  return (
    <TokenContext.Consumer>
      {([token, setToken]) => (
        <UsernameContext.Consumer>
          {([username, setUsername]) => (
            <NavigationContainer>
              {token == null ? (
                <Tab.Navigator>
                  <Tab.Screen name='SignIn' component={SignInScreen} />
                  <Tab.Screen name='SignUp' component={SignUpScreen} />
                </Tab.Navigator>
              ) : (
                <Tab.Navigator
                    screenOptions={{
                        // Style du Header commun (fond blanc, pas d'ombre forte)
                        headerStyle: { backgroundColor: '#fff', elevation: 0, shadowOpacity: 0, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
                        headerTitleStyle: { fontWeight: 'bold', color: '#0F172A' },
                        // Ajout du bouton Déconnexion dans la barre du haut à droite
                        headerRight: () => (
                            <TouchableOpacity 
                                style={{ marginRight: 15, padding: 8, borderRadius: 6, backgroundColor: '#F1F5F9' }}
                                onPress={() => {
                                    setUsername(null)
                                    setToken(null)
                                }}
                            >
                                <Text style={{color: '#0F172A', fontSize: 12, fontWeight: '600'}}>Déconnexion</Text>
                            </TouchableOpacity>
                        )
                    }}
                >
                  <Tab.Screen name='Accueil' component={HomeScreen} />
                  <Tab.Screen name='Mes Listes' component={NavigationTodo}
                    options={{ unmountOnBlur: true }}
                  />
                </Tab.Navigator>
              )}
            </NavigationContainer>
          )}
        </UsernameContext.Consumer>
      )}
    </TokenContext.Consumer>
  )
}