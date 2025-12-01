import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import styles from "../../styles";

export default function TodoListStackItem(props) {
  return (
    <View style={styles.card}>
      {/* Zone cliquable pour la navigation (titre seulement) */}
      <TouchableOpacity
        style={styles.flex1}
        onPress={() =>
          props.navigation.navigate("Details", {
            id: props.item.id,
            title: props.item.title,
          })
        }
      >
        <Text style={styles.itemTitle}>{props.item.title}</Text>
      </TouchableOpacity>

      {/* Boutons d'action (export + supprimer) */}
      <View style={styles.inlineRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => {
            console.log("Export clicked:", props.item.id, props.item.title);
            props.onExport(props.item.id, props.item.title);
          }}
        >
          <Image
            source={require("../../assets/export.png")}
            style={styles.iconSmall}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => props.onDelete(props.item.id)}
        >
          <Image
            source={require("../../assets/trash-can-outline.png")}
            style={styles.iconSmall}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
