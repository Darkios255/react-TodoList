import React from "react";
import { FlatList, View } from "react-native";

import TodoListStackItem from "./TodoListStackItem";
import styles from "../../styles";

// Composant qui affiche la liste des todos dans une flat list
export default function TodoListStack({ data, onExport, onDelete, navigation }) {
  return (
    <View style={styles.border}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoListStackItem
            item={item}
            onExport={onExport}
            onDelete={onDelete}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
}
