import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

import { UsernameContext, TokenContext } from "../../Context/Context";
import { createTodoList } from "./todoListAPI";
import styles from "../../styles";

export default function Input(props) {
  const [name, setName] = useState("");
  const [token] = useContext(TokenContext);
  const [username] = useContext(UsernameContext);
  const [errorMsg, seterrorMsg] = useState("");

  return (
    <View>
      <View style={styles.inlineRowGap}>
        <TextInput
          style={[styles.input, styles.inputInline]}
          placeholder="Nom de la nouvelle liste..."
          onChangeText={setName}
          value={name}
        />

        {/* Bouton compact à droite */}
        <TouchableOpacity
          style={[styles.button, styles.buttonNarrow]}
          onPress={async () => {
            if (name == "") {
              seterrorMsg("Le nom ne doit pas être vide");
            } else {
              try {
                const res = await createTodoList(username, name, token);
                if (res.id) {
                  props.refresh(res);
                  setName("");
                  seterrorMsg(""); // Reset erreur
                } else {
                  console.error("API response incorrect :", res);
                }
              } catch (error) {
                console.error("Error creating todoList :", error);
              }
            }
          }}
        >
          <Text style={styles.buttonText}>Créer</Text>
        </TouchableOpacity>
      </View>
      {/* Message d'erreur en dessous si besoin, discret */}
      <Text style={styles.ErrorText}>{errorMsg}</Text>
    </View>
  );
}
