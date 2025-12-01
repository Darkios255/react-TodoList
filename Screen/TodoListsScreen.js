import React, { useContext, useState, useEffect } from "react";
import { View, Share, Platform } from "react-native";

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
      const todos = await getTodos(id, token);

      const message =
        `Liste : ${title}\n\n` +
        todos.map((t) => `- [${t.done ? "x" : " "}] ${t.content}`).join("\n");

      if (Platform.OS === "web") {
        if (navigator.share) {
          await navigator.share({ title: `Export ${title}`, text: message });
        } else if (navigator.clipboard) {
          await navigator.clipboard.writeText(message);
          alert("Liste copiée dans le presse-papiers !");
        } else {
          alert("Le partage n'est pas supporté sur ce navigateur.");
        }
      } else {
        await Share.share({ message, title: `Export ${title}` });
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Erreur lors de l'export:", error);
      }
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
      <View style={styles.surfaceCard}>
        <Input refresh={refreshTodoLists} />
      </View>

      <TodoListStack
        data={todoLists}
        onExport={exportList}
        onDelete={deleteTodoListS}
        navigation={navigation}
      />
    </View>
  );
}
