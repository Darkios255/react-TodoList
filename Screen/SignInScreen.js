import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

import styles from '../styles';
import { TokenContext, UsernameContext } from '../Contexte/Context'
import { signIn } from '../components/API/sign'

export default function SignInScreen () {

    const [errorMsg, seterrorMsg] = useState('');

    const [password, setpassword] = useState('');
    
    return (
      <TokenContext.Consumer>
        {([token, setToken]) => (
          <UsernameContext.Consumer>
            {([username, setUsername]) => {
              return <View style={styles.container}>
                <Text style={styles.ErrorText}>{errorMsg}</Text>
                <TextInput style={styles.input} placeholder='Username' onChangeText={value => setUsername(value)}/>
                <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} onChangeText={setpassword} value={password}/>
                <TouchableOpacity style={styles.button}
                  title="Sign In"
                  onPress={() => {
                    if ( username == '' ) {
                      seterrorMsg("Le nom d'utilisateur ne doit pas être vide")
                    } else if ( password == '' ) {
                      seterrorMsg("Le mot de passe ne doit pas être vide")
                    } else {
                      signIn(username, password)
                          .then(token => {
                              setToken(token)
                              setUsername(username)
                              navigation.navigate("SignUp")
                          })
                          .catch(error => {
                              seterrorMsg(error.message)
                          })
                    }
                  }
                  }
                >
                  <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
              </View>
            }}
          </UsernameContext.Consumer>
        )}
      </TokenContext.Consumer>
    )
  }