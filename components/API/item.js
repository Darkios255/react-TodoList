import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
// Pas besoin de styles ici si tu utilises des styles inline comme dans ton fichier original

export default function Item(props) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
      }}
    >
      <Text style={{ flex: 1 }}>{props.title}</Text>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* --- BOUTON EXPORT  --- */}
        <TouchableOpacity
          onPress={props.export}
          style={{ marginRight: 15 }} // Un peu d'espace avec la poubelle
        >
          <Image
            source={require("../../assets/export.png")}
            style={{ height: 24, width: 24 }}
          />
        </TouchableOpacity>

        {/* Bouton Supprimer */}
        <TouchableOpacity
          onPress={() => {
            props.delete();
          }}
        >
          <Image
            source={require("../../assets/trash-can-outline.png")}
            style={{ height: 24, width: 24 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
