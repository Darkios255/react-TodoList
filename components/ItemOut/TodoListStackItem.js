import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import styles from "../../styles";

export default function TodoListStackItem({ item, navigation, onExport, onDelete }) {
  return (
    <View style={styles.card}>
      {/* Zone cliquable pour la navigation (titre seulement) */}
      <TouchableOpacity
        style={styles.flex1}
        onPress={() => navigation.navigate("Details", { id: item.id, title: item.title })}
      >
        <Text style={styles.itemTitle}>{item.title}</Text>
      </TouchableOpacity>

      {/* Boutons d'action (export + supprimer) */}
      <View style={styles.inlineRow}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => onExport(item.id, item.title)}
        >
          <Image
            source={require("../../assets/export.png")}
            style={styles.iconSmall}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => onDelete(item.id)}
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
