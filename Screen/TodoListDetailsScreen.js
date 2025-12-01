import React, { useEffect, useState, useContext } from "react";
import { View } from "react-native";

import TodoListUi from "../components/ItemIn/TodoListUi";
import { getTodos } from "../components/API/todo";
import { TokenContext } from "../Context/Context";
import styles from "../styles";

export default function TodoListDetailsScreen({ route, navigation }) {
  const [token] = useContext(TokenContext);
  const [data, setData] = useState([]);
  const { id, title } = route.params; // Récupération du titre

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos(id, token);
      setData(todos);
    };

    fetchTodos();
  }, [id, token]);

  return (
    <View style={styles.container}>
      <TodoListUi
        data={data}
        listId={id}
        title={title}
        navigation={navigation}
      />
    </View>
  );
}
