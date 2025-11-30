import React, { useContext } from 'react'
import { View, Text } from 'react-native'

import { UsernameContext } from '../Contexte/Context'
import styles from '../styles'


export default function HomeScreen () {
    const [username, setUsername] = useContext(UsernameContext)
    return (
      <View style={styles.container}>
        <Text>Welcome !</Text>
        <Text>You are logged as {username}</Text>
      </View>
    )
  }