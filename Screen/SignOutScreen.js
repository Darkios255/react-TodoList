import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import styles from '../styles';
import { TokenContext, UsernameContext } from '../Context/Context'

export default function SignOutScreen ({ navigation, route }) {
  return <TokenContext.Consumer>
    {([token, setToken]) => (
      <UsernameContext.Consumer>
        {([username, setUsername]) => {
          return (
            <View style={styles.container}>
              <TouchableOpacity style={styles.button}
                onPress={() => {
                      setUsername(null)
                      setToken(null)
                }} 
              >
                <Text style={styles.buttonText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          )
        }}
      </UsernameContext.Consumer>
    )}
  </TokenContext.Consumer>
}