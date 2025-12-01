import React from "react";
import { Image, View, Text, StyleSheet, Switch, Pressable } from "react-native";

export default function TodoItem({ item, change, deleteTodo }) {
  return (
    <View style={localStyles.content}>
      <Switch
        value={item.done}
        onValueChange={(state) => change(item.id, state)}
      />

      <Text
        style={[
          localStyles.text_item,
          item.done && localStyles.textDone,
        ]}
      >
        {item.content}
      </Text>

      <Pressable
        style={({ pressed }) => [pressed && localStyles.pressed]}
        onPress={() => deleteTodo(item.id)}
      >
        <Image
          source={require("../../assets/trash-can-outline.png")}
          style={localStyles.icon}
        />
      </Pressable>
    </View>
  );
}

const localStyles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  text_item: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
    color: "#334155",
  },
  textDone: {
    textDecorationLine: "line-through",
  },
  icon: {
    height: 24,
    width: 24,
  },
  pressed: {
    opacity: 0.7,
  },
});
