import React, { useState, useContext } from "react";
import { View, Text, TextInput, Pressable } from "react-native";

import { UsernameContext, TokenContext } from "../../Context/Context";
import { createTodoList } from "./todoListAPI";
import styles from "../../styles";

export default function Input({ refresh }) {
  const [name, setName] = useState("");
  const [token] = useContext(TokenContext);
  const [username] = useContext(UsernameContext);
  const [errorMsg, setErrorMsg] = useState("");

  const handleCreate = async () => {
    if (name === "") {
      setErrorMsg("Le nom ne doit pas être vide");
      return;
    }

    try {
      const res = await createTodoList(username, name, token);
      if (res.id) {
        refresh(res);
        setName("");
        setErrorMsg("");
      } else {
        console.error("API response incorrect :", res);
      }
    } catch (error) {
      console.error("Error creating todoList :", error);
    }
  };

  return (
    <View>
      <View style={styles.inlineRowGap}>
        <TextInput
          style={[styles.input, styles.inputInline]}
          placeholder="Nom de la nouvelle liste..."
          onChangeText={setName}
          value={name}
        />

        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.buttonNarrow,
            pressed && styles.pressed,
          ]}
          onPress={handleCreate}
        >
          <Text style={styles.buttonText}>Créer</Text>
        </Pressable>
      </View>
      <Text style={styles.ErrorText}>{errorMsg}</Text>
    </View>
  );
}
