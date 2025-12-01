import React, { useEffect, useState } from "react";
import { Image, View, Text, StyleSheet, Switch, Pressable } from "react-native";

export default function TodoItem(props) {
  const [done, setDone] = useState(props.item.done);

  useEffect(() => {
    setDone(props.item.done);
  }, [props.item.done]);

  const stateChange = (id, state) => {
    setDone(state);
    props.change(id, state);
  };

  return (
    <View style={localStyles.content}>
      <Switch
        value={done}
        onValueChange={(state) => stateChange(props.item.id, state)}
      />

      <Text
        style={[
          localStyles.text_item,
          { textDecorationLine: done ? "line-through" : "none" },
        ]}
      >
        {props.item.content}
      </Text>

      <Pressable
        style={({ pressed }) => [pressed && { opacity: 0.7 }]}
        onPress={() => props.deleteTodo(props.item.id)}
      >
        <Image
          source={require("../../assets/trash-can-outline.png")}
          style={{ height: 24, width: 24 }}
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
});
