import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from "react-native";

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
    <View style={styles.content}>
      <Switch
        value={done}
        onValueChange={(state) => stateChange(props.item.id, state)}
      />

      {/* flex: 1 pousse l'élément suivant (poubelle) au bout */}
      <Text
        style={[
          styles.text_item,
          { textDecorationLine: done ? "line-through" : "none" },
        ]}
      >
        {props.item.content}
      </Text>

      <TouchableOpacity onPress={() => props.deleteTodo(props.item.id)}>
        <Image
          source={require("../../assets/trash-can-outline.png")}
          style={{ height: 24, width: 24 }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center", // Centre verticalement
    justifyContent: "space-between", // Écarte les éléments
    width: "100%", // Prend toute la largeur
  },
  text_item: {
    marginLeft: 10,
    flex: 1, // Prend toute la place disponible entre le switch et la poubelle
    fontSize: 16,
    color: "#334155",
  },
});
