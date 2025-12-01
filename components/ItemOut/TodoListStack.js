import React from "react";
import { FlatList, View } from "react-native";

import TodoListStackItem from "./TodoListStackItem";
import styles from "../../styles";

export default function TodoListStack(props) {
  return (
    <View style={styles.border}>
      <FlatList
        data={props.data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoListStackItem
            item={item}
            onExport={props.onExport}
            onDelete={props.onDelete}
            navigation={props.navigation}
          />
        )}
      />
    </View>
  );
}
