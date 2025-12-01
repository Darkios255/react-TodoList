import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

import styles from '../styles';
import { TokenContext, UsernameContext } from '../Context/Context';
import { signUp } from '../components/API/sign';


export default function SignUpScreen({ navigation }) {

    const [errorMsg, seterrorMsg] = useState('');

    let password = ''
    return (
        <TokenContext.Consumer>
            {([token, setToken]) => (
                <UsernameContext.Consumer>
                    {([username, setUsername]) => {
                        return (
                            <View style={styles.container} >
                                <Text style={styles.ErrorText}>{errorMsg}</Text>
                                <TextInput style={styles.input} placeholder='Username' onChangeText={value => setUsername(value)}/>
                                <TextInput style={styles.input} placeholder='Password' secureTextEntry={true} onChangeText={value => password = value}/>
                                <TouchableOpacity style={styles.button}
                                    onPress={() => {
                                        if ( username == '' ) {
                                            seterrorMsg("Le nom d'utilisateur ne doit pas être vide")
                                        } else if ( password == '' ) {
                                            seterrorMsg("Le mot de passe ne doit pas être vide")
                                        } else {
                                            signUp(username, password)
                                                .then(token => {
                                                    setToken(token)
                                                    setUsername(username)
                                                })
                                                .catch(error => {
                                                    seterrorMsg(error.message)
                                                })
                                        }
                                    }}
                                >
                                    <Text style={styles.buttonText}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                </UsernameContext.Consumer>
            )}
        </TokenContext.Consumer>
    )
}