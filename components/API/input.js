import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import { UsernameContext, TokenContext } from "../../Context/Context";
import { createTodoList } from "./todoListAPI";
import styles from "../../styles";

export default function Input(props) {

    const [name, setName] = useState('')
    const [token] = useContext(TokenContext)
    const [username] = useContext(UsernameContext)
    const [errorMsg, seterrorMsg] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.ErrorText}>{errorMsg}</Text>
            <TextInput style={styles.input}
                placeholder="New list name"
                onChangeText={setName}
                value={name}
            />
            <TouchableOpacity style={styles.button}
                onPress={async () => {
                    if ( name == '' ) {
                        seterrorMsg("Le nom de la liste ne doit pas être vide")
                    } else {
                    try {
                        const res = await createTodoList(username, name, token);
                        if (res.id) {
                            props.refresh(res);
                            setName("");
                        } else {
                            console.error("API response came back incorrect :", res);
                        }
                    } catch (error) {
                        console.error("Error creating todoList :", error);
                    }
                }}}
            >
                <Text style={styles.buttonText}>Créer TodoList</Text>
            </TouchableOpacity>
        </View>
    )
}