import React, { useContext, useState, useEffect } from "react";
import { View, Share } from "react-native";

import { UsernameContext, TokenContext } from "../Context/Context";
import { getTodoLists, deleteTodoList } from "../components/API/todoListAPI";
import { getTodos } from "../components/API/todo";

import Input from "../components/API/input";
import TodoListStack from "../components/ItemOut/TodoListStack";
import styles from "../styles";

export default function TodoListScreen({ navigation }) {
  const [token] = useContext(TokenContext);
  const [username] = useContext(UsernameContext);
  const [todoLists, setTodolists] = useState([]);

  useEffect(() => {
    getTodoLists(username, token)
      .then((todolists) => setTodolists(todolists))
      .catch((err) => console.error(err.message));
  }, []);

  const exportList = async (id, title) => {
    try {
      // 1. Récupérer les tâches de la liste via l'API
      const todos = await getTodos(id, token);

      // 2. Formater le message (ex: format texte simple avec cases cochées [x])
      const message =
        `Liste : ${title}\n\n` +
        todos.map((t) => `- [${t.done ? "x" : " "}] ${t.content}`).join("\n");

      // 3. Ouvrir le menu de partage natif (copier, mail, whatsapp, etc.)
      await Share.share({
        message: message,
        title: `Export ${title}`,
      });
    } catch (error) {
      console.error("Erreur lors de l'export:", error);
    }
  };

  const deleteTodoListS = (id) => {
    setTodolists(todoLists.filter((todoList) => todoList.id !== id));
    deleteTodoList(id, token).catch((err) => console.error(err.message));
  };

  function refreshTodoLists(val) {
    setTodolists([...todoLists, val]);
  }

  return (
    <View style={styles.container}>
      {/* Zone de création épurée (Carte blanche) */}
      <View style={styles.surfaceCard}>
        {/* On passe la fonction refresh au composant Input */}
        <Input refresh={refreshTodoLists} />
      </View>

      {/* Liste des TodoLists */}
      <TodoListStack
        data={todoLists}
        onExport={exportList}
        onDelete={deleteTodoListS}
        navigation={navigation}
      />
    </View>
  );
}
